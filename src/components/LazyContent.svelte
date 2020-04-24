<script>
  import { inViewport } from '../utils'
  import { onMount } from 'svelte'

  let wrapper
  let inView = false

  function onScroll () {
    if (inViewport(wrapper)) {
      inView = true
      document.removeEventListener('scroll', onScroll)
    }
  }

  onMount(() => {
    document.addEventListener('scroll', onScroll, true)

    onScroll()
    return () => document.removeEventListener('scroll', onScroll, true)
  })

</script>

<div class="lazy-content" bind:this={wrapper}>
</div>

{#if inView}
  <slot />
{:else}
  <!-- TODO: add a spinner -->
{/if}
