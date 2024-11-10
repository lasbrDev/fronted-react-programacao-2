import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TelaCadastroCliente from "./Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./Telas/TelaCadastroFornecedor";
import TelaCadastroProduto from "./Telas/TelaCadastroProduto";
import TelaLogin from "./Telas/TelaLogin";
import TelaMenu from "./Telas/TelaMenu";
import Tela404 from "./Telas/Tela404";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({
    email: "",
    logado: false
  });

  return (
    <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
      <BrowserRouter>
        <Routes>
          {usuario.logado ? (
            <>
              <Route path="/menu" element={<TelaMenu />} />
              <Route path="/produto" element={<TelaCadastroProduto />} />
              <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
              <Route path="/cliente" element={<TelaCadastroCliente />} />
              <Route path="*" element={<Tela404 />} />
              <Route path="/" element={<Navigate to="/menu" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<TelaLogin />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ContextoUsuario.Provider>
  );
}

export default App;
