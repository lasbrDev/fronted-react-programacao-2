import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { consultarProdutos } from "../services/produtoService";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./Formularios/FormCadProduto";
import TabelaProdutos from "./Tabelas/TabelaProdutos";

export default function TelaCadastroProduto() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [situacao, setSituacao] = useState("carregando");
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        id: "",
        codigo: "",
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        estoque: "",
    });

    useEffect(() => {
        setSituacao("carregando");
        consultarProdutos()
            .then((listaProdutos) => {
                if (Array.isArray(listaProdutos)) {
                    setProdutos(listaProdutos);
                    setSituacao("ok");
                } else {
                    throw new Error("Dados inválidos retornados do serviço.");
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar produtos:", err.message);
                setSituacao("erro");
            });
    }, []);

    const renderConteudo = () => {
        if (situacao === "erro") {
            return (
                <Alert variant="danger">
                    Erro ao carregar os produtos. Tente novamente mais tarde.
                </Alert>
            );
        }

        if (situacao === "carregando") {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Spinner animation="border" />
                    <p>Carregando produtos...</p>
                </div>
            );
        }

        return exibirTabela ? (
            <TabelaProdutos
                setExibirTabela={setExibirTabela}
                listaProdutos={produtos}
                atualizarListaProdutos={(novaLista) => setProdutos(novaLista)}
                setProdutoSelecionado={setProdutoSelecionado}
                setModoEdicao={setModoEdicao}
            />
        ) : (
            <FormCadProduto
                setExibirTabela={setExibirTabela}
                listaProdutos={produtos}
                atualizarListaProdutos={(novaLista) => setProdutos(novaLista)}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                produtoSelecionado={produtoSelecionado}
                setProdutoSelecionado={setProdutoSelecionado}   
            />
        );
    };

    return (
        <Pagina>
            <Container className="mt-3">
                <h2>Cadastro de Produtos</h2>
                {renderConteudo()}
            </Container>
        </Pagina>
    );
}
