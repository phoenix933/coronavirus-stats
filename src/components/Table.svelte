<script>
	import Badge from './Badge.svelte';
    import { formatNumber } from '../utils';
    import { onMount } from 'svelte';

    export let countries;

    let thead;
	let theadTop;
	let theadHeight;
	let scrollY;
    let sticky = false;
    
    const getFlag = (code) => `https://www.countryflags.io/${code}/flat/24.png`;

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

<h2>🚩 По държави</h2>

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
                                <Badge color="warn">
                                    +{formatNumber(todayCases)}
                                </Badge>
                            {/if}
                        </span>
                    </td>
                    <td class="deaths">
                        <span class="badge-wrapper">
                            {formatNumber(deaths)}

                            {#if todayDeaths}
                                <Badge color="danger">
                                    +{formatNumber(todayDeaths)}
                                </Badge>
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
		word-break: break-word;
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

	@media screen and (max-width: 1200px) { 
		table th {
			font-size: 1rem;
		}

		table td {
			font-size: 0.875rem;
		}
	}

	@media screen and (max-width: 1024px) { 
		table th {
			font-size: 0.875rem;
		}
    }

    @media screen and (max-width: 768px) {
		.hide-mobile {
			display: none! important;
		}

		.table-wrapper {
			border-radius: 0;
			box-shadow: none;
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
