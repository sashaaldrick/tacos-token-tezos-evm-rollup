<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import {
    ethers,
    type BrowserProvider,
    type JsonRpcProvider,
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
  let hasClaimed: undefined | boolean = undefined;

  const getUserEthBalance = async userAddress => {
    const balance = await provider.getBalance(userAddress);
    if (balance || balance === 0n) {
      return balance;
    } else {
      return undefined;
    }
  };

  const hasUserClaimedTokens = async userAddress => {
    // fetches token balance
    const contract = new ethers.Contract(
      config.contractAddress,
      config.contractAbi,
      provider
    );
    return await contract.claimed(userAddress);
  };

  onMount(async () => {
    // provider = new ethers.JsonRpcProvider(config.evmRollupUrl());
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
      console.log(`Wrong chain id! Expected ${config.chainId}, got ${chainId}`);
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
                symbol: "CTEZ",
                decimals: 18
              }
            }
          ]
        });
      } catch (addError) {
        console.log(addError);
      }
    }

    (window as any).ethereum.on("accountsChanged", async accounts => {
      if (Array.isArray(accounts) && accounts.length === 0) {
        // user is disconnected
        userAddress = undefined;
        userEthBalance = undefined;
      } else if (Array.isArray(accounts) && accounts.length > 0) {
        // user is connected
        userAddress = accounts[0];
        userEthBalance = await getUserEthBalance(userAddress);
        hasClaimed = await hasUserClaimedTokens(userAddress);
      }
    });
  });

  afterUpdate(async () => {
    if (provider && userAddress) {
      userEthBalance = await getUserEthBalance(userAddress);
      hasClaimed = await hasUserClaimedTokens(userAddress);
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
    <Body {userAddress} {provider} {hasClaimed} />
    <Footer />
  {:else}
    <div>Loading...</div>
  {/if}
</main>
