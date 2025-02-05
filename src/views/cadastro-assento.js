import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
const baseURL = `${BASE_URL2}/Assentos`;

function CadastroAssento() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [numeroAssento, setNumeroAssento] = useState('');
  const [idSala, setIdSala] = useState("");
  const [fileiraVertical, setFileiraVertical] = useState('');
  const [fileiraHorizontal, setFileiraHorizontal] = useState('');
  const [idTipoAssento, setIdTipoAssento] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNumeroAssento('');
      setIdSala('');
      setFileiraVertical('');
      setFileiraHorizontal('');
      setIdTipoAssento('');
    } else {
      setId(dados.id);
      setNumeroAssento(dados.numeroAssento);
      setIdSala(dados.idSala);
      setFileiraVertical(dados.fileiraVertical);
      setFileiraHorizontal(dados.fileiraHorizontal);
      setIdTipoAssento(dados.idTipoAssento);
    }
  }

  async function salvar() {
    let data = {
      id,
      numeroAssento,
      idSala,
      fileiraVertical,
      fileiraHorizontal,
      idTipoAssento
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Assento ${numeroAssento} cadastrada com sucesso!`);
          navigate(`/listagem-assentos`);
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
          mensagemSucesso(`Assento ${numeroAssento} alterada com sucesso!`);
          navigate(`/listagem-assentos`);
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
    setNumeroAssento(dados.numeroAssento);
    setIdSala(dados.idSala);
    setFileiraVertical(dados.fileiraVertical);
    setFileiraHorizontal(dados.fileiraHorizontal);
    setIdTipoAssento(dados.idTipoAssento)
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
      <Card title='Cadastro de Assentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Número do Assento: *' htmlFor='inputNumeroAssento'>
                <input
                  type='text'
                  id='inputNumeroAssento'
                  value={numeroAssento}
                  className='form-control'
                  name='numeroAssento'
                  onChange={(e) => setNumeroAssento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Número da sala: *" htmlFor="inputIdSala">
                <select
                  id="inputIdSala"
                  value={idSala}
                  className="form-select"
                  name="idSala"
                  onChange={(e) => setIdSala(e.target.value)}
                >
                  <option value="">Selecione uma sala</option>
                      <option key={idSala} value={idSala}>
                        {idSala}
                      </option>
                </select>
              </FormGroup>
              <FormGroup
                label='Posição Fileira Vertical: *'
                htmlFor='inputFileiraVertical'
              >
                <select
                  type='number'
                  id='inputFileiraVertical'
                  value={fileiraVertical}
                  className='form-select'
                  name='fileiraVertical'
                  onChange={(e) => setFileiraVertical(e.target.value)}
                >
                  <option value="">Selecione uma Fileira Vertical</option>
                      <option key={fileiraVertical} value={fileiraVertical}>
                        {fileiraVertical}
                      </option>
                </select>
              </FormGroup>
              <FormGroup
                label='Posição Fileira Horizontal: *'
                htmlFor='inputFileiraHorizontal'
              >
                <select
                  type='number'
                  id='inputFileiraHorizontal'
                  value={fileiraHorizontal}
                  className='form-select'
                  name='fileiraHorizontal'
                  onChange={(e) => setFileiraHorizontal(e.target.value)}
                >
                  <option value="">Selecione uma Fileira Horizontal</option>
                      <option key={fileiraHorizontal} value={fileiraHorizontal}>
                        {fileiraHorizontal}
                      </option>
                </select>
              </FormGroup>
              <FormGroup
                label='Tipo do Assento: *'
                htmlFor='inputTipoAssento'
              >
                <select
                  type='number'
                  id='inputTipoAssento'
                  value={idTipoAssento}
                  className='form-select'
                  name='idTipoAssento'
                  onChange={(e) => setIdTipoAssento(e.target.value)}
                >
                  <option value="">Selecione um Tipo de Assento</option>
                      <option key={idTipoAssento} value={idTipoAssento}>
                        {idTipoAssento}
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
export default CadastroAssento;