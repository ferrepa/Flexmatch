<script>
	import { page } from '$app/stores';
	let { user = null } = $props();
</script>

<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #e4003a;">
	<div class="container">
		<a class="navbar-brand fw-bold" href="/">
			<span class="brand-f">f</span>lexmatch
		</a>

		{#if user}
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Navigation öffnen"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto gap-1 align-items-lg-center">
					<li class="nav-item">
						<a class="nav-link rounded" class:active={$page.url.pathname === '/'} href="/">Start</a>
					</li>
					<li class="nav-item">
						<a class="nav-link rounded" class:active={$page.url.pathname.startsWith('/jobs')} href="/jobs">Jobs</a>
					</li>
					<li class="nav-item">
						<a class="nav-link rounded" class:active={$page.url.pathname === '/favorites'} href="/favorites">Merkliste</a>
					</li>
					<li class="nav-item">
						<a class="nav-link rounded" class:active={$page.url.pathname === '/my-applications'} href="/my-applications">Meine Bewerbungen</a>
					</li>
					<li class="nav-item d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0">
						<span class="text-white small">👤 {user.name}</span>
						<a class="btn btn-light btn-sm fw-semibold" href="/logout">Abmelden</a>
					</li>
				</ul>
			</div>
		{:else}
			<div class="ms-auto d-flex gap-2">
				<a class="btn btn-outline-light btn-sm" href="/login">Anmelden</a>
				<a class="btn btn-light btn-sm fw-semibold" href="/register">Registrieren</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	.navbar-brand { font-size: 1.6rem; letter-spacing: -0.02em; }
	.brand-f { font-size: 2rem; line-height: 1; font-weight: 900; }
	.nav-link.active { background-color: rgba(255, 255, 255, 0.18); font-weight: 600; }
	.nav-link:hover { background-color: rgba(255, 255, 255, 0.1); }
</style>
