import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
const baseURL = `${BASE_URL2}/salas`;

function CadastroSala(){
    const { idParam } = useParams();
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [numeroSala, setNumeroSala] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [capacidadePreferencial, setCapacidadePreferencial] = useState('');
    const [formatoSala, setFormatoSala] = useState('');
    const [numeroFileiraVertical, setNumeroFileiraVertical] = useState('');
    const [numeroFileiraHorizontal, setNumeroFileiraHorizontal] = useState('');
    const [idUnidade, setIdUnidade] = useState('');

    const [dados, setDados] = React.useState([]);
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setNumeroSala('');
        setCapacidade('');
        setCapacidadePreferencial('');
        setFormatoSala('');
        setNumeroFileiraVertical('');
        setNumeroFileiraHorizontal('');
        setIdUnidade('');
      } else {
        setId(dados.id);
        setNumeroSala(dados.numeroSala);
        setCapacidade(dados.capacidade);
        setCapacidadePreferencial(dados.capacidadePreferencial);
        setFormatoSala(dados.formatoSala);
        setNumeroFileiraVertical(dados.numeroFileiraVertical);
        setNumeroFileiraHorizontal(dados.numeroFileiraHorizontal);
        setIdUnidade(dados.idUnidade);
      }
    }
  
    async function salvar() {
      let data = {
        id,
        numeroSala,
        capacidade,
        capacidadePreferencial,
        formatoSala,
        numeroFileiraVertical,
        numeroFileiraHorizontal,
        idUnidade
      };
      data = JSON.stringify(data);
      if (idParam == null) {
        await axios
          .post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function (response) {
            mensagemSucesso(`Sala ${numeroSala} cadastrado com sucesso!`);
            navigate(`/listagem-salas`);
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
            mensagemSucesso(`Sala ${numeroSala} alterado com sucesso!`);
            navigate(`/listagem-salas`);
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
      setNumeroSala(dados.numeroSala);
      setCapacidade(dados.capacidade);
      setCapacidadePreferencial(dados.capacidadePreferencial);
      setFormatoSala(dados.formatoSala);
      setNumeroFileiraVertical(dados.numeroFileiraVertical);
      setNumeroFileiraHorizontal(dados.numeroFileiraHorizontal);
      setIdUnidade(dados.idUnidade);
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
        <Card title='Cadastro de Salas'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Número da Sala: *' htmlFor='inputNumeroSala'>
                  <input
                    type='text'
                    id='inputNumeroSala'
                    value={numeroSala}
                    className='form-control'
                    name='numeroSala'
                    onChange={(e) => setNumeroSala(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Capacidade: *' htmlFor='inputCapacidade'>
                  <input
                    type='text'
                    id='inputCapacidade'
                    value={capacidade}
                    className='form-control'
                    name='capacidade'
                    onChange={(e) => setCapacidade(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Capacidade Preferencial: *' htmlFor='inputCapacidadePreferencial'>
                  <input
                    type='text'
                    id='inputCapacidadePreferencial'
                    value={capacidadePreferencial}
                    className='form-control'
                    name='capacidadePreferencial'
                    onChange={(e) => setCapacidadePreferencial(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Formato da Sala: *' htmlFor='inputFormatoSala'>
                  <input
                    type='text'
                    id='inputFormatoSala'
                    value={formatoSala}
                    className='form-control'
                    name='formatoSala'
                    onChange={(e) => setFormatoSala(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Numero de Fileiras Verticais: *' htmlFor='inputNumeroFileiraVertical'>
                  <input
                    type='text'
                    id='inputNumeroFileiraVertical'
                    value={numeroFileiraVertical}
                    className='form-control'
                    name='numeroFileiraVertical'
                    onChange={(e) => setNumeroFileiraVertical(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Numero de Fileiras Horizontais: *' htmlFor='inputNumeroFileiraHorizontal'>
                  <input
                    type='text'
                    id='inputNumeroFileiraHorizontal'
                    value={numeroFileiraHorizontal}
                    className='form-control'
                    name='numeroFileiraHorizontal'
                    onChange={(e) => setNumeroFileiraHorizontal(e.target.value)}
                  />
                </FormGroup>
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
                      <option key={idUnidade} value={idUnidade}>
                        {idUnidade}
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
export default CadastroSala;