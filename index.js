function initConvite() {
  // === Configuração do Google Forms ===
  const GOOGLE_FORM_ID =
    "1FAIpQLSda_oBwyOipmEk0tJxSlCpGgauHsDzpELU6VhPQzHnlv8OxNw";
  const ENTRY_NAME = "entry.1593131790";
  const ENTRY_QTD = "entry.1149107732";

  // === Seleção de elementos ===
  const buttonPresente = document.getElementById("button__presente");
  const buttonNaoPresente = document.getElementById("button__naoPresente");
  const formPresenca = document.getElementById("form_presenca");
  const mensagemSucesso = document.getElementById("mensagem_sucesso");

  // === Função para enviar dados ao Google Forms ===
  function enviarDados(nome, qtd, callback) {
    const url = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    const data = new FormData();
    data.append(ENTRY_NAME, nome);
    data.append(ENTRY_QTD, qtd);

    fetch(url, { method: "POST", body: data, mode: "no-cors" })
      .then(() => callback(true))
      .catch(() => callback(false));
  }

  // === Envio de presença ===
  function enviarPresenca(nome, qtd) {
    enviarDados(nome, qtd, (sucesso) => {
      formPresenca.style.display = "none";
      mensagemSucesso.style.display = "block";
      mensagemSucesso.textContent = sucesso
        ? "Confirmação enviada com sucesso! 🎉"
        : "Erro ao enviar, tente novamente!";
      formPresenca.reset();
      resetForms(); // chama o reset automático
    });
  }

  // === Envio de ausência ===
  function enviarAusencia() {
    enviarDados("Não estará presente", 1, (sucesso) => {
      formPresenca.style.display = "none";
      mensagemSucesso.style.display = "block";
      mensagemSucesso.textContent = sucesso
        ? "Sentiremos sua falta! 😢"
        : "Erro ao enviar, tente novamente!";
      resetForms(); // chama o reset automático
    });
  }

  // === Função de reset geral após alguns segundos ===
  function resetForms() {
    setTimeout(() => {
      formPresenca.style.display = "none";
      mensagemSucesso.style.display = "none";
      formPresenca.reset();
    }, 5000); // 5 segundos antes de resetar
  }

  // === Eventos de clique ===
  buttonPresente.addEventListener("click", () => {
    formPresenca.style.display = "block";
    mensagemSucesso.style.display = "none";
  });

  buttonNaoPresente.addEventListener("click", () => {
    enviarAusencia();
  });

  // === Evento de envio do formulário ===
  formPresenca.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome_presensa").value;
    const qtd = document.getElementById("qtd_pessoas").value;
    enviarPresenca(nome, qtd);
  });
}

// === Inicializa o convite ===
initConvite();
