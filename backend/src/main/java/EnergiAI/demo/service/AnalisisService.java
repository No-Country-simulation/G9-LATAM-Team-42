package EnergiAI.demo.service;

import EnergiAI.demo.client.DataScienceClient;
import EnergiAI.demo.client.GeminiClient;
import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.dto.PrediccionResponse;
import EnergiAI.demo.model.AnalisisEnergetico;
import EnergiAI.demo.repository.AnalisisEnergeticoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalisisService {

    private final AnalisisEnergeticoRepository repository;
    private final DataScienceClient dataScienceClient;
    private final GeminiClient geminiClient;

    public AnalisisService(AnalisisEnergeticoRepository repository,
                           DataScienceClient dataScienceClient,
                           GeminiClient geminiClient) {
        this.repository = repository;
        this.dataScienceClient = dataScienceClient;
        this.geminiClient = geminiClient;
    }

    public AnalisisResponse procesarAnalisisEnergetico(AnalisisRequest request) {

        // 1. Delegar el análisis de datos (Ya sea al Mock o a la API Python)
        PrediccionResponse prediccion = dataScienceClient.obtenerPrediccion(request);

        // Creamos una lista modificable con las recomendaciones iniciales
        List<String> recomendacionesFinales = new ArrayList<>(prediccion.getRecomendaciones());

        // 2. Integración con IA: Si no es eficiente, le pedimos un consejo a Gemini
        if (!"Eficiente".equalsIgnoreCase(prediccion.getCategoria())){
            String consejoIA = geminiClient.obtenerRecomendacionIA(
                    prediccion.getCategoria(),
                    request.getConsumo_kwh(),
                    request.getCantidad_equipos()
            );
            recomendacionesFinales.add(consejoIA);
        }

        // 3. Calcular la estimación financiera (Lógica de negocio propia del backend)
        double costo_estimado = request.getConsumo_kwh() * 0.75;

        // 4. Guardar en base de datos
        AnalisisEnergetico analisis = AnalisisEnergetico.builder()
                .consumoKwh(request.getConsumo_kwh())
                .usoHorarioPico(request.getUso_horario_pico())
                .cantidadEquipos(request.getCantidad_equipos())
                .tipoInmueble(request.getTipo_inmueble())
                .horasAltoConsumo(request.getHoras_alto_consumo())
                .categoria(prediccion.getCategoria())
                .probabilidad(prediccion.getProbabilidad())
                .costoEstimadoMensual(costo_estimado)
                // Inclusión de nuestra nueva lista que incluye la IA
                .recomendaciones(String.join(", ", recomendacionesFinales))
                .build();
        repository.save(analisis);

        // 5. Ensamblar la respuesta final
        return new AnalisisResponse(
                prediccion.getCategoria(),
                prediccion.getProbabilidad(),
                recomendacionesFinales, // Pasamos lista actualizada
                costo_estimado
        );
    }

    public List<AnalisisEnergetico> obtenerHistorial() {
        return repository.findAll();
    }

    public void eliminarAnalisis(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un análisis con id " + id);
        }
        repository.deleteById(id);
    }
}
