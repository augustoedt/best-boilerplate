<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '@/components/ui/card';
	import { formLoginSchema, type FormLoginSchema } from '$lib/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormLoginSchema>>;

	export let title = '';

	const form = superForm(data, {
		validators: zodClient(formLoginSchema),
		onResult: ({ result }) => {
			if (result.status == 200) {
				toast.success('Login efetuado com sucesso');
				window.location.href = '/dashboard';
			} else {
				toast.error('Erro ao efetuar login');
			}
		}
	});

	const { form: formData, enhance, allErrors } = form;

	$: validateForm = () => {
		//fields not empty or errors.length > 0
		if ($formData.email === '' || $formData['current-password'] === '' || $allErrors.length > 0) {
			return true;
		}
		return false;
	};
</script>

<form class="" method="POST" use:enhance>
	<Card.Root class="mx-auto w-[320px] sm:w-[370px] md:w-[420px]">
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
			<Form.Field {form} name="current-password">
				<Form.Control let:attrs>
					<Input
						type="password"
						placeholder="Digite sua senha"
						{...attrs}
						bind:value={$formData['current-password']}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Form.Button disabled={validateForm()} class="w-full py-6 text-lg"
				>Acessar minha conta</Form.Button
			>
		</Card.Footer>
	</Card.Root>
</form>
