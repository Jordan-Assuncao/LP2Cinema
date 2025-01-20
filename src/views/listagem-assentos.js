import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/assentos`;

function ListagemAssento() {

  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-unidades`);
  };

  const editar = (id) => {
    navigate(`/cadastro-unidades/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Assento excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o assento`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Listagem de Assentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
              onClick={() => cadastrar()}
              >
                Novo Assento
              </button>
{/* 
<table className='table table-hover'>
  <thead>
    <tr>
      <th scope='col'>Número do Assento</th>
      <th scope='col'>ID do Tipo de Assento</th>
      <th scope='col'>ID da Sala</th>
      <th scope='col'>Ações</th>
    </tr>
  </thead>
  <tbody>
    {dados.map((dado) => (
      <tr key={dado.id}>
        <td>{dado.numeroAssento}</td>
        <td>{dado.idTipoAssento}</td>
        <td>{dado.idSala}</td>
        <td>
          <Stack spacing={1} padding={0} direction='row'>
            <IconButton
              aria-label='edit'
              onClick={() => editar(dado.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label='delete'
              onClick={() => excluir(dado.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </td>
      </tr>
    ))}
  </tbody>
</table> 
*/}

<table className='table table-hover'>
  <thead>
    <tr>
      <th scope='col'>Número do Assento</th>
      <th scope='col'>Tipo de Assento</th>
      <th scope='col'>Número da Sala</th>
      <th scope='col'>Ações</th>
    </tr>
  </thead>
  <tbody>
    {[
      { id: 1, numeroAssento: 1, idTipoAssento: "Normal", idSala: 201 },
      { id: 2, numeroAssento: 2, idTipoAssento: "Normal", idSala: 201 },
      { id: 3, numeroAssento: 3, idTipoAssento: "Preferencial", idSala: 201 },
      { id: 4, numeroAssento: 4, idTipoAssento: "Normal", idSala: 201 },
      { id: 5, numeroAssento: 5, idTipoAssento: "Normal", idSala: 201 },
      { id: 6, numeroAssento: 6, idTipoAssento: "Preferencial", idSala: 201 }
    ].map((dado) => (
      <tr key={dado.id}>
        <td>{dado.numeroAssento}</td>
        <td>{dado.idTipoAssento}</td>
        <td>{dado.idSala}</td>
        <td>
          <Stack spacing={1} padding={0} direction='row'>
            <IconButton aria-label='edit' onClick={() => alert(`Editar ID: ${dado.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='delete' onClick={() => alert(`Excluir ID: ${dado.id}`)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </td>
      </tr>
    ))}
  </tbody>
</table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}


export default ListagemAssento;