package EnergiAI.demo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * DTO de salida con los resultados del análisis energético.
 */

@Schema(description = "Resultado del análosis energético generado por el sistema")
public class AnalisisResponse {

    @Schema(description = "Categoría asignada según el puntaje de eficiencia", example = "Ineficiente")
    private String categoria;

    @Schema(description = "Probabilidad calculada por el modelo (entre 0 y 1)", example = "0.87")
    private Double probabilidad; // Valor decimal continuo entre 0 y 1 para el porcentaje

    @Schema(description = "Lista de sugerencias para mejorar la eficiencia energética",
            example = "[\"Reducir el uso de equipos durante los horarios pico\"]")
    private List<String> recomendaciones; // Lista de sugerencias para el usuario

    @Schema(description = "Costo económico estimado en base al consumo", example = "337.87")
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