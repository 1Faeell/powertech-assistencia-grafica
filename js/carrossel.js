// ==================== CONFIGURAÇÃO DAS IMAGENS - EDITE AQUI ====================
// Adicione as URLs das suas imagens/logos aqui
const IMAGENS_CARROSSEL = [
  {
    url: "assets/img/servicos/imagem1.jpg",
    alt: "Imagem  1",
  },
  {
    url: "assets/img/servicos/imagem2.jpg",
    alt: "Imagem  2",
  },
  {
    url: "assets/img/servicos/imagem3.jpg",
    alt: "Imagem  3",
  },
  {
    url: "assets/img/servicos/imagem4.jpg",
    alt: "Imagem  4",
  },
  {
    url: "assets/img/servicos/imagem5.jpg",
    alt: "Imagem  5",
  },
  {
    url: "assets/img/servicos/imagem6.jpg",
    alt: "Imagem  6",
  },
  {
    url: "assets/img/servicos/imagem7.png",
    alt: "Imagem  7",
  },
  {
    url: "assets/img/servicos/imagem8.jpg",
    alt: "Imagem  8",
  },
  {
    url: "assets/img/servicos/imagem9.jpg",
    alt: "Imagem  9",
  },
  {
    url: "assets/img/servicos/imagem10.jpg",
    alt: "Imagem  10",
  },
  {
    url: "assets/img/servicos/imagem11.jpg",
    alt: "Imagem  11",
  },
  {
    url: "assets/img/servicos/imagem12.jpg",
    alt: "Imagem  12",
  },
  {
    url: "assets/img/servicos/imagem13.jpg",
    alt: "Imagem  13",
  },
  {
    url: "assets/img/servicos/imagem14.jpg",
    alt: "Imagem  14",
  },
];

// ==================== CRIA O CARROSSEL INFINITO ====================
function criarCarrosselInfinito() {
  // Pega o lugar onde vai colocar as imagens
  const track = document.getElementById("carrosselTrack");
  // Se não encontrou, para aqui
  if (!track) {
    console.log("Não encontrei o lugar do carrossel");
    return;
  }
  // Limpa o conteúdo anterior (se tiver)
  track.innerHTML = "";
  // Cria o HTML de cada imagem
  let imagensHTML = "";
  IMAGENS_CARROSSEL.forEach(function (imagem, index) {
    imagensHTML += `
      <div class="carrossel-item" data-index="${index}">
        <img src="${imagem.url}" alt="${imagem.alt}" loading="lazy">
      </div>
    `;
  });
  // TRUQUE PARA INFINITO: Duplica as imagens
  // Colocamos as imagens 2 vezes seguidas
  // Quando a primeira cópia termina, a segunda já está aparecendo
  // E a animação volta pro início sem o usuário perceber
  track.innerHTML = imagensHTML + imagensHTML;

  // Adiciona evento de clique em todas as imagens
  adicionarEventosClique();

  console.log("Carrossel infinito criado!");
}

// ==================== ADICIONA EVENTOS DE CLIQUE NAS IMAGENS ====================
function adicionarEventosClique() {
  const items = document.querySelectorAll(".carrossel-item");

  items.forEach(function (item) {
    item.style.cursor = "pointer"; // Muda o cursor para indicar que é clicável

    item.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const imagem = IMAGENS_CARROSSEL[index];
      abrirModal(imagem.url, imagem.alt);
    });
  });
}

// ==================== FUNÇÕES DO MODAL ====================
function abrirModal(urlImagem, altTexto) {
  const modal = document.getElementById("modalImagem");
  const imagemExpandida = document.getElementById("imagemExpandida");
  const legenda = document.getElementById("legendaImagem");

  if (modal && imagemExpandida) {
    // Define a imagem e o texto alternativo
    imagemExpandida.src = urlImagem;
    imagemExpandida.alt = altTexto;

    // Define a legenda (opcional)
    if (legenda) {
      legenda.textContent = altTexto;
    }

    // Mostra o modal
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Impede scroll da página

    // Pausa o carrossel quando o modal abre
    pausarCarrossel();
  }
}

function fecharModal() {
  const modal = document.getElementById("modalImagem");

  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Restaura o scroll

    // Retoma o carrossel quando o modal fecha
    retormarCarrossel();
  }
}

// ==================== EVENTOS DO MODAL ====================
function inicializarModal() {
  const btnFechar = document.getElementById("btnFecharModal");
  const modal = document.getElementById("modalImagem");
  const overlay = modal ? modal.querySelector(".modal-imagem-overlay") : null;

  // Fechar ao clicar no botão X
  if (btnFechar) {
    btnFechar.addEventListener("click", fecharModal);
  }

  // Fechar ao clicar fora da imagem (no overlay)
  if (overlay) {
    overlay.addEventListener("click", fecharModal);
  }

  // Fechar ao pressionar ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      fecharModal();
    }
  });
}

// ==================== AJUSTA A VELOCIDADE DO CARROSSEL ====================
// Quanto MENOR o número, MAIS RÁPIDO
// Quanto MAIOR o número, MAIS DEVAGAR
function ajustarVelocidade(segundos) {
  const track = document.getElementById("carrosselTrack");
  if (track) {
    track.style.animationDuration = segundos + "s";
  }
}

// ==================== PAUSAR/RETOMAR O CARROSSEL ====================
function pausarCarrossel() {
  const track = document.getElementById("carrosselTrack");
  if (track) {
    track.style.animationPlayState = "paused";
  }
}

function retormarCarrossel() {
  const track = document.getElementById("carrosselTrack");
  if (track) {
    track.style.animationPlayState = "running";
  }
}

// ==================== INVERTER DIREÇÃO (OPCIONAL) ====================
// Para fazer o carrossel ir para a DIREITA ao invés da esquerda
function inverterDirecao() {
  const track = document.getElementById("carrosselTrack");
  if (track) {
    track.style.animationDirection = "reverse";
  }
}

// ==================== INICIA QUANDO A PÁGINA CARREGAR ====================
document.addEventListener("DOMContentLoaded", function () {
  criarCarrosselInfinito();
  inicializarModal();

  // Descomente as linhas abaixo se quiser usar:
  // ajustarVelocidade(25);  // Ajusta velocidade
  // inverterDirecao();      // Inverte para direita
});

// ==================== ADICIONAR NOVAS IMAGENS DEPOIS (OPCIONAL) ====================
function adicionarImagemNoCarrossel(novaImagem) {
  IMAGENS_CARROSSEL.push(novaImagem);
  criarCarrosselInfinito(); // Recria o carrossel
  console.log("Nova imagem adicionada!");
}
