export type Rendeles = {
  szam: number;
  datum: Date;
  email: string;
  tetelek?: Tetel[];
};

export type Tetel = {
  rendelesSzam: number;
  termekKod: string;
  termek?: Termek;
  mennyiseg: number;
};

export type Termek = {
  kod: string;
  nev: string;
  ar: number;
  keszlet: number;
};

export type Beszerzes = {
  kod: string;
  mennyiseg: number;
};
