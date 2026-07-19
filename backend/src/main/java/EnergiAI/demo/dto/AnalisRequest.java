package EnergiaAI.demo.dto;

public class AnalisRequest {

    private Double consumo_kwh;
    private String uso_horario_pico;
    private Integer cantidad_equipos;
    private String tipo_inmueble;
    private Integer horas_alto_consumo;

    // Constructor vacío
    public AnalisRequest() {
    }

    // Constructor con parámetros
    public AnalisRequest(Double consumo_kwh, String uso_horario_pico, Integer cantidad_equipos, String tipo_inmueble, Integer horas_alto_consumo) {
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

    public String getUso_horario_pico() {
        return uso_horario_pico;
    }

    public void setUso_horario_pico(String uso_horario_pico) {
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