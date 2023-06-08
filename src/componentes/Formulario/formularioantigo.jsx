import React, { useState } from 'react';

import CampoCheckBox from '../CampoCheckBox';
import CampoComboBox from '../CampoComboBox';
import CampoDate from '../CampoDate';
import CampoSenha from '../CampoSenha';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';

import './formulario.css'
import dayjs from 'dayjs'

const FormularioAntigo = (props) => {

    const dateFormat = 'YYYY/MM/DD';

    const opcoesTipoPessoa = [
        { valor: 'Física' },
        { valor: 'Jurídica' }
    ]

    const opcoesGenero = [
        { valor: 'Feminino' },
        { valor: 'Masculino' },
        { valor: 'Outro' }
    ]

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataAtual, setDataAtual] = useState(dayjs(new Date()));
    const [tipoPessoa, setTipoPessoa] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [inscricaoEstadual, setInscricaoEstadual] = useState('');
    const [isento, setIsento] = useState(false);
    const [genero, setGenero] = useState('');
    const [datanascimento, setDataNascimento] = useState(null);
    const [clienteBloqueado, setClienteBloqueado] = useState(false);
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('')

    // const [dataCadatro, setCadastro] = useState('');

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCienteCadastrado({
            nome,
            email,
            telefone,
            tipoPessoa,
            cpfCnpj,
            inscricaoEstadual,
            isento,
            genero
        })
        setNome('')
        setEmail('')
        setTelefone('')
        setTipoPessoa('')
        setCpfCnpj('')
        setInscricaoEstadual('')
        setIsento('')
        setGenero('')
        setDataNascimento(null)
    }

    return (
        <form onSubmit={aoSalvar}>
            <CampoTexto
                obrigatorio={true}
                label="Nome do Cliente/Razão Social"
                placeholder="Digite o Nome do Cliente/Razão Social"
                valor={nome}
                aoAlterado={valor => setNome(valor)}
            />
            <CampoTexto
                obrigatorio={true}
                label="E-mail"
                placeholder="Digite o E-mail"
                valor={email}
                aoAlterado={valor => setEmail(valor)}
            />
            <CampoTexto
                obrigatorio={true}
                label="Telefone"
                placeholder="Digite o Telefone"
                mascara="telefone"
                valor={telefone}
                aoAlterado={valor => setTelefone(valor)}
            />
            <CampoDate
                label='Data Atual'
                dataPadrao={dataAtual}
                valor={dataAtual}
                aoAlterado={valor => setDataAtual(valor)}
            />
            <CampoComboBox
                obrigatorio={true}
                label='Tipo de Pessoa'
                itens={opcoesTipoPessoa.map(opcao => opcao.valor)}
                valor={tipoPessoa}
                aoAlterado={valor => setTipoPessoa(valor)}
                placeholder='Selecione o tipo de Pessoa.'
            />
            <CampoTexto
                obrigatorio={true}
                label="CPF/CNPJ"
                mascara="cpf/cnpj"
                placeholder="Digite o CPF/CNPJ"
                valor={cpfCnpj}
                aoAlterado={valor => setCpfCnpj(valor)}
            />
            <CampoTexto
                obrigatorio={true}
                label="Inscrição Estadual"
                placeholder="Digite a Inscrição Estadual"
                valor={inscricaoEstadual}
                aoAlterado={valor => setInscricaoEstadual(valor)}
            />
            <CampoCheckBox
                obrigatorio={false}
                label="Isento"
                titulo=""
                valor={isento}
                aoAlterado={valor => setIsento(valor)}
            />

            {/*------- PESSOA FISICA ---------*/}

            <div className='camposPessoaFísica'>
                <CampoComboBox
                    obrigatorio={true}
                    label='Gênero'
                    placeholder='Selecione o gênero do Cliente.'
                    itens={opcoesGenero.map(opcao => opcao.valor)}
                    valor={genero}
                    aoAlterado={valor => setGenero(valor)}
                />
                <CampoDate
                    label='Data de Nascimento'
                    valor={datanascimento}
                    aoAlterado={valor => setDataNascimento(valor)}
                />
                <CampoCheckBox
                    obrigatorio={true}
                    label="Bloqueado"
                    titulo="Bloqueio o acesso do Cliente na sua Loja"
                    valor={clienteBloqueado}
                    aoAlterado={valor => setClienteBloqueado(valor)}
                />
                <CampoSenha
                    obrigatorio={true}
                    label="Senha"
                    placeholder="Digite a Inscrição Estadual"
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}
                />
                <CampoSenha
                    obrigatorio={true}
                    label="Confirmação de Senha"
                    placeholder="Digite a Inscrição Estadual"
                    valor={senhaConfirmacao}
                    aoAlterado={valor => setSenhaConfirmacao(valor)}
                />
            </div>

            <Botao texto="Cadastrar" />
        </form>
    )

}

export default FormularioAntigo