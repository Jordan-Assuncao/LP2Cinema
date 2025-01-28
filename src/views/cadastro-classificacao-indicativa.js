import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Card from '../components/card';
import FormGroup from '../components/formGroup';
import Stack from '@mui/material/Stack';


import axios from 'axios';
import { BASE_URL3 } from '../config/axios';


function CadastroClassificacaoIndicativa(){
    
    const baseURL = `${BASE_URL3}/ClassificacoesIndicativas`;

    const { idParam } = useParams();
    
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [faixaEtaria, setFaixaEtaria] = useState('');

  
    const [dados, setDados] = React.useState([]);
  
    function inicializar() {
      if (idParam == null) {
        setId('');
        setFaixaEtaria('');
      } else {
        setId(dados.id);
        setFaixaEtaria(dados.faixaEtaria);
      }
    }
  
    async function salvar() {
      let data = {
        id,
        faixaEtaria
      };
      data = JSON.stringify(data);
      if (idParam == null) {
        await axios
          .post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function (response) {
            mensagemSucesso(`Classificação Indicativa ${faixaEtaria} cadastrada com sucesso!`);
            navigate(`/listagem-classificacoes-indicativa`);
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
            mensagemSucesso(`Classificação Indicativa ${faixaEtaria} alterada com sucesso!`);
            navigate(`/listagem-classificacoes-indicativa`);
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
      setFaixaEtaria(dados.faixaEtaria);
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
        <Card title='Cadastro de Classificação Indicativa'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='bs-component'>
                <FormGroup label='Faixa Etária: *' htmlFor='inputFaixaEtaria'>
                  <input
                    type='text'
                    id='inputFaixaEtaria'
                    value={faixaEtaria}
                    className='form-control'
                    name='faixaEtaria'
                    onChange={(e) => setFaixaEtaria(e.target.value)}
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


export default CadastroClassificacaoIndicativa;