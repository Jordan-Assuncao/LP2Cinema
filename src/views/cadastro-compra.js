import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
const baseURL = `${BASE_URL}/Compras`;

function CadastroCompra() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [valorTotal, setValorTotal] = useState("");
  const [idCliente, setIdCliente] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDataCompra('');
      setValorTotal('');
      setIdCliente('');
    } else {
      setId(dados.id);
      setDataCompra(dados.dataCompra);
      setValorTotal(dados.valorTotal);
      setIdCliente(dados.idCliente);
    }
  }

  async function salvar() {
    let data = {
      id,
      dataCompra,
      valorTotal,
      idCliente,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Compra ${id} cadastrada com sucesso!`);
          navigate(`/listagem-compras`);
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
          mensagemSucesso(`Compra ${id} alterada com sucesso!`);
          navigate(`/listagem-compras`);
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
    setDataCompra(dados.dataCompra);
    setValorTotal(dados.valorTotal);
    setIdCliente(dados.idCliente);
  }

  useEffect(() => {
    // Só buscar dados se for uma edição (idParam não for null)
    if (idParam) {
      buscar();
    } else {
      inicializar();
    } // eslint-disable-next-line
  }, [id]);

  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/Clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  if (!dadosClientes) return null;
  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Cadastro de Compras'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Data Compra: *' htmlFor='inputDataCompra'>
                <input
                  type='text'
                  id='inputDataCompra'
                  value={dataCompra}
                  className='form-control'
                  name='dataCompra'
                  onChange={(e) => setDataCompra(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Valor Total: *'
                htmlFor='inputValorTotal'
              >
                <input
                  type='number'
                  id='inputValorTotal'
                  value={valorTotal}
                  className='form-control'
                  name='idValorTotal'
                  onChange={(e) => setValorTotal(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label='Cliente: *'
                htmlFor='inputIdCliente'
              >
                <select
                  type='number'
                  id='inputIdCliente'
                  value={idCliente}
                  className='form-select'
                  name='idCliente'
                  onChange={(e) => setIdCliente(e.target.value)}
                >
                  <option value="">Selecione um Cliente</option>
                  <option key={idCliente} value={idCliente}>
                    {idCliente}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.nome} value={dado.nome}>
                      {dado.nome}
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


export default CadastroCompra;