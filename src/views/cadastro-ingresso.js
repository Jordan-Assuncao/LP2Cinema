import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
const baseURL = `${BASE_URL}/Ingressos`;

function CadastroIngresso(){
    const { idParam } = useParams();
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [tipoIngresso, setTipoIngresso] = useState('');
    const [idAssento, setIdAssento] = useState("");
    const [idSessao, setIdSessao] = useState('');
    const [idCompra, setIdCompra] = useState("");

    const [dados, setDados] = React.useState([]);
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setTipoIngresso('');
        setIdAssento('');
        setIdSessao('');
        setIdCompra('');
      } else {
        setId(dados.id);
        setTipoIngresso(dados.tipoIngresso);
        setIdAssento(dados.idAssento);
        setIdSessao(dados.idSessao);
        setIdCompra(dados.idCompra);
      }
    }
  
    async function salvar() {
      let data = {
        id,
        tipoIngresso,
        idAssento,
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
      setTipoIngresso(dados.tipoIngresso);
      setIdAssento(dados.idAssento);
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
  
    if (!dados) return null;
  
    return (
      <div className='container mt-5 pt-5'>
        <Card title='Cadastro de Ingressos'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Tipo do Ingresso: *' htmlFor='inputTipoIngresso'>
                  <input
                    type='text'
                    id='inputTipoIngresso'
                    value={tipoIngresso}
                    className='form-control'
                    name='tipoIngresso'
                    onChange={(e) => setTipoIngresso(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label='Assento: *'
                  htmlFor='inputIdAssento'
                >
                  <input
                    type='text'
                    id='inputIdAssento'
                    value={idAssento}
                    className='form-control'
                    name='idAssento'
                    onChange={(e) => setIdAssento(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label='Sessao: *'
                  htmlFor='inputIdSessao'
                >
                  <input
                    type='text'
                    id='inputIdSessao'
                    value={idSessao}
                    className='form-control'
                    name='idSessao'
                    onChange={(e) => setIdSessao(e.target.value)}
                  />
                </FormGroup>
                <FormGroup
                  label='Compra: *'
                  htmlFor='inputIdCompra'
                >
                  <input
                    type='text'
                    id='inputIdCompra'
                    value={idCompra}
                    className='form-control'
                    name='idCompra'
                    onChange={(e) => setIdCompra(e.target.value)}
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
export default CadastroIngresso;