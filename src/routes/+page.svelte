<script>
	let { data } = $props();
	let user = $derived(data.user);
</script>

<svelte:head><title>Flexmatch – Flexible Jobs in der Schweiz</title></svelte:head>

<!-- Hero -->
<section class="hero rounded-4 text-white text-center py-5 px-3 mb-5">
	<div class="row justify-content-center">
		<div class="col-12 col-md-8">
			<h1 class="display-4 fw-bold mb-3">Flexible Jobs.<br />Sofort verfügbar.</h1>
			<p class="lead mb-4 opacity-90">
				{#if user}Willkommen zurück, {user.name}! {/if}Tausende Einsätze in der ganzen Schweiz –
				von Gastronomie bis Logistik. Jetzt bewerben, morgen starten.
			</p>
			<a href="/jobs" class="btn btn-light btn-lg fw-bold px-5">Jobs ansehen</a>
		</div>
	</div>
</section>

<!-- Vorteile -->
<section class="mb-5">
	<h2 class="text-center fw-bold mb-4">Warum Flexmatch?</h2>
	<div class="row g-4">
		<div class="col-12 col-md-4">
			<div class="card border-0 shadow-sm h-100 text-center p-4">
				<div class="feature-icon mb-3">⚡</div>
				<h5 class="fw-semibold">Schnell bewerben</h5>
				<p class="text-muted small mb-0">Bewerbung in wenigen Klicks – ohne langes Anschreiben.</p>
			</div>
		</div>
		<div class="col-12 col-md-4">
			<div class="card border-0 shadow-sm h-100 text-center p-4">
				<div class="feature-icon mb-3">📍</div>
				<h5 class="fw-semibold">In deiner Nähe</h5>
				<p class="text-muted small mb-0">Jobs in Zürich, Bern, Basel, Luzern und weiteren Städten.</p>
			</div>
		</div>
		<div class="col-12 col-md-4">
			<div class="card border-0 shadow-sm h-100 text-center p-4">
				<div class="feature-icon mb-3">💼</div>
				<h5 class="fw-semibold">Viele Branchen</h5>
				<p class="text-muted small mb-0">Gastronomie, Logistik, Büro, Verkauf, Events – für jeden das Richtige.</p>
			</div>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="text-center py-5 bg-white rounded-4 shadow-sm">
	<h2 class="fw-bold mb-3">Bereit für deinen nächsten Einsatz?</h2>
	<p class="text-muted mb-4">Aktuell <strong>25 offene Stellen</strong> verfügbar.</p>
	<a href="/jobs" class="btn btn-flexmatch btn-lg px-5">Alle Jobs ansehen</a>
</section>

<style>
	.hero { background: linear-gradient(135deg, #e4003a 0%, #a80029 100%); min-height: 340px; display: flex; align-items: center; }
	.feature-icon { font-size: 2.5rem; }
	.opacity-90 { opacity: 0.9; }
</style>
