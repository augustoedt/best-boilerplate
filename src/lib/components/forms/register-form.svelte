<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '@/components/ui/card';
	import { formRegisterSchema, type FormRegisterSchema } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormRegisterSchema>>;

	export let title = '';

	const form = superForm(data, {
		validators: zodClient(formRegisterSchema),
		onResult: ({ result }) => {
			if (result.status == 200) {
				toast.success('Registro feito com sucesso');
				window.location.href = '/';
			} else {
				toast.error('Erro ao cadastrar');
			}
		}
	});

	const { validate, form: formData, enhance, allErrors } = form;

	$: validateForm = () => {
		//fields not empty or errors.length > 0
		if (
			$formData.email === '' ||
			$formData.password === '' ||
			$formData.confirm === '' ||
			$allErrors.length > 0
		) {
			return true;
		}
		if ($formData.password !== $formData.confirm) {
			return true;
		}
		return false;	
	};
</script>

<form class="" method="POST" use:enhance>
	<Card.Root class="w-[320px] sm:w-[370px] md:w-[420px]">
		<Card.Header>
			<Card.Title class="text-center text-4xl">{title}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Input placeholder="Seu Email" {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Input
						type="password"
						placeholder="Digite sua senha"
						{...attrs}
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirm">
				<Form.Control let:attrs>
					<Input
						type="password"
						placeholder="Digite sua senha novamente"
						{...attrs}
						bind:value={$formData.confirm}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Form.Button disabled={validateForm()} class="w-full py-6 text-lg">
				Acessar minha conta
			</Form.Button>
		</Card.Footer>
	</Card.Root>
</form>
