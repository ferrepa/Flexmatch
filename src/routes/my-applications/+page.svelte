<script>
	import { onMount } from 'svelte';
	import { getBewerbungen, deleteBewerbung } from '$lib/stores/applications.js';
	import { getFavoriten } from '$lib/stores/favorites.js';

	let bewerbungen = $state([]);
	let favCount = $state(0);

	onMount(() => {
		bewerbungen = getBewerbungen();
		favCount = getFavoriten().length;
	});

	let inPruefung = $derived(
		bewerbungen.filter((b) => (b.status ?? 'In Prüfung') === 'In Prüfung').length
	);

	function loeschen(id) {
		deleteBewerbung(id);
		bewerbungen = getBewerbungen();
	}
</script>

<svelte:head>
	<title>Meine Bewerbungen – Flexmatch</title>
</svelte:head>

<div class="d-flex justify-content-between align-items-center mb-4">
	<div>
		<h1 class="fw-bold mb-1">Meine Bewerbungen</h1>
		<p class="text-muted mb-0">{bewerbungen.length} gespeicherte Bewerbung(en)</p>
	</div>
	<a href="/jobs" class="btn btn-flexmatch">Jobs suchen</a>
</div>

<!-- Mini-Dashboard -->
<div class="row g-3 mb-4">
	<div class="col-4">
		<div class="card border-0 shadow-sm text-center p-3">
			<div class="stat-num fw-bold">{bewerbungen.length}</div>
			<div class="text-muted small">Bewerbungen</div>
		</div>
	</div>
	<div class="col-4">
		<div class="card border-0 shadow-sm text-center p-3">
			<div class="stat-num fw-bold">{inPruefung}</div>
			<div class="text-muted small">In Prüfung</div>
		</div>
	</div>
	<div class="col-4">
		<div class="card border-0 shadow-sm text-center p-3">
			<div class="stat-num fw-bold">{favCount}</div>
			<div class="text-muted small">Gemerkte Jobs</div>
		</div>
	</div>
</div>

{#if bewerbungen.length === 0}
	<div class="card border-0 shadow-sm text-center py-5 px-4">
		<div class="empty-icon mb-3">📋</div>
		<h4 class="fw-semibold mb-2">Noch keine Bewerbungen</h4>
		<p class="text-muted mb-4">Du hast dich noch auf keinen Job beworben.</p>
		<div><a href="/jobs" class="btn btn-flexmatch">Jobs entdecken</a></div>
	</div>
{:else}
	<div class="row g-4">
		{#each bewerbungen as b (b.id)}
			<div class="col-12 col-md-6">
				<div class="card border-0 shadow-sm h-100">
					<div class="card-body p-4">
						<div class="d-flex justify-content-between align-items-start mb-2">
							<h5 class="fw-semibold mb-0">{b.jobTitel}</h5>
							<span class="badge bg-warning text-dark">{b.status ?? 'In Prüfung'}</span>
						</div>
						<p class="text-muted small mb-3">🏢 {b.firma} · 📅 {b.datum}</p>
						<hr class="my-3" />
						<div class="row g-2 mb-3 small">
							<div class="col-6">
								<span class="text-muted">Name</span><br /><strong>{b.name}</strong>
							</div>
							<div class="col-6">
								<span class="text-muted">Telefon</span><br /><strong>{b.telefon}</strong>
							</div>
							<div class="col-12">
								<span class="text-muted">E-Mail</span><br /><strong>{b.email}</strong>
							</div>
						</div>
						<p class="text-muted small fst-italic mb-2">
							"{b.nachricht.length > 120 ? b.nachricht.slice(0, 120) + '…' : b.nachricht}"
						</p>
						<p class="text-muted small mb-4">Der Arbeitgeber sichtet deine Bewerbung und meldet sich bei dir.</p>
						<div class="d-flex gap-2">
							<a href="/jobs/{b.jobId}" class="btn btn-outline-secondary btn-sm">Job ansehen</a>
							<button class="btn btn-outline-danger btn-sm" onclick={() => loeschen(b.id)}>Löschen</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.empty-icon { font-size: 3rem; }
	.stat-num { font-size: 1.6rem; color: #e4003a; }
</style>
