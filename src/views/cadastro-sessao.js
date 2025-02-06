import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
const baseURL = `${BASE_URL}/sessoes`;

function CadastroSessao() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [dataSessao, setDataSessao] = useState('');
  const [horaSessao, setHoraSessao] = useState('');
  const [statusSessao, setStatusSessao] = useState('');
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
      setIdSala('');
      setIdPreco('');
      setIdFilme('');
    } else {
      setId(dados.id);
      setDataSessao(dados.dataSessao);
      setHoraSessao(dados.horaSessao);
      setStatusSessao(dados.statusSessao);
      setIdSala(dados.idSala);
      setIdPreco(dados.idPreco);
      setIdFilme(dados.idFilme);
    }
  }

  async function salvar() {
    let data = {
      id,
      dataSessao,
      horaSessao,
      statusSessao,
      idSala,
      idPreco,
      idFilme
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
    setIdSala(dados.idSala);
    setIdPreco(dados.idPreco);
    setIdFilme(dados.idFilme);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Sessão'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
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
                      id="Ativa"
                      checked={statusSessao === true}
                      onChange={() => setStatusSessao(true)}
                    />
                    <label htmlFor="Ativa" className="ms-2">Ativa</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Inativa"
                      checked={statusSessao === false}
                      onChange={() => setStatusSessao(false)}
                    />
                    <label htmlFor="Inativa" className="ms-2">Inativa</label>
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
                  <option key={idSala} value={idSala}>
                    {idSala}
                  </option>
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
                  <option key={idPreco} value={idPreco}>
                    {idPreco}
                  </option>
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
                  <option key={idFilme} value={idFilme}>
                    {idFilme}
                  </option>
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
export default CadastroSessao;