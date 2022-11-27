package com.example.trait_dette.Model;

import com.example.trait_dette.enums.ModeR;
import com.example.trait_dette.enums.Secteur;
import com.example.trait_dette.enums.SegmentE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "emetteur")
public class Emetteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_E;

    @Enumerated(EnumType.STRING)
    private Secteur SecteurE;

    @Enumerated(EnumType.STRING)
    private SegmentE SegmentE;

    @Enumerated(EnumType.STRING)
    private ModeR ModeRembE;

    private String nameEmetteur;

    private String paysEmetteur;



    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "emetteur")
    private List<Titre> Titre;
}