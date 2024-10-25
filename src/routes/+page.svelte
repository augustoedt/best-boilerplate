<script lang="ts">
	import LoginForm from '@/components/forms/login-form.svelte';
	import type { PageData } from './$types';
	import Button from '@/components/ui/button/button.svelte';
	export let data: PageData;
</script>

<!-- center div -->
<div class="mx-auto flex h-screen w-fit flex-col justify-center">
	<div class="w-fit">
		<LoginForm data={data.form} title="Login" />
		<div class="w-full flex justify-end">
			<Button variant="link" href="/register" class="">Cadastre-se aqui</Button>
		</div>
	</div>
</div>
