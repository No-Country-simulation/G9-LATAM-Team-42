package EnergiAI.demo.client;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.PrediccionResponse;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("dev")
public class MockDataScienceClient implements DataScienceClient {

    @Override
    public PrediccionResponse obtenerPrediccion(AnalisisRequest request) {
        double consumo = request.getConsumo_kwh();
        boolean horarioPico = request.getUso_horario_pico();
        int cantidadEquipos = request.getCantidad_equipos();
        String tipoInmueble = request.getTipo_inmueble();
        int horasAltoConsumo = request.getHoras_alto_consumo();

        double score = consumo / 10;
        if (horarioPico) {
            score += 8;
        }
        score += (cantidadEquipos * 0.5);

        switch (tipoInmueble.toLowerCase()) {
            case "casa": score += 10; break;
            case "oficina": score += 7; break;
            case "comercio": score += 4; break;
            default: score += 6; break;
        }
        score += horasAltoConsumo * 0.8;

        String categoria;
        double probabilidad = score;
        List<String> recomendaciones;

        if (score >= 70.01) {
            categoria = "Ineficiente";
            recomendaciones = List.of(
                    "Reducir el uso de equipos durante los horarios pico",
                    "Evaluar equipos con alto consumo energético",
                    "Distribuir las actividades de mayor consumo a lo largo del día"
            );
        } else if (score < 70.01 && score >= 55.01) {
            categoria = "Moderado";
            recomendaciones = List.of("Apagar las pantallas mientras no estan en uso.");
        } else {
            categoria = "Eficiente";
            recomendaciones = List.of();
        }

        return new PrediccionResponse(categoria, probabilidad, recomendaciones);
    }
}
