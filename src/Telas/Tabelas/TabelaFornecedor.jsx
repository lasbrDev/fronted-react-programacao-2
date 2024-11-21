import { Button, Container, Table } from "react-bootstrap";

export default function TabelaFornecedor(props) {
    function escolherFornecedorEdicao(fornecedor) {
        props.setFornecedorSelecionado(fornecedor);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    function apagarFornecedor(cnpj) {
        if (window.confirm("Tem certeza que deseja apagar o fornecedor?")) {
            const listaNova = props.listaFornecedores.filter(fornecedor => fornecedor.cnpj !== cnpj);
            props.setListaFornecedores(listaNova);
        }
    }

    return (
        <Container>
            <Button className="mt-3 mb-3" onClick={() => {
                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    cnpj: '',
                    razaoSocial: '',
                    telefone: '',
                    email: '',
                    endereco: '',
                });
                props.setExibirTabela(false);
            }}>Novo Fornecedor</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Razão Social</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaFornecedores.map(fornecedor => (
                        <tr key={fornecedor.cnpj}>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.razaoSocial}</td>
                            <td>{fornecedor.telefone}</td>
                            <td>{fornecedor.email}</td>
                            <td>{fornecedor.endereco}</td>
                            <td>
                                <Button variant="warning" onClick={() => escolherFornecedorEdicao(fornecedor)}>Editar</Button>{" "}
                                <Button variant="danger" onClick={() => apagarFornecedor(fornecedor.cnpj)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
