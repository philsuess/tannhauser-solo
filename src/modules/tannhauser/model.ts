import reichBackCardImage from './img/Solo_Reich_cards/Rbacks.jpg';
import evaImage from './img/eva.png';
import evaToken from './img/eva-token.png';
import frankenstahlImage from './img/frankenstahl.png';
import frankenstahlToken from './img/frankenstahl-token.png';
import ozoImage from './img/ozo.png';
import ozoToken from './img/ozo-token.png';
import schocktruppenImage from './img/schocktruppen.png';
import schocktruppenToken from './img/schocktruppen-token.png';
import stosstruppenImage from './img/stosstruppen.png';
import stosstruppenToken from './img/stosstruppen-token.png';
import heizingerImage from './img/heizinger.png';
import heizingerToken from './img/heizinger-token.png';
import yulaImage from './img/yula.png';
import yulaToken from './img/yula-token.png';

import unionBackCardImage from './img/Solo_Union_cards/UnionBack.jpg';
import alphaImage from './img/alpha.png';
import alphaToken from './img/alpha-token.png';
import barryImage from './img/brown.png';
import barryToken from './img/brown-token.png';
import deltaImage from './img/delta.png';
import deltaToken from './img/delta-token.png';
import edisonImage from './img/edison.png';
import edisonToken from './img/edison-token.png';
import hoaxImage from './img/hoax.png';
import hoaxToken from './img/hoax-token.png';
import macnealImage from './img/macneal.png';
import macnealToken from './img/macneal-token.png';
import ramirezImage from './img/ramirez.png';
import ramirezToken from './img/ramirez-token.png';
import houndImage from './img/Solo_Union_cards/Ramirez/HoundDog/HDtempRULES.jpg';
import houndToken from './img/hound_dog-token.png';
import houndBackImage from './img/Solo_Union_cards/Ramirez/HoundDog/HDBack.jpg';
import talaImage from './img/tala.png';
import talaToken from './img/tala-token.png';

import evaCard1 from './img/Solo_Reich_cards/Eva/Eva1.jpg';
import evaCard2 from './img/Solo_Reich_cards/Eva/Eva2.jpg';
import evaCard3 from './img/Solo_Reich_cards/Eva/Eva3.jpg';
import evaCard4 from './img/Solo_Reich_cards/Eva/Eva4.jpg';
import evaCard5 from './img/Solo_Reich_cards/Eva/Eva5.jpg';
import evaCard6 from './img/Solo_Reich_cards/Eva/Eva6.jpg';
import evaCard7 from './img/Solo_Reich_cards/Eva/Eva7.jpg';
import evaCard8 from './img/Solo_Reich_cards/Eva/Eva8.jpg';
import evaCard9 from './img/Solo_Reich_cards/Eva/Eva9.jpg';
import evaCard10 from './img/Solo_Reich_cards/Eva/Eva10.jpg';
import evaCard11 from './img/Solo_Reich_cards/Eva/Eva12.jpg';
import evaCard12 from './img/Solo_Reich_cards/Eva/Eva34.jpg';


import heizingerCard1 from './img/Solo_Reich_cards/vonHeizinger/Heizinger1.jpg';
import heizingerCard2 from './img/Solo_Reich_cards/vonHeizinger/Heizinger2.jpg';
import heizingerCard3 from './img/Solo_Reich_cards/vonHeizinger/Heizinger3.jpg';
import heizingerCard4 from './img/Solo_Reich_cards/vonHeizinger/Heizinger4.jpg';
import heizingerCard5 from './img/Solo_Reich_cards/vonHeizinger/Heizinger5.jpg';
import heizingerCard6 from './img/Solo_Reich_cards/vonHeizinger/Heizinger6.jpg';
import heizingerCard7 from './img/Solo_Reich_cards/vonHeizinger/Heizinger7.jpg';
import heizingerCard8 from './img/Solo_Reich_cards/vonHeizinger/Heizinger8.jpg';
import heizingerCard9 from './img/Solo_Reich_cards/vonHeizinger/Heizinger9.jpg';
import heizingerCard10 from './img/Solo_Reich_cards/vonHeizinger/Heizinger10.jpg';
import heizingerCard11 from './img/Solo_Reich_cards/vonHeizinger/Heizinger11.jpg';
import heizingerCard12 from './img/Solo_Reich_cards/vonHeizinger/Heizinger12.jpg';
import heizingerCard13 from './img/Solo_Reich_cards/vonHeizinger/Heizinger13.jpg';
import heizingerCard14 from './img/Solo_Reich_cards/vonHeizinger/Heizinger14.jpg';


