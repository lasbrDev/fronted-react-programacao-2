import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadCliente from "./Formularios/FormCadProduto";

export default function TelaCadastroCliente(props) {
    return (
        <Pagina>
            <Container className="mt-2">
                <h2 className="text-center">Tela Cadastro de Clientes</h2>
                <FormCadCliente />
            </Container>
        </Pagina>
    );   
}   