<script>
	import { onMount } from 'svelte';
	import { isFavorit, toggleFavorit } from '$lib/stores/favorites.js';

	let { job } = $props();

	const categoryColors = {
		Gastronomie: 'danger',
		Logistik: 'warning',
		'Büro & Administration': 'primary',
		Reinigung: 'success',
		Verkauf: 'info',
		Event: 'secondary'
	};
	let badgeColor = $derived(categoryColors[job.category] ?? 'dark');

	let fav = $state(false);
	onMount(() => { fav = isFavorit(job.id); });
	function toggleFav() { fav = toggleFavorit(job); }
</script>

<div class="card h-100 job-card shadow-sm border-0">
	<div class="card-body d-flex flex-column p-4">
		<div class="d-flex justify-content-between align-items-start mb-3">
			<span class="badge bg-{badgeColor} bg-opacity-75">{job.category}</span>
			<div class="d-flex align-items-center gap-2">
				<span class="text-muted small">CHF {job.hourlyRate}.–/h</span>
				<button
					type="button"
					class="fav-btn"
					class:active={fav}
					onclick={toggleFav}
					aria-label="Job merken"
					title="Job merken"
				>
					{fav ? '♥' : '♡'}
				</button>
			</div>
		</div>

		<h5 class="card-title mb-1 fw-semibold">{job.title}</h5>
		<p class="text-muted small mb-3">{job.company}</p>

		<div class="d-flex gap-3 mb-3 text-muted small">
			<span>📍 {job.location}</span>
			<span>⏱ {job.workload}</span>
		</div>

		<p class="card-text text-muted small mb-4 flex-grow-1 description-clamp">
			{job.description}
		</p>

		<a href="/jobs/{job.id}" class="btn btn-flexmatch w-100">Details & Bewerben</a>
	</div>
</div>

<style>
	.job-card {
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		border-radius: 12px !important;
	}
	.job-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(228, 0, 58, 0.12) !important;
	}
	.description-clamp {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.btn-flexmatch {
		background-color: #e4003a;
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
	}
	.btn-flexmatch:hover {
		background-color: #c0002f;
		color: white;
	}
	.fav-btn {
		border: none;
		background: transparent;
		font-size: 1.35rem;
		line-height: 1;
		color: #ced4da;
		cursor: pointer;
		padding: 0 2px;
	}
	.fav-btn.active,
	.fav-btn:hover {
		color: #e4003a;
	}
</style>
