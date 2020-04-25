<script>
  import { inViewport } from '../utils'
  import { onMount } from 'svelte'

  let wrapper
  let inView = false

  function onScroll () {
    if (inViewport(wrapper, false, { top: 100, bottom: 100 })) {
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

{#if !inView}
  <div class="lazy-content" bind:this={wrapper}>
  </div>
{/if}

{#if inView}
  <slot />
{:else}
  <!-- TODO: add a spinner -->
{/if}
