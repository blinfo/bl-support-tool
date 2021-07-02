/* groovylint-disable LineLength, NestedBlockDepth */
pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    environment {
        /*Common properties*/
        ENV_NAME_PROD = 'env-6961485'
        ELASTX_CREDENTIALS = credentials('drift-elastx')
        DOCKER_PUSH = credentials('docker-credentials')
        IMAGE_REGISTRY = "docker.repos.blinfo.se"
        /*---------------------*/
        WEB_APP_IMAGE = "${IMAGE_REGISTRY}/blinfo/blapp-support-front"
        API_APP_IMAGE = "${IMAGE_REGISTRY}/blinfo/blapp-support-api"
        WEB_NODE_ID_PROD = '85677'
        API_NODE_ID_PROD = '85678'
        DOCKER_IMAGE_TAG = "${BRANCH_NAME}-${BUILD_NUMBER}"
    }
    parameters {
        choice(
                name: 'deployTarget',
                choices: ['no_deploy', 'prod'],
                description: 'Where to deploy the build.' )
    }
    stages {
        stage('Build pipeline') {
            parallel {
                stage('web') {
                    stages {
                        stage('Building image') {
                            steps {
                                script {
                                    if(params.deployTarget != 'no_deploy') {
                                        CONFIG=params.deployTarget
                                    } else if(env.BRANCH_NAME == 'main') {
                                        CONFIG="prod"
                                    } else {
                                        CONFIG=""
                                    }
                                }
                                dir("web") {
                                    sh "docker image build --build-arg configuration=${CONFIG} -t ${WEB_APP_IMAGE}:latest ."
                                }
                            }
                        }
                        stage('Tagging image') {
                            steps {
                                sh "docker image tag ${WEB_APP_IMAGE}:latest ${WEB_APP_IMAGE}:${DOCKER_IMAGE_TAG}"
                                sh "docker image tag ${WEB_APP_IMAGE}:latest ${WEB_APP_IMAGE}:${BRANCH_NAME}"
                            }
                        }
                        stage('Pushing image') {
                            steps {
                                retry(3) {
                                    sh "docker login -u ${DOCKER_PUSH_USR} -p ${DOCKER_PUSH_PSW} ${IMAGE_REGISTRY}"
                                    sh "docker image push ${WEB_APP_IMAGE}:${DOCKER_IMAGE_TAG}"
                                    sh "docker image push ${WEB_APP_IMAGE}:${BRANCH_NAME}"
                                }
                            }
                        }
                    }
                }
                stage('api') {
                    stages {
                        stage('Building app') {
                            steps {
                                dir("api") {
                                    sh "mvn clean install -U"
                                }
                            }
                        }
                        stage('Building image') {
                            steps {
                                dir("api") {
                                    sh '''
                    mvn clean -pl report-dist -U generate-resources -P assembly
                    cd report-dist
                    docker image build --target AnnualReportAPIDockerfile -t ${API_APP_IMAGE}:latest .
                  '''
                                }
                            }
                        }
                        stage('Tagging image') {
                            steps {
                                sh "docker image tag ${API_APP_IMAGE}:latest ${API_APP_IMAGE}:${DOCKER_IMAGE_TAG}"
                                sh "docker image tag ${API_APP_IMAGE}:latest ${API_APP_IMAGE}:${BRANCH_NAME}"
                            }
                        }
                        stage('Pushing image') {
                            steps {
                                retry(3) {
                                    sh "docker login -u ${DOCKER_PUSH_USR} -p ${DOCKER_PUSH_PSW} ${IMAGE_REGISTRY}"
                                    sh "docker image push ${API_APP_IMAGE}:${DOCKER_IMAGE_TAG}"
                                    sh "docker image push ${API_APP_IMAGE}:${BRANCH_NAME}"
                                }
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy pipeline') {
            stages{
                stage('Deploy API PROD') {
                    when {
                        beforeAgent true
                        expression {
                            return params.deployTarget == 'prod'
                        }
                    }
                    steps {
                        script {
                            def attemptCount = 0
                            retry(3) {
                                if ( attemptCount > 0) {
                                    sleep(15)
                                }
                                attemptCount++
                                echo "Deploy attempt ${attemptCount}"
                                sh "docker run --rm blinfo/elastx-tools redeploy ${ELASTX_CREDENTIALS_USR} ${ELASTX_CREDENTIALS_PSW} ${ENV_NAME_PROD} ${API_NODE_ID_PROD} ${DOCKER_IMAGE_TAG}"
                            }
                        }
                    }
                }
                stage('Deploy WEB PROD') {
                    when {
                        beforeAgent true
                        expression {
                            return params.deployTarget == 'prod'
                        }
                    }
                    steps {
                        script {
                            def attemptCount = 0
                            retry(3) {
                                if ( attemptCount > 0) {
                                    sleep(15)
                                }
                                attemptCount++
                                echo "Deploy attempt ${attemptCount}"
                                sh "docker run --rm blinfo/elastx-tools redeploy ${ELASTX_CREDENTIALS_USR} ${ELASTX_CREDENTIALS_PSW} ${ENV_NAME_PROD} ${WEB_NODE_ID_PROD} ${DOCKER_IMAGE_TAG}"
                            }
                        }
                    }
                }
            }
        }
    }
}

