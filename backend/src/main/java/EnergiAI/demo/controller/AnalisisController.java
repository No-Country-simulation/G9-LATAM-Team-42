package EnergiAI.demo.controller;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.AnalisisResponse;
import EnergiAI.demo.service.AnalisisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


// Controller encargado de recibir peticiones del tipo post, se realizan pruebas de funcioncionamiento desde postman.
@RestController
@RequestMapping("/analisis-energetico")
public class AnalisisController {

    private final AnalisisService analisisService;

    public AnalisisController(AnalisisService analisisService) {
        this.analisisService = analisisService;
    }

    @PostMapping
    public ResponseEntity<AnalisisResponse> analizarConsumo (@RequestBody AnalisisRequest request){
        AnalisisResponse response = analisisService.procesarAnalisisEnergetico(request);
        return ResponseEntity.ok(response);
    }
}