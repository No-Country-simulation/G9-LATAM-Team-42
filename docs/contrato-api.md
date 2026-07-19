> [!IMPORTANT]
> ### 📊 Sincronización Backend 🔄 Data Science
> Este archivo define las variables exactas del análisis energético acordadas para la conexión entre el **Backend (Java)** y el **Modelo de IA (Python)**. 
> podemos modificarlo a nuestras necesidades o conveniencias.
> Antes de modificar o añadir cualquier campo en los DTOs de petición o respuesta, verifícalo aquí para evitar errores de tipado o nombres que rompan la comunicación con el modelo de datos.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📝Este es un ejemplo del Contrato de Datos: Backend 🔄 Modelo de IA

Para asegurar que la integración de componentes no falle, se definen los siguientes nombres de variables y tipos de datos para la comunicación con el modelo de analítica.

### 📤 Datos de Entrada (Input Backend -> Modelo)
Al solicitar un análisis de eficiencia energética, el Backend enviará un objeto con la siguiente estructura:

| Variable | Tipo de Dato | Descripción / Ejemplo |
| :--- | :--- | :--- |
| `consumo_kwh` | Numérico (Double/Float) | Consumo registrado en kilovatios hora (ej: `150.5`). |
| `uso_horario_pico` | Cadena (String) o Booleano | Indica si consume en horas de alta demanda (ej: `"Mañana"`, `"Tarde"`, `"Noche"`, true, false). |
| `cantidad_equipos` | Entero (Integer) | Número de electrodomésticos o equipos conectados (ej: `5`). |
| `tipo_inmueble` | Cadena (String) | Tipo de propiedad a evaluar (ej: `"Residencial"`, `"Comercial"`). |
| `horas_alto_consumo` | Entero (Integer) | Cantidad de horas estimadas de uso intenso al día (ej: `6`). |

---

### 📥 Datos de Salida (Output Modelo -> Backend)
El modelo procesará los datos y retornará una respuesta con la siguiente estructura exacta:

*   **`categoria`** *(String)*: Clasificación del consumo. Devolverá únicamente uno de estos tres valores de forma estricta:
    *   `Eficiente`
    *   `Moderado`
    *   `Inefficiente`
*   **`probabilidad`** *(Double/Float)*: Valor numérico continuo indexado **entre 0 y 1** que representa la certeza del modelo.
    > 💡 **Nota de Formato:** El modelo maneja internamente este valor decimal (ej: `0.85`) para representar los porcentajes de confianza. La conversión visual a formato legible (ej: `85%`) se procesará posteriormente en las capas de presentación de la interfaz.
