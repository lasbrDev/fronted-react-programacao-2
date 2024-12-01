import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { atualizarFornecedor, cadastrarFornecedor } from "../../services/fornecedorService";

export default function FormularioCadFornecedor(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [validado, setValidado] = useState(false);

    useEffect(() => {
        setFornecedor(props.fornecedorSelecionado);
    }, [props.fornecedorSelecionado]);

    function alterarFornecedor(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setFornecedor({ ...fornecedor, [nome]: valor });
    }

    function formatarCNPJ(cnpj) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }

    function formatarTelefone(telefone) {
        return telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    }

    function cadastrar(evento) {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
            const fornecedorFormatado = {
                ...fornecedor,
                cnpj: formatarCNPJ(fornecedor.cnpj),
                telefone: formatarTelefone(fornecedor.telefone)
            };
            if (!props.modoEdicao) {
                cadastrarFornecedor(fornecedorFormatado).then((resposta) => {
                    if (resposta.status) {
                        props.atualizarListaFornecedores([...props.listaFornecedores, resposta.fornecedor]);
                        props.setExibirTabela(true);
                    } else {
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o servidor:" + erro.message);
                });
            } else {
                atualizarFornecedor(fornecedorFormatado).then((resposta) => {
                    if (resposta.status) {
                        const listaAtualizada = props.listaFornecedores.map(forn => 
                            forn.id === fornecedor.id ? resposta.fornecedor : forn
                        );
                        props.atualizarListaFornecedores(listaAtualizada);
                        props.setModoEdicao(false);
                        props.setFornecedorSelecionado({
                            id: "",
                            cnpj: "",
                            razaoSocial: "",
                            telefone: "",
                            email: "",
                            endereco: "",
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
                    <Form.Label>CNPJ:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CNPJ"
                        value={fornecedor.cnpj}
                        id="cnpj"
                        name="cnpj"
                        onChange={alterarFornecedor}
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
                        value={fornecedor.razaoSocial}
                        id="razaoSocial"
                        name="razaoSocial"
                        onChange={alterarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a razão social!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Telefone"
                        value={fornecedor.telefone}
                        id="telefone"
                        name="telefone"
                        onChange={alterarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="E-mail"
                        value={fornecedor.email}
                        id="email"
                        name="email"
                        onChange={alterarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o e-mail!</Form.Control.Feedback>
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
                        onChange={alterarFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit" className="me-2">{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button> 
            <Button variant="secondary" type="button" onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Form>
    );
}