document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const nomeInput = document.getElementById("nome");
    const descricaoInput = document.getElementById("descricao");
    const listaItens = document.getElementById("listaItens");
    const cadastroSection = document.getElementById("cadastro");
    const listagemSection = document.getElementById("listagem");

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

        if (nome === "" || descricao === "") {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        itens.push({ nome, descricao });
        nomeInput.value = "";
        descricaoInput.value = "";
        atualizarListagem();
    });

    // Atualizar listagem
    function atualizarListagem() {
        listaItens.innerHTML = "";

        itens.forEach((item, index) => {
            const li = document.createElement("li");

            const divTexto = document.createElement("div");
            divTexto.classList.add("item-texto");

            const nomeEl = document.createElement("strong");
            nomeEl.textContent = item.nome;

            const descricaoEl = document.createElement("span");
            descricaoEl.textContent = item.descricao;

            divTexto.appendChild(nomeEl);
            divTexto.appendChild(descricaoEl);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remover";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                itens.splice(index, 1);
                atualizarListagem();
            });

            li.appendChild(divTexto);
            li.appendChild(deleteBtn);
            listaItens.appendChild(li);
        });
    }
});
