import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);

    const [validado, setValidado] = useState(false);

    function atualizarCliente(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [nome]: valor });
    }

    function cadastrar(evento) {
        const formulario = evento.currentTarget; 
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                props.listaClientes.push(cliente);
                props.setExibirTabela(true);
            }
            else{
                const indice = props.listaClientes.findIndex((cli) => { return cli.cpf === cliente.cpf });
                props.listaClientes[indice] = cliente;
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    cpf: "",
                    nomeCompleto: "",
                    endereco: "",
                    cidade: "",
                    estado: "",
                    cep: "",
                });
                props.setExibirTabela(true);
            }
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
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
                        onChange={atualizarCliente}
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
                        id="nomeCompleto"
                        name="nomeCompleto"
                        onChange={atualizarCliente}
                        value={cliente.nomeCompleto}
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
                        onChange={atualizarCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cidade"
                        value={cliente.cidade}
                        required
                        id="cidade"
                        name="cidade"
                        onChange={atualizarCliente} />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a cidade.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        required
                        value={cliente.estado}
                        id="estado"
                        name="estado"
                        onChange={atualizarCliente} />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o estado.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Cep:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cep"
                        value={cliente.cep}
                        id="cep"
                        name="cep"
                        onChange={atualizarCliente}
                        required />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o CEP!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">{ props.modoEdicao ? "Atualizar" : "Cadastrar" }</Button> <Button variant="secondary" type="button" onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}