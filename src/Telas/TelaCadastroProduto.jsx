import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./Formularios/FormCadProduto";

export default function TelaCadastroProduto(props) {
    return (
        <Pagina>
            <Container>
                <h2 className="text-center">Tela Cadastro de Produtos</h2>
                <FormCadProduto />
            </Container>
        </Pagina>
    );
}