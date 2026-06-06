<script>
	import { onMount } from 'svelte';
	import { getFavoriten, removeFavorit } from '$lib/stores/favorites.js';

	const categoryColors = {
		Gastronomie: 'danger',
		Logistik: 'warning',
		'Büro & Administration': 'primary',
		Reinigung: 'success',
		Verkauf: 'info',
		Event: 'secondary'
	};

	let favoriten = $state([]);
	onMount(() => { favoriten = getFavoriten(); });

	function entfernen(id) {
		removeFavorit(id);
		favoriten = getFavoriten();
	}
</script>

<svelte:head><title>Merkliste – Flexmatch</title></svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
	<div>
		<h1 class="fw-bold mb-1">Merkliste</h1>
		<p class="text-muted mb-0">{favoriten.length} gemerkte(r) Job(s)</p>
	</div>
	<a href="/jobs" class="btn btn-flexmatch">Jobs suchen</a>
</div>

{#if favoriten.length === 0}
	<div class="card border-0 shadow-sm text-center py-5 px-4">
		<div class="empty-icon mb-3">🔖</div>
		<h4 class="fw-semibold mb-2">Noch keine gemerkten Jobs</h4>
		<p class="text-muted mb-4">Klicke auf der Jobliste oder Detailseite auf das Herz ♡, um Jobs zu merken.</p>
		<div><a href="/jobs" class="btn btn-flexmatch">Jobs entdecken</a></div>
	</div>
{:else}
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		{#each favoriten as job (job.id)}
			<div class="col">
				<div class="card h-100 border-0 shadow-sm" style="border-radius:12px;">
					<div class="card-body d-flex flex-column p-4">
						<div class="d-flex justify-content-between align-items-start mb-3">
							<span class="badge bg-{categoryColors[job.category] ?? 'dark'} bg-opacity-75">{job.category}</span>
							<span class="text-muted small">CHF {job.hourlyRate}.–/h</span>
						</div>
						<h5 class="card-title mb-1 fw-semibold">{job.title}</h5>
						<p class="text-muted small mb-3">{job.company}</p>
						<div class="d-flex gap-3 mb-4 text-muted small flex-grow-1">
							<span>📍 {job.location}</span>
							<span>⏱ {job.workload}</span>
						</div>
						<div class="d-flex gap-2">
							<a href="/jobs/{job.id}" class="btn btn-flexmatch flex-grow-1">Details & Bewerben</a>
							<button class="btn btn-outline-danger" onclick={() => entfernen(job.id)} title="Aus Merkliste entfernen">✕</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.empty-icon { font-size: 3rem; }
</style>
