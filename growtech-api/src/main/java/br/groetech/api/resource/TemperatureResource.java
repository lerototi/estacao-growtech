package br.groetech.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.groetech.api.event.ResourceCreatedEvent;
import br.groetech.api.model.Temperature;
import br.groetech.api.repository.TemperatureRepository;

@RestController
@RequestMapping("/temperature")
public class TemperatureResource {
	
	
	@Autowired
	private TemperatureRepository temperatureRepository;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
	@GetMapping
	public List<Temperature> listar(){
		
		return temperatureRepository.findAll();
	}
	
	@PostMapping
	private ResponseEntity<Temperature> save(@RequestBody @Valid Temperature temperature, HttpServletResponse response){
		
		Temperature temperatureSaved = temperatureRepository.save(temperature);
		
		publisher.publishEvent(new ResourceCreatedEvent(this, response, temperature.getIdTemp()));
		
		
		return null;
		
	}

}
