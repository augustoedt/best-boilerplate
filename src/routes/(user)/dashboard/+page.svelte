<script lang="ts">
	import Input from '@/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, constraints, errors } = superForm(data.form);
</script>

calendar app

<div class="w-24">
	<Input
		name="number"
		type="number"
		aria-invalid={$errors.num ? 'true' : undefined}
		bind:value={$form.num}
		{...$constraints.num}
	/>
</div>
