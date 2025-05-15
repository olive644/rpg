import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { desenhar } from './ui.js';

const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');

const player = new Player('Sapão', 100, 50, 25, 15, '../assets/personagens/sapao.png');

const inimigos = [
  new Enemy('Wendel', 100, 15, '../assets/personagens/wendel.png'),
  new Enemy('Ítalo', 120, 20, '../assets/personagens/italo.png'),
  new Enemy('Gabriel', 140, 18, '../assets/personagens/gabriel.png'),
];

let inimigoAtualIndex = 0;
let inimigoAtual = inimigos[inimigoAtualIndex];
let turnoJogador = true;
let mensagem = 'É sua vez !';

const botoes = [
  { texto: 'Atacar', x: 50, y: 400, largura: 150, altura: 40, acao: 'atacar' },
  { texto: 'Magia', x: 220, y: 400, largura: 150, altura: 40, acao: 'magia' },
  { texto: 'Curar', x: 390, y: 400, largura: 150, altura: 40, acao: 'curar' },
  { texto: 'Defender', x: 560, y: 400, largura: 150, altura: 40, acao: 'defender' },
];

function proximoInimigo() {
  inimigoAtualIndex++;
  if (inimigoAtualIndex < inimigos.length) {
    inimigoAtual = inimigos[inimigoAtualIndex];
    mensagem = `Um novo inimigo apareceu: ${inimigoAtual.nome}!`;
  } else {
    inimigoAtual = null;
    mensagem = 'Você venceu todos os inimigos! Parabéns!';
  }
}

function turnoInimigo() {
  if (!inimigoAtual) return;
  const dano = inimigoAtual.atacar(player);
  mensagem = `${inimigoAtual.nome} atacou e causou ${dano} de dano. Sua vida: ${player.vida}`;
  turnoJogador = true;
  if (player.vida <= 0) {
    mensagem = 'Você foi derrotado(a)...';
  }
}

canvas.addEventListener('click', (e) => {
  if (!turnoJogador || !inimigoAtual) return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for (const botao of botoes) {
    if (
      mx >= botao.x &&
      mx <= botao.x + botao.largura &&
      my >= botao.y &&
      my <= botao.y + botao.altura
    ) {
      if (botao.acao === 'atacar') {
        const dano = player.atacar(inimigoAtual);
        mensagem = `Você atacou ${inimigoAtual.nome} e causou ${dano} de dano.`;
        if (inimigoAtual.vida <= 0) {
          proximoInimigo();
        } else {
          turnoJogador = false;
          setTimeout(turnoInimigo, 1500);
        }
      } else if (botao.acao === 'magia') {
        const dano = player.usarMagia(inimigoAtual);
        if (dano === null) {
          mensagem = 'Magia insuficiente!';
        } else {
          mensagem = `Você usou magia e causou ${dano} de dano em ${inimigoAtual.nome}.`;
          if (inimigoAtual.vida <= 0) {
            proximoInimigo();
          } else {
            turnoJogador = false;
            setTimeout(turnoInimigo, 1500);
          }
        }
      } else if (botao.acao === 'curar') {
        const cura = player.curar();
        mensagem = `Você se curou em ${cura} pontos de vida. Vida atual: ${player.vida}`;
        turnoJogador = false;
        setTimeout(turnoInimigo, 1500);
      } else if (botao.acao === 'defender') {
        player.defender();
        mensagem = 'Você está se defendendo. Dano do próximo ataque será reduzido.';
        turnoJogador = false;
        setTimeout(turnoInimigo, 1500);
      }
      break;
    }
  }
});

function loop() {
  desenhar(ctx, player, inimigoAtual, botoes, mensagem);
  if (player.vida > 0) {
    requestAnimationFrame(loop);
  } else {
    desenhar(ctx, player, inimigoAtual, [], 'Você perdeu! Recarregue a página para tentar novamente.');
  }
}

loop();