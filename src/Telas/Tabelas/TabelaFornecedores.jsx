import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { excluirFornecedor } from "../../services/fornecedorService";

export default function TabelaFornecedores({
    setExibirTabela,
    listaFornecedores = [],
    atualizarListaFornecedores,
    setFornecedorSelecionado,
    setModoEdicao
}) {
    const [loading, setLoading] = useState(false);

    const escolherFornecedorEdicao = (fornecedor) => {
        setFornecedorSelecionado(fornecedor);
        setModoEdicao(true);
        setExibirTabela(false);
    };

    const apagarFornecedor = (id) => {
        if (window.confirm("Tem certeza que deseja apagar o fornecedor?")) {
            setLoading(true);
            excluirFornecedor(id)
                .then((response) => {
                    if (response.status) {
                        const novaLista = listaFornecedores.filter(fornecedor => fornecedor.id !== id);
                        atualizarListaFornecedores(novaLista);
                    } else {
                        alert(response.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o servidor: " + erro.message);
                }).finally(() => {
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
                    setFornecedorSelecionado({
                        id: '',
                        cnpj: '',
                        razaoSocial: '',
                        telefone: '',
                        email: '',
                        endereco: '',
                    });
                    setExibirTabela(false);
                }}
            >
                Novo Fornecedor
            </Button>
            {loading && <Spinner animation="border" />}
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
                    {listaFornecedores.length > 0 ? (
                        listaFornecedores.map((fornecedor, index) => (
                            <tr key={index}>
                                <td>{fornecedor.cnpj}</td>
                                <td>{fornecedor.razaoSocial}</td>
                                <td>{fornecedor.telefone}</td>
                                <td>{fornecedor.email}</td>
                                <td>{fornecedor.endereco}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => apagarFornecedor(fornecedor.id)}
                                        className="me-2"
                                    >
                                        Apagar
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => escolherFornecedorEdicao(fornecedor)}
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Nenhum fornecedor encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}