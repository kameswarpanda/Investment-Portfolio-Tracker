package com.task.portfoliotracker.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
						.title("Job Posting API")
						.version("1.0")
						.description("This API provides CRUD operations for managing job postings, including creating, reading, updating, deleting, and searching job postings on a hiring platform.")
						.contact(new Contact()
								.name("Kameswar Panda") 
								.email("kameswarpanda11@gmail.com")) 
						.license(new License()));
	}
}

