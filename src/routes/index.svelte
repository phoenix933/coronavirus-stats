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
	export let total;
	export let countries;

	const formatNumber = (num) => num.toLocaleString('bg');
	const getFlag = (code) => `https://www.countryflags.io/${code}/flat/24.png`
</script>

<svelte:head>
	<title>
		Статистика за коронавирус COVID-19 (на живо) - 
		{formatNumber(total.cases)} случая, {formatNumber(total.deaths)} жертви и {formatNumber(total.recovered)} оздравели 
		| Коронавирус България
	</title>
</svelte:head>

<div class="container">
	<h1>
		Статистика за коронавирус COVID-19 (на живо)
	</h1>

	{#if countries && countries.length}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Държава (и др.)</th>
						<th>Общо случаи</th>
						<th>Случаи днес</th>
						<th class="hide-mobile">Общо жертви</th>
						<th class="hide-mobile">Жертви днес</th>
						<th class="hide-mobile">Оздравели</th>
						<th class="hide-mobile">Активни случаи</th>
						<th class="hide-mobile">В критично състояние</th>
					</tr>
				</thead>

				<tbody>
					{#each countries as { code, country, countryTranslated, cases, todayCases, deaths, todayDeaths, recovered, active, critical }}
						<tr>
							<td class="country">
								{#if code}
									<img src="{getFlag(code)}" alt={countryTranslated} />
								{/if}
								{countryTranslated || country}
							</td>
							<td>{formatNumber(cases)}</td>
							<td>{formatNumber(todayCases)}</td>
							<td class="hide-mobile">{formatNumber(deaths)}</td>
							<td class="hide-mobile">{formatNumber(todayDeaths)}</td>
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
		margin-bottom: 2rem;
		font-weight: bold;
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

		padding: 1rem 1rem 1rem 0;
	}

	table td.country {
		display: flex;
		align-items: center;
	}

	table td.country img {
		margin-right: 0.5rem;
	}

	tbody tr:nth-child(2n + 1) {
		background-color: #f8f6ff;
	}

	table th:first-child, table td:first-child {
		padding-left: 2.5rem;
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
			padding: 1rem;
			margin-bottom: 1rem;
			font-size: 1.5rem;
		}

		.table-wrapper {
			border-radius: 0;
		}

		table th:first-child, table td:first-child {
			padding-left: 1rem;
		}

		table th:last-child, table td:last-child {
			padding-right: 1rem;
		}

		table th {
			font-size: 0.9rem;
		}

		table td {
			font-size: 0.8125rem;
		}
	}
</style>
