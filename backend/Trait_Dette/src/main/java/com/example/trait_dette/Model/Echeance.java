package com.example.trait_dette.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Echeance")
public class Echeance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id_e;
    private LocalDate Date_echance;
    private double MNT_ECH;
    private double Crdu_Ech;
    private double Crdu_FinPer;
    private double Interet;
    private double amortissement;
    private double Quantite_ech;


    @JsonIgnore
    @ManyToOne
    private Titre titre;
}