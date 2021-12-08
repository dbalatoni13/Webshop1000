import {
  TermekParser,
  TetelParser,
  RendelesParser,
  joinTetelekWithTermekek,
  joinRendelesekWithTetelek,
} from "./parsers";
import * as fs from "fs";

let termekek = new TermekParser("./raktar.csv").parse();
let tetelek = new TetelParser("./rendeles.csv").parse();
let rendelesek = new RendelesParser("./rendeles.csv").parse();

joinTetelekWithTermekek(tetelek, termekek);
joinRendelesekWithTetelek(rendelesek, tetelek);

let levelekOutput = "";

rendelesek.forEach((r) => {
  if (!r.tetelek) return;
  let hiba = false;

  r.tetelek.forEach((tet) => {
    if (!tet.termek || tet.mennyiseg > tet.termek.keszlet) {
      hiba = true;
    }
  });

  if (!hiba) {
    let osszar = 0;
    r.tetelek.forEach((tet) => {
      if (!tet.termek) return;
      tet.termek.keszlet -= tet.mennyiseg;
      osszar += tet.mennyiseg * tet.termek.ar;
    });

    levelekOutput += `${r.email};A rendelését két napon belül szállítjuk. A rendelés értéke: ${osszar} Ft\r\n`;
  } else {
    levelekOutput += `${r.email};A rendelése függő állapotba került. Hamarosan értesítjük a szállítás időpontjáról.\r\n`;
  }
});

fs.writeFileSync("./levelek.csv", levelekOutput);
