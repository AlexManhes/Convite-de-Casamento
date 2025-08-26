// === Configuração do Google Forms ===
const GOOGLE_FORM_ID =
  "1FAIpQLSda_oBwyOipmEk0tJxSlCpGgauHsDzpELU6VhPQzHnlv8OxNw"; // Substitua se for outro
const ENTRY_NAME = "entry.INSIRA_AQUI_O_ID_DO_NOME"; // Ex: entry.1234567890
const ENTRY_QTD = "entry.INSIRA_AQUI_O_ID_DA_QTD"; // Ex: entry.9876543210

// === Seleção de elementos ===
const buttonPresente = document.getElementById("button__presente");
const buttonNaoPresente = document.getElementById("button__naoPresente");
const formPresenca = document.getElementById("form_presenca");
const mensagemSucesso = document.getElementById("mensagem_sucesso");

// === Exibir formulário ao confirmar presença ===
buttonPresente.addEventListener("click", () => {
  formPresenca.style.display = "block";
  mensagemSucesso.style.display = "none";
});

// === Mensagem de ausência ===
buttonNaoPresente.addEventListener("click", () => {
  formPresenca.style.display = "none";
  mensagemSucesso.style.display = "block";
  mensagemSucesso.textContent = "Sentiremos sua falta! 💔";
});

// === Envio para o Google Form ===
formPresenca.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome_presensa").value;
  const qtd = document.getElementById("qtd_pessoas").value;

  const url = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

  const data = new FormData();
  data.append(ENTRY_NAME, nome);
  data.append(ENTRY_QTD, qtd);

  fetch(url, {
    method: "POST",
    body: data,
    mode: "no-cors",
  })
    .then(() => {
      formPresenca.style.display = "none";
      mensagemSucesso.style.display = "block";
      mensagemSucesso.textContent = "Confirmação enviada com sucesso! 🎉";
      formPresenca.reset();
    })
    .catch((error) => {
      console.error("Erro ao enviar:", error);
      mensagemSucesso.style.display = "block";
      mensagemSucesso.textContent = "Erro ao enviar, tente novamente!";
    });
});
