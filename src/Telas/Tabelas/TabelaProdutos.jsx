import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props) {
    function escolherProdutoEdicao(produto) {
        props.setProdutoSelecionado(produto);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    function apagarProduto(codigo) {
        if (window.confirm("Tem certeza que deseja apagar o produto?")) {
            const listaNova = props.listaProdutos.filter(prod => prod.codigo !== codigo);
            props.setListaProdutos(listaNova);
        }
    }

    return (
        <Container>
            <Button className="mt-3 mb-3" onClick={() => {
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo: "",
                    nome: "",
                    preco: "",
                    categoria: "",
                    estoque: "",
                });
                props.setExibirTabela(false);
            }}>Novo Produto</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaProdutos.map(produto => (
                        <tr key={produto.codigo}>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.categoria}</td>
                            <td>{produto.estoque}</td>
                            <td>
                                <Button variant="warning" onClick={() => escolherProdutoEdicao(produto)}>Editar</Button>{" "}
                                <Button variant="danger" onClick={() => apagarProduto(produto.codigo)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
