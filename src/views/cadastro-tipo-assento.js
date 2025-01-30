import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
const baseURL = `${BASE_URL2}/tiposDeAssento`;

function CadastroTipoDeAssento(){
    const { idParam } = useParams();
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [nomeAssento, setNomeAssento] = useState('');
    const [descricao, setDescricao] = useState('');

    const [dados, setDados] = React.useState([]);
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setNomeAssento('');
        setDescricao('');
      } else {
        setId(dados.id);
        setNomeAssento(dados.nomeAssento);
        setDescricao(dados.descricao);
      }
    }
  
    async function salvar() {
      let data = {
        id,
        nomeAssento,
        descricao
      };
      data = JSON.stringify(data);
      if (idParam == null) {
        await axios
          .post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function (response) {
            mensagemSucesso(`Tipo de Assento ${nomeAssento} cadastrado com sucesso!`);
            navigate(`/listagem-tipos-assento`);
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
            mensagemSucesso(`Tipo de Assento ${nomeAssento} alterado com sucesso!`);
            navigate(`/listagem-tipos-assento`);
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
      setNomeAssento(dados.nomeAssento);
      setDescricao(dados.descricao);
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
        <Card title='Cadastro de Tipo de Assento'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Nome do Tipo de Assento: *' htmlFor='inputNomeAssento'>
                  <input
                    type='text'
                    id='inputNomeAssento'
                    value={nomeAssento}
                    className='form-control'
                    name='nomeAssento'
                    onChange={(e) => setNomeAssento(e.target.value)}
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
export default CadastroTipoDeAssento;