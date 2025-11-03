// ==================== CONFIGURAÇÕES DE HORÁRIO - FÁCIL DE EDITAR ====================
const CONFIGURACAO_HORARIO = {
  // Horário de funcionamento (formato 24h)
  horaAbertura: 8, // Abre às 8h
  horaFechamento: 18, // Fecha às 18h

  // Horário de sábado
  sabadoAbertura: 8, // Sábado abre às 8h
  sabadoFechamento: 12, // Sábado fecha às 12h

  // Fecha domingo? (true = fecha, false = abre)
  fechaDomingo: true,
};

// ==================== FUNÇÃO PARA VERIFICAR SE ESTÁ ABERTO ====================
function verificarHorarioFuncionamento() {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const horaAtual = agora.getHours();

  const statusBadge = document.getElementById("statusBadge");
  const statusText = document.getElementById("statusText");

  let estaAberto = false;

  // Verifica se é domingo e está configurado para fechar
  if (diaSemana === 0 && CONFIGURACAO_HORARIO.fechaDomingo) {
    estaAberto = false;
  }
  // Verifica horário de sábado
  else if (diaSemana === 6) {
    estaAberto =
      horaAtual >= CONFIGURACAO_HORARIO.sabadoAbertura &&
      horaAtual < CONFIGURACAO_HORARIO.sabadoFechamento;
  }
  // Verifica horário de segunda a sexta
  else {
    estaAberto =
      horaAtual >= CONFIGURACAO_HORARIO.horaAbertura &&
      horaAtual < CONFIGURACAO_HORARIO.horaFechamento;
  }

  // Atualiza o badge de status
  if (estaAberto) {
    statusBadge.className = "status-badge status-aberto";
    statusText.innerHTML =
      '<i class="bi bi-check-circle-fill"></i> Aberto Agora';
  } else {
    statusBadge.className = "status-badge status-fechado";
    statusText.innerHTML = '<i class="bi bi-x-circle-fill"></i> Fechado';
  }
}

// ==================== INICIALIZAÇÃO ====================
// Verifica o status quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  verificarHorarioFuncionamento();

  // Atualiza o status a cada minuto
  setInterval(verificarHorarioFuncionamento, 60000);
});

// ==================== SMOOTH SCROLL PARA OS LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Fecha o menu mobile após clicar (se estiver aberto)
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });
});
