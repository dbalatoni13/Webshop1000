import {
  TermekParser,
  TetelParser,
  RendelesParser,
  joinTetelekWithTermekek,
  joinRendelesekWithTetelek,
} from "./parsers";
import { Rendeles } from "./types";

let termekek = new TermekParser("./raktar.csv").parse();
let tetelek = new TetelParser("./rendeles.csv").parse();
let rendelesek = new RendelesParser("./rendeles.csv").parse();

joinTetelekWithTermekek(tetelek, termekek);
joinRendelesekWithTetelek(rendelesek, tetelek);

let elvegzettRendelesek: Rendeles[] = [];

rendelesek.forEach((r) => {
  if (!r.tetelek) return;
  let hiba = false;

  r.tetelek.forEach((tet) => {
    if (tet.termek && tet.mennyiseg > tet.termek.keszlet) {
      hiba = true;
    }
  });

  if (!hiba) {
    r.tetelek.forEach((tet) => {
      if (!tet.termek) return;
      tet.termek.keszlet -= tet.mennyiseg;
    });
    elvegzettRendelesek.push(r);
  }
});

console.log(rendelesek);
