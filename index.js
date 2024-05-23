'use strict';

const createRow = (client) => {
    const newRow = document.createElement('tr')

    console.log(client);

    const nome = document.createElement('td')
    nome.textContent = client.nome

    const email = document.createElement('td')
    email.textContent = client.email

    const celular = document.createElement('td')
    celular.textContent = client.celular

    const cidade = document.createElement('td')
    cidade.textContent = client.cidade

    const tdEditarExcluir = document.createElement('td')

    const btnEditar = document.createElement('button')
    btnEditar.classList.add('green', 'button')
    btnEditar.textContent = 'editar'

    const btnExcluir = document.createElement('button')
    btnExcluir.classList.add('red', 'button')
    btnExcluir.textContent = 'excluir'

    btnExcluir.addEventListener('click', function(){

        deletarContao(client.id)
    })

    newRow.replaceChildren(nome, email, celular, cidade, tdEditarExcluir)
    tdEditarExcluir.replaceChildren(btnEditar, btnExcluir)


    // newRow.innerHTML = `
    //     <td>${client.nome}</td>
    //     <td>${client.email}</td>
    //     <td>${client.celular}</td>
    //     <td>${client.cidade}</td>
    //     <td>
    //         <button type="button" class="button green" id="edit-${index}">Editar</button>
    //         <button type="button" class="button red" id="delete-${index}" >Excluir</button>
    //     </td>
    // `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

document.getElementById('cadastrarCliente').addEventListener('click', function(){
    novoContato()
})

async function novoContato() {

    // const nome = document.getElementById('nome').value
    // const email = document.getElementById('email').value
    // const celular = document.getElementById('celular').value
    // const cidade = document.getElementById('cidade').value

    const novoContatoJSON = {
        nome: "teste",
        email: "teste@teste",
        celular: "teste",
        cidade: "teste",
        }

    await postarCliente(novoContatoJSON)

    
    window.location.reload()
}

async function pegarContatos() {
        const endpoint = 'http://localhost:8080/contatos';
        const api = await fetch(endpoint);
        const listApi = await api.json();
        console.log(listApi);
        return listApi;
    }

async function postarCliente(novoCliente){

    console.log('enviando');

    const endpoint = 'http://localhost:8080/contatos'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCliente)
    };

    try {
        const response = await fetch(endpoint, options);
        return response.ok
    } catch (error) {
        
    }
}

async function deletarContao(id){


    const endpoint = `http://localhost:8080/contatos/${id}`
try {
    const response = await fetch(endpoint, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log(`Filme com ID ${id} deletado com sucesso.`);
    } else {
        console.error(`Erro ao deletar filme com ID ${id}.`);
    }
} catch (error) {
    console.error('Ocorreu um erro durante a solicitação:', error);
}

window.location.reload()
}

async function verificarContatos() {

    let contatos = await pegarContatos()

    contatos.forEach(contato => {
        createRow(contato)
    });
}

verificarContatos()