# EnergiAI

EnergiAI es un servicio de backend especializado en el análisis de eficiencia energética. Su objetivo principal es procesar datos de consumo eléctrico para proporcionar a los usuarios un diagnóstico preciso sobre su eficiencia energética.

## Funcionalidades principales
- **Análisis Energético:** Procesa datos de entrada como consumo en kWh, equipos, horario y tipo de inmueble para clasificar la eficiencia (Eficiente/Ineficiente).
- **Persistencia:** Almacena cada análisis realizado en una base de datos para seguimiento histórico.
- **Recomendaciones:** Ofrece consejos personalizados basados en los resultados del análisis.
- **Estimación de Costos:** Calcula una proyección de costos mensuales basada en el consumo ingresado.
- **Historial:** Permite consultar los registros históricos de análisis realizados.

## Tecnologías
- **Backend:** Java, Spring Boot.
- **Persistencia:** Spring Data JPA, Hibernate.
- **Base de datos:** H2 (en memoria para desarrollo local).
