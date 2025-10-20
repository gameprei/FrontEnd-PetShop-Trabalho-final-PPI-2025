
function validarFormulario(){
    const formulario = document.getElementById("formFilhote");
    const formValidado = formulario.checkValidity();

    if(!formValidado){
        formulario.classList.add("was-validated");
    } else {
        formulario.classList.remove("was-validated");
    }
    
    return formValidado;
}

function gravarFilhote(evento){
    evento.stopPropagation();
    evento.preventDefault();

    if(validarFormulario()){
        const especie = document.getElementById("especie").value;
        const raca = document.getElementById("raca").value.trim();
        const id_interessado = document.getElementById("id_interessado").value;

        const dadosFilhote = {
            "id": 1,
            "especie": especie,
            "raca": raca,
            "id_interessado": id_interessado
        };

        console.log("Dados do Filhote ", dadosFilhote);

        fetch("http://localhost:3000/filhote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosFilhote)
        })
        .then((resposta) =>{
            return resposta.json();
        })
        .then((dados) => {
            if(dados.status){
                exibirTabelaFilhotes();
            }
            alert(dados.mensagem);
        })
        .catch((erro) => {
            alert("Erro ao cadastrar Filhote: " + erro.message);
        })
    }
}

function exibirTabelaFilhotes(){
    const espacoTabela = document.getElementById("tabelaFilhotes")
    if(!espacoTabela) return;
    espacoTabela.innerHTML = "";

    fetch("http://localhost:3000/filhote", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok) {
            return resposta.json();
        }
        throw new Error("Erro ao carregar Filhotes")
    })
    .then((dados) => {

        console.log(dados);
        if(dados.status && dados.filhotes){
            const tabela = document.createElement('table');
            tabela.className = 'table';

            const cabecalho = document.createElement('thead');
            cabecalho.innerHTML = `
                <tr>
                    <th>id</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>ID Interessado</th>
                    <th>Ações</th>
                </tr>
            `;
            tabela.appendChild(cabecalho);
            const corpoTabela = document.createElement('tbody');

            for(const filhote of dados.filhotes){
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${filhote.id || ''}</td>
                    <td>${filhote.especie || ''}</td>
                    <td>${filhote.raca || ''}</td>
                    <td>${filhote.id_interessado || ''}</td>
                    <td>
                            <button type="button" class="btn btn-danger" onclick="excluirFilhote('${filhote.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg></button>

                            <button type="button" class="btn btn-warning" onclick="editarFilhote(${filhote.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg></button>
                        </td>
                `;
                corpoTabela.appendChild(linha);
            }
            tabela.appendChild(corpoTabela);
            espacoTabela.appendChild(tabela);
        } else{
            espacoTabela.innerHTML = "<p>Nenhum Filhote Cadastrado.</p>";
        }
    })
    .catch((erro) => {
        console.error("Erro ao carregar filhotes:" , erro);
        espacoTabela.innerHTML = "<p>Erro ao carregar filhotes.</p>";
    });
}

function excluirFilhote(id){
    if(confirm("Deseja realmente excluir esse Filhote?" + id)){
        fetch("http://localhost:3000/filhote/" + id, {method: "DELETE"})
        .then((resposta) => {
            if(resposta.ok){
                return resposta.json();
            }
        })
        .then((dados) => {
            if(dados.status){
                exibirTabelaFilhotes();
            }
            alert(dados.mensagem);
        })
        .catch((erro) => {
            alert("Não foi possível excluir o Filhote" + erro.message);
        });
    };
};

function editarFilhote(id){
    fetch(`http://localhost:3000/filhote/${id}`, {method: "GET"})
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
        throw new Error("Erro ao carregar Filhote para edição");
    })
    .then((dados) => {
        if(dados.status && dados.filhote){
            const filhote = dados.filhote
            console.log(filhote)

            const especieInput = document.getElementById("especie");
            const racaInput = document.getElementById("raca");
            const interessadoSelect = document.getElementById("id_interessado");

            document.getElementById("especie").value = filhote.especie || '';
            document.getElementById("raca").value = filhote.raca || '';
            document.getElementById("id_interessado").value = filhote.id_interessado || '';

            const formulario = document.getElementById("formFilhote");
            formulario.onsubmit = function(evento){
                atualizarFilhote(evento, id);
            };

            document.getElementById("btnCadastrar").textContent = "Atualizar Cadastro"
        }
    })
    .catch((erro) => {
        alert("Erro ao carregar Filhote para edição" + erro.message);
    });
};

function atualizarFilhote(evento, id){
    evento.stopPropagation();
    evento.preventDefault();

    if(validarFormulario()){
        const especie = document.getElementById("especie").value;
        const raca = document.getElementById("raca").value.trim();
        const id_interessado = document.getElementById("id_interessado").value;

        const dadosFilhote = {
            "id": id,
            "especie": especie,
            "raca": raca,
            "id_interessado": id_interessado
        };

        console.log("Dados do Filhote ", dadosFilhote);

        fetch(`http://localhost:3000/filhote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosFilhote)
        })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if(dados.status){
                const formulario = document.getElementById("formFilhote");
                formulario.reset();
                formulario.onsubmit = gravarFilhote;
                document.getElementById("btnCadastrar").textContent = "Cadastrar";
                exibirTabelaFilhotes();
            }
            alert(dados.mensagem);
        })
        .catch((erro) => {
            alert("Erro ao atualizar Filhote: " + erro.message);
        });
    }
}

function carregarInteressados(){
    fetch("http://localhost:3000/interessado", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok){
            return resposta.json();
        }
        throw new Error("Erro ao carregar interessados");
    })
    .then((dados) => {
        const selectInteressado = document.getElementById("id_interessado");
        selectInteressado.innerHTML = '<option value="">Selecione um interessado</option>';
        
        if(dados.status && dados.interessados){
            console.log(dados.interessados)
            for(const interessado of dados.interessados){
                const option = document.createElement('option');
                option.value = interessado.id;
                option.textContent = interessado.nome;
                selectInteressado.appendChild(option);
            }
        }
    })
    .catch((erro) => {
        console.error("Erro ao carregar interessados:", erro);
        alert("Não foi possível carregar a lista de interessados.");
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formFilhote");
    if (formulario) {
        formulario.onsubmit = gravarFilhote;
    }
    exibirTabelaFilhotes();
    carregarInteressados();
});