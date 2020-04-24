<script>
    import Badge from './Badge.svelte';
    import { formatNumber, getFlag } from '../utils';

    export let data;

    const { code, country, countryTranslated, cases, todayCases, deaths, todayDeaths, recovered, active, critical } = data;
</script>

<tr class:marked={code === 'BG'}>
    <td>
        <span class="country">
            {#if code}
                <img src={getFlag(code)} alt={countryTranslated} loading="lazy" />
            {:else}
                🏴
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

<style>
    td {
		font-size: 0.9rem;
		color: #808080;
		line-height: 1.4;
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

    @media screen and (max-width: 1200px) { 
		td {
			font-size: 0.875rem;
		}
	}

    @media screen and (max-width: 768px) {
		td {
			font-size: 0.8125rem;
		}
	}
</style>
