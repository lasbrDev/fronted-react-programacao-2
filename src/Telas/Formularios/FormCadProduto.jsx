import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { cadastrarProduto, atualizarProduto } from "../../services/produtoService"

export default function FormCadProduto(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [validado, setValidado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function atualizarProdutoState(evento) {
        const { name, value } = evento.target;
        setProduto({ ...produto, [name]: value });
    }

    async function cadastrar(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            setLoading(true);
            try {
                if (!props.modoEdicao) {
                    // Cadastrar um novo produto
                    await cadastrarProduto(produto);
                    props.setExibirTabela(true);
                } else {
                    // Atualizar um produto existente
                    await atualizarProduto(produto);
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
            } catch (erro) {
                setError("Erro ao salvar o produto. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        } else {
            setValidado(true);
        }
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Código"
                        value={produto.codigo}
                        name="codigo"
                        onChange={atualizarProdutoState}
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
                        onChange={atualizarProdutoState}
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
                        onChange={atualizarProdutoState}
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
                        onChange={atualizarProdutoState}
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
                        onChange={atualizarProdutoState}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a quantidade em estoque!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit" disabled={loading}>
                {loading ? "Carregando..." : props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>{" "}
            <Button variant="secondary" onClick={() => props.setExibirTabela(true)}>
                Voltar
            </Button>
        </Form>
    );
}
