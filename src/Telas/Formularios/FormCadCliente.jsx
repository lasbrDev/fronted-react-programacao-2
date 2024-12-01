import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { atualizarCliente, cadastrarCliente } from "../../services/clienteService";

export default function FormularioCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        setCliente(props.clienteSelecionado);
    }, [props.clienteSelecionado]);

    function alterarCliente(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [nome]: valor });
    }

    function cadastrar(evento) {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                cadastrarCliente(cliente).then((resposta) => {
                    if (resposta.status) {
                        props.atualizarListaClientes([...props.listaClientes, resposta.cliente]);
                        props.setExibirTabela(true);
                    } else {
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o servidor:" + erro.message);
                });
            } else {
                atualizarCliente(cliente).then((resposta) => {
                    if (resposta.status) {
                        const listaAtualizada = props.listaClientes.map(cli => 
                            cli.id === cliente.id ? resposta.cliente : cli
                        );
                        props.atualizarListaClientes(listaAtualizada);
                        props.setModoEdicao(false);
                        props.setClienteSelecionado({
                            id: "",
                            cpf: "",
                            nomeCompleto: "",
                            endereco: "",
                            cidade: "",
                            estado: "",
                            cep: "",
                        });
                        props.setExibirTabela(true);
                    } else {
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o backend: " + erro.message);
                });
            }
        } else {
            setValidado(true);
        }
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CPF"
                        value={cliente.cpf}
                        id="cpf"
                        name="cpf"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nome Completo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        value={cliente.nomeCompleto}
                        id="nomeCompleto"
                        name="nomeCompleto"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome completo!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        value={cliente.endereco}
                        id="endereco"
                        name="endereco"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Cidade"
                        value={cliente.cidade}
                        id="cidade"
                        name="cidade"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a cidade!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Estado"
                        value={cliente.estado}
                        id="estado"
                        name="estado"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o estado!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>CEP:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CEP"
                        value={cliente.cep}
                        id="cep"
                        name="cep"
                        onChange={alterarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CEP!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit" className="me-2">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button> 
            <Button variant="secondary" type="button" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Form>
    );
}