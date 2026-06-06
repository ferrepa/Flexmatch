<script>
	import { onMount } from 'svelte';
	import { getProfil, saveProfil } from '$lib/stores/profile.js';
	import { getBewerbungen } from '$lib/stores/applications.js';

	let { data } = $props();
	let user = $derived(data.user);

	let profil = $state({ ueberMich: '', cvName: '', telefon: '', ort: '' });
	let bewerbungen = $state(0);
	let gespeichert = $state(false);
	let cvInput;

	onMount(() => {
		profil = getProfil();
		bewerbungen = getBewerbungen().length;
	});

	function speichern() {
		saveProfil(profil);
		gespeichert = true;
		setTimeout(() => (gespeichert = false), 2000);
	}
	function cvGewaehlt(e) {
		const f = e.currentTarget.files?.[0];
		if (f) { profil.cvName = f.name; saveProfil(profil); }
	}
</script>

<svelte:head><title>Profil – Flexmatch</title></svelte:head>

<div class="alert alert-info border-0 d-flex align-items-center gap-2 mb-4" style="background:#fdeef1;color:#8a0d28;">
	<span style="font-size:1.2rem;">ℹ️</span>
	<div class="small">So sieht ein <strong>Arbeitgeber dein Profil</strong>, wenn du dich bewirbst – mit CV, Erfahrung, Ausbildung und deinen Bewertungen. Vervollständige es, um deine Chancen zu erhöhen.</div>
</div>

<div class="row g-4">
	<!-- Linke Spalte -->
	<div class="col-12 col-lg-4">
		<div class="card border-0 shadow-sm p-4 mb-4 text-center">
			<div class="avatar mx-auto mb-3">👤</div>
			<button class="btn btn-sm btn-outline-secondary">📷 Foto ändern</button>
		</div>

		<div class="card border-0 shadow-sm p-4 mb-4">
			<h5 class="fw-bold mb-3">Kontakt</h5>
			<label class="form-label small fw-semibold mb-1" for="tel">Telefon</label>
			<input id="tel" class="form-control form-control-sm mb-3" bind:value={profil.telefon} placeholder="+41 79 123 45 67" />
			<div class="small text-muted mb-1 fw-semibold">E-Mail</div>
			<div class="mb-3">{user?.email ?? '—'}</div>
			<label class="form-label small fw-semibold mb-1" for="ort">Ort</label>
			<input id="ort" class="form-control form-control-sm" bind:value={profil.ort} placeholder="z. B. 8006 Zürich" />
		</div>

		<div class="card border-0 shadow-sm p-4">
			<h5 class="fw-bold mb-1">Kundenbewertungen</h5>
			<div class="mb-1"><span class="stars">★★★★★</span> <strong>5.0</strong></div>
			<p class="text-muted small mb-3">1 Kundenbewertung</p>
			{#each [['5 Stern(e)', 100], ['4 Stern(e)', 0], ['3 Stern(e)', 0], ['2 Stern(e)', 0], ['1 Stern(e)', 0]] as [label, pct]}
				<div class="d-flex align-items-center gap-2 mb-2 small">
					<span style="width:80px;">{label}</span>
					<div class="flex-grow-1 bar"><div class="bar-fill" style="width:{pct}%"></div></div>
					<span style="width:40px;text-align:right;">{pct} %</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Rechte Spalte -->
	<div class="col-12 col-lg-8">
		<div class="d-flex align-items-center justify-content-between mb-3">
			<div>
				<h1 class="fw-bold mb-1">{user?.name ?? 'Mein Profil'}</h1>
				<div><span class="stars">★★★★★</span> <strong>5.0</strong> <span class="text-muted">von 5 (1 Bewertung)</span></div>
			</div>
		</div>

		<!-- CV -->
		<div class="card border-0 shadow-sm p-4 mb-4">
			<p class="mb-3">Unternehmen müssen deine Berufserfahrung überprüfen, bevor sie dich anstellen. Bitte lade deinen Lebenslauf (CV) hoch.</p>
			<input type="file" bind:this={cvInput} onchange={cvGewaehlt} accept=".pdf,.doc,.docx" class="d-none" />
			{#if profil.cvName}
				<div class="alert alert-success py-2 small mb-2">✓ Hochgeladen: <strong>{profil.cvName}</strong></div>
				<button class="btn btn-outline-flexmatch" onclick={() => cvInput.click()}>Anderen Lebenslauf wählen</button>
			{:else}
				<button class="btn btn-flexmatch w-100" onclick={() => cvInput.click()}>Lebenslauf hochladen</button>
			{/if}
		</div>

		<!-- Über mich -->
		<div class="card border-0 shadow-sm p-4 mb-4">
			<h4 class="fw-semibold mb-2">Über mich</h4>
			<p class="text-muted small mb-2">Beeindrucke Personalverantwortliche: beschreibe Fähigkeiten, Erfahrung und Karriereziele.</p>
			<textarea class="form-control mb-3" rows="4" bind:value={profil.ueberMich} placeholder="Beginne mit der Texteingabe…"></textarea>
			<div class="d-flex align-items-center gap-3">
				<button class="btn btn-flexmatch" onclick={speichern}>Profil speichern</button>
				{#if gespeichert}<span class="text-success small">✓ Gespeichert</span>{/if}
			</div>
		</div>

		<!-- Erfahrung -->
		<div class="card border-0 shadow-sm p-4 mb-4">
			<h4 class="fw-semibold mb-3">Erfahrung & Einsätze</h4>
			<div class="d-flex justify-content-between align-items-start mb-2">
				<div>
					<div class="fw-semibold">Produktionsmitarbeiter/in</div>
					<div class="text-muted small">3 Einsätze · 23 Stunden · 1 Unternehmen</div>
				</div>
				<div><span class="stars">★★★★★</span> <strong>5.0</strong></div>
			</div>
			<hr />
			<div class="text-muted small">Gesendete Bewerbungen: <strong>{bewerbungen}</strong></div>
		</div>

		<!-- Ausbildung -->
		<div class="card border-0 shadow-sm p-4 mb-4">
			<h4 class="fw-semibold mb-3">Ausbildung</h4>
			<div class="text-muted small mb-1">Aug. 2024 – Juli 2028</div>
			<div class="fw-semibold">ZHAW Zürcher Hochschule für Angewandte Wissenschaften</div>
			<div class="text-muted small">Bachelor of Science in Wirtschaftsinformatik · Winterthur, Schweiz</div>
		</div>

		<!-- Sprachen -->
		<div class="card border-0 shadow-sm p-4">
			<h4 class="fw-semibold mb-3">Sprachen</h4>
			<ul class="mb-0 small">
				<li><strong>Deutsch</strong> – Muttersprache (L1)</li>
				<li><strong>Englisch</strong> – C2 (annähernd muttersprachlich)</li>
				<li><strong>Französisch</strong> – A2 (Grundkenntnisse)</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.avatar {
		width: 160px; height: 160px; border-radius: 50%;
		background: #f1f3f5; display: flex; align-items: center; justify-content: center;
		font-size: 5rem; color: #adb5bd;
	}
	.stars { color: #e4003a; letter-spacing: 1px; }
	.bar { height: 8px; background: #eef0f2; border-radius: 4px; overflow: hidden; }
	.bar-fill { height: 100%; background: #e4003a; }
</style>
