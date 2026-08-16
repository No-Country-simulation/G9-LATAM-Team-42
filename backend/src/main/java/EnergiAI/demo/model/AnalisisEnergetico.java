package EnergiAI.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "analisis_energetico")
public class AnalisisEnergetico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Campos de entrada
    private Double consumoKwh;
    private Boolean usoHorarioPico;
    private Integer cantidadEquipos;
    private String tipoInmueble;
    private Integer horasAltoConsumo;

    // Campos de resultado
    private String categoria;
    private Double probabilidad;
    private Double costoEstimadoMensual;

    // Recomendaciones
    @Column(columnDefinition = "TEXT")
    private String recomendaciones;

    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}
