import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { consultarFornecedores } from "../services/fornecedorService";
import Pagina from "../templates/Pagina";
import FormularioCadFornecedor from "./Formularios/FormCadFornecedor";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";

export default function TelaCadastroFornecedor() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [fornecedores, setFornecedores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [situacao, setSituacao] = useState('carregando');
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        id: '',
        cnpj: '',
        razaoSocial: '',
        telefone: '',
        email: '',
        endereco: '',
    });

    useEffect(() => {
        setSituacao('carregando');
        consultarFornecedores()
            .then((listaFornecedores) => {
                if (Array.isArray(listaFornecedores)) {
                    setFornecedores(listaFornecedores);
                    setSituacao('ok');
                } else {
                    throw new Error("Dados inválidos retornados do serviço.");
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar fornecedores:", err.message);
                setSituacao('erro');
            });
    }, []);

    const renderConteudo = () => {
        if (situacao === 'erro') {
            return (
                <Alert variant="danger">Erro ao carregar os fornecedores. Tente novamente mais tarde.</Alert>
            );
        }

        if (situacao === 'carregando') {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Spinner animation="border" />
                    <p>Carregando...</p>
                </div>
            );
        }

        return exibirTabela ? (
            <TabelaFornecedores
                setExibirTabela={setExibirTabela}
                listaFornecedores={fornecedores}
                atualizarListaFornecedores={(novaLista) => setFornecedores(novaLista)}
                setFornecedorSelecionado={setFornecedorSelecionado}
                setModoEdicao={setModoEdicao}
            />
        ) : (
            <FormularioCadFornecedor
                setExibirTabela={setExibirTabela}
                listaFornecedores={fornecedores}
                atualizarListaFornecedores={(novaLista) => setFornecedores(novaLista)}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                fornecedorSelecionado={fornecedorSelecionado}
                setFornecedorSelecionado={setFornecedorSelecionado}
            />
        );
    };

    return (
        <Pagina>
            <Container className="mt-3">
                <h2 className="text-center">Tela de Cadastro de Fornecedores</h2>
                {renderConteudo()}
            </Container>
        </Pagina>
    );
}