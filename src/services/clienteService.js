const urlBase = "http://localhost:4000/clientes";

export async function consultarClientes() {
    const res = await fetch(urlBase, { method: "GET" });
    const listaClientes = await res.json();
    return listaClientes;
}

export async function cadastrarCliente(cliente) {
    const res = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    const novoCliente = await res.json();
    return novoCliente;
}

export async function atualizarCliente(cliente) {
    const res = await fetch(urlBase, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    const clienteAtualizado = await res.json();
    return clienteAtualizado;
}

export async function excluirCliente(cpf) {
    const res = await fetch(`${urlBase}/${cpf}`, { method: "DELETE" });
    const clienteExcluido = await res.json();
    return clienteExcluido;
}