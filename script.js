document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const nomeInput = document.getElementById("nome");
    const descricaoInput = document.getElementById("descricao");
    const listaItens = document.getElementById("listaItens");
    const cadastroSection = document.getElementById("cadastro");
    const listagemSection = document.getElementById("listagemContainer"); // <-- corrigido aqui

    const linkCadastro = document.getElementById("linkCadastro");
    const linkListagem = document.getElementById("linkListagem");

    let itens = [];

    // Alternar entre seções
    linkCadastro.addEventListener("click", () => {
        cadastroSection.style.display = "block";
        listagemSection.style.display = "none";
    });

    linkListagem.addEventListener("click", () => {
        cadastroSection.style.display = "none";
        listagemSection.style.display = "block";
        atualizarListagem();
    });

    // Adicionar item
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nome = nomeInput.value.trim();
        const descricao = descricaoInput.value.trim();
        const erroNome = document.getElementById("erroNome");
    
        if (nome === "") {
            erroNome.textContent = "O campo Nome do item é obrigatório.";
            nomeInput.focus();
            return;
        } else {
            erroNome.textContent = "";
        }

        itens.push({ nome, descricao });
        nomeInput.value = "";
        descricaoInput.value = "";
        atualizarListagem();
    });

    // Crescimento da textarea
    descricaoInput.addEventListener("input", () => {
        descricaoInput.style.height = "auto";
        descricaoInput.style.height = descricaoInput.scrollHeight + "px";
    });

    // Atualizar listagem
    function atualizarListagem() {
        listaItens.innerHTML = "";

        itens.forEach((item, index) => {
            const linha = document.createElement("div");
            linha.classList.add("item");

            const colunaNome = document.createElement("div");
            colunaNome.classList.add("coluna", "nome");
            colunaNome.textContent = item.nome;

            const colunaDescricao = document.createElement("div");
            colunaDescricao.classList.add("coluna", "descricao");
            colunaDescricao.textContent = item.descricao;

            const colunaAcao = document.createElement("div");
            colunaAcao.classList.add("coluna", "acao");

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover Item";
            botaoRemover.classList.add("botao-remover");
            botaoRemover.addEventListener("click", () => {
                itens.splice(index, 1);
                atualizarListagem();
            });

            colunaAcao.appendChild(botaoRemover);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaAcao);

            listaItens.appendChild(linha);
        });
    }
});
