<script>
	import LazyContent from './LazyContent.svelte';
	import TableRow from './TableRow.svelte';
    import { onMount } from 'svelte';

	export let countries;
	
	const INITIAL_COUNTRIES_COUNT = 10;

    let thead;
	let theadTop;
	let theadHeight;
	let scrollY;
    let sticky = false;

    onMount(() => {
		const { top, height } = thead.getBoundingClientRect();
		theadTop = top;
		theadHeight = height;
	});

	function onScroll(event) {
		sticky = scrollY > theadTop;
	}

</script>

<svelte:window on:scroll={onScroll} bind:scrollY />

<h2>🏴 По държави</h2>

<div class="table-wrapper">
    <table class:sticky style="margin-top: {sticky ? `${theadHeight}px` : '0'};">
        <thead bind:this={thead}>
            <tr>
                <th>Държава</th>
                <th>Случаи</th>
                <th class="deaths">Жертви</th>
                <th class="hide-mobile">Оздравели</th>
                <th class="hide-mobile">Активни</th>
                <th class="hide-mobile">В критично състояние</th>
            </tr>
        </thead>

        <tbody>
            {#each countries.slice(0, INITIAL_COUNTRIES_COUNT) as country}
                <TableRow data={country} />
            {/each}

			<LazyContent>
				{#each countries.slice(INITIAL_COUNTRIES_COUNT) as country}
					<TableRow data={country} />
				{/each}
			</LazyContent>
        </tbody>
    </table>
</div>

<style>
    .table-wrapper {
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 2px 40px 0px rgba(0, 0, 0, 0.15);
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

	table th,
	table :global(td) {
		text-align: right;
		padding: 1rem;
		width: 15%;
		word-break: break-word;
	}

	table th:first-child, 
	table :global(td:first-child) {
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

	tbody :global(tr:nth-child(2n + 1)) {
		background-color: #f8f6ff;
	}

	tbody :global(tr.marked) {
		background-color: #fff15799;
	}

	@media screen and (max-width: 1200px) { 
		table th {
			font-size: 1rem;
		}
	}

	@media screen and (max-width: 1024px) { 
		table th {
			font-size: 0.875rem;
		}
    }

    @media screen and (max-width: 768px) {
		:global(.hide-mobile) {
			display: none! important;
		}

		.table-wrapper {
			border-radius: 0;
			box-shadow: none;
		}

		table th,
		table :global(td) {
			padding: 1rem 0;
		}

		table th:first-child, 
		table :global(td:first-child) {
			padding-left: 1rem;
			max-width: 7rem;
		}

		table th.deaths, 
		table :global(td.deaths) {
			padding-right: 1rem;
		}

		table th {
			font-size: 0.9rem;
		}

		table :global(td) {
			font-size: 0.8125rem;
		}

		table.sticky thead {
			left: 0; right: 0;
		}
	}
</style>
