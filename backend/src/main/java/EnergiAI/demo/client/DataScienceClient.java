package EnergiAI.demo.client;

import EnergiAI.demo.dto.AnalisisRequest;
import EnergiAI.demo.dto.PrediccionResponse;

public interface DataScienceClient {
    PrediccionResponse obtenerPrediccion(AnalisisRequest request);
}
