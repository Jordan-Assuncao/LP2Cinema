import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL4 } from '../config/axios';
import { BASE_URL3 } from '../config/axios';
const baseURL = `${BASE_URL4}/filmegeneros`;

function CadastroFilmeGenero() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [idFilme, setIdFilme] = useState('');
  const [idGenero, setIdGenero] = useState("");

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdFilme('');
      setIdGenero('');
    } else {
      setId(dados.id);
      setIdFilme(dados.idFilme);
      setIdGenero(dados.idGenero);
    }
  }

  async function salvar() {
    let data = {
      id,
      idFilme,
      idGenero,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Filme ${idFilme} cadastrado no genero ${idGenero} com sucesso!`);
          navigate(`/listagem-filmegeneros`);
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
          mensagemSucesso(`Filme genero ${id} alterado com sucesso!`);
          navigate(`/listagem-filmegeneros`);
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
    setIdFilme(dados.idFilme);
    setIdGenero(dados.idGenero);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosFilmes, setDadosFilmes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/filmes`).then((response) => {
      setDadosFilmes(response.data);
    });
  }, []);

  const [dadosGeneros, setDadosGeneros] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL3}/Generos`).then((response) => {
      setDadosGeneros(response.data);
    });
  }, []);

  if (!dadosFilmes) return null;
  if (!dadosGeneros) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Filmes Generos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Filme Titulo: *' htmlFor='inputFilmeTitulo'>
                <select
                  type='text'
                  id='inputFilmeTitulo'
                  value={idFilme}
                  className='form-select'
                  name='filmeTitulo'
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
              <FormGroup
                label='Genero: *'
                htmlFor='inputGenero'
              >
                <select
                  type='text'
                  id='inputGenero'
                  value={idGenero}
                  className='form-select'
                  name='genero'
                  onChange={(e) => setIdGenero(e.target.value)}
                >
                  <option value="">Selecione um Gênero</option>
                  {dadosGeneros.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nomeGenero}
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
export default CadastroFilmeGenero;