package EnergiAI.demo.service;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalisisService {

    public AnalisisResponse procesarAnalisisEnergetico(AnalisisRequest request) {

//        Obtener datos del dto.
        double consumo = request.getConsumo_kwh();
        boolean horarioPico = request.getUso_horario_pico();
        int cantidadEquipos = request.getCantidad_equipos();
        String tipoInmueble = request.getTipo_inmueble();
        int horasAltoConsumo = request.getHoras_alto_consumo();

//        Establecer puntaje en funcion del consumo.
        double score = consumo / 10;

//        Asignar puntaje si el consumo se ve afectado por la hora pico.
        if (horarioPico) {
            score += 80;
        }

//        Calcular puntaje por cantidad de equipos.
        score += (cantidadEquipos * 0.5);

//        Asignar puntaje por tipo de inmueble.
        switch (tipoInmueble.toLowerCase()) {
            case "casa":
                score += 10;
                break;
            case "oficina":
                score += 6;
                break;
            case "comercio":
                score += 3;
                break;
            default:
                score += 1;
                break;
        }
//        Calcular el puntaje en base a las horas de alto consumo.
        score += horasAltoConsumo * 0.8;

//        Se declaran variables para generar la respuesta de la peticion.
        String categoria = null;
        double probabilidad = 0;
        List<String> recomendaciones = List.of("Apagar las pantallas mientras no estan en uso.");
        double costo_estimado = 0;

//        Clasificacion de la eficiencia en base al puntaje calculado.
        if (score > 65.01) {
            categoria = "Ineficiente";
            probabilidad = 0.87;
            recomendaciones = List.of(
                    "Reducir el uso de equipos durante los horarios pico",
                    "Evaluar equipos con alto consumo energético",
                    "Distribuir las actividades de mayor consumo a lo largo del día"
            );
        } else if (score <= 65) {
            categoria = "Eficiente";
//            probabilidad = score;
            probabilidad = 0.75;
        }

//        Calculo del costo en funcion del consumo ingresado.
        costo_estimado = consumo * 0.75;

        return new AnalisisResponse(categoria, probabilidad, recomendaciones, costo_estimado );
    }
}