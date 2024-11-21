import { useState } from "react";
import Pagina from "../templates/Pagina";
import { Container } from "react-bootstrap";
import FormularioCadFornecedor from "./Formularios/FormCadFornecedor";
import TabelaFornecedores from "./Tabelas/TabelaFornecedor";

export default function TelaCadastroFornecedor() {
    const [exibirTablea, setExibirTabela] = useState(true);
    const [fornecedores, setFornecedores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        cnpj: "",
        razaoSocial: "",
        endereco: "",
        email: "",
        telefone: "",
    });
    return (
        <Pagina>
            <Container>
                <h2 className="text-center">Tela de Cadastro de Fornecedores</h2>
                {exibirTablea ? (
                    <TabelaFornecedores
                        setExibirTabela={setExibirTabela}
                        listaFornecedores={fornecedores}
                        setListaFornecedores={setFornecedores}
                        setFornecedorSelecionado={setFornecedorSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                ) : (
                    <FormularioCadFornecedor
                        setExibirTabela={setExibirTabela}
                        listaFornecedores={fornecedores}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        fornecedorSelecionado={fornecedorSelecionado}
                        setFornecedorSelecionado={setFornecedorSelecionado}
                    />
                )}
            </Container>
        </Pagina>
    );
}