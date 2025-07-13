import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { BASE_URL2 } from '../config/axios';
const baseURL = `${BASE_URL}/ingressos`;

function CadastroIngresso() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [tipoIngresso, setTipoIngresso] = useState('');
  const [idUnidade, setIdUnidade] = useState("");
  const [idSala, setIdSala] = useState("");
  const [idAssento, setIdAssento] = useState("");
  const [idFilme, setIdFilme] = useState("");
  const [idSessao, setIdSessao] = useState('');
  const [idCompra, setIdCompra] = useState("");

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipoIngresso('');
      setIdUnidade('')
      setIdSala('')
      setIdAssento('');
      setIdFilme('')
      setIdSessao('');
      setIdCompra('');
    } else {
      setId(dados.id);
      setTipoIngresso(dados.tipoIngresso);
      setIdUnidade(dados.idUnidade);
      setIdSala(dados.idSala);
      setIdAssento(dados.idAssento);
      setIdFilme(dados.idFilme);
      setIdSessao(dados.idSessao);
      setIdCompra(dados.idCompra);
    }
  }

  async function salvar() {
    let data = {
      id,
      tipoIngresso,
      idUnidade,
      idSala,
      idAssento,
      idFilme,
      idSessao,
      idCompra
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ingresso ${id} cadastrado com sucesso!`);
          navigate(`/listagem-ingressos`);
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
          mensagemSucesso(`Ingresso ${id} alterado com sucesso!`);
          navigate(`/listagem-ingressos`);
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
    setTipoIngresso(dados.tipoIngresso === 1);
    setIdUnidade(dados.idUnidade);
    setIdSala(dados.idSala);
    setIdAssento(dados.idAssento);
    setIdFilme(dados.idFilme);
    setIdSessao(dados.idSessao);
    setIdCompra(dados.idCompra);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosAssentos, setDadosAssentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL2}/assentos`).then((response) => {
      setDadosAssentos(response.data);
    });
  }, []);

  const [dadosSessao, setDadosSessao] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/sessoes`).then((response) => {
      setDadosSessao(response.data);
    });
  }, []);

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

  const [dadosCompra, setDadosCompra] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/compras`).then((response) => {
      setDadosCompra(response.data);
    });
  }, []);


  if (!dadosCompra) return null;
  if (!dadosUnidades) return null;
  if (!dadosSalas) return null;
  if (!dadosSessao) return null;
  if (!dadosAssentos) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Ingressos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label="Unidade: *" htmlFor="inputIdUnidade">
                <select
                  id="inputIdUnidade"
                  value={idUnidade}
                  className="form-select"
                  name="idUnidade"
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
              <FormGroup label="Número da sala: *" htmlFor="inputIdSala">
                <select
                  id="inputIdSala"
                  value={idSala}
                  className="form-select"
                  name="idSala"
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
              <FormGroup
                label='Sessao: *'
                htmlFor='inputIdSessao'
              >
                <select
                  type='text'
                  id='inputIdSessao'
                  value={idSessao}
                  className='form-select'
                  name='idSessao'
                  onChange={(e) => setIdSessao(e.target.value)}
                ><option value="">Selecione uma Sessão</option>
                  {dadosSessao.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.dataSessao +" "+ dado.horaSessao +"| Unidade: "+ dado.nomeUnidade +"| Sala: "+ dado.numeroSala + "| Filme:"+ dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup
                label='Assento: *'
                htmlFor='inputIdAssento'
              >
                <select
                  type='text'
                  id='inputIdAssento'
                  value={idAssento}
                  className='form-select'
                  name='idAssento'
                  onChange={(e) => setIdAssento(e.target.value)}
                >
                  <option value="">Selecione um Assento</option>
                  {dadosAssentos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numeroAssento}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label="Tipo do Ingresso: *">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="inteira"
                      checked={tipoIngresso === true}
                      onChange={() => setTipoIngresso(true)}
                    />
                    <label htmlFor="Inteira" className="ms-2">Inteira</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="meia"
                      checked={tipoIngresso === false}
                      onChange={() => setTipoIngresso(false)}
                    />
                    <label htmlFor="Meia" className="ms-2">Meia</label>
                  </div>
                </div>
              </FormGroup>
              {<FormGroup
                label='Compra: *'
                htmlFor='inputIdCompra'
              >
                <select
                  type='text'
                  id='inputIdCompra'
                  value={idCompra}
                  className='form-select'
                  name='idCompra'
                  onChange={(e) => setIdCompra(e.target.value)}
                ><option value="">Selecione uma Compra</option>
                  {dadosCompra.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.dataCompra + "| Cliente: "+ dado.nome + "| CPF: "+ dado.cpf}
                    </option>
                  ))}
                </select>
              </FormGroup>}
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
export default CadastroIngresso;