package EnergiAI.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * DTO de entrada para la evaluación de eficiencia energética.
 */
public class AnalisisRequest {

    @NotNull(message = "El consumo en kWh es obligatorio")
    @Positive(message = "El consumo debe ser un valor positivo")
    private Double consumo_kwh;

    @NotNull(message = "El uso en horario pico es obligatorio")
    private Boolean uso_horario_pico;

    @NotNull(message = "La cantidad de equipos es obligatoria")
    @Positive(message = "La cantidad de equipos debe ser mayor a cero")
    private Integer cantidad_equipos;

    @NotBlank(message = "El tipo de inmueble es obligatorio")
    private String tipo_inmueble;

    @NotNull(message = "Las horas de alto consumo son obligatorias")
    @Positive(message = "Las horas deben ser un número positivo")
    private Integer horas_alto_consumo;

    // Constructor vacío
    public AnalisisRequest() {
    }

    // Constructor con parámetros
    public AnalisisRequest(Double consumo_kwh, Boolean uso_horario_pico, Integer cantidad_equipos, String tipo_inmueble, Integer horas_alto_consumo) {
        this.consumo_kwh = consumo_kwh;
        this.uso_horario_pico = uso_horario_pico;
        this.cantidad_equipos = cantidad_equipos;
        this.tipo_inmueble = tipo_inmueble;
        this.horas_alto_consumo = horas_alto_consumo;
    }

    // Getters y Setters
    public Double getConsumo_kwh() {
        return consumo_kwh;
    }

    public void setConsumo_kwh(Double consumo_kwh) {
        this.consumo_kwh = consumo_kwh;
    }

    public Boolean getUso_horario_pico() {
        return uso_horario_pico;
    }

    public void setUso_horario_pico(Boolean uso_horario_pico) {
        this.uso_horario_pico = uso_horario_pico;
    }

    public Integer getCantidad_equipos() {
        return cantidad_equipos;
    }

    public void setCantidad_equipos(Integer cantidad_equipos) {
        this.cantidad_equipos = cantidad_equipos;
    }

    public String getTipo_inmueble() {
        return tipo_inmueble;
    }

    public void setTipo_inmueble(String tipo_inmueble) {
        this.tipo_inmueble = tipo_inmueble;
    }

    public Integer getHoras_alto_consumo() {
        return horas_alto_consumo;
    }

    public void setHoras_alto_consumo(Integer horas_alto_consumo) {
        this.horas_alto_consumo = horas_alto_consumo;
    }
}