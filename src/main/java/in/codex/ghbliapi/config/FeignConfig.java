package in.codex.ghbliapi.config;


import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;

/**
 * Configuration class for Feign client encoding.
 * Provides a custom form encoder that supports Spring-based form encoding
 * with message converters from a RestTemplate.
 */
/**
 * feign  does not support spring form encoding by default.
 * feign does not know how to encode form data.
 * so we need to provide a custom encoder that supports spring form encoding
 * with message converters from a RestTemplate.
 * and it does not support any converter by default.
 * 
 */
@Configurable
public class FeignConfig {

    @Bean
    public Encoder feignFormEncoder() {
        return new SpringFormEncoder(new SpringEncoder(()-> new HttpMessageConverters(new RestTemplate().getMessageConverters()))); 
    } 
}
