import * as path from "path";
import * as fs from "fs";
import * as ethers from "ethers";

const providerUrl = process.env.RPC_ENDPOINT;

export class WalletHandler {
    static getProviderForUser() {
        let username = process.env.WALLET_OWNER;
        const walletPath = path.join(__dirname, '../../wallet/', username);
        let mnemonic, privatekey, walletaddress;
        let files = fs.readdirSync(walletPath);
        files.forEach(function (file) {
            if (file.split('.')[1] === 'mnemonic') {
                mnemonic = fs.readFileSync(path.join(walletPath, file)).toString();
            }
            if (file.split('.')[1] === 'privatekey') {
                privatekey = fs.readFileSync(path.join(walletPath, file)).toString();
            }
            if (file.split('.')[1] === 'walletaddress') {
                walletaddress = fs.readFileSync(path.join(walletPath, file)).toString();
            }
        });

        let provider = new ethers.providers.JsonRpcProvider(providerUrl);
        return new ethers.Wallet(privatekey, provider);
    }
}