package EnergiaAI.demo.dto;

public class AnalysisResponse {

    private String categoria;
    private Double probabilidad; // Valor decimal continuo entre 0 y 1 para el porcentaje

    // Constructor vacío
    public AnalysisResponse() {
    }

    // Constructor con parámetros
    public AnalysisResponse(String categoria, Double probabilidad) {
        this.categoria = categoria;
        this.probabilidad = probabilidad;
    }

    // Getters y Setters
    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Double getProbabilidad() {
        return probabilidad;
    }

    public void setProbabilidad(Double probabilidad) {
        this.probabilidad = probabilidad;
    }
}
