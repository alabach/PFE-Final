package com.example.etl_csv.Model;

import com.example.etl_csv.enums.Categorie_P;
import com.example.etl_csv.enums.ModePaym;
import com.example.etl_csv.enums.TypeDuree;
import com.example.etl_csv.enums.TypeT;
import com.example.etl_csv.enums.Period;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Titre")
public class Titre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_t;

    private float Taux_intr;

    @Enumerated (EnumType.STRING)
    private TypeT TypeTaux;

    private double Valeur_nominale_unit;

    private double Valeur_rembo_unit;


    private LocalDate Date_jouissance;


    private LocalDate Date_Fin;


    private LocalDate Date1ereT;

    @Enumerated (EnumType.STRING)
    private Categorie_P Catégorie_produit;

    @Enumerated (EnumType.STRING)
    private TypeDuree Dure_Tension;

    @Enumerated (EnumType.STRING)
    private ModePaym ModePayment;

    @Enumerated(EnumType.STRING)
    private Period Periodicite_Amor;


    @Enumerated(EnumType.STRING)
    private Period Periodicite_Interet;









    @JsonIgnore
    @ManyToOne
    private Emetteur emetteur;
}
