<script context="module">
	const apiUrl = 'https://coronavirus-19-api.herokuapp.com';
	const allUrl = `${apiUrl}/all`;
	const countriesUrl = `${apiUrl}/countries`;

	export async function preload() {
		const total = await (await this.fetch(allUrl)).json();
		const countries = await (await this.fetch(countriesUrl)).json();

		return { total, countries };
	}

</script>

<script>
	export let total;
	export let countries;
</script>

<svelte:head>
	<title>
		Статистика за коронавирус (на живо) - {total.cases} случая, {total.deaths} жертви и {total.recovered} оздравели | COVID-19
	</title>
</svelte:head>

<div class="container">
	<div class="total">

	</div>

	{#if countries && countries.length}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Държава</th>
						<th>Общо случаи</th>
						<th>Случаи днес</th>
						<th>Общо жертви</th>
						<th>Жертви днес</th>
						<th>Оздравели</th>
						<th>Активни случаи</th>
						<th>В критично състояние</th>
					</tr>
				</thead>

				<tbody>
					{#each countries as { country, cases, todayCases, deaths, todayDeaths, recovered, active, critical }}
						<tr>
							<td>{country}</td>
							<td>{cases}</td>
							<td>{todayCases}</td>
							<td>{deaths}</td>
							<td>{todayDeaths}</td>
							<td>{recovered}</td>
							<td>{active}</td>
							<td>{critical}</td>
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
		font-size: 18px;
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
		font-size: 15px;
		color: #808080;
		line-height: 1.4;

		padding: 1rem 1rem 1rem 0;
	}

	tbody tr:nth-child(2n + 1) {
		background-color: #f8f6ff;
	}

	table th:first-child, table td:first-child {
		padding-left: 2.5rem;
	}
</style>
