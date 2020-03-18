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
	import { onMount } from 'svelte';

	export let total;
	export let countries;

	let thead;
	let theadTop;
	let theadHeight;
	let scrollY;
	let sticky = false;

	const title = 'Статистика за коронавирус COVID-19 (на живо)';
	const description = 'Статистика за коронавирус COVID-19 (на живо) - брой случаи, жертви, оздравели, активни.';

	const formatNumber = (num) => num.toLocaleString('bg');
	const getFlag = (code) => `https://www.countryflags.io/${code}/flat/24.png`

	onMount(() => {
		const { top, height } = thead.getBoundingClientRect();
		theadTop = top;
		theadHeight = height;
	});

	function onScroll(event) {
		sticky = scrollY > theadTop;
	}

</script>

<svelte:head>
	<title>
		{title}
	</title>

	<meta name="description" content={description}>
	<meta name="keywords" content="коронавирус, covid-19, статистика, държави, страни, българия, coronavirus, случаи, жертви, оздравели">
	<link rel="canonical" href="https://koronavirus-bg.web.app/">

	<meta property="og:type" content="website" />
    <meta name="title" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content="Koronavirus-bg.web.app" />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://koronavirus-bg.web.app/" />
	<meta property="og:image" content="https://nnimgt-a.akamaihd.net/transform/v1/crop/frm/tPntrWhUbGLyDWYCTv46rt/0dab4e06-6e41-445c-9ff9-6489cc366e23.jpg/r0_0_3840_2159_w1200_h678_fmax.jpg" />
</svelte:head>

<svelte:window on:scroll={onScroll} bind:scrollY />

<div class="container">
	<h1>
		{title}
	</h1>

	<p>
		* Данните в този уебсайт са взети от публична уеб услуга 
		<a href="https://github.com/javieraviles/covidAPI" target="_blank">Covid API</a>.
		Собственикът на този уебсайт не носи отговорност за коректността на данните в него.
		При неверни данни, моля свържете се със 
		<a href="https://github.com/javieraviles" target="_blank">собственика</a> на уеб услугата
		<a href="https://github.com/javieraviles/covidAPI" target="_blank">Covid API</a>.
	</p>

	{#if countries && countries.length}
		<div class="table-wrapper">
			<table class:sticky style="margin-top: {sticky ? `${theadHeight}px` : '0'};">
				<thead bind:this={thead}>
					<tr>
						<th>Държава (и др.)</th>
						<th>Случаи</th>
						<th class="deaths">Жертви</th>
						<th class="hide-mobile">Оздравели</th>
						<th class="hide-mobile">Активни</th>
						<th class="hide-mobile">В критично състояние</th>
					</tr>
				</thead>

				<tbody>
					{#each countries as { code, country, countryTranslated, cases, todayCases, deaths, todayDeaths, recovered, active, critical }}
						<tr>
							<td>
								<span class="country">
									{#if code}
										<img src="{getFlag(code)}" alt={countryTranslated} />
									{/if}
									{countryTranslated || country}
								</span>
							</td>
							<td>
								<span class="badge-wrapper">
									{formatNumber(cases)}

									{#if todayCases}
										<span class="badge warn">
											+{formatNumber(todayCases)}
										</span>
									{/if}
								</span>
							</td>
							<td class="deaths">
								<span class="badge-wrapper">
									{formatNumber(deaths)}

									{#if todayDeaths}
										<span class="badge danger">
											+{formatNumber(todayDeaths)}
										</span>
									{/if}
								</span>
							</td>
							<td class="hide-mobile">{formatNumber(recovered)}</td>
							<td class="hide-mobile">{formatNumber(active)}</td>
							<td class="hide-mobile">{formatNumber(critical)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.container {
		margin: 30px
	}

	h1 {
		margin-bottom: 0;
		font-weight: bold;
	}

	p {
		margin: 0.5rem 0 2rem;
		font-size: 0.75rem;
	}

	.table-wrapper {
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	table th {
		font-size: 1.125rem;
		font-weight: bold;
		color: #fff;
		line-height: 1.4;
		background-color: #fff157;
		color: #515151;

		padding-top: 18px;
    	padding-bottom: 18px;
		text-align: left;
	}

	table td {
		font-size: 0.9rem;
		color: #808080;
		line-height: 1.4;
	}

	table th,
	table td {
		text-align: right;
		padding: 1rem;
		width: 15%;
	}

	table th:first-child, 
	table td:first-child {
		padding-left: 2.5rem;
		text-align: left;
		width: 25%;
	}

	table.sticky thead {
		position: fixed;
		top: 0; left: 30px; right: 30px;
		z-index: 1;
	}

	table.sticky thead tr {
		width: 100%;
    	display: inline-table;
	}

	.badge-wrapper {
		position: relative;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-end;
	}

	.country {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.country img {
		margin-right: 0.5rem;
	}

	tbody tr:nth-child(2n + 1) {
		background-color: #f8f6ff;
	}

	.badge {
		white-space: nowrap;

		font-size: 10px;
		color: #fff;
		text-align: center;
		font-weight: bold;

		border-radius: 12px;
		padding: 4px 6px;
	}

	.badge.danger {
		background-color: #ff5b5b;
	}

	.badge.warn {
		background-color: #fff157;
		color: #515151;
	}

	@media screen and (max-width: 1200px) { 
		table th {
			font-size: 1rem;
		}

		table td {
			font-size: 0.875rem;
		}
	}

	@media screen and (max-width: 768px) {
		.hide-mobile {
			display: none! important;
		}

		.container {
			margin: 0;
		}

		h1 {
			padding: 1rem 1rem 0;
			font-size: 1.5rem;
		}

		p {
			padding: 0 1rem 1rem;
			margin-bottom: 1rem;
			font-size: 0.6rem;
		}

		.table-wrapper {
			border-radius: 0;
		}

		table th,
		table td {
			padding: 1rem 0;
		}

		table th:first-child, 
		table td:first-child {
			padding-left: 1rem;
			max-width: 7rem;
		}

		table th.deaths, 
		table td.deaths {
			padding-right: 1rem;
		}

		table th {
			font-size: 0.9rem;
		}

		table td {
			font-size: 0.8125rem;
		}

		table.sticky thead {
			left: 0; right: 0;
		}
	}
</style>
