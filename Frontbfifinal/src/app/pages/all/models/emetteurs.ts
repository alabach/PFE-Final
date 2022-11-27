import { Titre } from "../models/Titre";

export class Emetteur {
    id_E: number;
    nameEmetteur : string;
    paysEmetteur :string;
    segmentE:string;
    modeRembE:string;
    secteurE:string;
    titre : Titre [];

}