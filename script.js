window.onload = () => {
  "use strict";
  if ("serviceWorker" in navigator){
      navigator.serviceWorker.register("/sw.js");
  }
};

const atualjogador = document.querySelector(".atualjogador");

let selecionado;
let jogador = "X";

let posicoes = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function inicio() {
  selecionado = [];

  atualjogador.innerHTML = `VEZ DE: ${jogador}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", novoMovimento);
  });
}

inicio();

function novoMovimento(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = jogador;
  e.target.removeEventListener("click", novoMovimento);
  selecionado[index] = jogador;

  setTimeout(() => {
    check();
  }, [100]);

  jogador = jogador === "X" ? "O" : "X";
  atualjogador.innerHTML = `VEZ DE: ${jogador}`;
}

function check() {
  let jogadorMovimenta = jogador === "X" ? "O" : "X";

  const items = selecionado
    .map((item, i) => [item, i])
    .filter((item) => item[0] === jogadorMovimenta)
    .map((item) => item[1]);

  for (pos of posicoes) {
    if (pos.every((item) => items.includes(item))) {
      alert("O jogador >" + jogadorMovimenta + "< GANHOU!");
      inicio();
      return;
    }
  }

  if (selecionado.filter((item) => item).length === 9) {
    alert("DEU VELHA!");
    inicio();
    return;
  }
}