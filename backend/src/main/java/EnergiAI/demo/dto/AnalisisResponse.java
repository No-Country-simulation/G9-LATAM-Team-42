package EnergiAI.demo.dto;

import java.util.List;

/**
 * DTO de salida con los resultados del análisis energético.
 */
public class AnalisisResponse {

    private String categoria;
    private Double probabilidad; // Valor decimal continuo entre 0 y 1 para el porcentaje
    private List<String> recomendaciones; // Lista de sugerencias para el usuario
    private Double costo_estimado; // Costo económico proyectado

    // Constructor vacío
    public AnalisisResponse() {
    }

    // Constructor con parámetros
    public AnalisisResponse(String categoria, Double probabilidad, List<String> recomendaciones, Double costo_estimado) {
        this.categoria = categoria;
        this.probabilidad = probabilidad;
        this.recomendaciones = recomendaciones;
        this.costo_estimado = costo_estimado;
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

    public List<String> getRecomendaciones() {
        return recomendaciones;
    }

    public void setRecomendaciones(List<String> recomendaciones) {
        this.recomendaciones = recomendaciones;
    }

    public Double getCosto_estimado() {
        return costo_estimado;
    }

    public void setCosto_estimado(Double costo_estimado) {
        this.costo_estimado = costo_estimado;
    }
}