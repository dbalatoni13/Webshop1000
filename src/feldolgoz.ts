import { Rendeles, Beszerzes } from "types";

export function feldolgoz(rendelesek: Rendeles[]) {
  let levelekOutput = "";
  let beszerzesOutput = "";
  const beszerzesek: Beszerzes[] = [];

  rendelesek.forEach((r) => {
    if (!r.tetelek) return;
    let hiba = false;

    r.tetelek.forEach((tet) => {
      if (!tet.termek || tet.mennyiseg > tet.termek.keszlet) {
        hiba = true;
        if (!tet.termek) return;

        const beszerzes = beszerzesek.find((b) => b.kod == tet.termekKod);
        if (beszerzes) {
          beszerzes.mennyiseg += tet.mennyiseg;
        } else {
          beszerzesek.push({
            kod: tet.termekKod,
            mennyiseg: tet.mennyiseg - tet.termek.keszlet,
          });
        }
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

  beszerzesek.forEach((b) => {
    beszerzesOutput += `${b.kod};${b.mennyiseg}\r\n`;
  });

  return { levelekOutput, beszerzesOutput };
}
