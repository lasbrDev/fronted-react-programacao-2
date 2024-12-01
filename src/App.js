import { createContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Clientes from "./Telas/TelaCadastroCliente";
import Fornecedores from "./Telas/TelaCadastroFornecedor";
import Login from "./Telas/Formularios/FormLogin";
import Menu from "./Telas/TelaMenu";
import Produtos from "./Telas/TelaCadastroProduto";
import Tela404 from "./Telas/Tela404";


export const ContextoUsuario = createContext();

function App() {
    const [usuario, setUsuario] = useState({
        email: "admin@admin.com",
        logado: false
    });
    
    const RotaProteginda = ({ children }) => {
        return usuario.logado ? children : <Navigate to="/login" />
    };

    return (
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/menu" element={<RotaProteginda><Menu /></RotaProteginda>} />
                    <Route path="/produto" element={<RotaProteginda><Produtos /></RotaProteginda>} />
                    <Route path="/fornecedor" element={<RotaProteginda><Fornecedores /></RotaProteginda>} />
                    <Route path="/cliente" element={<RotaProteginda><Clientes /></RotaProteginda>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to={usuario.logado ? "/menu" : "/login"} />} />
                    <Route path="*"  element={<Tela404 />} />
                </Routes>
            </BrowserRouter>
        </ContextoUsuario.Provider>
    ); 
};

export default App;