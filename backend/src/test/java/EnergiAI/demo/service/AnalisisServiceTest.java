package EnergiAI.demo.service;

import EnergiAI.demo.client.DataScienceClient;
import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.dto.PrediccionResponse;
import EnergiAI.demo.repository.AnalisisEnergeticoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AnalisisServiceTest {
    private final AnalisisEnergeticoRepository repository = Mockito.mock(AnalisisEnergeticoRepository.class);
    private final DataScienceClient dataScienceClient = Mockito.mock(DataScienceClient.class);

    private final AnalisisService analisisService = new AnalisisService(repository, dataScienceClient);

    @Test
    @DisplayName("Debe clasificar como eficiente cuando el cliente devuelve categoria eficiente")
    void procesar_ConsumoBajo_RetornarEficiente(){
        AnalisisRequest request = new AnalisisRequest(150.0, false, 4, "casa", 2);
        PrediccionResponse mockPrediccion = new PrediccionResponse("Eficiente", 30.0, List.of());
        Mockito.when(dataScienceClient.obtenerPrediccion(Mockito.any())).thenReturn(mockPrediccion);
        
        AnalisisResponse response = analisisService.procesarAnalisisEnergetico(request);

        assertEquals("Eficiente", response.getCategoria());
        assertEquals(112.5, response.getCosto_estimado()); //150 * 0.75
    }

    @Test
    @DisplayName("Debe clasificar como ineficiente cuando el cliente devuelve categoria ineficiente")
    void procesar_ConsumoAltoYHorarioPico_RetornarIneficiente(){
        AnalisisRequest request = new AnalisisRequest(500.0, true, 15, "oficina", 8);
        PrediccionResponse mockPrediccion = new PrediccionResponse("Ineficiente", 78.9, List.of("Recomendacion"));
        Mockito.when(dataScienceClient.obtenerPrediccion(Mockito.any())).thenReturn(mockPrediccion);

        AnalisisResponse response = analisisService.procesarAnalisisEnergetico(request);

        assertEquals("Ineficiente", response.getCategoria());
        assertEquals(78.9, response.getProbabilidad());
    }

}
