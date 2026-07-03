const API_URL = "http://127.0.0.1:8000/mangas";

// 1. Referências dos elementos
const btnCadastro = document.getElementById('cadastro');
const btnLogin = document.getElementById('btn-login-adm');
const usuario = localStorage.getItem('usuarioLogado');

// Verifica se o usuário é ADM para mostrar/esconder botões de gestão
if (usuario === 'adm') {
    if (btnCadastro) btnCadastro.style.display = 'block'; 
    if (btnLogin) btnLogin.style.display = 'none'; 
} else {
    if (btnCadastro) btnCadastro.style.display = 'none'; 
    if (btnLogin) btnLogin.style.display = 'block'; 
}

if (btnLogin) {
    btnLogin.onclick = () => {
        window.location.href = 'login.html';
    };
}

// 2. Carregar mangás da API e exibir no carrossel
async function carregarCarrossel() {
    const carrossel = document.getElementById('carrossel-mangas');
    if (!carrossel) return;
    
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        const lista = dados.todos_os_mangas;

        carrossel.innerHTML = '';

        lista.forEach(manga => {
            const card = document.createElement('div');
            card.className = 'manga-card';

            card.innerHTML = `
                <img src="${manga.capa}" alt="${manga.nome}">
                <h3>${manga.nome}</h3>
                <p>Vol: ${manga.volume}</p>
                <p>Autor: ${manga.autor}</p>
                <p class="preco">R$ ${manga.preco.toFixed(2)}</p>
            `;

            carrossel.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao carregar carrossel:', erro);
    }
}

// Inicializa a página
carregarCarrossel();