import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Meunu";

export default function Pagina(props) {         
    return (
        <div>   
            <Container>
                <Cabecalho texto = "Sistema de Controle de Produtos" />
                <Menu />
                { 
                    props.children 
                }
            </Container>
        </div>
    );  
}