<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>Registrieren – Flexmatch</title></svelte:head>

<div class="row justify-content-center">
	<div class="col-12 col-md-7 col-lg-5">
		<div class="text-center mb-4">
			<h1 class="fw-bold display-6"><span style="color:#e4003a">f</span>lexmatch</h1>
			<p class="text-muted">Erstelle ein Konto, um loszulegen.</p>
		</div>

		<div class="card border-0 shadow-sm p-4">
			<h2 class="h4 fw-bold mb-3">Registrieren</h2>

			<form method="POST" use:enhance>
				<div class="mb-3">
					<label class="form-label fw-semibold" for="name">Name</label>
					<input id="name" name="name" type="text" class="form-control"
						class:is-invalid={form?.errors?.name} placeholder="Vor- und Nachname"
						value={form?.values?.name ?? ''} />
					{#if form?.errors?.name}<div class="invalid-feedback">{form.errors.name}</div>{/if}
				</div>
				<div class="mb-3">
					<label class="form-label fw-semibold" for="email">E-Mail</label>
					<input id="email" name="email" type="email" class="form-control"
						class:is-invalid={form?.errors?.email} placeholder="name@beispiel.ch"
						value={form?.values?.email ?? ''} />
					{#if form?.errors?.email}<div class="invalid-feedback">{form.errors.email}</div>{/if}
				</div>
				<div class="mb-4">
					<label class="form-label fw-semibold" for="password">Passwort</label>
					<input id="password" name="password" type="password" class="form-control"
						class:is-invalid={form?.errors?.password} placeholder="mindestens 6 Zeichen" />
					{#if form?.errors?.password}<div class="invalid-feedback">{form.errors.password}</div>{/if}
				</div>
				<button type="submit" class="btn btn-flexmatch btn-lg w-100">Konto erstellen</button>
			</form>

			<p class="text-center text-muted small mt-3 mb-0">
				Bereits registriert? <a href="/login">Anmelden</a>
			</p>
		</div>
	</div>
</div>
