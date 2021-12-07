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
exports.joinRendelesekWithTetelek = exports.joinTetelekWithTermekek = exports.RendelesParser = exports.TetelParser = exports.TermekParser = void 0;
const fs = __importStar(require("fs"));
class Parser {
    constructor(filename) {
        this.filename = filename;
    }
    getRaw() {
        return fs.readFileSync(this.filename, { encoding: "utf-8" }).split("\r\n");
    }
}
class TermekParser extends Parser {
    constructor(filename) {
        super(filename);
    }
    parse() {
        const raw = super.getRaw();
        const termekek = [];
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
exports.TermekParser = TermekParser;
class TetelParser extends Parser {
    constructor(filename) {
        super(filename);
    }
    parse() {
        const raw = super.getRaw();
        const tetelek = [];
        raw.forEach((l) => {
            const data = l.split(";");
            if (data[0] != "T")
                return;
            tetelek.push({
                rendelesSzam: parseInt(data[1]),
                termekKod: data[2],
                mennyiseg: parseInt(data[3]),
            });
        });
        return tetelek;
    }
}
exports.TetelParser = TetelParser;
class RendelesParser extends Parser {
    constructor(filename) {
        super(filename);
    }
    parse() {
        const raw = super.getRaw();
        const rendelesek = [];
        raw.forEach((l) => {
            const data = l.split(";");
            if (data[0] != "M")
                return;
            rendelesek.push({
                datum: new Date(data[1]),
                szam: parseInt(data[2]),
                email: data[3],
            });
        });
        return rendelesek;
    }
}
exports.RendelesParser = RendelesParser;
function joinTetelekWithTermekek(tetelek, termekek) {
    tetelek.forEach((tet) => {
        tet.termek = termekek.find((ter) => (ter.kod === tet.termekKod));
        console.log(termekek.find((ter) => (ter.kod === tet.termekKod)));
    });
}
exports.joinTetelekWithTermekek = joinTetelekWithTermekek;
function joinRendelesekWithTetelek(rendelesek, tetelek) {
    rendelesek.forEach((r) => {
        const tetelekSub = tetelek.filter((tet) => tet.rendelesSzam === r.szam);
        r.tetelek = tetelekSub;
    });
}
exports.joinRendelesekWithTetelek = joinRendelesekWithTetelek;
//# sourceMappingURL=parsers.js.map