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

const baseURL = `${BASE_URL}/sessoes`;

function ListagemSessao() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-sessao`);
  };

  const editar = (id) => {
    navigate(`/cadastro-sessao/${id}`);
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
        mensagemSucesso(`Sessão excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a Sessão`);
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
      <Card title='Listagem de Sessoes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Sessão
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Data</th>
                    <th scope='col'>Hora</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>DUB.</th>
                    <th scope='col'>LEG.</th>
                    <th scope='col'>Unidade</th>
                    <th scope='col'>Sala</th>
                    <th scope='col'>Preço (R$)</th>
                    <th scope='col'>Filme</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.dataSessao}</td>
                      <td>{dado.horaSessao}</td>
                      <td>{dado.statusSessao ? 'Ativa' : 'Inativa'}</td>
                      <td>{dado.dublado ? 'Sim' : 'Não'}</td>
                      <td>{dado.legendado ? 'Sim' : 'Não'}</td>
                      <td>{dado.nomeUnidade}</td>
                      <td>{dado.numeroSala}</td>
                      <td>
                        {Number(dado.valorInteira).toFixed(2).replace('.', ',')}
                      </td>
                      <td>{dado.titulo}</td>
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


export default ListagemSessao;