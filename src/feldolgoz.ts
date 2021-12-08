import { Rendeles } from "types";

export function feldolgoz(rendelesek: Rendeles[]) {
  let levelekOutput = "";
  let beszerzesOutput = "";

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

  return { levelekOutput, beszerzesOutput };
}
