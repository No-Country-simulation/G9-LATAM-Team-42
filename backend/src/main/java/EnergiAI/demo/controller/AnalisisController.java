package EnergiAI.demo.controller;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.model.AnalisisEnergetico;
import EnergiAI.demo.service.AnalisisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller encargado de recibir peticiones del tipo post, se realizan pruebas de funcioncionamiento desde postman.
@RestController
@RequestMapping("/analisis-energetico")
@Tag(name = "Análisis energético", description = "Endpoints para la evaluación y consulta de eficiencia energética")
public class AnalisisController {

    private final AnalisisService analisisService;

    public AnalisisController(AnalisisService analisisService) {
        this.analisisService = analisisService;
    }

    @PostMapping
    @Operation(summary = "Procesar análisis enregético",
                description = "Recibe los datos de consumo del inmueble y devuelve la clasificación de eficiencia junto con recomendaciones.")
    @ApiResponse(responseCode = "200", description = "Análisis procesado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos (error de validación)")
    public ResponseEntity<AnalisisResponse> analizarConsumo (@Valid @RequestBody AnalisisRequest request){
        AnalisisResponse response = analisisService.procesarAnalisisEnergetico(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/historial")
    @Operation(summary = "Obtener historial de análisis",
                description = "Obtener una lista con con todos los análisis energéticos que han sido procesados y guardados en la base de datos previamente")
    @ApiResponse(responseCode = "200", description = "Historial recuperado exitosamente")
    public ResponseEntity<List<AnalisisEnergetico>> obtenerHistorial() {
        return ResponseEntity.ok(analisisService.obtenerHistorial());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un análisis",
                description = "Elimina un registro de análisis del historial, por ejemplo cuando se ingresaron datos por error.")
    @ApiResponse(responseCode = "204", description = "Análisis eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "No existe un análisis con ese id")
    public ResponseEntity<Void> eliminarAnalisis(@PathVariable Long id) {
        analisisService.eliminarAnalisis(id);
        return ResponseEntity.noContent().build();
    }
}
