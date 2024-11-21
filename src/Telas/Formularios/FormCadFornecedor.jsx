import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function FormCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [validado, setValidado] = useState(false);

    function atualizarFornecedor(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setFornecedor({ ...fornecedor, [nome]: valor });
    }

    function cadastrar(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                props.listaFornecedores.push(fornecedor);
                props.setExibirTabela(true);
            } else {
                const indice = props.listaFornecedores.findIndex((forn) => forn.cnpj === fornecedor.cnpj);
                props.listaFornecedores[indice] = fornecedor;
                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    cnpj: '',
                    razaoSocial: '',
                    telefone: '',
                    email: '',
                    endereco: '',
                });
                props.setExibirTabela(true);
            }
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>CNPJ:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CNPJ"
                        value={fornecedor.cnpj}
                        id="cnpj"
                        name="cnpj"
                        onChange={atualizarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CNPJ!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Razão Social:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Razão Social"
                        id="razaoSocial"
                        name="razaoSocial"
                        onChange={atualizarFornecedor}
                        value={fornecedor.razaoSocial}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a razão social!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Telefone"
                        value={fornecedor.telefone}
                        id="telefone"
                        name="telefone"
                        onChange={atualizarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="E-mail"
                        value={fornecedor.email}
                        required
                        id="email"
                        name="email"
                        onChange={atualizarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe um e-mail válido!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        value={fornecedor.endereco}
                        id="endereco"
                        name="endereco"
                        onChange={atualizarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>{" "}
            <Button variant="secondary" type="button" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Form>
    );
}
