import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/ingressos`;

function ListagemIngresso() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-ingresso`);
  };

  const editar = (id) => {
    navigate(`/cadastro-ingresso/${id}`);
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
        mensagemSucesso(`Ingresso excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir Ingresso`);
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
      <Card title='Listagem de Ingressos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
              onClick={() => cadastrar()}
              >
                Novo Ingresso
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Tipo Ingresso</th>
                    <th scope='col'>Assento</th>
                    <th scope='col'>Sala</th>
                    <th scope='col'>Filme</th>
                    <th scope='col'>Unidade</th>
                    <th scope='col'>Sessão</th>
                    <th scope='col'>Compra</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.tipoIngresso  === 1 ? 'Inteira' : 'Meia'}</td>
                      <td>{dado.numeroAssento}</td>
                      <td>{dado.numeroSala}</td>
                      <td>{dado.titulo}</td>
                      <td>{dado.nomeUnidade}</td>
                      <td>{dado.horaSessao +" "+ dado.dataSessao}</td>
                      <td>{dado.idCompra}</td>
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}


export default ListagemIngresso;