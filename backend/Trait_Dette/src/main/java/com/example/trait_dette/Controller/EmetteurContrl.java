package com.example.trait_dette.Controller;

import com.example.trait_dette.Model.Emetteur;
import com.example.trait_dette.Model.Titre;
import com.example.trait_dette.Service.EmetteurRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/emetteur")
public class EmetteurContrl {
    @Autowired
    private EmetteurRepoImpl emetteurRepo ;



    //add Emetteur
    @PostMapping
    @ResponseStatus
    public ResponseEntity<Emetteur> addEmetteur(@RequestBody Emetteur E ){
        return new ResponseEntity<>(emetteurRepo.AddEmetteur(E), HttpStatus.CREATED);
    }

    //get all
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Emetteur>> getAllemetteur(){
        return new ResponseEntity<>(emetteurRepo.getAll(),HttpStatus.OK);
    }

    @GetMapping(value = "/list/{id_E}")
    @ResponseStatus
    public ResponseEntity<List<Titre>> getListTitrebyId(@PathVariable long id_E){
        return new ResponseEntity<>(emetteurRepo.getListTitrebyId(id_E),HttpStatus.OK);
    }

    //get by Id
    @GetMapping(value = "/{id_E}")
    @ResponseStatus
    public ResponseEntity<Emetteur> getEmetteurById (@PathVariable long id_E){
        return new ResponseEntity<>(emetteurRepo.getEmetteurbyId(id_E),HttpStatus.OK);}

    //update Emetteur
    @PutMapping(value = "/{id_E}")
    @ResponseStatus
    public ResponseEntity<Emetteur> updateEmetteur(@PathVariable long id_E,@RequestBody Emetteur E){
        return new ResponseEntity<>(emetteurRepo.updateEmetteur(id_E, E),HttpStatus.OK);
    }

    // delete Titre
    @DeleteMapping(value = "/{id_E}")
    @ResponseStatus
    public ResponseEntity<String> deleteEmetteur (@PathVariable long id_E){
        return  new ResponseEntity<>(emetteurRepo.deleteEmetteur(id_E),HttpStatus.OK);
    }
}

