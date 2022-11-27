package com.example.etl_csv.Service;

import com.example.etl_csv.Model.Emetteur;
import com.example.etl_csv.Model.Titre;
import com.example.etl_csv.enums.*;
import org.apache.commons.csv.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CSVHelper {








    public static String TYPE = "text/csv";
    static String[] HEADERs = { "Emetteur","Pays emetteur","Code Emission","Taux interets facial",
            "Type Taux","Marge sur taux variable","Valeur nominale unitaire","Valeur de remboursement unitaire",
            "Date 1er tombee","Date fin","Date jouissance","Periode de differee en mois","Periodicite Interets","Periodicite Amortissement",
            "Mode paiement" ,"Base calcul nombre du jour","Mode remboursement","Secteur Emetteur",
            "Categorie instrument de dettes","Duree de detention","Segment Emetteur","Entite"};

    public static boolean hasCSVFormat(MultipartFile file) {
        if (TYPE.equals(file.getContentType())
                || file.getContentType().equals("application/vnd.ms-excel")) {
            return true;
        }

        return false;
    }





    // upload titre
    public List<Titre> csvTitre(InputStream is) {





        List<Titre> products = new ArrayList<Titre>();


        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.newFormat(';').withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {


            List<Titre> procList = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
            //CSVFormat csvFormat = CSVFormat.newFormat(';');

            // CSVFormat csvFormat = CSVFormat.DEFAULT;
            for (CSVRecord csvRecord : csvRecords) {
                if(csvRecord.size() >= csvParser.getHeaderMap().size()){



                    Titre developerTutorial = new Titre() ;

                    //	 developerTutorial.setId(5L);
                    if (csvRecord.get("Taux interets facial") != null){
                        developerTutorial.setTaux_intr(Float.parseFloat(csvRecord.get("Taux interets facial")));


                    }

                    if (csvRecord.get("Type Taux") != null){


                        if ( csvRecord.get("Type Taux").equals(TypeT.Fixe.toString())){
                            developerTutorial.setTypeTaux(TypeT.Fixe);

                        }else {

                            developerTutorial.setTypeTaux(TypeT.Variable);
                        }


                    }



                    if (csvRecord.get("Valeur nominale unitaire") != null){
                        developerTutorial.setValeur_nominale_unit(Double.parseDouble(csvRecord.get("Valeur nominale unitaire")));


                    }

                    if (csvRecord.get("Valeur de remboursement unitaire") != null){
                        developerTutorial.setValeur_rembo_unit(Double.parseDouble(csvRecord.get("Valeur de remboursement unitaire")));


                    }


                    if (csvRecord.get("Date 1er tombee") != null){


                        // DateFormat sourceFormat = new SimpleDateFormat("dd/MM/yyyy");
                        DateTimeFormatter sourceFormat = DateTimeFormatter.ofPattern( "dd/MM/uuuu" );
                        String dateAsString = csvRecord.get("Date 1er tombee");

                        LocalDate date1 = LocalDate.parse(dateAsString,sourceFormat);
                        LocalDate date = date1.plusDays(1);


                        developerTutorial.setDate1ereT(date);
                    }


                    if (csvRecord.get("Date fin") != null){
//

                        //  DateFormat sourceFormat = new SimpleDateFormat("dd/MM/yyyy");
                        DateTimeFormatter sourceFormat = DateTimeFormatter.ofPattern( "dd/MM/uuuu" );
                        String dateAsString = csvRecord.get("Date fin");

                        LocalDate date1 = LocalDate.parse(dateAsString,sourceFormat);
                        LocalDate date = date1.plusDays(1);
                        developerTutorial.setDate_Fin(date);

                    }

                    if (csvRecord.get("Date jouissance") != null){


                        //  DateFormat sourceFormat = new SimpleDateFormat("dd/MM/yyyy");
                        DateTimeFormatter sourceFormat = DateTimeFormatter.ofPattern( "dd/MM/uuuu" );
                        String dateAsString = csvRecord.get("Date jouissance");

                        LocalDate date1 = LocalDate.parse(dateAsString,sourceFormat);
                        LocalDate date = date1.plusDays(1);
                        developerTutorial.setDate_jouissance(date);


                    }




                    if (csvRecord.get("Periodicite Interets") != null){



                        if ( csvRecord.get("Periodicite Interets").equals(Period.ANNUELLE.toString())){
                            developerTutorial.setPeriodicite_Interet(Period.ANNUELLE);

                        }else if (csvRecord.get("Periodicite Interets").equals(Period.SEMESTRIELLE.toString())){

                            developerTutorial.setPeriodicite_Interet(Period.SEMESTRIELLE);
                        }


                    }


                    if (csvRecord.get("Periodicite Amortissement") != null){



                        if ( csvRecord.get("Periodicite Amortissement").equals(Period.ANNUELLE.toString())){
                            developerTutorial.setPeriodicite_Amor(Period.ANNUELLE);

                        }else if (csvRecord.get("Periodicite Amortissement").equals(Period.SEMESTRIELLE.toString())) {

                            developerTutorial.setPeriodicite_Amor(Period.SEMESTRIELLE);
                        }else {


                            developerTutorial.setPeriodicite_Amor(Period.ATERME);

                        }


                    }



                    if (csvRecord.get("Mode paiement") != null){



                        if ( csvRecord.get("Mode paiement").equals(ModePaym.POSTCOMPTE.toString())){

                            developerTutorial.setModePayment(ModePaym.POSTCOMPTE);

                        }else if (csvRecord.get("Mode paiement").equals(ModePaym.PRECOMPTE.toString())){

                            developerTutorial.setModePayment(ModePaym.PRECOMPTE);
                        }


                    }



                    if (csvRecord.get("Categorie instrument de dettes") != null){



                        if ( csvRecord.get("Categorie instrument de dettes").equals("OBLIGATION ORDINAIRE")){

                            developerTutorial.setCatégorie_produit(Categorie_P.OBLIGATION_ORDINAIRE);

                        }else if (csvRecord.get("Categorie instrument de dettes").equals(Categorie_P.OBLIGATION_CONVERTIBLE.toString())){

                            developerTutorial.setCatégorie_produit(Categorie_P.OBLIGATION_CONVERTIBLE);
                        }

                        else if (csvRecord.get("Categorie instrument de dettes").equals("BON DE TRESOR")){

                            developerTutorial.setCatégorie_produit(Categorie_P.BON_DE_TRESOR);
                        }


                    }



                    if (csvRecord.get("Duree de detention") != null){



                        if ( csvRecord.get("Duree de detention").equals("LONG TERME")){

                            developerTutorial.setDure_Tension(TypeDuree.LONGTERME);

                        }else if (csvRecord.get("Duree de detention").equals("COURT TERME")){

                            developerTutorial.setDure_Tension(TypeDuree.COURTTERME);
                        }




                    }
















                    procList.add(developerTutorial);




                }

            }
//	    ed eli zidtha



            return procList;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }



    //upload emetteur
    public   List<Emetteur> csvEmetteur(InputStream is) {





        List<Emetteur> products = new ArrayList<Emetteur>();


        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.newFormat(';').withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {


            List<Emetteur> procList = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();
//     CSVFormat csvFormat = CSVFormat.newFormat(';');


            for (CSVRecord csvRecord : csvRecords) {
                if(csvRecord.size() >= csvParser.getHeaderMap().size()){
//   		  Priorite priorite= prioriteRepository.findById( (long) 1).orElse(null) ;










                    Emetteur developerTutorial = new Emetteur() ;

                    //	 developerTutorial.setId(5L);
                    if (csvRecord.get("Emetteur") != null){
                        developerTutorial.setNameEmetteur(csvRecord.get("Emetteur"));


                    }


                    if (csvRecord.get("Pays emetteur") != null){
                        developerTutorial.setPaysEmetteur(csvRecord.get("Pays emetteur"));


                    }



                    if (csvRecord.get("Mode remboursement") != null){



                        if ( csvRecord.get("Mode remboursement").equals("ANNUITE VARIABLE")){
                            developerTutorial.setModeRembE(ModeR.Annuite_variable);

                        }else if ( csvRecord.get("Mode remboursement").equals("ANNUITE CONSTANTE")){

                            developerTutorial.setModeRembE(ModeR.annuite_constante);


                        }else if ( csvRecord.get("Mode remboursement").equals("A TERME")){

                            developerTutorial.setModeRembE(ModeR.A_Terme);
                        }

                    }




                    if (csvRecord.get("Secteur Emetteur") != null){



                        if ( csvRecord.get("Secteur Emetteur").equals(Secteur.PUBLIQUE.toString())){
                            developerTutorial.setSecteurE(Secteur.PUBLIQUE);


                        }else if ( csvRecord.get("Secteur Emetteur").equals(Secteur.PRIVE.toString())){

                            developerTutorial.setSecteurE(Secteur.PRIVE);
                        }


                    }



                    if (csvRecord.get("Segment Emetteur") != null){



                        if ( csvRecord.get("Segment Emetteur").equals(SegmentE.BANQUE.toString())){
                            developerTutorial.setSegmentE(SegmentE.BANQUE);


                        }else if ( csvRecord.get("Segment Emetteur").equals(SegmentE.ENTREPRISE_A.toString())){

                            developerTutorial.setSegmentE(SegmentE.ENTREPRISE_A);
                        }

                        else if ( csvRecord.get("Segment Emetteur").equals(SegmentE.ENTREPRISE_BTP.toString())){

                            developerTutorial.setSegmentE(SegmentE.ENTREPRISE_BTP);
                        }

                        else  if ( csvRecord.get("Segment Emetteur").equals(SegmentE.ETAT.toString())){

                            developerTutorial.setSegmentE(SegmentE.ETAT);
                        }

                        else if ( csvRecord.get("Segment Emetteur").equals(SegmentE.ENTREPRISE.toString())){

                            developerTutorial.setSegmentE(SegmentE.ENTREPRISE);
                        }


                    }

                    procList.add(developerTutorial);

                }

            }
//   ed eli zidtha



            return procList;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }








    //titre
    public static ByteArrayInputStream titreToCSV(List<Titre> procList) {
        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            for (Titre developerTutorial : procList) {


                List<? extends Object> data = Arrays.asList(
//	              String.valueOf(developerTutorial.getName()),
                        developerTutorial.getTaux_intr(),
                        developerTutorial.getTypeTaux(),
                        developerTutorial.getValeur_nominale_unit(),
                        developerTutorial.getValeur_rembo_unit(),
                        developerTutorial.getDate1ereT() ,
                        developerTutorial.getDate_Fin(),
                        developerTutorial.getDate_jouissance(),
                        developerTutorial.getPeriodicite_Interet(),


                        developerTutorial.getPeriodicite_Amor(),
                        developerTutorial.getModePayment() ,
                        developerTutorial.getCatégorie_produit(),
                        developerTutorial.getDure_Tension()




                );



                csvPrinter.printRecord(data);

            }

            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import titres to CSV file: " + e.getMessage());
        }
    }



    //emetteur

    public static ByteArrayInputStream emetteurToCSV(List<Emetteur> procList) {
        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            for (Emetteur developerTutorial : procList) {
                List<? extends Object> data = Arrays.asList(
//	              String.valueOf(developerTutorial.getName()),
                        developerTutorial.getNameEmetteur(),
                        developerTutorial.getPaysEmetteur(),
                        developerTutorial.getModeRembE(),
                        developerTutorial.getSecteurE(),
                        developerTutorial.getSegmentE()





                );



                csvPrinter.printRecord(data);


            }

            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import emetteurs to CSV file: " + e.getMessage());
        }
    }



}

