import { z } from 'zod';

export const schema = z.object({
    nome: z.string().max(150).nonempty(),
    email: z.string().max(150).email(),
    telefone: z.string().max(15).nonempty(),
    tipoPessoa: z.string().nonempty(),
    cpfCnpj: z.string().refine((value) => {
        // Custom validation for CPF or CNPJ
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return cpfRegex.test(value) || cnpjRegex.test(value);
    }),
    genero: z.string().optional(),
    dataNascimento: z.string().optional(),
    bloqueado: z.boolean().optional(),
    senha: z.string().min(8).max(15).nonempty(),
    confirmacaoSenha: z.string().min(8).max(15).nonempty()
}).refine((data) => data.senha === data.confirmacaoSenha, {
    message: 'As senhas não conferem',
    path: ['confirmacaoSenha'],
});
