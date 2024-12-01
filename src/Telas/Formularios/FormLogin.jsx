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

    if (email === 'admin@admin.com' && senha === 'admin@123') {
      setUsuario({
        email: email,
        logado: true
      });
      navigate("/menu"); 
    }
  }  
   
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Form onSubmit={efetuarLogin} className="w-50 border p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
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
        <Button variant="primary" type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
}