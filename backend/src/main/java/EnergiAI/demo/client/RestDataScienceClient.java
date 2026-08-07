package EnergiAI.demo.client;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.PrediccionResponse;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@Profile("prod")
public class RestDataScienceClient implements DataScienceClient {

    private final RestClient restClient;

    public RestDataScienceClient(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("http://python-service:8080").build();
    }

    @Override
    public PrediccionResponse obtenerPrediccion(AnalisisRequest request) {
        return restClient.post()
                .uri("/predict")
                .body(request)
                .retrieve()
                .body(PrediccionResponse.class);
    }
}
