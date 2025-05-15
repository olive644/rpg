
export class Enemy {
  constructor(nome, vida, ataque, imagem) {
    this.nome = nome;
    this.vida = vida;
    this.ataque = ataque;
    this.imagem = new Image();
    this.imagem.src = imagem;
  }

  atacar(jogador) {
    let dano = Math.floor(Math.random() * this.ataque) + 5;
    if (jogador.defendendo) {
      dano = Math.floor(dano / 2);
      jogador.defendendo = false;
    }
    jogador.vida -= dano;
    return dano;
  }
}