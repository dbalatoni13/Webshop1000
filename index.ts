import {
  TermekParser,
  TetelParser,
  RendelesParser,
  joinTetelekWithTermekek,
  joinRendelesekWithTetelek,
} from "./parsers";
import { Rendeles } from "./types";

const termekParser = new TermekParser("./raktar.csv");
const tetelParser = new TetelParser("./rendeles.csv");
const rendelesParser = new RendelesParser("./rendeles.csv");

let termekek = termekParser.parse();
let tetelek = tetelParser.parse();
let rendelesek = rendelesParser.parse();

tetelek = joinTetelekWithTermekek(tetelek, termekek);
rendelesek = joinRendelesekWithTetelek(rendelesek, tetelek);

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

console.log(tetelek);
