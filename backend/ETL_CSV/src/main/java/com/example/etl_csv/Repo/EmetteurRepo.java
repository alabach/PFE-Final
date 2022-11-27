package com.example.etl_csv.Repo;

import com.example.etl_csv.Model.Emetteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmetteurRepo extends JpaRepository<Emetteur, Long> {

}

