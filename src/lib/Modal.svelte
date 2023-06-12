<script lang="ts">
  import { fly } from "svelte/transition";

  export let show: boolean, text: string;
</script>

<style lang="scss">
  div.modal {
    position: absolute;
    bottom: 60px;
    right: 20px;
    padding: 15px 30px;
    background-color: #0f61ff;
    border-radius: 10px;
    color: white;
    font-size: 0.9rem;
  }
</style>

{#if show}
  <div class="modal" transition:fly={{ duration: 1000, x: 500 }}>
    &#9432; {text}
  </div>
{/if}
