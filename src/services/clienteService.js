const urlBase = "http://localhost:4000/api/clientes";

export async function consultarClientes() {
    try {
        const res = await fetch(urlBase, { method: "GET" });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao consultar clientes: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return dados.clientes; 
    } catch (error) {
        console.error("Erro na função consultarClientes:", error.message);
        throw error;
    }
}

export async function cadastrarCliente(cliente) {
    try {
        const res = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao cadastrar cliente: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, cliente: dados }; 
    } catch (error) {
        console.error("Erro na função cadastrarCliente:", error.message);
        return { status: false, mensagem: 'Erro ao cadastrar cliente.' };
    }
}

export async function atualizarCliente(cliente) {
    try {
        const res = await fetch(`${urlBase}/${cliente.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao atualizar cliente: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, cliente: dados };
    } catch (error) {
        console.error("Erro na função atualizarCliente:", error.message);
        return { status: false, mensagem: 'Erro ao atualizar cliente.' };
    }
}

export async function excluirCliente(id) {
    try {
        const res = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao excluir cliente: ${res.status} - ${errorMessage}`);
        }
        return { status: true };
    } catch (error) {
        console.error("Erro na função excluirCliente:", error.message);
        return { status: false, mensagem: 'Erro ao excluir cliente.' };
    }
}