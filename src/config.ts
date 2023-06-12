import abi from "./assets/abi.json";

// export default {
//   chainId: "0x539",
//   chainName: "Tezos EVM Rollup Dailynet",
//   evmRollupUrl: () => {
//     const date = new Date().toJSON().slice(0, 10);
//     return `https://evm.dailynet-${date}.teztnets.xyz/`;
//   },
//   contractAddress: "0x9dD7efBfB908c3f8A96776390D186195bc5b9bD3",
//   contractAbi: abi,
//   decimals: 18,
//   formatBalance: (balance: string): string => {
//     if (isNaN(+balance)) throw "NaN";

//     const balanceParts = balance.split(".");
//     if (balanceParts.length === 1) {
//       return balance;
//     } else {
//       return balanceParts[0] + "." + balanceParts[1].slice(0, 5);
//     }
//   }
// };

export default {
  chainId: "0x13881",
  chainName: "Polygon Mumbai",
  evmRollupUrl: () => "https://polygon-testnet.public.blastapi.io",
  contractAddress: "0xf8e81D47203A594245E36C48e151709F0C19fBe8",
  contractAbi: abi,
  decimals: 18,
  formatBalance: (balance: string): string => {
    if (isNaN(+balance)) throw "NaN";

    const balanceParts = balance.split(".");
    if (balanceParts.length === 1) {
      return balance;
    } else {
      return balanceParts[0] + "." + balanceParts[1].slice(0, 5);
    }
  }
};
