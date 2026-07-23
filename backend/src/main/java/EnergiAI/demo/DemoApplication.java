package EnergiAI.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Se agrega exclusion de bd para realizar pruebas de funcionamiento,
// en caso de agregar bd eliminar las siguentes lineas y descomentar la linea sobre la clase.
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;
@SpringBootApplication (exclude = {DataSourceAutoConfiguration.class})


// Se comentaron dependencias relacionadas a la seguridad en el archivo pom.xml.
// Se añadio la dependencia relacionada a springboot starter.

//@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}