
export class Player {
  constructor(nome, vida, magia, ataque, cura, imagem) {
    this.nome = nome;
    this.vida = vida;
    this.magia = magia;
    this.ataque = ataque;
    this.cura = cura;
    this.defendendo = false;
    this.imagem = new Image();
    this.imagem.src = imagem;
  }

  atacar(inimigo) {
    const dano = Math.floor(Math.random() * this.ataque) + 10;
    inimigo.vida -= dano;
    return dano;
  }

  usarMagia(inimigo) {
    if (this.magia < 10) return null;
    const dano = Math.floor(Math.random() * 10) + 20;
    inimigo.vida -= dano;
    this.magia -= 10;
    return dano;
  }

  curar() {
    this.vida = Math.min(100, this.vida + this.cura);
    return this.cura;
  }

  defender() {
    this.defendendo = true;
  }
}