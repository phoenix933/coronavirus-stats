<script>
    import Badge from './Badge.svelte';
    import { formatNumber } from '../utils';

    export let cases = 0;
    export let deaths = 0;
    export let recovered = 0;
    export let todayCases = 0;
    export let todayDeaths = 0;

</script>

<h2><slot /></h2>

<div class="total">
    <div>
        <span>
            {#if todayCases}
                <Badge color="warn">
                    +{formatNumber(todayCases)}
                </Badge>
            {/if}
            {formatNumber(cases)}
        </span>
        <span>случая</span>
    </div>

    <div>
        <span>
            {#if todayDeaths}
                <Badge color="danger">
                    +{formatNumber(todayDeaths)}
                </Badge>
            {/if}
            {formatNumber(deaths)}
        </span>
        <span>жертви</span>
    </div>

    <div>
        <span>{recovered ? formatNumber(recovered) : 'N/A'}</span>
        <span>оздравели</span>
    </div>
</div>

<style>
    h2 {
        display: flex;
        align-items: center;
    }

    h2 :global(img) {
        margin-right: 0.5rem;
    }

	.total {
		display: flex;
        justify-content: space-between;

        margin-bottom: 2rem;
	}

	.total div {
		display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 2rem 0;
        width: 30%;
        border-radius: 10px;

        background: #f8f6ff;
        color: #515151;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
        
        font-weight: bold;
	}

    .total div span:first-child {
        font-size: 1.5rem;
        position: relative;
    }

    .total div span:last-child {
        text-transform: uppercase;
        font-size: 0.8rem;
    }

    .total div :global(.badge) {
        position: absolute;
        transform: translateX(100%);
        right: 0;
    }

    @media screen and (max-width: 768px) {
		.total {
            flex-direction: column;
            padding: 1rem 1rem 0;
        }

        .total div {
            width: 100%;
            margin-bottom: 1rem;
        }

        .total div:last-child {
            margin-bottom: 0;
        }
    }
</style>
