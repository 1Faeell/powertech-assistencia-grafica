// ==================== CONFIGURAÇÃO DOS DEPOIMENTOS - FÁCIL EDIÇÃO ====================
/**
 * Configure aqui todos os depoimentos do site
 * Cada depoimento pode ter:
 * - nome: Nome do cliente
 * - cargo: Cargo ou descrição do cliente
 * - texto: O depoimento em si
 * - estrelas: Número de estrelas (1 a 5)
 * - foto: URL da foto (opcional - deixe vazio para usar ícone padrão)
 */
const DEPOIMENTOS_CONFIG = {
  // ===== LISTA DE DEPOIMENTOS =====
  depoimentos: [
    {
      nome: "Maria Silva",
      cargo: "Cliente desde 2023",
      texto:
        "Excelente atendimento! Meu notebook estava com problemas e foi resolvido rapidamente. A equipe é muito profissional e competente. Super recomendo!",
      estrelas: 5,
      foto: "", // Deixe vazio para usar ícone padrão
    },
    {
      nome: "João Santos",
      cargo: "Estudante",
      texto:
        "Precisava imprimir materiais para o meu trabalho da escola. A PowerTech entregou tudo no prazo certinho. Viraram minha gráfica de confiança!",
      estrelas: 5,
      foto: "",
    },
    {
      nome: "Ana Costa",
      cargo: "Gerente de Marketing",
      texto:
        "Os brindes personalizados ficaram perfeitos para o evento da minha festa. Qualidade excepcional e preço justo. Parabéns pelo trabalho!",
      estrelas: 5,
      foto: "",
    },
    {
      nome: "Pedro Oliveira",
      cargo: "Estudante",
      texto:
        "Formatei meu PC e o resultado foi ótimo! Ficou super rápido e o técnico me explicou tudo direitinho. Atendimento nota 10!",
      estrelas: 5,
      foto: "",
    },
    {
      nome: "Carla Mendes",
      cargo: "Professora",
      texto:
        "Sempre que preciso de impressões ou manutenção no computador, venho aqui.",
      estrelas: 4,
      foto: "",
    },
  ],

  //   // ===== ESTATÍSTICAS =====
  estatisticas: [
    {
      icone: "bi-people-fill",
      numero: "500+",
      texto: "Clientes Satisfeitos",
    },
    {
      icone: "bi-star-fill",
      numero: "4.9/5",
      texto: "Avaliação Média",
    },
    {
      icone: "bi-check-circle-fill",
      numero: "98%",
      texto: "Taxa de Satisfação",
    },
    {
      icone: "bi-award-fill",
      numero: "5+",
      texto: "Anos de Experiência",
    },
  ],

  // ===== CALL TO ACTION =====
  cta: {
    titulo: "Quer fazer parte dos nossos clientes satisfeitos?",
    subtitulo: "Entre em contato e conheça nossos serviços!",
    textoBotao: "Fale Conosco",
    iconeBotao: "bi-whatsapp",
    linkBotao: "https://wa.me/5571987193409",
  },
};

// ==================== FUNÇÕES PARA RENDERIZAR OS DEPOIMENTOS ====================

/**
 * Gera o HTML de um card de depoimento
 * @param {Object} depoimento - Objeto com dados do depoimento
 * @returns {string} HTML do card
 */
