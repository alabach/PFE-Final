package com.example.etl_csv.Repo;

import com.example.etl_csv.Model.Titre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitreRepo extends JpaRepository<Titre,Long> {

}
