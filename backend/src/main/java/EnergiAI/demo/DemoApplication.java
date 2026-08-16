package EnergiAI.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Se deshabilita temporalmente la exclusión de DataSourceAutoConfiguration
// para permitir la conexión a la base de datos (H2 en local / MySQL/OCI en producción) y el uso de JPA Repositories.
//import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
//@SpringBootApplication (exclude = {DataSourceAutoConfiguration.class})

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		// Punto de entrada principal para iniciar la aplicación Spring Boot
		SpringApplication.run(DemoApplication.class, args);
	}
}