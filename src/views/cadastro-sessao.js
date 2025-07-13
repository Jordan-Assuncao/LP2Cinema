import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';
import { BASE_URL3 } from '../config/axios';
const baseURL = `${BASE_URL}/sessoes`;

function CadastroSessao() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [dataSessao, setDataSessao] = useState('');
  const [horaSessao, setHoraSessao] = useState('');
  const [statusSessao, setStatusSessao] = useState('');
  const [dublado, setDublado] = useState('');
  const [legendado, setLegendado] = useState('');
  const [idUnidade, setIdUnidade] = useState('');
  const [idSala, setIdSala] = useState('');
  const [idPreco, setIdPreco] = useState('');
  const [idFilme, setIdFilme] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDataSessao('');
      setHoraSessao('');
      setStatusSessao('');
      setDublado('');
      setLegendado('');
      setIdSala('');
      setIdPreco('');
      setIdFilme('');
      setIdUnidade('');
    } else {
      setId(dados.id);
      setDataSessao(dados.dataSessao);
      setHoraSessao(dados.horaSessao);
      setStatusSessao(dados.statusSessao);
      setDublado(dados.dublado);
      setLegendado(dados.legendado);
      setIdSala(dados.idSala);
      setIdPreco(dados.idPreco);
      setIdFilme(dados.idFilme);
      setIdUnidade(dados.idUnidade);
    }
  }

  async function salvar() {
    let data = {
      id,
      dataSessao,
      horaSessao,
      statusSessao,
      dublado,
      legendado,
      idSala,
      idPreco,
      idFilme,
      idUnidade
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Sessâo ${id} cadastrado com sucesso!`);
          navigate(`/listagem-sessoes`);
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
          mensagemSucesso(`Sessao ${id} alterado com sucesso!`);
          navigate(`/listagem-sessoes`);
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
    setDataSessao(dados.dataSessao);
    setHoraSessao(dados.horaSessao);
    setStatusSessao(dados.statusSessao);
    setDublado(dados.dublado);
    setLegendado(dados.legendado);
    setIdSala(dados.idSala);
    setIdPreco(dados.idPreco);
    setIdFilme(dados.idFilme);
    setIdUnidade(dados.idUnidade)
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosUnidades, setDadosUnidades] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL2}/unidades`).then((response) => {
      setDadosUnidades(response.data);
    });
  }, []);

  const [dadosSalas, setDadosSalas] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL2}/salas`).then((response) => {
      setDadosSalas(response.data);
    });
  }, []);

  const [dadosPrecos, setDadosPrecos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/precos`).then((response) => {
      setDadosPrecos(response.data);
    });
  }, []);

  const [dadosFilmes, setDadosFilmes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/filmes`).then((response) => {
      setDadosFilmes(response.data);
    });
  }, []);

  const [tipoExibicao, setTipoExibicao] = React.useState([]);
  const [dadosTipoExibicao, setDadosTipoExibicao] = React.useState([]);

  // Exemplo de carregamento dos tipos de exibição
  useEffect(() => {
    axios.get(`${BASE_URL}/tipoexibicoes`).then((response) => {
      setDadosTipoExibicao(response.data);
    });
  }, []);

  if (!dadosTipoExibicao) return null;
  if (!dadosFilmes) return null;
  if (!dadosPrecos) return null;
  if (!dadosUnidades) return null;
  if (!dadosSalas) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Sessão'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Unidade: *' htmlFor='inputIdUnidade'>
                <select
                  type='text'
                  id='inputIdUnidade'
                  value={idUnidade}
                  className='form-select'
                  name='idUnidade'
                  onChange={(e) => setIdUnidade(e.target.value)}
                >
                  <option value="">Selecione uma Unidade</option>
                  {dadosUnidades.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeUnidade}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Data da Sessao: *' htmlFor='inputDataSessao'>
                <input
                  type='text'
                  id='inputDataSessao'
                  value={dataSessao}
                  className='form-control'
                  name='dataSessao'
                  onChange={(e) => setDataSessao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Hora da Sessão: *' htmlFor='inputHoraSessao'>
                <input
                  type='text'
                  id='inputHoraSessao'
                  value={horaSessao}
                  className='form-control'
                  name='horaSessao'
                  onChange={(e) => setHoraSessao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Status da Sessão *">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Ativa"
                      checked={statusSessao === true}
                      onChange={() => setStatusSessao(true)}
                    />
                    <label htmlFor="Ativa" className="ms-2">Ativa</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Inativa"
                      checked={statusSessao === false}
                      onChange={() => setStatusSessao(false)}
                    />
                    <label htmlFor="Inativa" className="ms-2">Inativa</label>
                  </div>
                </div>
              </FormGroup>
              <FormGroup label="Aúdio *">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Dublado"
                      checked={dublado === true}
                      onChange={() => setDublado(!dublado)}
                    />
                    <label htmlFor="Dublado" className="ms-2">Dublado</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Legendado"
                      checked={legendado === true}
                      onChange={() => setLegendado(!legendado)}
                    />
                    <label htmlFor="Legendado" className="ms-2">Legendado</label>
                  </div>
                </div>
              </FormGroup>
              <FormGroup label='Número da Sala: *' htmlFor='inputIdSala'>
                <select
                  type='text'
                  id='inputIdSala'
                  value={idSala}
                  className='form-select'
                  name='idsala'
                  onChange={(e) => setIdSala(e.target.value)}
                >
                  <option value="">Selecione uma Sala</option>
                  {dadosSalas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numeroSala}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Preço da Sessão: *' htmlFor='inputIdPreco'>
                <select
                  type='text'
                  id='inputIdPreco'
                  value={idPreco}
                  className='form-select'
                  name='idPreco'
                  onChange={(e) => setIdPreco(e.target.value)}
                >
                  <option value="">Selecione um Preço</option>
                  {dadosPrecos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.valorInteira}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Titulo do Filme: *' htmlFor='inputIdFilme'>
                <select
                  type='text'
                  id='inputIdFilme'
                  value={idFilme}
                  className='form-select'
                  name='idFilme'
                  onChange={(e) => setIdFilme(e.target.value)}
                >
                  <option value="">Selecione um Filme</option>
                  {dadosFilmes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label="Tipos de Exibição da Sessão: *" htmlFor="inputTipoExibicao">
                <div className="d-flex gap-3">
                  {dadosTipoExibicao.map((tipo) => (
                    <div key={tipo.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`tipoExibicao-${tipo.id}`}
                        value={tipo.id}
                        checked={tipoExibicao.includes(tipo.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTipoExibicao([...tipoExibicao, tipo.id]); // Adiciona a opção
                          } else {
                            setTipoExibicao(tipoExibicao.filter((id) => id !== tipo.id)); // Remove a opção
                          }
                        }}
                        disabled={tipo.formatoUnico && tipoExibicao.length > 0 && !tipoExibicao.includes(tipo.id)}
                      />
                      <label className="form-check-label" htmlFor={`tipoExibicao-${tipo.id}`}>
                        {tipo.formatoExibicao}
                      </label>
                    </div>
                  ))}
                </div>
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
export default CadastroSessao;