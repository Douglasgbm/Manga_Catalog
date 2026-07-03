const form = document.getElementById('admin-form');
const tabela = document.getElementById('tabela-mangas');

// 1. Função para carregar a tabela
async function carregarTabela() {
    try {
        const resposta = await fetch('http://127.0.0.1:8000/mangas/');
        const dados = await resposta.json();
        const lista = dados.todos_os_mangas;

        tabela.innerHTML = ''; // Limpa a tabela

        lista.forEach(manga => {
            const linha = document.createElement('tr');
            linha.innerHTML = 
                `<td>${manga.nome}</td><td>${manga.volume}</td><td>${manga.estoque}</td><td>R$ ${manga.preco.toFixed(2)}</td><td>
                    <button class="btn-edit" onclick="editarManga(${manga.id})">Editar</button>
                    <button class="btn-delete" onclick="deletarManga(${manga.id})">Excluir</button>
                </td>`;
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error('Erro ao carregar tabela:', erro);
    }
}

// 2. Função para deletar
async function deletarManga(id) {
    if (confirm('Tem certeza que quer excluir este mangá?')) {
        await fetch(`http://127.0.0.1:8000/mangas/${id}`, { method: 'DELETE' });
        carregarTabela();
    }
}

// 3. Função para Salvar (Create e Update)
form.onsubmit = async (e) => {
    e.preventDefault();

    const id = document.getElementById('manga-id').value;
    const mangaData = {
        nome: document.getElementById('nome').value,
        volume: parseInt(document.getElementById('volume').value),
        autor: document.getElementById('autor').value,
        preco: parseFloat(document.getElementById('preco').value),
        capa: document.getElementById('capa').value,
        estoque: parseInt(document.getElementById('estoque').value)
    };

    let url = 'http://127.0.0.1:8000/mangas/';
    let metodo = 'POST';

    // Se tiver ID, significa que estamos editando um existente
    if (id) {
        url = `http://127.0.0.1:8000/mangas/${id}`;
        metodo = 'PUT';
    }

    try {
        await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mangaData)
        });
        
        form.reset();
        document.getElementById('manga-id').value = ''; // Limpa o ID
        carregarTabela(); // Atualiza a lista na hora
    } catch (erro) {
        alert('Erro ao salvar mangá');
    }
};

// 4. Função para Editar (Preencher o formulário)
async function editarManga(id) {
    const resposta = await fetch('http://127.0.0.1:8000/mangas/');
    const dados = await resposta.json();
    const manga = dados.todos_os_mangas.find(m => m.id === id);

    if (manga) {
        document.getElementById('manga-id').value = manga.id;
        document.getElementById('nome').value = manga.nome;
        document.getElementById('volume').value = manga.volume;
        document.getElementById('autor').value = manga.autor;
        document.getElementById('preco').value = manga.preco;
        document.getElementById('capa').value = manga.capa;
        document.getElementById('estoque').value = manga.estoque;
        
        document.getElementById('btn-salvar').innerText = 'Atualizar Mangá';
    }
}

// Botão de Limpar (Voltar para modo de cadastro)
document.getElementById('btn-limpar').onclick = () => {
    form.reset();
    document.getElementById('manga-id').value = '';
    document.getElementById('btn-salvar').innerText = 'Salvar Mangá';
};

// Inicia a tabela ao abrir a página
carregarTabela();