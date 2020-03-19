<script>
    import { formatNumber } from '../utils'

    export let title = null;
    export let cases = 0;
    export let deaths = 0;
    export let recovered = 0;

</script>

<h2>{title}</h2>

<div class="total">
    <div>
        <span>{formatNumber(cases)}</span>
        <span>случая</span>
    </div>

    <div>
        <span>{formatNumber(deaths)}</span>
        <span>жертви</span>
    </div>

    <div>
        <span>{recovered ? formatNumber(recovered) : 'N/A'}</span>
        <span>оздравели</span>
    </div>
</div>

<style>
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

        background: #fff157;
        color: #515151;
        font-weight: bold;
	}

    .total div span:first-child {
        font-size: 1.5rem;
    }

    .total div span:last-child {
        text-transform: uppercase;
        font-size: 0.8rem;
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
