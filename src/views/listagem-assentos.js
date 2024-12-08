import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemAssento() {

  const navigate = useNavigate();

  const [dados, setDados] = useState([]);

  return (
    <div className='container mt-5 pt-5'>
      <Card title='Listagem de Assentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                class='btn btn-warning'
              //onClick={() => cadastrar()}
              >
                Novo Assento
              </button>
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
                          //onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                          //onClick={() => excluir(dado.id)}
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


export default ListagemAssento;