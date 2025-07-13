import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL3 } from '../config/axios';
import { BASE_URL4 } from '../config/axios';
const baseURL = `${BASE_URL3}/filmes`;
const baseURL4 = `${BASE_URL4}/filmegeneros`;

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
      try {
        const response = await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        const filmeSalvo = response.data;
        const idFilme = filmeSalvo.id;
        console.log('Filme salvo:', response.data);
        console.log('ID do Filme:', idFilme);

        if (generosSelecionados.length > 0) {
          let vinculos = generosSelecionados.map((idGenero) => ({
            idFilme,
            idGenero
          }));
          vinculos = JSON.stringify(vinculos)
          console.log('Vinculos:', vinculos);
          await axios.post(`${baseURL4}/lote`, vinculos, {
            headers: { 'Content-Type': 'application/json' },
          });

          mensagemSucesso(`Filme ${filmeSalvo.titulo} cadastrado com sucesso!`);
        } else {
          mensagemSucesso(`Filme ${filmeSalvo.titulo} cadastrado sem gêneros!`);
        }

        navigate(`/listagem-filmes`);
      } catch (error) {
        mensagemErro(error?.response?.data || 'Erro ao salvar o filme');
      }

    } else {
      // Edição
      try {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Filme ${titulo} alterado com sucesso!`);
        navigate(`/listagem-filmes`);
      } catch (error) {
        mensagemErro(error?.response?.data || 'Erro ao editar o filme');
      }
    }
  }

  async function buscar() {
    try {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setTitulo(dados.titulo);
      setSinopse(dados.sinopse);
      setDuracao(dados.duracao);
      setCartaz(dados.cartaz);
      setIdClassificacaoIndicativa(dados.idClassificacaoIndicativa);
      // 2. Buscar vínculos de gêneros do filme (ajuste o endpoint conforme o seu backend)
      //const responseVinculos = await axios.get(`${baseURL4}/filme/${idParam}`);
      //const vinculos = responseVinculos.data;

      // Supondo que cada item tem: { idFilme, idGenero }
      //const idsDosGeneros = vinculos.map(v => v.idGenero);
      //setGenerosSelecionados(idsDosGeneros);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    }
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
    setGenerosSelecionados((prev) => prev.filter((idGenero) => idGenero !== id));
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
                    <option key={dado.id} value={dado.id}>
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
                    <select
                      multiple
                      className="form-control"
                      size="5"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const selecionados = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
                        selecionados.forEach((id) => handleSelecionarGenero(id));
                      }}
                    >
                      {dadosGeneros
                        .filter((genero) => !generosSelecionados.includes(genero.id))
                        .map((genero) => (
                          <option key={genero.id} value={genero.id}>
                            {genero.nomeGenero}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Gêneros Selecionados */}
                  <div className="col-md-6">
                    <label className="fw-bold text-center d-block">Gêneros Selecionados:</label>
                    <select
                      multiple
                      className="form-control"
                      size="5"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const selecionados = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
                        selecionados.forEach((id) => handleRemoverGenero(id));
                      }}
                    >
                      {dadosGeneros
                        .filter((genero) => generosSelecionados.includes(genero.id))
                        .map((genero) => (
                          <option key={genero.id} value={genero.id}>
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