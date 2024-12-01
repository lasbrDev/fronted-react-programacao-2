const urlBase = "http://localhost:4000/api/produtos";

export async function consultarProdutos() {
    const res = await fetch(urlBase, { method: "GET" });
    if (!res.ok) throw new Error("Erro ao consultar produtos");
    const listaProdutos = await res.json();
    return listaProdutos;
};

export async function cadastrarProduto(produto) {
    const res = await fetch(urlBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });
    if (!res.ok) throw new Error("Erro ao cadastrar produto");
    const novoProduto = await res.json();
    return novoProduto;
};

export async function atualizarProduto(produto) {
    const res = await fetch(urlBase, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });
    if (!res.ok) throw new Error("Erro ao atualizar produto");
    const produtoAtualizado = await res.json();
    return produtoAtualizado;
};

export async function excluirProduto(codigo) {
    const res = await fetch(`${urlBase}/${codigo}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir produto");
    const produtoExcluido = await res.json();
    return produtoExcluido;
};