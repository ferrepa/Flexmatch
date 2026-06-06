<script>
	import { onMount } from 'svelte';
	import { isFavorit, toggleFavorit } from '$lib/stores/favorites.js';

	let { data } = $props();
	let job = $derived(data.job);
	let similar = $derived(data.similar ?? []);

	const categoryColors = {
		Gastronomie: 'danger',
		Logistik: 'warning',
		'Büro & Administration': 'primary',
		Reinigung: 'success',
		Verkauf: 'info',
		Event: 'secondary'
	};

	let fav = $state(false);
	onMount(() => { fav = isFavorit(job.id); });
	function toggleFav() { fav = toggleFavorit(job); }
</script>

<svelte:head>
	<title>{job.title} – Flexmatch</title>
</svelte:head>

<a href="/jobs" class="btn btn-outline-secondary mb-4">← Alle Jobs</a>

<div class="row g-4">
	<!-- Hauptinhalt -->
	<div class="col-12 col-lg-8">
		<div class="card border-0 shadow-sm p-4 mb-4">
			<div class="mb-3">
				<span class="badge bg-danger bg-opacity-75 mb-2">{job.category}</span>
				<h1 class="fw-bold mb-1">{job.title}</h1>
				<p class="text-muted mb-0">{job.company}</p>
			</div>

			<div class="row g-3 mb-4">
				<div class="col-6 col-md-3">
					<div class="info-box text-center p-3 rounded-3 bg-light">
						<div class="info-label">Ort</div>
						<div class="fw-semibold">📍 {job.location}</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="info-box text-center p-3 rounded-3 bg-light">
						<div class="info-label">Pensum</div>
						<div class="fw-semibold">⏱ {job.workload}</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="info-box text-center p-3 rounded-3 bg-light">
						<div class="info-label">Stundenlohn</div>
						<div class="fw-semibold">💰 CHF {job.hourlyRate}.–</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="info-box text-center p-3 rounded-3 bg-light">
						<div class="info-label">Start</div>
						<div class="fw-semibold">📅 {new Date(job.date).toLocaleDateString('de-CH')}</div>
					</div>
				</div>
			</div>

			<h4 class="fw-semibold mb-2">Über diese Stelle</h4>
			<p class="mb-4">{job.description}</p>

			<h4 class="fw-semibold mb-2">Anforderungen</h4>
			<ul class="mb-0">
				{#each job.requirements as req}
					<li class="mb-1">{req}</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Seitenleiste -->
	<div class="col-12 col-lg-4">
		<div class="card border-0 shadow-sm p-4 sticky-top" style="top: 1rem;">
			<h5 class="fw-bold mb-1">{job.company}</h5>
			<p class="text-muted small mb-3">{job.location}</p>
			<hr />
			<p class="text-muted small mb-4">
				Bewirb dich jetzt – schnell, unkompliziert, ohne langes Anschreiben.
			</p>
			<a href="/jobs/{job.id}/apply" class="btn btn-flexmatch btn-lg w-100 mb-2">
				Jetzt bewerben
			</a>
			<button type="button" class="btn btn-outline-flexmatch w-100" onclick={toggleFav}>
				{fav ? '♥ Gemerkt' : '♡ Job merken'}
			</button>
		</div>
	</div>
</div>

{#if similar.length > 0}
	<section class="mt-5">
		<h3 class="fw-bold mb-3">Ähnliche Jobs</h3>
		<div class="row row-cols-1 row-cols-md-3 g-4">
			{#each similar as s (s.id)}
				<div class="col">
					<a href="/jobs/{s.id}" class="card h-100 border-0 shadow-sm text-decoration-none text-reset similar-card">
						<div class="card-body p-3">
							<span class="badge bg-{categoryColors[s.category] ?? 'dark'} bg-opacity-75 mb-2">{s.category}</span>
							<h6 class="fw-semibold mb-1">{s.title}</h6>
							<p class="text-muted small mb-2">{s.company}</p>
							<div class="text-muted small">📍 {s.location} · CHF {s.hourlyRate}.–/h</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</section>
{/if}

<style>
	.info-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		color: #6c757d;
		margin-bottom: 0.25rem;
		letter-spacing: 0.05em;
	}
	.similar-card {
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		border-radius: 12px;
	}
	.similar-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(228, 0, 58, 0.12) !important;
	}
</style>
