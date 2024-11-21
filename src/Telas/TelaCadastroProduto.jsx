import { useState } from "react";
import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./Formularios/FormCadProduto";
import TabelaProdutos from "./Tabelas/TabelaProdutos";

export default function TelaCadastroProduto() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: "",
        nome: "",
        preco: "",
        categoria: "",
        estoque: "",
    });

    return (
        <Pagina>
            <Container>
                <h2 className="text-center">Tela de Cadastro de Produtos</h2>
                {exibirTabela ? (
                    <TabelaProdutos
                        setExibirTabela={setExibirTabela}
                        listaProdutos={produtos}
                        setListaProdutos={setProdutos}
                        setProdutoSelecionado={setProdutoSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                ) : (
                    <FormCadProduto
                        setExibirTabela={setExibirTabela}
                        listaProdutos={produtos}
                        setListaProdutos={setProdutos}
                        produtoSelecionado={produtoSelecionado}
                        setProdutoSelecionado={setProdutoSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Container>
        </Pagina>
    );
}
