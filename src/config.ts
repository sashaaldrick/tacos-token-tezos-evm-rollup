import abi from "./assets/abi.json";

export default {
  chainId: "0x539",
  chainName: "Tezos EVM Rollup Dailynet",
  evmRollupUrl: () => {
    const date = new Date().toJSON().slice(0, 10);
    return `https://evm.dailynet-${date}.teztnets.xyz/`;
  },
  contractAddress: "0x9dD7efBfB908c3f8A96776390D186195bc5b9bD3",
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

// export default {
//   chainId: "0x13881",
//   chainName: "Polygon Mumbai",
//   evmRollupUrl: () => "https://polygon-testnet.public.blastapi.io",
//   contractAddress: "0x3b6bD43C8181c222B75DD728D21a17A74E9c605C",
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
