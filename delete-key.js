const { connect, keyStores } = require("near-api-js");

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
const pubkey = "ed25519:AvNC2mRrcDGoh8riCQA2SjzuGQDuUUG1j6c5pV2PmN4f";

async function main() {
    const near = await connect(config);
    const account = await near.account(accountId);

    const res = await account.deleteKey(pubkey);
    console.log(res);
}

main();
