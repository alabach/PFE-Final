package com.example.etl_csv.Service;

import com.example.etl_csv.Model.Emetteur;
import com.example.etl_csv.Model.Titre;
import com.example.etl_csv.Repo.EmetteurRepo;
import com.example.etl_csv.Repo.TitreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service

public class CsvService {



    @Autowired
    EmetteurRepo emetteurRepo;

    @Autowired
    TitreRepo titreRep;





    @Autowired
    CSVHelper csv ;




    //upload titre
    public void save(MultipartFile file) {
        try {
            List<Titre> tutorials = csv.csvTitre(file.getInputStream());
            titreRep.saveAll(tutorials);
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data titres: " + e.getMessage());
        }
    }

    //upload emetteur

    public void save2(MultipartFile file) {
        try {
            List<Emetteur> tutorials = csv.csvEmetteur(file.getInputStream());
            emetteurRepo.saveAll(tutorials);
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }






    //  public ByteArrayInputStream load() {
//	    List<Proc> tutorials = repository.findAll();
    //
//	    ByteArrayInputStream in = CSVHelper.tutorialsToCSV(tutorials);
//	    return in;
    //  }
    //
    //  public List<Proc> getAllTutorials() {
//	    return repository.findAll();
    //  }


}

