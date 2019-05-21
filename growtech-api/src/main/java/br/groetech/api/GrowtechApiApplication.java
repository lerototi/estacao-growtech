package br.groetech.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;

@SpringBootApplication
public class GrowtechApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrowtechApiApplication.class, args);
	}

}
