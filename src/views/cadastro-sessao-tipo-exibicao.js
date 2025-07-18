import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL4 } from '../config/axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL4}/sessaotipoexibicoes`;

function CadastroSessaoTipoExibicao() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [idSessao, setIdSessao] = useState('');
  const [idTipoExibicao, setIdTipoExibicao] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdSessao('');
      setIdTipoExibicao('');
    } else {
      setId(dados.id);
      setIdSessao(dados.idSessao);
      setIdTipoExibicao(dados.idTipoExibicao);
    }
  }

  async function salvar() {
    let data = {
      id,
      idSessao,
      idTipoExibicao
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Sessao Tipo de Exibição ${id} cadastrado com sucesso!`);
          navigate(`/listagem-sessao-tipo-exibicao`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Sessao Tipo de Exibição ${id} alterado com sucesso!`);
          navigate(`/listagem-sessao-tipo-exibicao`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setIdSessao(dados.idSessao);
    setIdTipoExibicao(dados.idTipoExibicao);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosSessao, setDadosSessao] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/sessoes`).then((response) => {
      setDadosSessao(response.data);
    });
  }, []);

  const [dadosTipoExibicao, setDadosTipoExibicao] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/TiposDeExibicao`).then((response) => {
      setDadosTipoExibicao(response.data);
    });
  }, []);

  if (!dadosTipoExibicao) return null;
  if (!dadosSessao) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Sessão Tipos de Exibição'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Número da Sessao: *' htmlFor='inputIdSessao'>
                <select
                  type='text'
                  id='inputIdSessao'
                  value={idSessao}
                  className='form-select'
                  name='idSessao'
                  onChange={(e) => setIdSessao(e.target.value)}
                >
                  <option value="">Selecione uma Sessao</option>
                  {dadosSessao.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.id}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Formato de Exibição: *' htmlFor='inputIdTipoExibicao'>
                <select
                  type='text'
                  id='inputTipoExibicao'
                  value={idTipoExibicao}
                  className='form-select'
                  name='idTipoExibicao'
                  onChange={(e) => setIdTipoExibicao(e.target.value)}
                >
                  <option value="">Selecione um Tipo de Exibição</option>
                  {dadosTipoExibicao.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.formatoExibicao}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default CadastroSessaoTipoExibicao;