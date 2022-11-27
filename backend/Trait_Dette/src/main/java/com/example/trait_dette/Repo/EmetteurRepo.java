package com.example.trait_dette.Repo;

import com.example.trait_dette.Model.Emetteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmetteurRepo extends JpaRepository<Emetteur, Long> {

}
