const urlBase = "http://localhost:4000/api/fornecedores";

export async function consultarFornecedores() {
    try {
        const res = await fetch(urlBase, { 
            method: "GET" });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao consultar fornecedores: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return dados.fornecedores; 
    } catch (error) {
        console.error("Erro na função consultarFornecedores:", error.message);
        throw error;
    }
};

export async function cadastrarFornecedor(fornecedor) {
    try {
        const res = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fornecedor)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao cadastrar fornecedor: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, fornecedor: dados }; 
    } catch (error) {
        console.error("Erro na função cadastrarFornecedor:", error.message);
        return { status: false, mensagem: 'Erro ao cadastrar fornecedor.' };
    }
};

export async function atualizarFornecedor(fornecedor) {
    try {
        const res = await fetch(`${urlBase}/${fornecedor.id}`, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fornecedor)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao atualizar fornecedor: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, fornecedor: dados };
    } catch (error) {
        console.error("Erro na função atualizarFornecedor:", error.message);
        return { status: false, mensagem: 'Erro ao atualizar fornecedor.' };
    }
};

export async function excluirFornecedor(id) {
    try {
        const res = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao excluir fornecedor: ${res.status} - ${errorMessage}`);
        }
        return { status: true };
    } catch (error) {
        console.error("Erro na função excluirFornecedor:", error.message);
        return { status: false, mensagem: 'Erro ao excluir fornecedor.' };
    }
};