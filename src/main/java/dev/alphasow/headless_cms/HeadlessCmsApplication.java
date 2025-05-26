package dev.alphasow.headless_cms;

import dev.alphasow.headless_cms.configuration.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
@EnableJpaRepositories
public class HeadlessCmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeadlessCmsApplication.class, args);
	}

}
