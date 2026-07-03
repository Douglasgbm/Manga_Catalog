const loginForm = document.getElementById('login-form');
const erroLogin = document.getElementById('erro-login');

loginForm.onsubmit = async (event) => {
    event.preventDefault(); // Não deixa a página recarregar

    // Pega os valores dos inputs
    const dados = {
        usuario: document.getElementById('usuario').value,
        senha: document.getElementById('senha').value
    };

    try {
        const resposta = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            // SUCESSO! 
            // Salvamos no navegador que o usuário está logado como ADM
            localStorage.setItem('usuarioLogado', 'adm');
            
            alert('Login realizado! Redirecionando...');
            window.location.href = 'index.html'; // Volta para a página principal
        } else {
            // ERRO 401 (Senha errada)
            erroLogin.style.display = 'block';
        }
    } catch (erro) {
        console.error('Erro de conexão:', erro);
        alert('A API está rodando? Verifica o Uvicorn!');
    }
};