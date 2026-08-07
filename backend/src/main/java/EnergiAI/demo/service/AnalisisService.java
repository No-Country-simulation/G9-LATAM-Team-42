package EnergiAI.demo.service;

import EnergiAI.demo.client.DataScienceClient;
import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.dto.PrediccionResponse;
import EnergiAI.demo.model.AnalisisEnergetico;
import EnergiAI.demo.repository.AnalisisEnergeticoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalisisService {

    private final AnalisisEnergeticoRepository repository;
    private final DataScienceClient dataScienceClient;

    public AnalisisService(AnalisisEnergeticoRepository repository, DataScienceClient dataScienceClient) {
        this.repository = repository;
        this.dataScienceClient = dataScienceClient;
    }

    public AnalisisResponse procesarAnalisisEnergetico(AnalisisRequest request) {

        // 1. Delegar el análisis de datos (Ya sea al Mock o a la API Python)
        PrediccionResponse prediccion = dataScienceClient.obtenerPrediccion(request);

        // 2. Calcular la estimación financiera (Lógica de negocio propia del backend)
        double costo_estimado = request.getConsumo_kwh() * 0.75;

        // 3. Guardar en base de datos
        AnalisisEnergetico analisis = AnalisisEnergetico.builder()
                .consumoKwh(request.getConsumo_kwh())
                .usoHorarioPico(request.getUso_horario_pico())
                .cantidadEquipos(request.getCantidad_equipos())
                .tipoInmueble(request.getTipo_inmueble())
                .horasAltoConsumo(request.getHoras_alto_consumo())
                .categoria(prediccion.getCategoria())
                .probabilidad(prediccion.getProbabilidad())
                .costoEstimadoMensual(costo_estimado)
                .recomendaciones(String.join(", ", prediccion.getRecomendaciones()))
                .build();
        repository.save(analisis);

        // 4. Ensamblar la respuesta final
        return new AnalisisResponse(
                prediccion.getCategoria(),
                prediccion.getProbabilidad(),
                prediccion.getRecomendaciones(),
                costo_estimado
        );
    }

    public List<AnalisisEnergetico> obtenerHistorial() {
        return repository.findAll();
    }
}
