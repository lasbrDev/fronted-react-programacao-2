import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { excluirCliente } from "../../services/clienteService";

export default function TabelaClientes({ 
    setExibirTabela, 
    listaClientes = [], 
    atualizarListaClientes, 
    setClienteSelecionado, 
    setModoEdicao 
}) {
    const [loading, setLoading] = useState(false);

    const escolherClienteEdicao = (cliente) => {
        setClienteSelecionado(cliente);
        setModoEdicao(true);
        setExibirTabela(false);
    };

    const apagarCliente = (id) => {
        if (window.confirm("Tem certeza que deseja apagar o cliente?")) {
            setLoading(true);
            excluirCliente(id)
                .then((resposta) => {
                    if (resposta.status) {
                        const listaNova = listaClientes.filter((cliente) => cliente.id !== id);
                        atualizarListaClientes(listaNova);
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
            <Button className="mt-3 mb-3" onClick={() => {
                setModoEdicao(false);
                setClienteSelecionado({
                    id: '',
                    cpf: '',
                    nomeCompleto: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                });
                setExibirTabela(false);
            }}>
                Novo Cliente
            </Button>
            {loading && <Spinner animation="border" />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome Completo</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>CEP</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaClientes.length > 0 ? (
                        listaClientes.map((cliente, index) => (
                            cliente && cliente.id ? (
                                <tr key={index}>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.nomeCompleto}</td>
                                    <td>{cliente.endereco}</td>
                                    <td>{cliente.cidade}</td>
                                    <td>{cliente.estado}</td>
                                    <td>{cliente.cep}</td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => apagarCliente(cliente.id)}
                                            className="me-2"
                                        >
                                            Apagar
                                        </Button>
                                        <Button
                                            variant="warning"
                                            onClick={() => escolherClienteEdicao(cliente)}
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
                                Nenhum cliente cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}