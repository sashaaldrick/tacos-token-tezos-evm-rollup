import { ethers } from "ethers";


exports.handler = async function(event, context) {
    const body = JSON.parse(event.body);
    const targetAddress = body.targetAddress;


    const provider = new ethers.providers.JsonRpcProvider("https://evm.ghostnet-evm.tzalpha.net/");

    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);

    const faucetTransaction = {
        to: targetAddress,
        value: ethers.utils.parseEther("0.10")
    };

    const faucetTx = await wallet.sendTransaction(tx);
    const receipt = await faucetTx.wait();

    return {
        statusCode: 200,
        body: JSON.stringify({ transactionReceipt: receipt })
    };
}
