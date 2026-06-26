document.getElementById("loginForm").addEventListener("submit", async function(event){

    event.preventDefault();

    const usuarioDigitado = document.getElementById("usuario").value;
    const senhaDigitada = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

 

    try {

        const resposta = await fetch("usuarios.json");
        const dados = await resposta.json();

        const usuarioEncontrado = dados.usuarios.find(
            user => user.usuario === usuarioDigitado
        );


        if(!usuarioEncontrado){
            mensagem.style.color = "yellow";
            mensagem.textContent = "Usuário não encontrado.";
            return;
        }

        if(usuarioEncontrado.senha !== senhaDigitada){
            mensagem.style.color = "#ff4d4d";
            mensagem.textContent = "Senha incorreta.";
            return;
        }

        mensagem.style.color = "#7CFC00";
        mensagem.textContent = "Login realizado com sucesso!";

        const usuarioLogado = {
                nome: usuarioEncontrado.nome,
                descricao: usuarioEncontrado.descricao
            };

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuarioLogado)
        );

        window.location.href = "index.html";

    } catch(erro){

        mensagem.style.color = "white";
        mensagem.textContent = "Erro ao carregar usuários.";

        console.error(erro);
    }

});