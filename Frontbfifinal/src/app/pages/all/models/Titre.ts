import { Echeance } from "../models/Echeance";

export class Titre {
    id_t:number;
    catégorie_produit:string;
    periodicite_Interet:string;
    valeur_nominale_unit:number;
    valeur_rembo_unit:number;
    periodicite_Amor:string;
    taux_intr:number;
    dure_Tension:number;
    date_jouissance:Date;
    date1ereT:Date;
    date_Fin:Date;
    modePayment:string;
    typeTaux:string;
    echeance : Echeance[];

}