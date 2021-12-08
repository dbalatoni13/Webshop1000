"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("./parsers");
const fs = __importStar(require("fs"));
let termekek = new parsers_1.TermekParser("./raktar.csv").parse();
let tetelek = new parsers_1.TetelParser("./rendeles.csv").parse();
let rendelesek = new parsers_1.RendelesParser("./rendeles.csv").parse();
(0, parsers_1.joinTetelekWithTermekek)(tetelek, termekek);
(0, parsers_1.joinRendelesekWithTetelek)(rendelesek, tetelek);
let levelekOutput = "";
rendelesek.forEach((r) => {
    if (!r.tetelek)
        return;
    let hiba = false;
    r.tetelek.forEach((tet) => {
        if (!tet.termek || tet.mennyiseg > tet.termek.keszlet) {
            hiba = true;
        }
    });
    if (!hiba) {
        let osszar = 0;
        r.tetelek.forEach((tet) => {
            if (!tet.termek)
                return;
            tet.termek.keszlet -= tet.mennyiseg;
            osszar += tet.mennyiseg * tet.termek.ar;
        });
        levelekOutput += `${r.email};A rendelését két napon belül szállítjuk. A rendelés értéke: ${osszar} Ft\r\n`;
    }
    else {
        levelekOutput += `${r.email};A rendelése függő állapotba került. Hamarosan értesítjük a szállítás időpontjáról.\r\n`;
    }
});
fs.writeFileSync("./levelek.csv", levelekOutput);
//# sourceMappingURL=index.js.map