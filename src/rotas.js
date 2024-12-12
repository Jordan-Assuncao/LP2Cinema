import React from 'react';

import ListagemAssento from './views/listagem-assentos';
import ListagemClassificacaoIndicativa from './views/listagem-classificacoes-indicativa';
import ListagemCliente from './views/listagem-clientes';
import ListagemFilme from './views/listagem-filmes';
import ListagemGeneros from './views/listagem-generos';
import ListagemPreco from './views/listagem-precos';
import ListagemSala from './views/listagem-salas';
import ListagemSessao from './views/listagem-sessoes';
import ListagemTipoDeAssento from './views/listagem-tipos-assento';
import ListagemTipoDeExibicao from './views/listagem-tipos-exibicao';
import ListagemUnidade from './views/listagem-unidades';
import ListagemUsuarioAdmin from './views/listagem-usuariosadmin';
import ListagemCompra from './views/listagem-compras';
import ListagemIngresso from './views/listagem-ingressos';
import ListagemSessaoTipoExibicao from './views/listagem-sessao-tipo-exibicao';
import ListagemFilmeGenero from './views/listagem-filmegeneros';

import CadastroGenero from './views/cadastro-genero';


import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-genero/:idParam?' element={<CadastroGenero />} />

      
        <Route path='/listagem-assentos' element={<ListagemAssento />} />
        <Route path='/listagem-classificacoes-indicativa' element={<ListagemClassificacaoIndicativa />} />
        <Route path='/listagem-clientes' element={<ListagemCliente />} />
        <Route path='/listagem-filmes' element={<ListagemFilme />} />
        <Route path='/listagem-generos' element={<ListagemGeneros />} />
        <Route path='/listagem-precos' element={<ListagemPreco />} />
        <Route path='/listagem-salas' element={<ListagemSala />} />
        <Route path='/listagem-sessoes' element={<ListagemSessao />} />
        <Route path='/listagem-tipos-assento' element={<ListagemTipoDeAssento />} />
        <Route path='/listagem-tipos-exibicao' element={<ListagemTipoDeExibicao />} />
        <Route path='/listagem-unidades' element={<ListagemUnidade />} />
        <Route path='/listagem-usuariosadmin' element={<ListagemUsuarioAdmin />} />
        <Route path='/listagem-compras' element={<ListagemCompra />} />
        <Route path='/listagem-ingressos' element={<ListagemIngresso />} />
        <Route path='/listagem-filmegeneros' element={<ListagemFilmeGenero />} />
        <Route path='/listagem-sessao-tipo-exibicao' element={<ListagemSessaoTipoExibicao />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;