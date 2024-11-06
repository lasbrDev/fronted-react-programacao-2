import { Container } from "react-bootstrap";
import imagem from "../assets/images/error404.jpg";
import Pagina from "../templates/Pagina";

export default function Tela404(props) {
    return (
        <Pagina>
            <Container>
                <img src={imagem} alt="Tela 404" />
                <h1>O recurso solicitado não existe!</h1>
            </Container>
        </Pagina>
    )
}