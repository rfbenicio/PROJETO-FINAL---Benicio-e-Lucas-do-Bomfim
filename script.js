const formCadastro = document.getElementById("formCadastro");
const tabelaCorpo = document.querySelector("#tabelaUsuarios tbody");
const contadorUsuarios = document.getElementById("contadorUsuarios");
const cadastroArea = document.getElementById("cadastroArea");
const listaArea = document.getElementById("listaArea");
const linkCadastrar = document.getElementById("linkCadastrar");
const linkLista = document.getElementById("linkLista");
const menuLateral = document.getElementById("menuLateral");
const menuToggle = document.getElementById("menuToggle");
const container = document.querySelector(".container");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

linkCadastrar.addEventListener("click", (e) => {
  e.preventDefault();
  listaArea.classList.remove("active");
  cadastroArea.classList.add("active");
});

linkLista.addEventListener("click", (e) => {
  e.preventDefault();
  cadastroArea.classList.remove("active");
  listaArea.classList.add("active");
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuLateral.classList.toggle("open");
  if (isOpen) {
    container.classList.add("menu-open");
  } else {
    container.classList.remove("menu-open");
  }
});

menuLateral.addEventListener("mouseenter", () => {
  menuLateral.classList.add("open");
  container.classList.add("menu-open");
});

menuLateral.addEventListener("mouseleave", () => {
  menuLateral.classList.remove("open");
  container.classList.remove("menu-open");
});

function atualizarTabela() {
  tabelaCorpo.innerHTML = "";
  usuarios.forEach((usuario, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${usuario.senha}</td>
      <td><button onclick="removerUsuario(${index})">Remover</button></td>
    `;
    tabelaCorpo.appendChild(linha);
  });
  contadorUsuarios.textContent = `(${usuarios.length})`;
}

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  const novoUsuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("numero").value,
  };
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  atualizarTabela();
  formCadastro.reset();
});

function removerUsuario(index) {
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  atualizarTabela();
}

atualizarTabela();
