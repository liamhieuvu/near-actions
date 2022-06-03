const { connect, keyStores, KeyPair, utils } = require("near-api-js");

const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org"
};

const creatorId = "liamvu.testnet";
const accountId = "sub1.liamvu.testnet";

async function main() {
    const near = await connect(config);
    const creator = await near.account(creatorId);

    // generate key pairs
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.publicKey.toString();

    const res = await creator.createAccount(accountId, publicKey, utils.format.parseNearAmount("2"));
    console.log(res);
  
    // store key locally
    await keyStore.setKey(config.networkId, accountId, keyPair);
}

main();
