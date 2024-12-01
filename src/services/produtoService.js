const urlBase = "http://localhost:4000/api/produtos";

export async function consultarProdutos() {
    try {
        const res = await fetch(urlBase, { method: "GET" });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao consultar produtos: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return dados.produtos; 
    } catch (error) {
        console.error("Erro na função consultarProdutos:", error.message);
        throw error;
    }
}

export async function cadastrarProduto(produto) {
    try {
        const res = await fetch(urlBase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao cadastrar produto: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, produto: dados }; // Retorna o produto cadastrado
    } catch (error) {
        console.error("Erro na função cadastrarProduto:", error.message);
        return { status: false, mensagem: 'Erro ao cadastrar produto.' };
    }
}

export async function atualizarProduto(produto) {
    try {
        const res = await fetch(`${urlBase}/${produto.id}`, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao atualizar produto: ${res.status} - ${errorMessage}`);
        }
        const dados = await res.json();
        return { status: true, produto: dados };
    } catch (error) {
        console.error("Erro na função atualizarProduto:", error.message);
        return { status: false, mensagem: 'Erro ao atualizar produto.' };
    }
}

export async function excluirProduto(id) {
    try {
        const res = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Erro ao excluir produto: ${res.status} - ${errorMessage}`);
        }
        return { status: true };
    } catch (error) {
        console.error("Erro na função excluirProduto:", error.message);
        return { status: false, mensagem: 'Erro ao excluir produto.' };
    }
}