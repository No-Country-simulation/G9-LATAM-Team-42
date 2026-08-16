package EnergiAI.demo.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GeminiClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestClient restClient;

    public GeminiClient(){
        this.restClient = RestClient.create();
    }

    public String obtenerRecomendacionIA(String categoria, double consumoKwh, int cantidadDeEquipos){
        String prompt = "El análisis energético dió la categoría: " + categoria +
                ". Tiene un consumo de " + consumoKwh + " kWh con " +
                cantidadDeEquipos + " equipos. " +
                "Dame 1 recomendación corta, directa y amigable para mejorar la eficiencia.";

        String requestBody = """
                {
                    "contents": [{
                        "parts": [{"text": "%s"}]
                    }]
                }
                """.formatted(prompt);

        try {
            String responseString = restClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            if (responseString != null){
                ObjectMapper mapper = new ObjectMapper();
                JsonNode responseNode = mapper.readTree(responseString);

                if (responseNode.has("candidates")){
                    return responseNode.at("/candidates/0/content/parts/0/text").asText().trim();
                }
            }
        } catch (Exception e){
            System.err.println("Error al conectar con Gemini: " + e.getMessage());
        }

        return "Te recomendamos revisar tus equipos de mayor consumo"; // Fallback por si falla la IA
    }
}
