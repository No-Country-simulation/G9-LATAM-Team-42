package EnergiAI.demo.dto;

import java.util.List;

public class PrediccionResponse {
    private String categoria;
    private Double probabilidad;
    private List<String> recomendaciones;

    public PrediccionResponse(String categoria, Double probabilidad, List<String> recomendaciones) {
        this.categoria = categoria;
        this.probabilidad = probabilidad;
        this.recomendaciones = recomendaciones;
    }

    public String getCategoria() { return categoria; }
    public Double getProbabilidad() { return probabilidad; }
    public List<String> getRecomendaciones() { return recomendaciones; }
}
