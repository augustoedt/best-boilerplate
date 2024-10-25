import { z } from 'zod';

export const formLoginSchema = z.object({
	email: z.string().min(1, 'Email não fornecido').email({
		message: 'Email inválido'
	}),
	'current-password': z.string().min(1, 'Senha não fornecida')
});

export const formRegisterSchema = z
	.object({
		email: z.string().min(1, 'Email não fornecido').email({
			message: 'Email inválido'
		}),
		password: z.string().min(1, 'Senha não fornecida'),
		// create custom validation
		confirm: z.string().min(1, 'Confirmação de senha não fornecida')
	})
	.refine((data) => data.password === data.confirm, {
		message: 'Senhas não conferem',
		path: ['confirm']
	});

export type FormLoginSchema = typeof formLoginSchema;
export type FormRegisterSchema = typeof formRegisterSchema;
