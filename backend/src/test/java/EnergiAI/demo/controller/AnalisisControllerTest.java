package EnergiAI.demo.controller;


import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.service.AnalisisService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(AnalisisController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AnalisisControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AnalisisService analisisService;

    @Test
    @DisplayName("Debe devolver HTTP 200 y el JSON de respuesta cuando la solicitud es válida")
    void analizarConsumo_SolicitudValida_Devuelve200() throws Exception{
        AnalisisRequest request = new AnalisisRequest(300.0, false, 5, "casa", 4);
        AnalisisResponse responseMock = new AnalisisResponse("Eficiente", 0.75, List.of("Buen trabajo"), 225.0);

        Mockito.when(analisisService.procesarAnalisisEnergetico(Mockito.any(AnalisisRequest.class)))
                .thenReturn(responseMock);

        mockMvc.perform(post("/analisis-energetico")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoria").value("Eficiente"))
                .andExpect(jsonPath("$.costo_estimado").value(225.0));
    }

    @Test
    @DisplayName("Debe devolver HTTP 400 Bad Request cuando el consumo es negativo (Bean Validation")
    void analizarConsumo_ConsumoNegativo_Retornar400() throws Exception{
        //Consumo en negativo viola la anotacion @Positive
        AnalisisRequest requestInvalido = new AnalisisRequest(-50.0, false, 5, "casa", 4);
        mockMvc.perform(post("/analisis-energetico")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(requestInvalido)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.messages").exists());
    }
}
