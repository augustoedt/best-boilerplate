<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, constraints, errors } = superForm(data.form);
</script>

<div class="text-3xl">
	Dashboard
</div>

<div class="py-3 px-1">
<!-- logout form-->
	<form action="?/logout" method="post">
		<Button type="submit">Logout</Button>
	</form>
</div>