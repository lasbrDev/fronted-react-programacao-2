import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { consultarClientes } from "../services/clienteService";
import Pagina from "../templates/Pagina";
import FormularioCadCliente from "./Formularios/FormCadCliente";
import TabelaClientes from "./Tabelas/TabelaClientes";

export default function TelaCadastroCliente() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [situacao, setSituacao] = useState('carregando');
    const [clienteSelecionado, setClienteSelecionado] = useState({
        id: '',
        cpf: '',
        nomeCompleto: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
    });

    useEffect(() => {
        setSituacao('carregando');
        consultarClientes()
            .then((listaClientes) => {
                if (Array.isArray(listaClientes)) {
                    setClientes(listaClientes);
                    setSituacao('ok');
                } else {
                    throw new Error("Dados inválidos retornados do serviço.");
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar clientes:", err.message);
                setSituacao('erro');
            });
    }, []);

    const renderConteudo = () => {
        if (situacao === 'erro') {
            return (
                <Alert variant="danger">Erro ao carregar os clientes. Tente novamente mais tarde.</Alert>
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
            <TabelaClientes
                setExibirTabela={setExibirTabela}
                listaClientes={clientes}
                atualizarListaClientes={(novaLista) => setClientes(novaLista)}
                setClienteSelecionado={setClienteSelecionado}
                setModoEdicao={setModoEdicao}
            />
        ) : (
            <FormularioCadCliente
                setExibirTabela={setExibirTabela}
                listaClientes={clientes}
                atualizarListaClientes={(novaLista) => setClientes(novaLista)}
                modoEdicao={modoEdicao}
                setModoEdicao={setModoEdicao}
                clienteSelecionado={clienteSelecionado}
                setClienteSelecionado={setClienteSelecionado}
            />
        );
    };

    return (
        <Pagina>
            <Container className="mt-3">
                <h2 className="text-center">Tela de Cadastro de Clientes</h2>
                {renderConteudo()}
            </Container>
        </Pagina>
    );
}