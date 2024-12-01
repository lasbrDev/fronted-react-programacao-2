import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { atualizarProduto, cadastrarProduto } from "../../services/produtoService";

export default function FormularioCadProduto(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        setProduto(props.produtoSelecionado);
    }, [props.produtoSelecionado]);

    function alterarProduto(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setProduto({ ...produto, [nome]: valor });
    }

    function cadastrar(evento) {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                cadastrarProduto(produto).then((resposta) => {
                    if (resposta.status) {
                        props.atualizarListaProdutos([...props.listaProdutos, resposta.produto]);
                        props.setExibirTabela(true);
                    } else {
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o servidor:" + erro.message);
                });
            } else {
                atualizarProduto(produto).then((resposta) => {
                    if (resposta.status) {
                        const listaAtualizada = props.listaProdutos.map(prod => 
                            prod.id === produto.id ? resposta.produto : prod
                        );
                        props.atualizarListaProdutos(listaAtualizada);
                        props.setModoEdicao(false);
                        props.setProdutoSelecionado({
                            id: "",
                            codigo: "",
                            nome: "",
                            descricao: "",
                            preco: "",
                            categoria: "",
                            estoque: "",
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
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Código"
                        value={produto.codigo}
                        id="codigo"
                        name="codigo"
                        onChange={alterarProduto}
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
                        id="nome"
                        name="nome"
                        onChange={alterarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Descrição"
                        value={produto.descricao}
                        id="descricao"
                        name="descricao"
                        onChange={alterarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Preço"
                        value={produto.preco}
                        id="preco"
                        name="preco"
                        onChange={alterarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o preço!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Categoria"
                        value={produto.categoria}
                        id="categoria"
                        name="categoria"
                        onChange={alterarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a categoria!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Estoque:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Estoque"
                        value={produto.estoque}
                        id="estoque"
                        name="estoque"
                        onChange={alterarProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o estoque!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit" className="me-2">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button> 
            <Button variant="secondary" type="button" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Form>
    );
}