# Progreso del Proyecto

Registro de los hitos y cambios realizados en el desarrollo de EnergiAI.

## Hitos Completados

### Fase 1: Core de Análisis
- [x] Implementación de `AnalisisRequest` y `AnalisisResponse` (DTOs).
- [x] Implementación de `AnalisisService` con la lógica de cálculo de eficiencia, clasificación y recomendaciones.
- [x] Implementación de `AnalisisController` con el endpoint `POST /analisis-energetico`.

### Fase 2: Persistencia e Historial
- [x] Creación de la entidad JPA `AnalisisEnergetico`.
- [x] Creación del repositorio `AnalisisEnergeticoRepository`.
- [x] Integración de la persistencia en `AnalisisService` para guardar cada análisis realizado.
- [x] Implementación del endpoint `GET /analisis-energetico/historial`.
- [x] Configuración de base de datos H2 en `application.properties` y dependencias en `pom.xml`.

### Fase 3: Desacoplamiento de Ciencia de Datos
- [x] Implementación del paquete `EnergiAI.demo.client`.
- [x] Implementación de interfaz `DataScienceClient`.
- [x] Implementación de `MockDataScienceClient` (dev) y `RestDataScienceClient` (prod).
- [x] Actualización de `AnalisisService` para usar `DataScienceClient`.

### Fase 4: Manejo de Errores y Seguridad
- [x] Implementación de `GlobalExceptionHandler` para manejo centralizado de excepciones y validaciones.
- [x] Implementación de configuración de seguridad (`securityConfig`) con autenticación básica.

## Siguientes Pasos
- [ ] Migrar de H2 a Oracle Autonomous Database (OCI Always Free).
- [ ] Integración de modelo de IA (Groq o Kimi) para el procesamiento y generación de recomendaciones basadas en el modelo de ciencia de datos.
- [ ] Implementar pruebas unitarias y de integración.
