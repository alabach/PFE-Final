package com.example.trait_dette.Service;

import com.example.trait_dette.Model.Echeance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITitreService {
     List<Echeance> generateEcheancierAnAn(long id) ;
}
