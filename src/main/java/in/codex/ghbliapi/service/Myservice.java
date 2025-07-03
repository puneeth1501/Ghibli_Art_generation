package in.codex.ghbliapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class Myservice {
     @Value("${api.key}")
    private String apiKey;

    @PostConstruct
    public void printApiKey() {
        System.out.println("API Key: " + apiKey);
    }
    
}
