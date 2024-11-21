import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function FormCadProduto(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [validado, setValidado] = useState(false);

    function atualizarProduto(evento) {
        const { name, value } = evento.target;
        setProduto({ ...produto, [name]: value });
    }

    function cadastrar(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                props.listaProdutos.push(produto);
                props.setExibirTabela(true);
            } else {
                const indice = props.listaProdutos.findIndex(prod => prod.codigo === produto.codigo);
                props.listaProdutos[indice] = produto;
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo: "",
                    nome: "",
                    preco: "",
                    categoria: "",
                    estoque: "",
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
                <Form.Group as={Col} md="4">
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Código"
                        value={produto.codigo}
                        name="codigo"
                        onChange={atualizarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o código!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome"
                        value={produto.nome}
                        name="nome"
                        onChange={atualizarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        step="0.01"
                        placeholder="Preço"
                        value={produto.preco}
                        name="preco"
                        onChange={atualizarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o preço!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Categoria"
                        value={produto.categoria}
                        name="categoria"
                        onChange={atualizarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a categoria!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Estoque:</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Estoque"
                        value={produto.estoque}
                        name="estoque"
                        onChange={atualizarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a quantidade em estoque!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>{" "}
            <Button variant="secondary" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Form>
    );
}
