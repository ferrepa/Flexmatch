<script>
	import Navbar from '$lib/components/Navbar.svelte';
	let { children, data } = $props();
</script>

<Navbar user={data.user} />

<main class="container py-4">
	{@render children()}
</main>

<footer class="mt-5 py-4 border-top bg-light">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-6 text-muted small">
				© 2026 Flexmatch Prototyp – ZHAW Modul Prototyping mit Webtechnologien FS26
			</div>
			<div class="col-md-6 text-md-end text-muted small">
				Flexible Jobs in der ganzen Schweiz
			</div>
		</div>
	</div>
</footer>

<style>
	:global(body) { background-color: #f8f9fa; }
	:global(.btn-flexmatch) {
		background-color: #e4003a; color: white; border: none; border-radius: 8px; font-weight: 600;
	}
	:global(.btn-flexmatch:hover) { background-color: #c0002f; color: white; }
	:global(.btn-outline-flexmatch) {
		color: #e4003a; border: 1px solid #e4003a; border-radius: 8px; font-weight: 600; background: transparent;
	}
	:global(.btn-outline-flexmatch:hover) { background-color: #e4003a; color: white; }
</style>
