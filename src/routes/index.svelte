<script context="module">
	import { countriesMap } from '../constants/countries.js'

	const apiUrl = 'https://coronavirus-19-api.herokuapp.com';
	const allUrl = `${apiUrl}/all`;
	const countriesUrl = `${apiUrl}/countries`;

	export async function preload() {
		const total = await (await this.fetch(allUrl)).json();
		let countries = await (await this.fetch(countriesUrl)).json();

		countries = countries.map(c => {
			const found = countriesMap[c.country];
			let mapped = { ...c };

			if (found) {
				mapped = { ...mapped, countryTranslated: found.translated, code: found.code };
			}

			return mapped;
		});

		return { total, countries };
	}

</script>

<script>
	import Breakdown from '../components/Breakdown.svelte'
	import Disclaimer from '../components/Disclaimer.svelte';
	import Table from '../components/Table.svelte'

	export let total;
	export let countries;

	const title = 'Статистика за коронавирус COVID-19 (на живо)';
	const description = 'Статистика за коронавирус COVID-19 (на живо) - брой случаи, жертви, оздравели, активни.';

	const bulgaria = countries.find(c => c.code && c.code.toLowerCase() === 'bg');

</script>

<svelte:head>
	<title>
		{title}
	</title>

	<meta name="description" content={description}>
	<meta name="keywords" content="коронавирус, covid-19, статистика, държави, страни, българия, coronavirus, случаи, жертви, оздравели">
	<link rel="canonical" href="https://koronavirus-bg.web.app/">

	<meta name="google-site-verification" content="YoFVEzcIDPAtxqBgH_o3SF7XRoyujlhjmjX0AKdO-dk" />

	<meta property="og:type" content="website" />
    <meta name="title" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content="Koronavirus-bg.web.app" />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://koronavirus-bg.web.app/" />
	<meta property="og:image" content="https://nnimgt-a.akamaihd.net/transform/v1/crop/frm/tPntrWhUbGLyDWYCTv46rt/0dab4e06-6e41-445c-9ff9-6489cc366e23.jpg/r0_0_3840_2159_w1200_h678_fmax.jpg" />
</svelte:head>

<div class="container">
	<h1>
		{title}
	</h1>

	<Disclaimer />

	<p class="github">
		<a href="https://github.com/yuliankarapetkov/coronavirus-stats" target="_blank">
			<img src="/images/github.png" alt="Github logo" /> Source code
		</a>
	</p>

	{#if total}
		<Breakdown title="🌍 В целия свят" {...total} />
	{/if}

	{#if bulgaria}
		<Breakdown title="🇧🇬 В България" {...bulgaria} />
	{/if}

	{#if countries && countries.length}
		<Table {countries} />
	{/if}
</div>

<style>
	.container {
		margin: 30px
	}

	.github a {
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
	}

	.github a img {
		height: 1.5rem;
		margin-right: 0.5rem;
	}

	@media screen and (max-width: 768px) {
		.container {
			margin: 0;
		}

		.github {
			margin-bottom: 2rem;
		}
	}
</style>
