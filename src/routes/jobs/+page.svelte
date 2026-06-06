<script>
	import JobCard from '$lib/components/JobCard.svelte';
	import { categories, locations } from '$lib/jobs.js';

	let { data } = $props();

	let searchTerm       = $state('');
	let selectedCategory = $state('Alle');
	let selectedLocation = $state('Alle');
	let sortBy           = $state('relevanz');

	let filtered = $derived(
		data.jobs
			.filter((job) => {
				const q = searchTerm.trim().toLowerCase();
				const searchOk =
					q === '' ||
					job.title.toLowerCase().includes(q) ||
					job.company.toLowerCase().includes(q) ||
					job.description.toLowerCase().includes(q) ||
					job.category.toLowerCase().includes(q);
				const catOk = selectedCategory === 'Alle' || job.category === selectedCategory;
				const locOk = selectedLocation === 'Alle' || job.location === selectedLocation;
				return searchOk && catOk && locOk;
			})
			.sort((a, b) => {
				switch (sortBy) {
					case 'lohn-desc': return b.hourlyRate - a.hourlyRate;
					case 'lohn-asc':  return a.hourlyRate - b.hourlyRate;
					case 'datum-neu': return new Date(b.date) - new Date(a.date);
					default:          return 0;
				}
			})
	);

	function resetFilter() {
		searchTerm = '';
		selectedCategory = 'Alle';
		selectedLocation = 'Alle';
		sortBy = 'relevanz';
	}
</script>

<!-- Seitenkopf -->
<div class="d-flex justify-content-between align-items-center mb-4">
	<div>
		<h1 class="fw-bold mb-1">Jobs</h1>
		<p class="text-muted mb-0">{filtered.length} Stelle(n) gefunden</p>
	</div>
</div>

<!-- Suche + Filterleiste -->
<div class="card border-0 shadow-sm mb-4 p-3">
	<!-- Volltext-Suche -->
	<div class="mb-3">
		<label class="form-label fw-semibold small" for="search">Suche</label>
		<div class="input-group">
			<span class="input-group-text bg-white">🔍</span>
			<input
				id="search"
				type="search"
				class="form-control"
				placeholder="Nach Jobtitel, Firma oder Stichwort suchen…"
				bind:value={searchTerm}
			/>
		</div>
	</div>

	<div class="row g-3 align-items-end">
		<div class="col-12 col-md-3">
			<label class="form-label fw-semibold small" for="cat-filter">Kategorie</label>
			<select id="cat-filter" class="form-select" bind:value={selectedCategory}>
				{#each categories as cat}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
		</div>
		<div class="col-12 col-md-3">
			<label class="form-label fw-semibold small" for="loc-filter">Ort</label>
			<select id="loc-filter" class="form-select" bind:value={selectedLocation}>
				{#each locations as loc}
					<option value={loc}>{loc}</option>
				{/each}
			</select>
		</div>
		<div class="col-12 col-md-3">
			<label class="form-label fw-semibold small" for="sort">Sortieren</label>
			<select id="sort" class="form-select" bind:value={sortBy}>
				<option value="relevanz">Relevanz</option>
				<option value="lohn-desc">Stundenlohn (hoch → tief)</option>
				<option value="lohn-asc">Stundenlohn (tief → hoch)</option>
				<option value="datum-neu">Neueste zuerst</option>
			</select>
		</div>
		<div class="col-12 col-md-3">
			<button class="btn btn-outline-secondary w-100" onclick={resetFilter}>
				Zurücksetzen
			</button>
		</div>
	</div>
</div>

<!-- Jobliste -->
{#if filtered.length === 0}
	<div class="alert alert-warning">
		Keine Jobs gefunden. Probiere einen anderen Suchbegriff oder andere Filtereinstellungen.
	</div>
{:else}
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		{#each filtered as job (job.id)}
			<div class="col">
				<JobCard {job} />
			</div>
		{/each}
	</div>
{/if}
