"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("./parsers");
let termekek = new parsers_1.TermekParser("./raktar.csv").parse();
let tetelek = new parsers_1.TetelParser("./rendeles.csv").parse();
let rendelesek = new parsers_1.RendelesParser("./rendeles.csv").parse();
(0, parsers_1.joinTetelekWithTermekek)(tetelek, termekek);
(0, parsers_1.joinRendelesekWithTetelek)(rendelesek, tetelek);
let elvegzettRendelesek = [];
rendelesek.forEach((r) => {
    if (!r.tetelek)
        return;
    let hiba = false;
    r.tetelek.forEach((tet) => {
        if (tet.termek && tet.mennyiseg > tet.termek.keszlet) {
            hiba = true;
        }
    });
    if (!hiba) {
        r.tetelek.forEach((tet) => {
            if (!tet.termek)
                return;
            tet.termek.keszlet -= tet.mennyiseg;
        });
        elvegzettRendelesek.push(r);
    }
});
console.log(rendelesek);
//# sourceMappingURL=index.js.map