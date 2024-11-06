import FormLogin from "./Formularios/FormLogin";
import { Container } from "react-bootstrap";

export default function TelaLogin() {
    return (
        <Container className="w-25 d-flex justify-content-center align-items-center">
            <FormLogin />
        </Container>
    );
}
