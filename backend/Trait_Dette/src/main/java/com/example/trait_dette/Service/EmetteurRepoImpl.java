package com.example.trait_dette.Service;

import com.example.trait_dette.Model.Emetteur;
import com.example.trait_dette.Model.Titre;
import com.example.trait_dette.Repo.EmetteurRepo;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class EmetteurRepoImpl {

    @Autowired
    private EmetteurRepo emetteurRepo;

    //get all
    public List<Emetteur> getAll(){
        return emetteurRepo.findAll();
    }

    // get by id
    public Emetteur getEmetteurbyId(long id_E){return emetteurRepo.findById(id_E).get();}
    // get ListTitrebyid
    public List<Titre> getListTitrebyId(long id_E){return emetteurRepo.findById(id_E).get().getTitre();}
    // add
    public Emetteur AddEmetteur(Emetteur E){return  emetteurRepo.save(E);}
    // update
    public Emetteur updateEmetteur (long id_E,Emetteur newE){
        if(emetteurRepo.findById(id_E).isPresent()){
            Emetteur EmetteurEx = emetteurRepo.findById(id_E).get();
            EmetteurEx.setNameEmetteur(newE.getNameEmetteur());
            EmetteurEx.setPaysEmetteur(newE.getPaysEmetteur());
            EmetteurEx.setSegmentE(newE.getSegmentE());
            EmetteurEx.setSecteurE(newE.getSecteurE());
            return emetteurRepo.save(EmetteurEx);
        }else return null ;
    }






    // delete
    public String deleteEmetteur(long id_E){
        if(emetteurRepo.existsById(id_E)){
            emetteurRepo.deleteById(id_E);
            return "success";
        }else  return "failed";
    }
}
