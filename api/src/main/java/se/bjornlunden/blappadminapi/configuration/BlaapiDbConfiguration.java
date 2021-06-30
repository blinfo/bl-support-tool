package se.bjornlunden.blappadminapi.configuration;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import se.bjornlunden.blappadminapi.model.blaapi.CloudCompany;

import javax.sql.DataSource;
import java.util.Objects;

/**
 * @author Patrik Holmkvist on 2021-01-27
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "blaApiEntityManagerFactory", basePackages = {
        "se.bjornlunden.blappadminapi.repositories.blaapi", "se.bjornlunden.blappadminapi.configuration"},
        transactionManagerRef = "blaApiTransactionManager")
public class BlaapiDbConfiguration {

    @Bean
    @ConfigurationProperties("spring.datasource.blaapi")
    public DataSourceProperties blaApiDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.blaapi.configuration")
    public DataSource blaApiDataSource() {
        return blaApiDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }

    /*Entity manager*/
    @Bean(name = "blaApiEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean blaApiEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(blaApiDataSource())
                .packages(CloudCompany.class)
                .build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager blaApiTransactionManager(
            final @Qualifier("blaApiEntityManagerFactory") LocalContainerEntityManagerFactoryBean blaApiEntityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(blaApiEntityManagerFactory.getObject()));
    }
}
