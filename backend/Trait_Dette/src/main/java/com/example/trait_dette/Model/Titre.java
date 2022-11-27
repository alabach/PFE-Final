package com.example.trait_dette.Model;

import com.example.trait_dette.enums.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
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
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "titre")
    private List<Echeance> Echeance;



    @JsonIgnore
    @ManyToOne
    private Emetteur emetteur;






}
