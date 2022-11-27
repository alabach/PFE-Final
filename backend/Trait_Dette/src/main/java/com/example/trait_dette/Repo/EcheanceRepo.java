package com.example.trait_dette.Repo;

import com.example.trait_dette.Model.Echeance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EcheanceRepo extends JpaRepository<Echeance, Long> {

}
