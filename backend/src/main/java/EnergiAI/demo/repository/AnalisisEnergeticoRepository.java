package EnergiAI.demo.repository;

import EnergiAI.demo.model.AnalisisEnergetico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalisisEnergeticoRepository extends JpaRepository<AnalisisEnergetico, Long> {
}
