const { connect, keyStores, KeyPair } = require("near-api-js");

const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org"
};

const accountId = "sub3.liamvu.testnet";

async function main() {
    const near = await connect(config);
    const account = await near.account(accountId);

    // generate key pairs
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.publicKey.toString();

    const res = await account.addKey(publicKey);
    console.log(res);
  
    // store key locally
    await keyStore.setKey(config.networkId, accountId, keyPair);
}

main();
