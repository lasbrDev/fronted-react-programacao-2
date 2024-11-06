import { Alert } from 'react-bootstrap';

export default function Cabecalho(props) {
    const username = localStorage.getItem('loggedUser');
    return (
        <div>  
            <Alert className="text-center">
                {props.texto || "Texto não informado"}{username ? ` - Bem-vindo, ${username}!` : ''}
            </Alert>
        </div>
    );
}
