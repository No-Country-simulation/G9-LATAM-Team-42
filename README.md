# EnergiAI ⚡🧠

EnergiAI es un **asesor energético automático** diseñado para hogares y pequeños negocios. A través de inteligencia artificial, analiza el perfil de consumo eléctrico de los usuarios para clasificar su eficiencia, estimar su gasto mensual y ofrecer recomendaciones personalizadas y accionables de ahorro.

El proyecto es desarrollado como parte de la simulación laboral de **No Country** por el equipo **G9-LATAM-Team-42**.

---

## 📋 ¿Qué hace EnergiAI? (Alcance del MVP)
Cuando un usuario envía sus datos de consumo, el sistema procesa la información y devuelve en segundos:
1. **Clasificación de Perfil:** Determina si el consumo es *Eficiente*, *Moderado* o *Ineficiente*.
2. **Recomendaciones de Ahorro:** Entrega consejos prácticos y personalizados según el nivel de eficiencia.
3. **Costo Estimado:** Calcula una proyección del valor de la factura mensual basado en la tarifa estándar ($0.75 USD por kWh).

---

## 🛠️ Arquitectura y Flujo Técnico
El sistema está diseñado bajo una **arquitectura de microservicios** (Opción A) para garantizar la independencia de los equipos de desarrollo:

1. **Frontend (Opcional):** Interfaz para la interacción con el usuario.
2. **Backend (Java + Spring Boot):** API Gateway que recibe los datos, valida la información, aplica la lógica de negocio (cálculo de costos y recomendaciones) y centraliza la respuesta.
3. **Data Science (Python + FastAPI):** Microservicio dedicado que expone el modelo de Machine Learning (Random Forest / Decision Tree) y realiza la predicción de categoría de consumo.
4. **Cloud (OCI):** Integración con servicios de Oracle Cloud Infrastructure (como Object Storage para almacenar el modelo `.pkl`).

