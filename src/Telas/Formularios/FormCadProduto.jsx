import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function FormCadProduto(props) {
    const [validado, setValidado] = useState(false);

    function cadastrar(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setValidado(false);
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <h2>Cadastro de Produto</h2>
            <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="codigoProduto">
                    <Form.Label>Código do Produto</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Código do Produto"
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o código do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="descricaoProduto">
                    <Form.Label>Descrição do Produto</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Descrição"
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="categoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control required type="text" placeholder="Categoria" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a categoria.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control required type="text" placeholder="Marca" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a marca.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="modelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control required type="text" placeholder="Modelo" />
                    <Form.Control.Feedback type="invalid">Por favor, informe o modelo.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="unidadeMedida">
                    <Form.Label>Unidade de Medida</Form.Label>
                    <Form.Control required type="text" placeholder="Unidade de Medida" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a unidade de medida.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="estoque">
                    <Form.Label>Estoque</Form.Label>
                    <Form.Control required type="number" placeholder="Estoque" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a quantidade em estoque.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="precoCusto">
                    <Form.Label>Preço de Custo</Form.Label>
                    <Form.Control required type="text" placeholder="Preço de Custo" />
                    <Form.Control.Feedback type="invalid">Por favor, informe o preço de custo.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="precoVenda">
                    <Form.Label>Preço de Venda</Form.Label>
                    <Form.Control required type="text" placeholder="Preço de Venda" />
                    <Form.Control.Feedback type="invalid">Por favor, informe o preço de venda.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <h3>Dados Adicionais</h3>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="fotoProduto">
                    <Form.Label>Foto do Produto</Form.Label>
                    <Form.Control required type="file" />
                    <Form.Control.Feedback type="invalid">Por favor, selecione uma foto do produto.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="dimensoes">
                    <Form.Label>Dimensões</Form.Label>
                    <Form.Control required type="text" placeholder="Dimensões" />
                    <Form.Control.Feedback type="invalid">Por favor, informe as dimensões.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="peso">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control required type="text" placeholder="Peso" />
                    <Form.Control.Feedback type="invalid">Por favor, informe o peso.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="cor">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control required type="text" placeholder="Cor" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a cor.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="material">
                    <Form.Label>Material</Form.Label>
                    <Form.Control required type="text" placeholder="Material" />
                    <Form.Control.Feedback type="invalid">Por favor, informe o material.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="garantia">
                    <Form.Label>Garantia</Form.Label>
                    <Form.Control required type="text" placeholder="Garantia" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a garantia.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="origem">
                    <Form.Label>Origem</Form.Label>
                    <Form.Control required type="text" placeholder="Origem" />
                    <Form.Control.Feedback type="invalid">Por favor, informe a origem do produto.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button type="submit">Cadastrar Produto</Button>
        </Form>
    );
}