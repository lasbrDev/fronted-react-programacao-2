import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { excluirProduto } from "../../services/produtoService";

export default function TabelaProdutos({ 
    setExibirTabela, 
    listaProdutos = [], 
    atualizarListaProdutos, 
    setProdutoSelecionado, 
    setModoEdicao 
}) {
    const [loading, setLoading] = useState(false);

    const escolherProdutoEdicao = (produto) => {
        setProdutoSelecionado(produto);
        setModoEdicao(true);
        setExibirTabela(false);
    };

    const apagarProduto = (id) => {
        if (window.confirm("Tem certeza que deseja apagar o produto?")) {
            setLoading(true);
            excluirProduto(id)
                .then((resposta) => {
                    if (resposta.status) {
                        const listaNova = listaProdutos.filter((produto) => produto.id !== id);
                        atualizarListaProdutos(listaNova);
                    } else {
                        alert(resposta.mensagem);
                    }
                })
                .catch((erro) => {
                    alert("Erro ao se comunicar com o backend: " + erro.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Container>
            <Button
                className="mt-3 mb-3"
                onClick={() => {
                    setModoEdicao(false);
                    setProdutoSelecionado({
                        id: '',
                        codigo: '',
                        nome: '',
                        descricao: '',
                        preco: '',
                        categoria: '',
                        estoque: '',
                    });
                    setExibirTabela(false);
                }}
            >
                Novo Produto
            </Button>
            {loading && <Spinner animation="border" />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProdutos.length > 0 ? (
                        listaProdutos.map((produto, index) => (
                            produto && produto.id ? (
                                <tr key={index}>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.categoria}</td>
                                    <td>{produto.estoque}</td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => apagarProduto(produto.id)}
                                            className="me-2"
                                        >
                                            Apagar
                                        </Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => escolherProdutoEdicao(produto)}
                                            className="me-2"
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            ) : null
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Nenhum produto cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}