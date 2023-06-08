import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../../services/validation'

import './formhook.css'
import Botao from '../Botao';
import '../Formulario/formulario.css'
import api from '../../services/api';
import moment from 'moment';
import CustomModal from '../Modal/index';


const FormHook = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setValue
    } = useForm({
        resolver: zodResolver(schema),
    });


    const senhaRef = useRef(null);
    const isPhysicalPerson = watch('tipoPessoa') === 'Física';
    const isIsento = watch('isento');

    useEffect(() => {
        setValue('tipoPessoa', 'Física');
    }, [setValue]);

    useEffect(() => {
        if (!isPhysicalPerson) {
            setValue('genero', ''); // Clear the value of the "genero" field
            setValue('dataNascimento', ''); // Clear the value of the "dataNascimento" field
        }
    }, [setValue, isPhysicalPerson]);



    const onSubmit = (data) => {
        console.log(data);

        const novoCliente = {
            nome: data.nome || '',
            email: data.email || '',
            telefone: data.telefone.replace(/[\(\)\-\s]/g, ''),
            dataCadastro: moment().format('YYYY-MM-DD'),
            tipoPessoa: data.tipoPessoa || '',
            cpfCnpj: data.cpfCnpj.replace(/[./-]/g, ''),
            inscricaoEstadual: data.inscricaoEstadual || '',
            isento: data.isento || true,
            genero: data.genero || '',
            bloqueado: data.bloqueado,
            senha: data.senha || ''
        };

        api
            .post('/api/Cliente', novoCliente, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                openModal();
            })
            .catch((err) => {
                console.error('Ops! Ocorreu um erro: ' + err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='campoEstilo'>
                    <label>Nome do Cliente/Razão Social:</label>
                    <input type="text" {...register('nome', { required: true, maxLength: 150 })} />
                    {errors.nome && <span>Campo obrigatório com no máximo 150 caracteres</span>}
                </div>

                <div className='campoEstilo'>
                    <label>E-mail:</label>
                    <input type="email" {...register('email', { required: true, maxLength: 150 })} />
                    {errors.email && <span>Campo obrigatório com no máximo 150 caracteres</span>}
                </div>

                <div className='campoEstilo'>
                    <label>Telefone:</label>
                    <InputMask mask="(99) 99999-9999" maskChar=" " type="tel" {...register('telefone', { required: true, maxLength: 15 })} />
                    {errors.telefone && <span>Campo obrigatório com no máximo 11 caracteres</span>}
                </div>


                {/* Área de Informações Pessoais */}
                <div className='campoEstilo'>
                    <label>Tipo de Pessoa:</label>
                    <select {...register('tipoPessoa', { required: true })}>
                        <option value="Física">Física</option>
                        <option value="Jurídica">Jurídica</option>
                    </select>
                    {errors.tipoPessoa && <span>Selecione o tipo de Pessoa</span>}
                </div>

                <div className='campoEstilo'>
                    <label>CPF/CNPJ:</label>
                    <Controller
                        control={control}
                        name="cpfCnpj"
                        render={({ field }) => (
                            <InputMask
                                mask={isPhysicalPerson ? '999.999.999-99' : '99.999.999/9999-99'}
                                placeholder={isPhysicalPerson ? '___.___.___-__' : '__.___.___/____-__'}
                                // disabled={!isPhysicalPerson}
                                {...field}
                            />
                        )}
                    />
                    {errors.cpfCnpj && <span>{errors.cpfCnpj.message}</span>}
                </div>

                {!isPhysicalPerson || isIsento ? (
                    <div className='campoEstilo'>
                        <label>Inscrição Estadual:</label>
                        <input
                            type="text"
                            {...register('inscricaoEstadual', {
                                required: isPhysicalPerson || isIsento,
                                maxLength: 12,
                            })}
                            disabled={isIsento}
                            mask="999.999.999-999"
                            maskChar=" "
                            as={InputMask}
                        />
                        {isIsento && <span>Isento</span>}
                    </div>
                ) : null}

                <div className='campoEstilo-checkbox'>
                    <label>Isento:</label>
                    <input
                        type="checkbox"
                        {...register('isento')}
                        disabled={isPhysicalPerson}
                    />
                </div>

                {isPhysicalPerson && (
                    <div className='campoEstilo'>
                        <label>Gênero:</label>
                        <select {...register('genero', { required: false })} value={isPhysicalPerson ? '' : ''} hidden={!isPhysicalPerson}>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Outro">Outro</option>
                        </select>
                        {errors.genero && <span>Selecione o gênero do Cliente</span>}
                    </div>
                )}

                {isPhysicalPerson && (
                    <div className='campoEstilo'>
                        <label>Data de Nascimento:</label>
                        <input type="date" {...register('dataNascimento', { required: false })} />
                        {errors.dataNascimento && <span>Campo obrigatório</span>}
                    </div>
                )}

                {/* Área de Situação do Cliente */}
                <div className='campoEstilo-checkbox' ref={senhaRef}>
                    <label>Bloqueado:</label>
                    <input type="checkbox" {...register('bloqueado')} style={{ textAlign: 'left' }} />
                </div>

                {/* Área de Senha de Acesso */}
                <div className='campoEstilo' ref={senhaRef}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        {...register('senha', { required: true })}
                    />
                    {errors.senha && <span>Campo obrigatório</span>}
                </div>

                <div className='campoEstilo'>
                    <label>Confirmação de Senha:</label>
                    <input
                        type="password"
                        {...register('confirmacaoSenha', {
                            required: true,
                            validate: (value) => value === watch('senha'),
                        })}
                    />
                    {errors.confirmacaoSenha && <span>As senhas não conferem</span>}
                </div>

                {/* Botões */}
                <div>
                    <Botao texto="Cadastrar" />
                    <Botao texto="Voltar" />
                </div>
            </form>

            <CustomModal showModal={isModalVisible} closeModal={closeModal} />
        </>
    );
}

export default FormHook;
