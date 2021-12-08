import * as fs from "fs";
import { Rendeles, Termek, Tetel } from "../src/types";

class Parser {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  getRaw() {
    return fs.readFileSync(this.filename, { encoding: "utf-8" }).split("\r\n");
  }
}

export class TermekParser extends Parser {
  constructor(filename: string) {
    super(filename);
  }

  parse() {
    const raw = super.getRaw();
    const termekek: Termek[] = [];
    raw.forEach((l) => {
      const data = l.split(";");
      termekek.push({
        kod: data[0],
        nev: data[1],
        ar: parseInt(data[2]),
        keszlet: parseInt(data[3]),
      });
    });
    return termekek;
  }
}

export class TetelParser extends Parser {
  constructor(filename: string) {
    super(filename);
  }

  parse() {
    const raw = super.getRaw();
    const tetelek: Tetel[] = [];
    raw.forEach((l) => {
      const data = l.split(";");
      if (data[0] != "T") return;
      tetelek.push({
        rendelesSzam: parseInt(data[1]),
        termekKod: data[2],
        mennyiseg: parseInt(data[3]),
      });
    });
    return tetelek;
  }
}

export class RendelesParser extends Parser {
  constructor(filename: string) {
    super(filename);
  }

  parse() {
    const raw = super.getRaw();
    const rendelesek: Rendeles[] = [];
    raw.forEach((l) => {
      const data = l.split(";");
      if (data[0] != "M") return;
      rendelesek.push({
        datum: new Date(data[1]),
        szam: parseInt(data[2]),
        email: data[3],
      });
    });
    return rendelesek;
  }
}

export function joinTetelekWithTermekek(tetelek: Tetel[], termekek: Termek[]) {
  tetelek.forEach((tet) => {
    tet.termek = termekek.find((ter) => ter.kod === tet.termekKod);
    //console.log(termekek.find((ter) => ter.kod === tet.termekKod));
  });
}

export function joinRendelesekWithTetelek(
  rendelesek: Rendeles[],
  tetelek: Tetel[]
) {
  rendelesek.forEach((r) => {
    const tetelekSub = tetelek.filter((tet) => tet.rendelesSzam === r.szam);
    r.tetelek = tetelekSub;
  });
}
