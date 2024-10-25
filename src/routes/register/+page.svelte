<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import RegisterForm from '@/components/forms/register-form.svelte';
	export let data: PageData;
</script>

<div class="mx-auto flex h-screen w-fit flex-col justify-center">
	<div class="w-fit">
		<RegisterForm data={data.form} title="Register" />
		<div class="w-full flex justify-end">
			<Button variant="link" href="/">Já tenho cadastro</Button>
		</div>
	</div>
</div>
