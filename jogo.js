console.log('[DevSoutinho] Flappy Bird');

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza(){
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao;
      /*
       * calculo para pegar a movimentação de objetos, o resto da divisão % cria um numero magico, no caso, quando o repeteEm recebe a divisão da largura do chão por 2, dando 112, ele estipula o momento de resetar o elemento, e o resto da divisião vai sempre até 111, independente do valor contado no console.log, podendo isso ser parecido em outros lugares, pegando a largura do objeto e dividindo pela metade para conseguir um possivel numero para uma tarefa, talvez, esse valor valha só em situações similares a essa 
       */

      // console.log(movimentacao)

      chao.x = movimentacao % repeteEm
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}


function fazColizão(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if( flappyBirdY >= chaoY) {
    return true;
  }
  
  return false;
}
function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('devo pular');
      console.log('[antes]', flappyBird.velocidade);
      flappyBird.velocidade = - flappyBird.pulo;
      console.log('[depois]', flappyBird.velocidade);
    },
  
    gravidade: 0.25,
  
    velocidade: 0,
  
    atualiza() {
      if(fazColizão(flappyBird, globais.chao)){
        console.log('Fez Colisão');
        som_HIT.play();
        setTimeout(() => {
          mudaParaTela(Telas.INICIO)
        }, 500)
        return;
        
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      // console.log(flappyBird.velocidade);
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      {spriteX: 0, spriteY: 0,}, // asa pra cima
      {spriteX: 0, spriteY: 26,}, // asa pra meio
      {spriteX: 0, spriteY: 52,}, // asa pra baixo
      {spriteX: 0, spriteY: 26,}, // asa pra meio
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      // const baseDoIncremento = 1;
      // const incremento = baseDoIncremento + flappyBird.frameAtual;
      // const baseRepeticao = flappyBird.movimentos.length;
      // flappyBird.frameAtual = incremento % baseRepeticao
      // console.log(frames)
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }
    },
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  
  return flappyBird;

}


/// [mensagemGetReady]
const mensagemGetReady = {
  spritesX: 134,
  spritesY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spritesX, mensagemGetReady.spritesY,
      mensagemGetReady.largura, mensagemGetReady.altura,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.largura, mensagemGetReady.altura,
    );
  }
}

/// [Canos]
function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      const canoCeuX = 220;
      const canoCeuY = 0;
      // [Cano do Ceu]
      contexto.drawImage(
        sprites,
        canos.ceu.spriteX, canos.ceu.spriteY,
        canos.largura, canos.altura,
        canoCeuX, canoCeuY,
        canos.largura, canoCeuY,
      )

      const canoChaoX = 220;
      const canoChaoY = 0;
      contexto.drawImage(
        sprites,
        
      )
    },
  }

  return canos;
}


/**
 * [Telas]
 */
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
};
const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.flappyBird.desenha();

      globais.chao.desenha();
      globais.canos.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
}

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.flappyBird.atualiza();
    globais.chao.atualiza();
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();


  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
})

mudaParaTela(Telas.INICIO);
loop();