function gerarCardDepoimento(depoimento) {
  // Sanitiza os dados para prevenir XSS
  const nome = sanitizarTexto(depoimento.nome || "Cliente Anônimo");
  const cargo = sanitizarTexto(depoimento.cargo || "Cliente");
  const texto = sanitizarTexto(depoimento.texto || "");
  const estrelas = Math.min(Math.max(parseInt(depoimento.estrelas) || 5, 1), 5);
  const foto = depoimento.foto || "";

  // Gera as estrelas
  let estrelasHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < estrelas) {
      estrelasHTML += '<i class="bi bi-star-fill"></i>';
    } else {
      estrelasHTML += '<i class="bi bi-star"></i>';
    }
  }

  // Gera o avatar (foto ou ícone)
  const avatarHTML = foto
    ? `<img src="${foto}" alt="${nome}" class="avatar-img">`
    : '<i class="bi bi-person-circle"></i>';

  return `
        <div class="col-md-6 col-lg-4">
            <div class="depoimento-card">
                <div class="depoimento-aspas">
                    <i class="bi bi-quote"></i>
                </div>
                <div class="depoimento-estrelas">
                    ${estrelasHTML}
                </div>
                <p class="depoimento-texto">${texto}</p>
                <div class="depoimento-autor">
                    <div class="autor-avatar">
                        ${avatarHTML}
                    </div>
                    <div class="autor-info">
                        <h4>${nome}</h4>
                        <p>${cargo}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Gera o HTML de uma estatística
 * @param {Object} stat - Objeto com dados da estatística
 * @returns {string} HTML da estatística
 */
function gerarEstatistica(stat) {
  const icone = stat.icone || "bi-star-fill";
  const numero = sanitizarTexto(stat.numero || "0");
  const texto = sanitizarTexto(stat.texto || "");

  return `
        <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
                <i class="bi ${icone} stat-icon"></i>
                <h3 class="stat-numero">${numero}</h3>
                <p class="stat-texto">${texto}</p>
            </div>
        </div>
    `;
}

/**
 * Gera o HTML do Call to Action
 * @param {Object} cta - Objeto com dados do CTA
 * @returns {string} HTML do CTA
 */
function gerarCTA(cta) {
  const titulo = sanitizarTexto(cta.titulo || "Entre em contato!");
  const subtitulo = sanitizarTexto(
    cta.subtitulo || "Estamos prontos para atender você"
  );
  const textoBotao = sanitizarTexto(cta.textoBotao || "Contato");
  const iconeBotao = cta.iconeBotao || "bi-whatsapp";
  const linkBotao = cta.linkBotao || "#contato";

  return `
        <h3>${titulo}</h3>
        <p>${subtitulo}</p>
        <a href="${linkBotao}" class="btn-depoimento">
            <i class="bi ${iconeBotao}"></i> ${textoBotao}
        </a>
    `;
}

/**
 * Renderiza todos os depoimentos na página
 */
function renderizarDepoimentos() {
  try {
    // Obtém os containers
    const depoimentosContainer = document.getElementById(
      "depoimentosContainer"
    );
    const statsContainer = document.getElementById("statsContainer");
    const ctaContainer = document.getElementById("ctaContainer");

    // Validação: verifica se os containers existem
    if (!depoimentosContainer || !statsContainer || !ctaContainer) {
      console.error("Containers de depoimentos não encontrados no DOM");
      return;
    }

    // Renderiza os depoimentos
    let depoimentosHTML = "";
    if (
      DEPOIMENTOS_CONFIG.depoimentos &&
      DEPOIMENTOS_CONFIG.depoimentos.length > 0
    ) {
      DEPOIMENTOS_CONFIG.depoimentos.forEach((depoimento) => {
        depoimentosHTML += gerarCardDepoimento(depoimento);
      });
    } else {
      depoimentosHTML =
        '<div class="col-12"><p class="text-center">Nenhum depoimento disponível no momento.</p></div>';
    }
    depoimentosContainer.innerHTML = depoimentosHTML;

    // Renderiza as estatísticas
    let statsHTML = "";
    if (
      DEPOIMENTOS_CONFIG.estatisticas &&
      DEPOIMENTOS_CONFIG.estatisticas.length > 0
    ) {
      DEPOIMENTOS_CONFIG.estatisticas.forEach((stat) => {
        statsHTML += gerarEstatistica(stat);
      });
    }
    statsContainer.innerHTML = statsHTML;

    // Renderiza o CTA
    if (DEPOIMENTOS_CONFIG.cta) {
      ctaContainer.innerHTML = gerarCTA(DEPOIMENTOS_CONFIG.cta);
    }

    console.log("Depoimentos renderizados com sucesso!");

    // Adiciona animação de entrada aos cards
    adicionarAnimacaoEntrada();
  } catch (erro) {
    console.error("Erro ao renderizar depoimentos:", erro);

    // Exibe mensagem de erro amigável para o usuário
    const depoimentosContainer = document.getElementById(
      "depoimentosContainer"
    );
    if (depoimentosContainer) {
      depoimentosContainer.innerHTML =
        '<div class="col-12"><p class="text-center text-danger">Erro ao carregar depoimentos. Por favor, tente novamente mais tarde.</p></div>';
    }
  }
}

/**
 * Adiciona animação de entrada aos cards quando ficam visíveis
 */
function adicionarAnimacaoEntrada() {
  // Verifica se IntersectionObserver está disponível
  if ("IntersectionObserver" in window) {
    const cards = document.querySelectorAll(".depoimento-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Adiciona animação com delay baseado no índice
            setTimeout(() => {
              entry.target.style.opacity = "0";
              entry.target.style.transform = "translateY(30px)";
              entry.target.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

              requestAnimationFrame(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              });
            }, index * 100);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cards.forEach((card) => observer.observe(card));
  }
}

/**
 * Calcula e atualiza estatísticas automaticamente baseado nos depoimentos
 * (Opcional - pode ser usado para calcular média de estrelas automaticamente)
 */
function calcularEstatisticasAutomaticas() {
  try {
    const depoimentos = DEPOIMENTOS_CONFIG.depoimentos;

    if (!depoimentos || depoimentos.length === 0) {
      return;
    }

    // Calcula média de estrelas
    const totalEstrelas = depoimentos.reduce(
      (soma, dep) => soma + (dep.estrelas || 5),
      0
    );
    const mediaEstrelas = (totalEstrelas / depoimentos.length).toFixed(1);

    // Atualiza estatística de avaliação média (se existir)
    const statAvaliacao = DEPOIMENTOS_CONFIG.estatisticas.find((s) =>
      s.texto.includes("Avaliação")
    );
    if (statAvaliacao) {
      statAvaliacao.numero = `${mediaEstrelas}/5`;
    }

    console.log(`Média de avaliação calculada: ${mediaEstrelas}/5`);
  } catch (erro) {
    console.error("Erro ao calcular estatísticas:", erro);
  }
}

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Função auxiliar para sanitizar HTML e prevenir XSS
 * (Reutiliza a função do script.js principal)
 */
function sanitizarTexto(texto) {
  if (typeof texto !== "string") {
    return "";
  }
  const elementoTemp = document.createElement("div");
  elementoTemp.textContent = texto;
  return elementoTemp.innerHTML;
}

// ==================== INICIALIZAÇÃO DOS DEPOIMENTOS ====================

// Renderiza os depoimentos quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    calcularEstatisticasAutomaticas();
    renderizarDepoimentos();
  });
} else {
  // DOM já está pronto
  calcularEstatisticasAutomaticas();
  renderizarDepoimentos();
}

// ==================== EXPORTAÇÃO PARA TESTES (OPCIONAL) ====================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DEPOIMENTOS_CONFIG,
    gerarCardDepoimento,
    gerarEstatistica,
    gerarCTA,
    renderizarDepoimentos,
  };
}

// ==================== EXEMPLO DE COMO ADICIONAR DEPOIMENTOS DINAMICAMENTE ====================
/**
 * Função para adicionar um novo depoimento programaticamente
 * Útil se você quiser adicionar depoimentos via formulário ou API
 */
function adicionarDepoimento(novoDepoimento) {
  try {
    // Valida o depoimento
    if (!novoDepoimento.nome || !novoDepoimento.texto) {
      console.error("Depoimento inválido: nome e texto são obrigatórios");
      return false;
    }

    // Adiciona o depoimento ao array
    DEPOIMENTOS_CONFIG.depoimentos.push(novoDepoimento);

    // Re-renderiza os depoimentos
    renderizarDepoimentos();

    console.log("Novo depoimento adicionado com sucesso!");
    return true;
  } catch (erro) {
    console.error("Erro ao adicionar depoimento:", erro);
    return false;
  }
}

// Exemplo de uso:
// adicionarDepoimento({
//     nome: "Carlos Pereira",
//     cargo: "Designer",
//     texto: "Serviço excepcional!",
//     estrelas: 5,
//     foto: ""
// });
