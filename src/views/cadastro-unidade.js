import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
const baseURL = `${BASE_URL2}/unidades`;

function CadastroUnidade(){
    const { idParam } = useParams();
    const navigate = useNavigate();
  
    const [id, setId] = useState('');
    const [nomeUnidade, setNomeUnidade] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');

    const [dados, setDados] = React.useState([]);
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setNomeUnidade('');
        setCnpj('');
        setEmail('');
        setLogradouro('');
        setNumero('');
        setComplemento('');
        setBairro('');
        setCidade('');
        setEstado('');
        setCep('');
      } else {
        setId(dados.id);
        setNomeUnidade(dados.nomeUnidade);
        setCnpj(dados.cnpj);
        setEmail(dados.email);
        setLogradouro(dados.logradouro);
        setNumero(dados.numero);
        setComplemento(dados.complemento);
        setBairro(dados.bairro);
        setCidade(dados.cidade);
        setEstado(dados.estado);
        setCep(dados.cep);
      }
    }
  
    async function salvar() {
      let data = {
        id,
        nomeUnidade,
        cnpj,
        email,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep
      };
      data = JSON.stringify(data);
      if (idParam == null) {
        await axios
          .post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function (response) {
            mensagemSucesso(`Unidade ${nomeUnidade} cadastrado com sucesso!`);
            navigate(`/listagem-unidades`);
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
            mensagemSucesso(`Unidade ${nomeUnidade} alterado com sucesso!`);
            navigate(`/listagem-unidades`);
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
      setNomeUnidade(dados.nomeUnidade);
      setCnpj(dados.cnpj);
      setEmail(dados.email);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
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
        <Card title='Cadastro de Unidade'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Nome da Unidade: *' htmlFor='inputNomeUnidade'>
                  <input
                    type='text'
                    id='inputNomeUnidade'
                    value={nomeUnidade}
                    className='form-control'
                    name='nomeUnidade'
                    onChange={(e) => setNomeUnidade(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Cnpj: *' htmlFor='inputCnpj'>
                  <input
                    type='text'
                    id='inputCnpj'
                    value={cnpj}
                    className='form-control'
                    name='cnpj'
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Email: *' htmlFor='inputEmail'>
                  <input
                    type='text'
                    id='inputEmail'
                    value={email}
                    className='form-control'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                  <input
                    type='text'
                    id='inputLogradouro'
                    value={logradouro}
                    className='form-control'
                    name='logradouro'
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Número: *' htmlFor='inputNumero'>
                  <input
                    type='text'
                    id='inputNumero'
                    value={numero}
                    className='form-control'
                    name='numero'
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Complemento: ' htmlFor='inputComplemento'>
                  <input
                    type='text'
                    id='inputComplemento'
                    value={complemento}
                    className='form-control'
                    name='complemento'
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                  <input
                    type='text'
                    id='inputBairro'
                    value={bairro}
                    className='form-control'
                    name='bairro'
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                  <input
                    type='text'
                    id='inputCidade'
                    value={cidade}
                    className='form-control'
                    name='cidade'
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='Estado: *' htmlFor='inputEstado'>
                  <input
                    type='text'
                    id='inputEstado'
                    value={estado}
                    className='form-control'
                    name='estado'
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label='CEP: *' htmlFor='inputCep'>
                  <input
                    type='text'
                    id='inputCep'
                    value={cep}
                    className='form-control'
                    name='cep'
                    onChange={(e) => setCep(e.target.value)}
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
export default CadastroUnidade;