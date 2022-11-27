package com.example.trait_dette.Service;

import com.example.trait_dette.Model.Echeance;
import com.example.trait_dette.Model.Titre;
import com.example.trait_dette.Repo.EcheanceRepo;
import com.example.trait_dette.Repo.TitreRepo;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Service
public class TitreRepoImpl implements ITitreService {

    @Autowired
    private TitreRepo titreRepo;


    @Autowired
    private EcheanceRepo echeanceRepo;



    //get all
    public List<Titre> getAll(){
        return titreRepo.findAll();
    }

    // get by id
    public Titre getTitreById(long id_t){
        return titreRepo.findById(id_t).get();
    }

    // add
    public Titre AddTitre(Titre T){
        return titreRepo.save(T);
    }
    // update
    public Titre updateTitre(long id_t,Titre newTi){
        if(titreRepo.findById(id_t).isPresent()){
            Titre TitreEx = titreRepo.findById(id_t).get();
            TitreEx.setTaux_intr(newTi.getTaux_intr());
            TitreEx.setTypeTaux(newTi.getTypeTaux());
            TitreEx.setValeur_nominale_unit(newTi.getValeur_nominale_unit());
            TitreEx.setValeur_rembo_unit(newTi.getValeur_rembo_unit());
            TitreEx.setDate_jouissance(newTi.getDate_jouissance());
            TitreEx.setDate_Fin(newTi.getDate_Fin());
            TitreEx.setDate1ereT(newTi.getDate1ereT());
            TitreEx.setCatégorie_produit(newTi.getCatégorie_produit());
            TitreEx.setDure_Tension(newTi.getDure_Tension());
            TitreEx.setModePayment(newTi.getModePayment());
            TitreEx.setPeriodicite_Amor(newTi.getPeriodicite_Amor());
            TitreEx.setPeriodicite_Interet(newTi.getPeriodicite_Interet());

            return titreRepo.save(TitreEx);
        }else {
            return null;
        }
    }
    // delete
    public String deleteTitre(long id_t){
        if(titreRepo.existsById(id_t)){
            titreRepo.deleteById(id_t);
            return "success";
        }else
            return "failed";
    }


    @Transactional
    public List<Echeance> generateEcheancierAnAn(long id){

        String message = null ;
        List<Echeance> listeEchance = new ArrayList() ;

        Titre titre = titreRepo.findById(id).orElse(null) ;
        if ( titre != null){
            titre.getPeriodicite_Interet();

            if ( titre.getPeriodicite_Interet().toString().equals("ANNUELLE")&& titre.getPeriodicite_Amor().toString().equals("ANNUELLE")) {

                Echeance echancier1 = new Echeance();

//  Echeance echancier = new Echeance();


                LocalDate dateDebut = titre.getDate1ereT().plusDays(1);

                int yearDebut = dateDebut.getYear() ;

                LocalDate dateFin = titre.getDate_Fin();

                int yearFin = dateFin.getYear() ;

                int nombreEcheancier = yearFin-yearDebut ;

                double crduFinPeriodePremierEchancier = titre.getValeur_nominale_unit() ;



                echancier1.setDate_echance(dateDebut);
                echancier1.setCrdu_Ech(0);
                echancier1.setCrdu_FinPer(crduFinPeriodePremierEchancier);
                echancier1.setTitre(titre);
                echeanceRepo.save(echancier1);
                listeEchance.add(echancier1) ;

                double amortissementApresPremierEcheance = titre.getValeur_nominale_unit()/nombreEcheancier ;

                for (int i = 1 ; i<= nombreEcheancier ;i++){
                    Echeance echancier = new Echeance();
                    double crdu ;

                    double interet ;

                    double mEheance ;

                    double creduFinPeriode ;




                    // double amortissement = 0 ;


                    crdu = listeEchance.get(i-1).getCrdu_FinPer();


                    LocalDate	dateEcheance1 =  LocalDate.of(listeEchance.get(i-1).getDate_echance().getYear(),listeEchance.get(i-1).getDate_echance().getMonth(),listeEchance.get(i-1).getDate_echance().getDayOfMonth());

                    LocalDate dateEcheance = dateEcheance1.plusYears(1);


                    interet= crdu * titre.getTaux_intr() ;
                    interet =Math.round(interet) ;
                    mEheance=amortissementApresPremierEcheance+interet ;
                    mEheance = Math.round(mEheance) ;

                    creduFinPeriode =crdu-amortissementApresPremierEcheance ;


                    echancier.setCrdu_Ech(crdu);
                    echancier.setInteret(interet);
                    echancier.setMNT_ECH(mEheance);
                    echancier.setCrdu_FinPer(creduFinPeriode);
                    echancier.setAmortissement(amortissementApresPremierEcheance);
                    echancier.setDate_echance(dateEcheance);

                    echancier.setTitre(titre);

                    echeanceRepo.save(echancier);

                    listeEchance.add(echancier) ;





                } // fin boucle for



            } // fin if test annuelle annuelle

        }  //fin test if titre is null !!
        else {
            message = "titre inexistant !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! inserer un id d'un titre existant !!!!!!!!!!!!!!!" ;
            System.out.println(message);
        }
        return listeEchance ;


    }

}

