<script>
	import { enhance } from '$app/forms';
	import { saveBewerbung } from '$lib/stores/applications.js';

	let { data, form } = $props();
	let job = $derived(data.job);

	let submitted     = $state(false);
	let persistedToDb = $state(false);

	function handleEnhance() {
		return async ({ result, update }) => {
			await update();
			if (result.type === 'success' && result.data?.success) {
				saveBewerbung({
					...result.data.bewerbung,
					jobTitel: job.title,
					firma:    job.company
				});
				persistedToDb = result.data.persisted === true;
				submitted = true;
			}
		};
	}
</script>

<svelte:head>
	<title>Bewerben – {job.title} – Flexmatch</title>
</svelte:head>

<a href="/jobs/{job.id}" class="btn btn-outline-secondary mb-4">← Zurück zum Job</a>

<div class="row justify-content-center">
	<div class="col-12 col-md-8 col-lg-6">

		{#if submitted}
			<div class="text-center py-5">
				<div class="success-icon mb-3">✅</div>
				<h2 class="fw-bold mb-2">Bewerbung eingegangen!</h2>
				<p class="text-muted mb-2">
					Deine Bewerbung für <strong>{job.title}</strong> bei {job.company} wurde erfasst.
				</p>
				<p class="mb-2"><span class="badge bg-warning text-dark">Status: In Prüfung</span></p>
				<p class="text-muted small mb-4">
					Der Arbeitgeber sichtet deine Bewerbung und meldet sich bei dir.
					{#if persistedToDb}Sie wurde server-seitig in der Datenbank gespeichert.{:else}Sie wurde lokal in deinem Browser gespeichert.{/if}
					Den Status findest du jederzeit unter „Meine Bewerbungen".
				</p>
				<div class="alert alert-light border small mb-4">📎 Dein <a href="/profile">Profil</a> (CV, Erfahrung &amp; Bewertungen) wird dem Arbeitgeber mit deiner Bewerbung angezeigt.</div>
				<div class="d-flex gap-2 justify-content-center flex-wrap">
					<a href="/my-applications" class="btn btn-flexmatch">Meine Bewerbungen</a>
					<a href="/jobs"            class="btn btn-outline-secondary">Weitere Jobs</a>
				</div>
			</div>

		{:else}
			<div class="card border-0 shadow-sm p-4">
				<h1 class="fw-bold mb-1 h3">Bewerbung</h1>
				<p class="text-muted small mb-4">
					{job.title} · {job.company} · {job.location}
				</p>

				{#if form?.errors && Object.keys(form.errors).length > 0}
					<div class="alert alert-danger mb-4">
						Bitte korrigiere die markierten Felder.
					</div>
				{/if}

				<form method="POST" action="?/bewerben" use:enhance={handleEnhance}>
					<div class="mb-3">
						<label class="form-label fw-semibold" for="name">Name *</label>
						<input id="name" name="name" type="text" class="form-control"
							class:is-invalid={form?.errors?.name} placeholder="Vor- und Nachname"
							value={form?.values?.name ?? ''} />
						{#if form?.errors?.name}<div class="invalid-feedback">{form.errors.name}</div>{/if}
					</div>

					<div class="mb-3">
						<label class="form-label fw-semibold" for="email">E-Mail *</label>
						<input id="email" name="email" type="email" class="form-control"
							class:is-invalid={form?.errors?.email} placeholder="name@beispiel.ch"
							value={form?.values?.email ?? ''} />
						{#if form?.errors?.email}<div class="invalid-feedback">{form.errors.email}</div>{/if}
					</div>

					<div class="mb-3">
						<label class="form-label fw-semibold" for="telefon">Telefon *</label>
						<input id="telefon" name="telefon" type="tel" class="form-control"
							class:is-invalid={form?.errors?.telefon} placeholder="+41 79 123 45 67"
							value={form?.values?.telefon ?? ''} />
						{#if form?.errors?.telefon}<div class="invalid-feedback">{form.errors.telefon}</div>{/if}
					</div>

					<div class="mb-4">
						<label class="form-label fw-semibold" for="nachricht">Nachricht *</label>
						<textarea id="nachricht" name="nachricht" class="form-control"
							class:is-invalid={form?.errors?.nachricht} rows="5"
							placeholder="Erzähl uns kurz, warum du dich für diese Stelle interessierst..."
						>{form?.values?.nachricht ?? ''}</textarea>
						{#if form?.errors?.nachricht}<div class="invalid-feedback">{form.errors.nachricht}</div>{/if}
					</div>

					<button type="submit" class="btn btn-flexmatch btn-lg w-100">
						Bewerbung absenden
					</button>
				</form>
			</div>
		{/if}

	</div>
</div>

<style>
	.success-icon {
		font-size: 4rem;
	}
</style>
