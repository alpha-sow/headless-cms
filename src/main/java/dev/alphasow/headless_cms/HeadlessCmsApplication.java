package dev.alphasow.headless_cms;

import dev.alphasow.headless_cms.configuration.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class HeadlessCmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeadlessCmsApplication.class, args);
	}

}
