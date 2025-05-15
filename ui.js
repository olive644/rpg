
export function desenhar(ctx, player, inimigo, botoes, mensagem) {
  // Limpa a tela
  ctx.fillStyle = '#141414';
  ctx.fillRect(0, 0, 800, 500);

  // Desenha jogador
  ctx.drawImage(player.imagem, 50, 250);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Vida: ${player.vida}`, 50, 220);
  ctx.fillText(`Magia: ${player.magia}`, 50, 240);

  // Desenha inimigo
  if (inimigo) {
    ctx.drawImage(inimigo.imagem, 500, 120);
    ctx.fillText(`${inimigo.nome} - Vida: ${inimigo.vida}`, 500, 90);
  } else {
    ctx.fillStyle = 'red';
    ctx.fillText("Vitória! Todos os inimigos foram derrotados.", 200, 200);
  }

  // Desenha botões
  ctx.fillStyle = '#3232c8';
  ctx.strokeStyle = 'white';
  ctx.font = '18px Arial';

  for (const botao of botoes) {
    ctx.fillRect(botao.x, botao.y, botao.largura, botao.altura);
    ctx.strokeRect(botao.x, botao.y, botao.largura, botao.altura);
    ctx.fillStyle = 'white';
    ctx.fillText(botao.texto, botao.x + 10, botao.y + 25);
    ctx.fillStyle = '#3232c8';
  }

  // Caixa de diálogo
  ctx.fillStyle = '#282828';
  ctx.fillRect(0, 450, 800, 40);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(0, 450, 800, 40);
  ctx.fillStyle = 'white';
  ctx.fillText(mensagem, 20, 480);
}
