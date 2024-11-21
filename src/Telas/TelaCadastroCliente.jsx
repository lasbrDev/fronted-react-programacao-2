import { useState } from "react";
import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormularioCadCliente from "./Formularios/FormCadCliente";
import TabelaClientes from "./Tabelas/TabelaClientes";


export default function TelaCadastroCliente(){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        cpf: '',
        nomeCompleto: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
    });
    return (
        <Pagina>
            <Container mt-3>
                <h2 className="text-center">Tela de Cadastro de Clientes</h2>
                {
                  exibirTabela ? <TabelaClientes 
                                  setExibirTabela={setExibirTabela}
                                  listaClientes={clientes}
                                  setListaClientes={setClientes}
                                  setClienteSelecionado={setClienteSelecionado}
                                  setModoEdicao={setModoEdicao}/> 

                               : <FormularioCadCliente 
                                 setExibirTabela={setExibirTabela}
                                 listaClientes={clientes}
                                 modoEdicao={modoEdicao}
                                 setModoEdicao={setModoEdicao}
                                 clienteSelecionado={clienteSelecionado}
                                 setClienteSelecionado={setClienteSelecionado}/>
                }
            </Container>
        </Pagina>
    )
}