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

function goToVagas(){
    window.location.href = "vagas.html"
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


function carregarStatus() {
    const container = document.getElementById("tela-status");
    // Lê a lista de vagas do localStorage
    const listaVagas = JSON.parse(localStorage.getItem("vagasCandidatadas")) || [];

    // Se o array estiver vazio
    if (listaVagas.length === 0) {
        container.innerHTML = `
            <h2>Nenhuma candidatura ativa</h2>
            <p>Você ainda não se candidatou a nenhuma vaga no momento.</p>
            <button class="btn-voltar" onclick="window.location.href='vagas.html'">Ver Vagas</button>
        `;
        return;
    }

    // Começa a montar a estrutura da página
    container.innerHTML = `
        <h2>Sua Candidatura</h2>
        <p>Acompanhe abaixo o progresso dos seus processos seletivos:</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <div id="lista-processos" style="display: flex; flex-direction: column; gap: 20px;"></div>
        <button class="btn-voltar" onclick="window.location.href='index.html'">Voltar para o Início</button>
    `;

    const listaContainer = document.getElementById("lista-processos");

    // Faz um loop por cada vaga salva e adiciona na tela
    listaVagas.forEach(vaga => {
        const itemVaga = document.createElement("div");
        // Mudamos o layout para alinhar perfeitamente mesmo com textos longos
        itemVaga.style.cssText = `
            text-align: left; 
            padding: 15px 20px; 
            border: 1px solid #e0e0e0; 
            border-radius: 8px;
            background-color: #fafafa;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 15px;
        `;

        // Adicionamos uma div segurando os textos para que eles fiquem contidos na coluna da esquerda
        itemVaga.innerHTML = `
            <div style="min-width: 0;">
                <h3 style="margin: 0 0 5px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">🎯 ${vaga.vaga}</h3>
                <p style="margin: 2px 0;"><strong>Empresa:</strong> ${vaga.empresa}</p>
                <p style="margin: 2px 0; font-size: 0.85rem; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">🎓 ${vaga.curso}</p>
            </div>
            <div class="status-badge" style="margin-top: 0; flex-shrink: 0; white-space: nowrap;">
                ⏳ Em análise
            </div>
        `;

        listaContainer.appendChild(itemVaga);
    });
}

// Executa ao abrir a página
carregarStatus();