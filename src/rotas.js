import React from 'react';

import CadastroAssento from './views/cadastro-assento';
import CadastroClassificacaoIndicativa from './views/cadastro-classificacao-indicativa';
import CadastroCliente from './views/cadastro-cliente';
import CadastroCompra from './views/cadastro-compra';
import CadastroFilme from './views/cadastro-filme';
import CadastroFilmeGenero from './views/cadastro-filmegenero';
import CadastroGenero from './views/cadastro-genero';
import CadastroIngresso from './views/cadastro-ingresso';
import CadastroPreco from './views/cadastro-preco';
import CadastroSala from './views/cadastro-sala';
import CadastroSessaoTipoExibicao from './views/cadastro-sessao-tipo-exibicao';
import CadastroSessao from './views/cadastro-sessao';
import CadastroTipoDeAssento from './views/cadastro-tipo-assento';
import CadastroFormatoExibicao from './views/cadastro-tipo-exibicao';
import CadastroUnidade from './views/cadastro-unidade';
import CadastroUsuarioAdmin from './views/cadastro-usuarioadmin';

import ListagemAssento from './views/listagem-assentos';
import ListagemClassificacaoIndicativa from './views/listagem-classificacoes-indicativa';
import ListagemCliente from './views/listagem-clientes';
import ListagemCompra from './views/listagem-compras';
import ListagemFilme from './views/listagem-filmes';
import ListagemFilmeGenero from './views/listagem-filmegeneros';
import ListagemGeneros from './views/listagem-generos';
import ListagemIngresso from './views/listagem-ingressos';
import ListagemPreco from './views/listagem-precos';
import ListagemSala from './views/listagem-salas';
import ListagemSessaoTipoExibicao from './views/listagem-sessao-tipo-exibicao';
import ListagemSessao from './views/listagem-sessoes';
import ListagemTipoDeAssento from './views/listagem-tipos-assento';
import ListagemTipoDeExibicao from './views/listagem-tipos-exibicao';
import ListagemUnidade from './views/listagem-unidades';
import ListagemUsuarioAdmin from './views/listagem-usuariosadmin';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-assento/:idParam?' element={<CadastroAssento />} />
        <Route path='/cadastro-classificacao-indicativa/:idParam?' element={<CadastroClassificacaoIndicativa />} />
        <Route path='/cadastro-cliente/:idParam?' element={<CadastroCliente />} />
        <Route path='/cadastro-compra/:idParam?' element={<CadastroCompra />} />
        <Route path='/cadastro-filme/:idParam?' element={<CadastroFilme />} />
        <Route path='/cadastro-filmegenero/:idParam?' element={<CadastroFilmeGenero />} />
        <Route path='/cadastro-genero/:idParam?' element={<CadastroGenero />} />
        <Route path='/cadastro-ingresso/:idParam?' element={<CadastroIngresso />} />
        <Route path='/cadastro-preco/:idParam?' element={<CadastroPreco />} />
        <Route path='/cadastro-sala/:idParam?' element={<CadastroSala />} />
        <Route path='/cadastro-sessao-tipo-exibicao/:idParam?' element={<CadastroSessaoTipoExibicao />} />
        <Route path='/cadastro-sessao/:idParam?' element={<CadastroSessao />} />
        <Route path='/cadastro-tipo-assento/:idParam?' element={<CadastroTipoDeAssento />} />
        <Route path='/cadastro-tipo-exibicao/:idParam?' element={<CadastroFormatoExibicao />} />
        <Route path='/cadastro-unidade/:idParam?' element={<CadastroUnidade />} />
        <Route path='/cadastro-usuarioadmin/:idParam?' element={<CadastroUsuarioAdmin />} />

        <Route path='/listagem-assentos' element={<ListagemAssento/>} />
        <Route path='/listagem-classificacoes-indicativa' element={<ListagemClassificacaoIndicativa />} />
        <Route path='/listagem-clientes' element={<ListagemCliente />} />
        <Route path='/listagem-compras' element={<ListagemCompra />} />
        <Route path='/listagem-filmes' element={<ListagemFilme />} />
        <Route path='/listagem-filmegeneros' element={<ListagemFilmeGenero />} />
        <Route path='/listagem-generos' element={<ListagemGeneros />} />
        <Route path='/listagem-ingressos' element={<ListagemIngresso />} />
        <Route path='/listagem-precos' element={<ListagemPreco />} />
        <Route path='/listagem-salas' element={<ListagemSala />} />
        <Route path='/listagem-sessao-tipo-exibicao' element={<ListagemSessaoTipoExibicao />} />
        <Route path='/listagem-sessoes' element={<ListagemSessao />} />
        <Route path='/listagem-tipos-assento' element={<ListagemTipoDeAssento />} />
        <Route path='/listagem-tipos-exibicao' element={<ListagemTipoDeExibicao />} />
        <Route path='/listagem-unidades' element={<ListagemUnidade />} />
        <Route path='/listagem-usuariosadmin' element={<ListagemUsuarioAdmin />} />
      
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;