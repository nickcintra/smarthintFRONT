import { format } from 'date-fns';
import { useState } from 'react';

import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import CampoDate from '../CampoDate';
import CampoComboBox from '../CampoComboBox';
import api from '../../services/api';

import './Filtro.css';

const Filtro = ({ setData, setTotalPages }) => {
  const clienteBloqueadoOpcoes = [
    { valor: 'Sim' },
    { valor: 'Não' }
  ];

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataAtual, setDataAtual] = useState();
  const [clienteBloqueado, setClienteBloqueado] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    applyFilter();
  };

  const applyFilter = async () => {


    const filtro = {
      Nome: nome,
      Email: email,
      Telefone: telefone,
      DataCadastro: dataAtual ? format(dataAtual['$d'], 'yyyy-MM-dd') : "",
      Bloqueado: clienteBloqueado === 'Sim'
    };

    console.log(filtro)

    try {
      const response = await api.get('/api/Cliente/filtro', {
        params: filtro
      });
      console.log(response.data)
      setTotalPages(response.data.totalPages);
      setData(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className='listaFiltro'>
      <form onSubmit={handleSubmit}>
        <div className='coluna'>
          <CampoTexto
            obrigatorio={false}
            label="Nome ou Razão Social"
            placeholder="Nome/Razão Social"
            valor={nome}
            aoAlterado={(valor) => setNome(valor)}
          />
        </div>
        <div className='coluna'>
          <CampoTexto
            obrigatorio={false}
            label="E-mail do Cliente"
            placeholder="E-mail"
            valor={email}
            aoAlterado={(valor) => setEmail(valor)}
          />
        </div>
        <div className='coluna'>
          <CampoTexto
            obrigatorio={false}
            label="Telefone"
            placeholder="Digite o Telefone"
            mascara="telefone"
            valor={telefone}
            aoAlterado={(valor) => setTelefone(valor)}
          />
        </div>
        <div className='coluna'>
          <CampoDate
            obrigatorio={false}
            label='Selecione uma data ou período'
            dataPadrao={dataAtual}
            valor={dataAtual}
            aoAlterado={(valor) => setDataAtual(valor)}
          />
        </div>
        <div className='coluna'>
          <CampoComboBox
            obrigatorio={false}
            label='Cliente Bloqueado'
            itens={clienteBloqueadoOpcoes.map(opcao => opcao.valor)}
            valor={clienteBloqueado}
            aoAlterado={(valor) => setClienteBloqueado(valor)}
          />
        </div>
        <div className='coluna'>Limpar Filtro <Botao texto="Limpar Filtro" /></div>
      </form>
    </div>
  );
};

export default Filtro;