<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import {
    ethers,
    formatEther,
    type BrowserProvider,
    type BigNumberish
  } from "ethers";
  import Header from "./lib/Header.svelte";
  import Body from "./lib/Body.svelte";
  import Footer from "./lib/Footer.svelte";
  import config from "./config";

  let currentBlockNumber = 0;
  let provider: BrowserProvider;
  let userAddress: undefined | string = undefined;
  let userEthBalance: undefined | BigNumberish = undefined;

  onMount(async () => {
    // const provider = new ethers.JsonRpcProvider(evmRollupUrl());
    provider = new ethers.BrowserProvider((window as any).ethereum);
    const chainId = await (window as any).ethereum.request({
      method: "eth_chainId"
    });
    if (chainId === config.chainId) {
      currentBlockNumber = await provider.getBlockNumber();
      provider.on("block", async block => {
        // updates block number
        currentBlockNumber = block;
      });
    } else {
      console.log(`Wrong chain id! Expected 1337, got ${chainId}`);
      // adding dailynet network to MetaMask
      try {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: config.chainId,
              chainName: config.chainName,
              rpcUrls: [config.evmRollupUrl()],
              nativeCurrency: {
                symbol: "ETH",
                decimals: 18
              }
            }
          ]
        });
      } catch (addError) {
        console.log(addError);
      }
    }
  });

  afterUpdate(async () => {
    if (provider && userAddress) {
      const balance = await provider.getBalance(userAddress);
      if (balance) {
        userEthBalance = balance;
      } else {
        userEthBalance = undefined;
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
      {userEthBalance}
      on:user-address={event => (userAddress = event.detail)}
    />
    <Body {userAddress} {provider} />
    <Footer />
  {:else}
    <div>Loading...</div>
  {/if}
</main>
