package com.example.trait_dette.Repo;


import com.example.trait_dette.Model.Titre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TitreRepo extends JpaRepository<Titre,Long> {


}
