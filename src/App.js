import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaCadastroCliente from "./Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./Telas/TelaCadastroFornecedor";
import TelaCadastroProduto from "./Telas/TelaCadastroProduto";
import TelaLogin from "./Telas/TelaLogin";
import TelaMenu from "./Telas/TelaMenu";
import Tela404 from "./Telas/Tela404";

export const ContextoUsuario = createContext();

function App() {
  const [usuario, setUsuario] = useState({
    "email": "admin@admin",
    "logado": false
  });

  if(usuario.logado) {
    return (
      <div className="App">   
        <ContextoUsuario.Provider value={usuario}>
          <BrowserRouter>
            <Routes>
              <Route path="/cadastro-produto" element={<TelaCadastroProduto />} />
              <Route path="/cadastro-fornecedor" element={<TelaCadastroFornecedor />} />
              <Route path="/cadastro-cliente" element={<TelaCadastroCliente />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>
    );
  }
  else {
    return (
      <div className="App">   
        <ContextoUsuario.Provider value={{usuario, setUsuario}}>
          <TelaLogin />
        </ContextoUsuario.Provider>
      </div>
    )
  }
}

export default App;
