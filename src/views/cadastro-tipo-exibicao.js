import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
const baseURL = `${BASE_URL}/TiposDeExibicao`;

function CadastroFormatoExibicao() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [formatoExibicao, setFormatoExibicao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [formatoUnico, setFormatoUnico] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setFormatoExibicao('');
      setDescricao('');
      setFormatoUnico('');
    } else {
      setId(dados.id);
      setFormatoExibicao(dados.formatoExibicao);
      setDescricao(dados.descricao);
      setFormatoUnico(dados.formatoUnico);
    }
  }

  async function salvar() {
    let data = {
      id,
      formatoExibicao,
      descricao,
      formatoUnico
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Formato ${formatoExibicao} cadastrado com sucesso!`);
          navigate(`/listagem-tipos-exibicao`);
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
          mensagemSucesso(`Formato ${formatoExibicao} alterado com sucesso!`);
          navigate(`/listagem-tipos-exibicao`);
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
    setFormatoExibicao(dados.formatoExibicao);
    setDescricao(dados.descricao);
    setFormatoUnico(dados.formatoUnico);
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
      <Card title='Cadastro de Tipo de Exibição'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Tipo de Exibição: *' htmlFor='inputFormatoExibicao'>
                <input
                  type='text'
                  id='inputFormatoExibicao'
                  value={formatoExibicao}
                  className='form-control'
                  name='formatoExibicao'
                  onChange={(e) => setFormatoExibicao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Formato único? *">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="checkbox"
                      id="sim"
                      checked={formatoUnico === true}
                      onChange={() => setFormatoUnico(true)}
                    />
                    <label htmlFor="sim" className="ms-2">Sim</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="nao"
                      checked={formatoUnico === false}
                      onChange={() => setFormatoUnico(false)}
                    />
                    <label htmlFor="nao" className="ms-2">Não</label>
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
export default CadastroFormatoExibicao;