import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL4 } from '../config/axios';

const baseURL = `${BASE_URL4}/SessaoTipoExibicao`;

function ListagemSessaoTipoExibicao() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-sessao-tipo-exibicao`);
  };

  const editar = (id) => {
    navigate(`/cadastro-sessao-tipo-exibicao/${id}`);
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
        mensagemSucesso(`Tipo de Exibição da Sessão excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o Tipo de Exibição da Sessão`);
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
      <Card title='Listagem de Tipos de Exibição da Sessão'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
              onClick={() => cadastrar()}
              >
                Novo Tipo de Exibição da Sessão
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Sessão</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Hora</th>
                    <th scope='col'>Filme</th>
                    <th scope='col'>Tipo de Exibição</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.idSessao}</td>
                      <td>{dado.dataSessao}</td>
                      <td>{dado.horaSessao}</td>
                      <td>{dado.idFilme}</td>
                      <td>{dado.idTipoExibicao}</td>
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


export default ListagemSessaoTipoExibicao;