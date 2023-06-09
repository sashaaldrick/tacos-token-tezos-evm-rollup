<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { formatEther, type BrowserProvider, type BigNumberish } from "ethers";
  import config from "../config";

  export let currentBlockNumber: number,
    provider: BrowserProvider,
    userAddress: undefined | string,
    userEthBalance: undefined | BigNumberish;
  const dispatch = createEventDispatcher();

  const connect = async () => {
    if ((window as any).ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      dispatch("user-address", address);
    } else {
      console.log("Please Install Metamask!!!");
    }
  };

  onMount(async () => {
    const accounts = await provider.listAccounts();
    if (accounts && Array.isArray(accounts) && accounts.length > 0) {
      const address = await accounts[0].getAddress();
      dispatch("user-address", address);
    }
  });
</script>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;

    h1 {
      text-align: center;
      margin: 0px;
    }
  }
</style>

<header>
  <div>
    {#if currentBlockNumber > 0}
      Block #{currentBlockNumber}
    {/if}
  </div>
  <h1>TACO Token</h1>
  <div>
    {#if userAddress && userEthBalance}
      <button class="default">
        {userAddress.slice(0, 7)}...{userAddress.slice(-7)} | {config.formatBalance(
          formatEther(userEthBalance)
        )} ETH
      </button>
    {:else}
      <button class="default" on:click={connect}> Connect wallet </button>
    {/if}
  </div>
</header>
