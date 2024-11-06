import { Alert } from 'react-bootstrap';

export default function Cabecalho(props) {
    return (
        <div>  
            <Alert className="text-center">{ props.texto || "texto não informado"}</Alert>
        </div>
    );
}
