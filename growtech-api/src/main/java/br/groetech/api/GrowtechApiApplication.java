package br.groetech.api;

import java.util.concurrent.Delayed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;

@SpringBootApplication
public class GrowtechApiApplication extends SpringBootServletInitializer{
	
	@Autowired
	Runnable messageListener;
	
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(GrowtechApiApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(GrowtechApiApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner schedulingRunner(TaskExecutor executor) {
		return new CommandLineRunner() {
			
			public void run(String... args) throws Exception {
				executor.execute(messageListener);
			
				
			}
		};
	}

}
