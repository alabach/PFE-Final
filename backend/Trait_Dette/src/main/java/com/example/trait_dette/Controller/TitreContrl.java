package com.example.trait_dette.Controller;

import com.example.trait_dette.Model.Echeance;
import com.example.trait_dette.Model.Titre;
import com.example.trait_dette.Service.ITitreService;
import com.example.trait_dette.Service.TitreRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
@RequestMapping(value = "/api/titre")
public class TitreContrl {
    @Autowired
    private TitreRepoImpl titreRepoImpl;



    private ITitreService titreService;



    ////add titre
    @PostMapping
    @ResponseStatus
    public ResponseEntity<Titre> addTitre(@RequestBody Titre T){
        return new ResponseEntity<>(titreRepoImpl.AddTitre(T), HttpStatus.CREATED);
    }
    //get all
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Titre>> getAlltitre(){
        return new ResponseEntity<>(titreRepoImpl.getAll(),HttpStatus.OK);
    }
    //get by Id
    @GetMapping(value = "/{id_t}")
    @ResponseStatus
    public ResponseEntity<Titre> getTitreByid (@PathVariable long id_t){
        return  new ResponseEntity<>(titreRepoImpl.getTitreById(id_t),HttpStatus.OK);
    }
    //update Titre
    @PutMapping(value = "/{id_t}")
    @ResponseStatus
    public ResponseEntity<Titre> updatetitre(@PathVariable long id_t,@RequestBody Titre T){
        return new ResponseEntity<>(titreRepoImpl.updateTitre(id_t, T),HttpStatus.OK);
    }
    // delete Titre
    @DeleteMapping(value = "/{id_t}")
    @ResponseStatus
    public ResponseEntity<String> deleteTitre(@PathVariable long id_t){
        return new ResponseEntity<>(titreRepoImpl.deleteTitre(id_t),HttpStatus.OK);
    }





    //localhost:8081/api/titre/generateEcheancierAnAn/{titre-id}
    @GetMapping("/generateEcheancierAnAn/{titre-id}")
    @ResponseBody
    public List<Echeance>  generateEcheancierAnAn(@PathVariable("titre-id") long id) {
        List<Echeance>  listEcheancier = titreService.generateEcheancierAnAn(id);
        return listEcheancier ;
    }



}
