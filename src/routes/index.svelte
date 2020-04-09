<script context="module">
	import { countriesMap, excluded } from '../constants/countries.js';

	const apiUrl = 'https://coronavirus-19-api.herokuapp.com';
	const countriesUrl = `${apiUrl}/countries`;

	export async function preload() {
		let countries = [];
		let world = {};

		try {
			countries = await (await this.fetch(countriesUrl)).json();
			world = countries.find(c => c.country === 'World');

			countries = countries.map(c => {
				const found = countriesMap[c.country];
				let mapped = { ...c };

				if (found) {
					mapped = { ...mapped, countryTranslated: found.translated, code: found.code };
				}

				return mapped;
			})
			.filter(c => !excluded.includes(c.country))
			.sort((a, b) => b.cases - a.cases);
		} catch (e) {}
		
		return { countries, world };
	}

</script>

<script>
	import Breakdown from '../components/Breakdown.svelte';
	import Disclaimer from '../components/Disclaimer.svelte';
	import GitHubLink from '../components/GitHubLink.svelte';
	import Table from '../components/Table.svelte';
	import { getFlag } from '../utils'
	import { onMount } from 'svelte'

	export let countries;
	export let world;

	let date = new Date().toLocaleDateString();
	const bulgaria = countries.find(c => c.code && c.code.toLowerCase() === 'bg');

	$: title = `Статистика за коронавирус COVID-19 на ${date}`;
	$: description = `Статистика за коронавирус COVID-19 на ${date} - брой случаи, жертви, оздравели, активни.`;

	onMount(() => date = new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' }))

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

	<GitHubLink />

	{#if world}
		<Breakdown {...world}>
			🌍 В целия свят
		</Breakdown>
	{/if}

	{#if bulgaria}
		<Breakdown {...bulgaria}>
			<img src={getFlag(bulgaria.code, 32)} alt={bulgaria.countryTranslated} />
			В България
		</Breakdown>
	{/if}

	{#if countries && countries.length}
		<Table {countries} />
	{/if}
</div>

<style>
	.container {
		margin: 30px
	}

	@media screen and (max-width: 768px) {
		.container {
			margin: 0;
		}
	}
</style>
