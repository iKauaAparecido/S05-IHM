let vagaSelecionadaAtual = null;

function openMenu() {
  document.getElementById("menu_aba").style.display = "block"; 
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";    
}

//Função que leva o usuario para a pagina principal
function voltarPaginaPrincipal(){
  window.location.href = "index.html";
}

function goToVagasAplicadas(){
    window.location.href = "status.html"
}


function temaLim() {
    document.documentElement.style.setProperty('--cor-click', '#38184C');
    document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
    document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}

function temaInatel() {
    document.documentElement.style.setProperty('--cor-click', '#126ae2');
    document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
    document.documentElement.style.setProperty('--cor-back2', '#6a937a');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}

function temaDark() {
    const cores = {
        '--cor-click': '#CEF09D',
        '--cor-sombra': '#9b0a59',
        '--cor-text': 'black', /* Modificado para o texto ficar visível no modo dark */
        '--cor-back1': '#38184C',
        '--cor-back2': '#4f6a93',
        '--md-sys-color-primary': '#CEF09D'
    };

    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}

//Função que carrega o JSON 
async function carregarVagas() {

    const resposta = await fetch("vagas.json");

    const vagas = await resposta.json();

    console.log(vagas);

    const container = document.getElementById("container-vagas");

    vagas.forEach(vaga => {

        const card = document.createElement("div");

        card.classList.add("card-vaga");

        card.innerHTML = `
            <img src="${vaga.imagem}" alt="${vaga.empresa}">

            <h3>${vaga.vaga}</h3>

            <div class="descricao">

                <p class="empresa">${vaga.empresa}</p>

                <p>${vaga.descricao}</p>

                <p class="info">📍 ${vaga.local}</p>

                <p class="info">💰 ${vaga.bolsa}</p>

            </div>

            <div class="botoes-vaga">
                <button class="btn-detalhes"
                    onclick="mostrarDetalhes('${vaga.detalhes}')">
                Detalhes
                </button>
                <button class="btn-candidatar"
                    onclick="abrirCandidatura()">
                Candidatar-se
                </button>
            </div>
        `;

        container.appendChild(card);

    });

}

carregarVagas();


function mostrarDetalhes(texto) {

    document.getElementById("textoDetalhes").innerText = texto;

    document.getElementById("modalDetalhes").style.display = "flex";
}

document.querySelector(".fechar").addEventListener("click", () => {

    document.getElementById("modalDetalhes").style.display = "none";

});


function abrirCandidatura() {

    document.getElementById("modalCandidatura").style.display = "flex";

}

function fecharCandidatura() {

    document.getElementById("modalCandidatura").style.display = "none";

}

document.querySelector(".fechar-candidatura")
        .addEventListener("click", fecharCandidatura);

document.getElementById("btnEnviarCurriculo")
.addEventListener("click", () => {

    const arquivo =
        document.getElementById("curriculo").files[0];

    if (!arquivo) {

        mostrarErro();

        return;
    }


    fecharCandidatura();

    mostrarSucesso();

});


function mostrarSucesso() {

    document.getElementById("modalSucesso")
            .style.display = "flex";

}

function fecharSucesso() {

    document.getElementById("modalSucesso")
            .style.display = "none";

}

function mostrarErro() {
    document.getElementById("modalErro").style.display = "flex";
}

function fecharErro() {
    document.getElementById("modalErro").style.display = "none";
}
//-=-=-=-=--=-=-=-= Aqui é sobre o filtro das vagas -=-=-=-=--=-=-=-=

let todasVagas = [];

async function carregarVagas() {

    const resposta = await fetch("vagas.json");

    todasVagas = await resposta.json();

    renderizarVagas(todasVagas);

}

function renderizarVagas(vagas) {
    const container = document.getElementById("container-vagas");
    container.innerHTML = "";

    vagas.forEach(vaga => {
        const card = document.createElement("div");
        card.classList.add("card-vaga");
        card.innerHTML = `
            <img src="${vaga.imagem}">
            <h3>${vaga.vaga}</h3>
            <div class="descricao">
                <p class="empresa">${vaga.empresa}</p>
                <p>${vaga.descricao}</p>
                <p>📍 <strong>Local:</strong> ${vaga.local}</p>
                <p>💰 <strong>Remuneração:</strong> ${vaga.bolsa}</p>
                <p>🎓 <strong>Curso:</strong> ${vaga.curso}</p>
            </div>
            <div class="botoes-vaga">
                <button class="btn-detalhes">Detalhes</button>
                <button class="btn-candidatar">Candidatar-se</button>
            </div>
        `;

        // Evento de detalhes
        card.querySelector(".btn-detalhes").addEventListener("click", () => {
            mostrarDetalhes(vaga.detalhes);
        }); 

        // Evento de candidatar (guarda a vaga na variável global temporariamente)
        card.querySelector(".btn-candidatar").addEventListener("click", () => {
            vagaSelecionadaAtual = vaga; 
            abrirCandidatura();
        });

        container.appendChild(card);
    });
}

document
.getElementById("filtroCurso")
.addEventListener("change", filtrarCurso);

function filtrarCurso() {

    const cursoSelecionado =
        document.getElementById("filtroCurso").value;

    if (cursoSelecionado === "todos") {

        renderizarVagas(todasVagas);

        return;
    }

    const vagasFiltradas =
        todasVagas.filter(vaga =>
            vaga.curso === cursoSelecionado
        );

    renderizarVagas(vagasFiltradas);

}

document.getElementById("btnEnviarCurriculo").addEventListener("click", () => {
    const arquivo = document.getElementById("curriculo").files[0];

    if (!arquivo) {
        mostrarErro();
        return;
    }

    if (vagaSelecionadaAtual) {
        // 1. Pega a lista de vagas já salvas ou cria um array vazio se for a primeira
        let vagasCandidatadas = JSON.parse(localStorage.getItem("vagasCandidatadas")) || [];

        // 2. Verifica se o usuário já se candidatou a ESSA vaga específica para não duplicar
        const jaCandidatado = vagasCandidatadas.some(vaga => 
            vaga.vaga === vagaSelecionadaAtual.vaga && vaga.empresa === vagaSelecionadaAtual.empresa
        );

        if (!jaCandidatado) {
            // Adiciona a nova vaga à lista
            vagasCandidatadas.push(vagaSelecionadaAtual);
            // Salva a lista atualizada no localStorage
            localStorage.setItem("vagasCandidatadas", JSON.stringify(vagasCandidatadas));
        }
    }

    fecharCandidatura();
    mostrarSucesso();
});