import { feldolgoz } from "./feldolgoz";
import {
  TermekParser,
  TetelParser,
  RendelesParser,
  joinTetelekWithTermekek,
  joinRendelesekWithTetelek,
} from "./parsers";
import * as fs from "fs";

const termekek = new TermekParser("./raktar.csv").parse();
const tetelek = new TetelParser("./rendeles.csv").parse();
const rendelesek = new RendelesParser("./rendeles.csv").parse();

joinTetelekWithTermekek(tetelek, termekek);
joinRendelesekWithTetelek(rendelesek, tetelek);

const { levelekOutput, beszerzesOutput } = feldolgoz(rendelesek);

fs.writeFileSync("./levelek.csv", levelekOutput);
fs.writeFileSync("./beszerzes.csv", beszerzesOutput);
