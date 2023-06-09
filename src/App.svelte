<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { ethers, type BrowserProvider } from "ethers";
  import Header from "./lib/Header.svelte";
  import Body from "./lib/Body.svelte";
  import Footer from "./lib/Footer.svelte";

  let currentBlockNumber = 0;
  let provider: BrowserProvider;
  let userAddress: undefined | string = undefined;

  const evmRollupUrl = () => {
    const date = new Date().toJSON().slice(0, 10);
    return `https://evm.dailynet-${date}.teztnets.xyz/`;
  };

  onMount(async () => {
    // const provider = new ethers.JsonRpcProvider(evmRollupUrl());
    provider = new ethers.BrowserProvider((window as any).ethereum);
    const chainId = await (window as any).ethereum.request({
      method: "eth_chainId"
    });
    if (chainId === "0x539") {
      currentBlockNumber = await provider.getBlockNumber();
      provider.on("block", async block => {
        // updates block number
        currentBlockNumber = block;
      });
    } else {
      console.log("Wrong chain id!");
      // adding dailynet network to MetaMask
      try {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x539",
              chainName: "Tezos EVM Rollup Dailynet",
              rpcUrls: [evmRollupUrl()],
              nativeCurrency: {
                symbol: "ETH",
                decimals: 1
              }
            }
          ]
        });
      } catch (addError) {
        console.log(addError);
      }
    }
  });
</script>

<main>
  {#if provider}
    <Header
      {currentBlockNumber}
      {provider}
      {userAddress}
      on:user-address={event => (userAddress = event.detail)}
    />
    <Body />
    <Footer evmRollupUrl={evmRollupUrl()} />
  {:else}
    <div>Loading...</div>
  {/if}
</main>
