import { useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ContextoUsuario } from "../../App";

export default function FormLogin(props) {
  const { setUsuario } = useContext(ContextoUsuario);
  const emailRef = useRef();
  const senhaRef = useRef();
  const navigate = useNavigate();

  function efetuarLogin(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    const email = emailRef.current.value;
    const senha = senhaRef.current.value;

    if (email === 'admin@admin.com' && senha === 'admin123') {
      setUsuario({
        email: email,
        logado: true
      });
      navigate("/menu"); 
    }
  }  
   
  return (
    <Container className="border m-2 p-2">
      <Form onSubmit={efetuarLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="email" ref={emailRef} />
          <Form.Text className="text-muted">
            Nunca compartilhe suas credenciais de acesso
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Digite sua senha" ref={senhaRef} />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
}