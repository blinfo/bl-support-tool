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
import se.bjornlunden.blappadminapi.model.blapp.*;
import se.bjornlunden.blappadminapi.model.blapp.BlappModule;

import javax.sql.DataSource;
import java.util.Objects;

/**
 * @author Patrik Holmkvist on 2021-01-27
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        entityManagerFactoryRef = "blappEntityManagerFactory", basePackages = {
        "se.bjornlunden.blappadminapi.repositories.blapp", "se.bjornlunden.blappadminapi.configuration"},
        transactionManagerRef = "blappTransactionManager")
public class BlappDbConfiguration {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.blapp")
    public DataSourceProperties blappDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.blapp.configuration")
    public DataSource blappDataSource() {
        return blappDataSourceProperties().initializeDataSourceBuilder()
                .type(HikariDataSource.class).build();
    }

    /*Primary Entity manager*/
    @Primary
    @Bean(name = "blappEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean blappEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(blappDataSource())
                .packages(
                        Articles.class,
                        Company.class,
                        Connection.class,
                        ConnectionProperty.class,
                        FlywaySchemaHistory.class,
                        BlappModule.class,
                        Solution.class,
                        Property.class,
                        Sessions.class,
                        SubmanEvents.class,
                        Subscription.class,
                        SystemInfo.class,
                        User.class,
                        UserProfile.class,
                        UserSetting.class
                )
                .build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager blappTransactionManager(
            final @Qualifier("blappEntityManagerFactory") LocalContainerEntityManagerFactoryBean blappEntityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(blappEntityManagerFactory.getObject()));
    }
}
