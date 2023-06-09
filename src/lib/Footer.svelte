<script lang="ts">
  import config from "../config";
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
  <div>Dapp connected to {config.evmRollupUrl()}</div>
  <div>
    Made at
    <a
      href="https://www.trili.tech"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      TriliTech
    </a>
  </div>
</footer>
