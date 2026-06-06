<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>Anmelden – Flexmatch</title></svelte:head>

<div class="row justify-content-center">
	<div class="col-12 col-md-7 col-lg-5">
		<div class="text-center mb-4">
			<h1 class="fw-bold display-6"><span style="color:#e4003a">f</span>lexmatch</h1>
			<p class="text-muted">Melde dich an, um Jobs zu sehen und dich zu bewerben.</p>
		</div>

		<div class="card border-0 shadow-sm p-4">
			<h2 class="h4 fw-bold mb-3">Anmelden</h2>

			{#if form?.error}
				<div class="alert alert-danger">{form.error}</div>
			{/if}

			<form method="POST" action="?/login" use:enhance>
				<div class="mb-3">
					<label class="form-label fw-semibold" for="email">E-Mail</label>
					<input id="email" name="email" type="email" class="form-control"
						placeholder="name@beispiel.ch" value={form?.email ?? ''} required />
				</div>
				<div class="mb-3">
					<label class="form-label fw-semibold" for="password">Passwort</label>
					<input id="password" name="password" type="password" class="form-control"
						placeholder="••••••••" required />
				</div>
				<button type="submit" class="btn btn-flexmatch btn-lg w-100">Anmelden</button>
			</form>

			<form method="POST" action="?/demo" use:enhance>
				<button type="submit" class="btn btn-outline-flexmatch w-100 mt-2">Als Demo-Nutzer anmelden</button>
			</form>

			<div class="alert alert-light border mt-3 mb-0 small">
				<strong>Demo-Zugang:</strong> demo@flexmatch.ch · Passwort: demo1234
			</div>

			<p class="text-center text-muted small mt-3 mb-0">
				Noch kein Konto? <a href="/register">Jetzt registrieren</a>
			</p>
		</div>
	</div>
</div>
