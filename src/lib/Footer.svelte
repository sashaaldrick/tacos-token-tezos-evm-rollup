<script lang="ts">
  export let evmRollupUrl: string;
</script>

<style lang="scss">
  footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.9rem;
  }
</style>

<footer>
  <div>Dapp connected to {evmRollupUrl}</div>
  <div>
    Made in
    <a
      href="https://www.trili.tech"
      target="_blank"
      rel="noopener noreferrer nofollow">TriliTech</a
    >
  </div>
</footer>
