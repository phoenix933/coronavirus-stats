<script>
    export let color = '';

</script>

<span class="badge {color}">
   <slot /> 
</span>

<style>
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
</style>
