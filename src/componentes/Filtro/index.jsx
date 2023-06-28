import dayjs from 'dayjs'
import { useState } from 'react';

import CampoTexto from '../CampoTexto';
import Botao from '../Botao'
import CampoDate from '../CampoDate';
import CampoComboBox from '../CampoComboBox';

import './Filtro.css'

const Filtro = ({ onFilter }) => {

    const [filtro, setFiltro] = useState('');
    
    const clienteBloqueadoOpcoes = [
        { valor: 'Sim' },
        { valor: 'Não' }
    ]

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataAtual, setDataAtual] = useState(dayjs(new Date()));
    const [clienteBloqueado, setClienteBloqueado] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(filtro);
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
                        aoAlterado={valor => setNome(valor)}
                    />
                </div>
                <div className='coluna'>
                    <CampoTexto
                        obrigatorio={false}
                        label="E-mail do Cliente"
                        placeholder="E-mail"
                        valor={email}
                        aoAlterado={valor => setEmail(valor)}
                    />
                </div>
                <div className='coluna'>
                    <CampoTexto
                        obrigatorio={false}
                        label="Telefone"
                        placeholder="Digite o Telefone"
                        mascara="telefone"
                        valor={telefone}
                        aoAlterado={valor => setTelefone(valor)}
                    />
                </div>
                <div className='coluna'>
                    <CampoDate
                        obrigatorio={false}
                        label='Selecione uma data ou período'
                        dataPadrao={dataAtual}
                        valor={dataAtual}
                        aoAlterado={valor => setDataAtual(valor)}
                    />
                </div>
                <div className='coluna'>
                    <CampoComboBox
                        obrigatorio={false}
                        label='Cliente Bloqueado'
                        itens={clienteBloqueadoOpcoes.map(opcao => opcao.valor)}
                        valor={clienteBloqueado}
                        aoAlterado={valor => setClienteBloqueado(valor)}
                    />
                </div>
                <div className='coluna'>Limpar Filtro <Botao texto="Limpar Filtro" /></div>
            </form>

        </div>
    )
}

export default Filtro