export enum Faction {
  Reich,
  Union,
}

export const StringToFaction = (fac: string): Faction => {
  if (fac === "Reich") return Faction.Reich;
  return Faction.Union;
}

export interface CharacterData {
  name: string;
  image: string;
  faction: Faction;
  token_image: string;
  card_back_image: string;
  deck: string[];
}

export interface Characters {
  [key: string] : CharacterData;
}

const app_base_folder = "app/modules/tannhauser/";
const reich_cards_folder = app_base_folder + "img/Solo_Reich_cards/";
const union_cards_folder = app_base_folder + "img/Solo_Union_cards/";

export const AllCharacters: Characters = {
  Eva: {
    name: "Eva Krämer",
    faction: Faction.Reich,
    image: evaImage,
    token_image: evaToken,
    card_back_image: reichBackCardImage,
    deck: [
      evaCard1,
      evaCard2,
      evaCard3,
      evaCard4,
      evaCard5,
      evaCard6,
      evaCard7,
      evaCard8,
      evaCard9,
      evaCard10,
      evaCard11,
      evaCard12,
    ],
  },
  Frankenstahl: {
    name: "Frankenstahl",
    faction: Faction.Reich,
    image: frankenstahlImage,
    token_image: frankenstahlToken,
    card_back_image: reichBackCardImage,
    deck: [
      reich_cards_folder + "Frankenstahl/Frank1.jpg",
      reich_cards_folder + "Frankenstahl/Frank2.jpg",
      reich_cards_folder + "Frankenstahl/Frank3.jpg",
      reich_cards_folder + "Frankenstahl/Frank4.jpg",
      reich_cards_folder + "Frankenstahl/Frank5.jpg",
      reich_cards_folder + "Frankenstahl/Frank6.jpg",
      reich_cards_folder + "Frankenstahl/Frank7.jpg",
      reich_cards_folder + "Frankenstahl/Frank8.jpg",
      reich_cards_folder + "Frankenstahl/Frank9.jpg",
      reich_cards_folder + "Frankenstahl/Frank10.jpg",
    ],
  },
  Ozo: {
    name: "Karl 'Ozo' Zermann",
    faction: Faction.Reich,
    image: ozoImage,
    token_image: ozoToken,
    card_back_image: reichBackCardImage,
    deck: [
      reich_cards_folder + "Ozo/Ozo1.jpg",
      reich_cards_folder + "Ozo/Ozo2.jpg",
      reich_cards_folder + "Ozo/Ozo3.jpg",
      reich_cards_folder + "Ozo/Ozo4.jpg",
      reich_cards_folder + "Ozo/Ozo5.jpg",
      reich_cards_folder + "Ozo/Ozo6.jpg",
      reich_cards_folder + "Ozo/Ozo7.jpg",
      reich_cards_folder + "Ozo/Ozo8.jpg",
      reich_cards_folder + "Ozo/Ozo9.jpg",
      reich_cards_folder + "Ozo/Ozo10.jpg",
    ],
  },
  Schocktruppen: {
    name: "Schocktruppen",
    faction: Faction.Reich,
    image: schocktruppenImage,
    token_image: schocktruppenToken,
    card_back_image: reichBackCardImage,
    deck: [
      reich_cards_folder + "Schocktruppen/Schock1.JPG",
      reich_cards_folder + "Schocktruppen/Schock2.JPG",
      reich_cards_folder + "Schocktruppen/Schock3.JPG",
      reich_cards_folder + "Schocktruppen/Schock4.JPG",
      reich_cards_folder + "Schocktruppen/Schock5.JPG",
      reich_cards_folder + "Schocktruppen/Schock6.JPG",
      reich_cards_folder + "Schocktruppen/Schock7.JPG",
      reich_cards_folder + "Schocktruppen/Schock8.JPG",
      reich_cards_folder + "Schocktruppen/Schock9.JPG",
      reich_cards_folder + "Schocktruppen/Schock10.JPG",
    ],
  },
  Stosstruppen: {
    name: "Stosstruppen",
    faction: Faction.Reich,
    image: stosstruppenImage,
    token_image: stosstruppenToken,
    card_back_image: reichBackCardImage,
    deck: [
      reich_cards_folder + "Stosstruppen/Stoss1.jpg",
      reich_cards_folder + "Stosstruppen/Stoss2.jpg",
      reich_cards_folder + "Stosstruppen/Stoss3.jpg",
      reich_cards_folder + "Stosstruppen/Stoss5.jpg",
      reich_cards_folder + "Stosstruppen/Stoss6.jpg",
      reich_cards_folder + "Stosstruppen/Stoss7.jpg",
      reich_cards_folder + "Stosstruppen/Stoss8.jpg",
      reich_cards_folder + "Stosstruppen/Stoss9.jpg",
      reich_cards_folder + "Stosstruppen/Stoss10.jpg",
      reich_cards_folder + "Stosstruppen/Stoss11.jpg",
    ],
  },
  Heizinger: {
    name: "Hermann Von Heïzinger",
    faction: Faction.Reich,
    image: heizingerImage,
    token_image: heizingerToken,
    card_back_image: reichBackCardImage,
    deck:  [
      heizingerCard1,
      heizingerCard2,
      heizingerCard3,
      heizingerCard4,
      heizingerCard5,
      heizingerCard6,
      heizingerCard7,
      heizingerCard8,
      heizingerCard9,
      heizingerCard10,
      heizingerCard11,
      heizingerCard12,
      heizingerCard13,
      heizingerCard14,
],
  },
  Yula: {
    name: "Yula Korlïtz",
    faction: Faction.Reich,
    image: yulaImage,
    token_image: yulaToken,
    card_back_image: reichBackCardImage,
    deck: [
      reich_cards_folder + "Yula/Yula1a.jpg",
      reich_cards_folder + "Yula/Yula2.jpg",
      reich_cards_folder + "Yula/Yula3.jpg",
      reich_cards_folder + "Yula/Yula4.jpg",
      reich_cards_folder + "Yula/Yula5.jpg",
      reich_cards_folder + "Yula/Yula6.jpg",
      reich_cards_folder + "Yula/Yula7.jpg",
      reich_cards_folder + "Yula/Yula8.jpg",
      reich_cards_folder + "Yula/Yula9.jpg",
      reich_cards_folder + "Yula/Yula10.jpg",
      reich_cards_folder + "Yula/Yula111.jpg",
    ],
  },
  Alpha: {
    name: "Commando Alpha",
    faction: Faction.Union,
    image: alphaImage,
    token_image: alphaToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Alpha/Alpha1.jpg",
      union_cards_folder + "Alpha/Alpha2.jpg",
      union_cards_folder + "Alpha/Alpha3.jpg",
      union_cards_folder + "Alpha/Alpha4.jpg",
      union_cards_folder + "Alpha/Alpha5.jpg",
      union_cards_folder + "Alpha/Alpha6.jpg",
      union_cards_folder + "Alpha/Alpha7.jpg",
      union_cards_folder + "Alpha/Alpha8.jpg",
      union_cards_folder + "Alpha/Alpha9.jpg",
      union_cards_folder + "Alpha/Alpha10.jpg",
    ],
  },
  Barry: {
    name: "Barry Daniel Brown",
    faction: Faction.Union,
    image: barryImage,
    token_image: barryToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "BarryBrown/Barry1.jpg",
      union_cards_folder + "BarryBrown/Barry2.jpg",
      union_cards_folder + "BarryBrown/Barry3.jpg",
      union_cards_folder + "BarryBrown/Barry4.jpg",
      union_cards_folder + "BarryBrown/Barry5.jpg",
      union_cards_folder + "BarryBrown/Barry6.jpg",
      union_cards_folder + "BarryBrown/Barry7.jpg",
      union_cards_folder + "BarryBrown/Barry8.jpg",
      union_cards_folder + "BarryBrown/Barry9.jpg",
      union_cards_folder + "BarryBrown/Barry10.jpg",
    ],
  },
  Delta: {
    name: "Commando Delta",
    faction: Faction.Union,
    image: deltaImage,
    token_image: deltaToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Delta/delta1.jpg",
      union_cards_folder + "Delta/delta2.jpg",
      union_cards_folder + "Delta/delta3.jpg",
      union_cards_folder + "Delta/delta4.jpg",
      union_cards_folder + "Delta/delta5.jpg",
      union_cards_folder + "Delta/delta6.jpg",
      union_cards_folder + "Delta/delta7.jpg",
      union_cards_folder + "Delta/delta8.jpg",
      union_cards_folder + "Delta/delta9.jpg",
      union_cards_folder + "Delta/delta10.jpg",
    ],
  },
  Edison: {
    name: "James Edison",
    faction: Faction.Union,
    image: edisonImage,
    token_image: edisonToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Edison/Edison1.jpg",
      union_cards_folder + "Edison/Edison2.jpg",
      union_cards_folder + "Edison/Edison3.jpg",
      union_cards_folder + "Edison/Edison4.jpg",
      union_cards_folder + "Edison/Edison5.jpg",
      union_cards_folder + "Edison/Edison6.jpg",
      union_cards_folder + "Edison/Edison7.jpg",
      union_cards_folder + "Edison/Edison8.jpg",
      union_cards_folder + "Edison/Edison9.jpg",
      union_cards_folder + "Edison/Edison10.jpg",
    ],
  },
  Hoax: {
    name: "Caitlin 'Hoax' Lamsbury",
    faction: Faction.Union,
    image: hoaxImage,
    token_image: hoaxToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Hoax/hoax1.jpg",
      union_cards_folder + "Hoax/hoax2.jpg",
      union_cards_folder + "Hoax/hoax3.jpg",
      union_cards_folder + "Hoax/hoax4.jpg",
      union_cards_folder + "Hoax/hoax5.jpg",
      union_cards_folder + "Hoax/hoax6.jpg",
      union_cards_folder + "Hoax/hoax7.jpg",
      union_cards_folder + "Hoax/hoax8.jpg",
      union_cards_folder + "Hoax/hoax9.jpg",
      union_cards_folder + "Hoax/hoax10.jpg",
      union_cards_folder + "Hoax/hoax11.jpg",
      union_cards_folder + "Hoax/hoax12.jpg",
    ],
  },
  MacNeal: {
    name: "John MacNeal",
    faction: Faction.Union,
    image: macnealImage,
    token_image: macnealToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "MacNeal/MacNeal1.jpg",
      union_cards_folder + "MacNeal/MacNeal2.jpg",
      union_cards_folder + "MacNeal/MacNeal3.jpg",
      union_cards_folder + "MacNeal/MacNeal4.jpg",
      union_cards_folder + "MacNeal/MacNeal5.jpg",
      union_cards_folder + "MacNeal/MacNeal6.jpg",
      union_cards_folder + "MacNeal/MacNeal7.jpg",
      union_cards_folder + "MacNeal/MacNeal8.jpg",
      union_cards_folder + "MacNeal/MacNeal9.jpg",
      union_cards_folder + "MacNeal/MacNeal10.jpg",
      union_cards_folder + "MacNeal/MacNeal11.jpg",
      union_cards_folder + "MacNeal/MacNeal12.jpg",
    ],
  },
  Ramirez: {
    name: "Sergio Ramirez Delastillas",
    faction: Faction.Union,
    image: ramirezImage,
    token_image: ramirezToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Ramirez/ramirez1.jpg",
      union_cards_folder + "Ramirez/ramirez2.jpg",
      union_cards_folder + "Ramirez/ramirez3.jpg",
      union_cards_folder + "Ramirez/ramirez4.jpg",
      union_cards_folder + "Ramirez/ramirez5.jpg",
      union_cards_folder + "Ramirez/ramirez6.jpg",
      union_cards_folder + "Ramirez/ramirez7.jpg",
      union_cards_folder + "Ramirez/ramirez8.jpg",
      union_cards_folder + "Ramirez/ramirez9.jpg",
      union_cards_folder + "Ramirez/ramirez10.jpg",
      union_cards_folder + "Ramirez/ramirez11.jpg",
    ],
  },
  Hound: {
    name: "Hound Dog",
    faction: Faction.Union,
    image: houndImage,
    token_image: houndToken,
    card_back_image: houndBackImage,
    deck: [
      union_cards_folder + "Ramirez/HoundDog/HDtemp.jpg",
      union_cards_folder + "Ramirez/HoundDog/HDtemp2.jpg",
      union_cards_folder + "Ramirez/HoundDog/HDtemp3.jpg",
      union_cards_folder + "Ramirez/HoundDog/HDtemp4.jpg",
      union_cards_folder + "Ramirez/HoundDog/HDtemp5.jpg",
    ],
  },
  Tala: {
    name: "Tala Aponi",
    faction: Faction.Union,
    image: talaImage,
    token_image: talaToken,
    card_back_image: unionBackCardImage,
    deck: [
      union_cards_folder + "Tala/Tala1.jpg",
      union_cards_folder + "Tala/tala2.jpg",
      union_cards_folder + "Tala/tala3.jpg",
      union_cards_folder + "Tala/tala4.jpg",
      union_cards_folder + "Tala/tala5.jpg",
      union_cards_folder + "Tala/tala6.jpg",
      union_cards_folder + "Tala/tala7.jpg",
      union_cards_folder + "Tala/tala8.jpg",
      union_cards_folder + "Tala/tala9.jpg",
      union_cards_folder + "Tala/tala10.jpg",
    ],
  },
};
