import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';
const baseURL = `${BASE_URL3}/filmes`;

function CadastroFilme() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [sinopse, setSinopse] = useState("");
  const [duracao, setDuracao] = useState('');
  const [cartaz, setCartaz] = useState('');
  const [idClassificacaoIndicativa, setIdClassificacaoIndicativa] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setTitulo('');
      setSinopse('');
      setDuracao('');
      setCartaz('');
      setIdClassificacaoIndicativa('');
    } else {
      setId(dados.id);
      setTitulo(dados.titulo);
      setSinopse(dados.sinopse);
      setDuracao(dados.duracao);
      setCartaz(dados.cartaz);
      setIdClassificacaoIndicativa(dados.idClassificacaoIndicativa);
    }
  }

  async function salvar() {
    let data = {
      id,
      titulo,
      sinopse,
      duracao,
      cartaz,
      idClassificacaoIndicativa
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Filme ${id} cadastrado com sucesso!`);
          navigate(`/listagem-filmes`);
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
          mensagemSucesso(`Filme ${id} alterado com sucesso!`);
          navigate(`/listagem-filmes`);
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
    setTitulo(dados.titulo);
    setSinopse(dados.sinopse);
    setDuracao(dados.duracao);
    setCartaz(dados.cartaz);
    setIdClassificacaoIndicativa(dados.idClassificacaoIndicativa);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosClassificacaoIndicativa, setDadosClassificacaoIndicativa] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/classificacaoindicativas`).then((response) => {
      setDadosClassificacaoIndicativa(response.data);
    });
  }, []);

  const [dadosGeneros, setDadosGeneros] = React.useState([]);

  // Exemplo de carregamento dos tipos de exibição
  useEffect(() => {
    axios.get(`${BASE_URL3}/generos`).then((response) => {
      setDadosGeneros(response.data);
    });
  }, []);

  const [generosSelecionados, setGenerosSelecionados] = useState([]);

  const handleSelecionarGenero = (id) => {
    setGenerosSelecionados((prev) => [...prev, id]);
  };

  const handleRemoverGenero = (id) => {
    setGenerosSelecionados((prev) => prev.filter((generoId) => generoId !== id));
  };

  if (!dadosGeneros) return null;
  if (!dadosClassificacaoIndicativa) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Filmes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Titulo: *' htmlFor='inputTitulo'>
                <input
                  type='text'
                  id='inputTitulo'
                  value={titulo}
                  className='form-control'
                  name='titulo'
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Sinopse: *'
                htmlFor='inputSinopse'
              >
                <input
                  type='text'
                  id='inputSinopse'
                  value={sinopse}
                  className='form-control'
                  name='sinopse'
                  onChange={(e) => setSinopse(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Duracao: *'
                htmlFor='inputDuracao'
              >
                <input
                  type='text'
                  id='inputDuracao'
                  value={duracao}
                  className='form-control'
                  name='duracao'
                  onChange={(e) => setDuracao(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Cartaz: *'
                htmlFor='inputCartaz'
              >
                <input
                  type='text'
                  id='inputCartaz'
                  value={cartaz}
                  className='form-control'
                  name='cartaz'
                  onChange={(e) => setCartaz(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Classificação Indicativa: *'
                htmlFor='inputClassificacaoIndicativa'
              >
                <select
                  type='text'
                  id='inputClassificacaoIndicativa'
                  value={idClassificacaoIndicativa}
                  className='form-control'
                  name='classificacaoIndicativa'
                  onChange={(e) => setIdClassificacaoIndicativa(e.target.value)}
                >
                  <option value="">Selecione uma Classificação Indicativa</option>
                  {dadosClassificacaoIndicativa.map((dado) => (
                    <option key={dado.faixaEtaria} value={dado.faixaEtaria}>
                      {dado.faixaEtaria}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label="Gênero do Filme: *" htmlFor="inputGeneros">
                <div className="row">
                  {/* Gêneros Disponíveis */}
                  <div className="col-md-6">
                    <label className="fw-bold text-center d-block">Gêneros Disponíveis:</label>
                    <select multiple className="form-control" size="5" style={{ width: "100%" }}>
                      {dadosGeneros
                        .filter((genero) => !generosSelecionados.includes(genero.id))
                        .map((genero) => (
                          <option key={genero.id} onClick={() => handleSelecionarGenero(genero.id)}>
                            {genero.nomeGenero}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Gêneros Selecionados */}
                  <div className="col-md-6">
                    <label className="fw-bold text-center d-block">Gêneros Selecionados:</label>
                    <select multiple className="form-control" size="5" style={{ width: "100%" }}>
                      {dadosGeneros
                        .filter((genero) => generosSelecionados.includes(genero.id))
                        .map((genero) => (
                          <option key={genero.id} onClick={() => handleRemoverGenero(genero.id)}>
                            {genero.nomeGenero}
                          </option>
                        ))}
                    </select>
                  </div>
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
export default CadastroFilme;