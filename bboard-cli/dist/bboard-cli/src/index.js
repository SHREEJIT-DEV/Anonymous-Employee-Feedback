// Anonymous Employee Feedback CLI Interface
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { WebSocket } from 'ws';
import { BBoardAPI, bboardPrivateStateKey, } from '../../api/src/index';
import { ledger } from '../../contract/src/managed/bboard/contract/index.js';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { StandaloneConfig } from './config.js';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { assertIsContractAddress, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightWalletProvider } from './midnight-wallet-provider';
import { randomBytes } from '../../api/src/utils';
import { unshieldedToken } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { syncWallet, waitForUnshieldedFunds } from './wallet-utils';
import { generateDust } from './generate-dust';
// @ts-expect-error: WebSocket enable for apollo
globalThis.WebSocket = WebSocket;
export const getBBoardLedgerState = async (providers, contractAddress) => {
    assertIsContractAddress(contractAddress);
    const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
    return contractState != null ? ledger(contractState.data) : null;
};
const DEPLOY_OR_JOIN_QUESTION = `
===================================================
 Anonymous Employee Feedback - Midnight ZK Platform
===================================================
  1. Deploy new Feedback Contract
  2. Join existing Feedback Contract
  3. Exit
Select option (1-3): `;
const deployOrJoin = async (providers, rli, logger) => {
    while (true) {
        const choice = await rli.question(DEPLOY_OR_JOIN_QUESTION);
        switch (choice.trim()) {
            case '1': {
                const api = await BBoardAPI.deploy(providers, logger);
                logger.info(`Successfully deployed Feedback contract at address: ${api.deployedContractAddress}`);
                return api;
            }
            case '2': {
                const addr = await rli.question('Enter contract address (in hex): ');
                const api = await BBoardAPI.join(providers, addr.trim(), logger);
                logger.info(`Joined Feedback contract at address: ${api.deployedContractAddress}`);
                return api;
            }
            case '3':
                logger.info('Exiting...');
                return null;
            default:
                logger.error(`Invalid selection: ${choice}`);
        }
    }
};
const displayLedgerState = async (providers, deployedBBoardContract, logger) => {
    const contractAddress = deployedBBoardContract.deployTxData.public.contractAddress;
    const ledgerState = await getBBoardLedgerState(providers, contractAddress);
    if (ledgerState === null) {
        logger.info(`No contract found at address ${contractAddress}`);
    }
    else {
        const totalCount = ledgerState.totalFeedbackCount;
        const totalSum = ledgerState.totalRatingSum;
        const avgRating = totalCount > 0n ? (Number(totalSum) / Number(totalCount)).toFixed(2) : '0.0';
        const lastCat = ledgerState.lastCategory.is_some ? ledgerState.lastCategory.value : 'None';
        const lastDigest = toHex(ledgerState.lastFeedbackDigest);
        logger.info(`--- On-Chain Ledger Summary ---`);
        logger.info(`Total Feedbacks Submitted: ${totalCount}`);
        logger.info(`Total Accumulated Rating Sum: ${totalSum}`);
        logger.info(`Calculated Average Rating: ${avgRating} / 5.0`);
        logger.info(`Latest Disclosed Category: ${lastCat}`);
        logger.info(`Latest Feedback Content Hash Digest: ${lastDigest}`);
    }
};
const displayPrivateState = async (providers, logger) => {
    const privateState = await providers.privateStateProvider.get(bboardPrivateStateKey);
    if (privateState === null) {
        logger.info(`No local private state found`);
    }
    else {
        logger.info(`Private Identity Secret Key: ${toHex(privateState.secretKey)} (Kept 100% confidential via ZK proof)`);
    }
};
const displayDerivedState = (ledgerState, logger) => {
    if (ledgerState === undefined) {
        logger.info(`No contract state currently available`);
    }
    else {
        logger.info(`--- Application Derived State ---`);
        logger.info(`Total Feedbacks: ${ledgerState.totalFeedbackCount}`);
        logger.info(`Average Rating: ${ledgerState.averageRating} / 5.0`);
        logger.info(`Latest Category: ${ledgerState.lastCategory ?? 'None'}`);
        logger.info(`Latest Digest: ${ledgerState.lastFeedbackDigest}`);
    }
};
const MAIN_LOOP_QUESTION = `
---------------------------------------------------
 Actions Menu:
  1. Submit Anonymous Employee Feedback
  2. View On-Chain Ledger Feedback Summary
  3. View Private Identity Witness (Local ZK Key)
  4. View Derived Feedback State
  5. Exit
---------------------------------------------------
Select choice: `;
const mainLoop = async (providers, rli, logger) => {
    const bboardApi = await deployOrJoin(providers, rli, logger);
    if (bboardApi === null) {
        return;
    }
    let currentState;
    const subscription = bboardApi.state$.subscribe({
        next: (state) => (currentState = state),
    });
    try {
        while (true) {
            const choice = await rli.question(MAIN_LOOP_QUESTION);
            try {
                switch (choice.trim()) {
                    case '1': {
                        const ratingStr = await rli.question('Enter Rating (1-5): ');
                        const rating = parseInt(ratingStr.trim(), 10);
                        if (isNaN(rating) || rating < 1 || rating > 5) {
                            logger.error('Invalid rating. Must be an integer between 1 and 5.');
                            break;
                        }
                        const category = await rli.question('Enter Department/Category (e.g., Engineering, HR, Product, Culture): ');
                        const comment = await rli.question('Enter Confidential Feedback Message: ');
                        logger.info('Generating Zero-Knowledge Proof and submitting feedback...');
                        await bboardApi.submitFeedback(rating, category.trim(), comment.trim());
                        logger.info('Feedback successfully submitted to Midnight network with ZK proof verification!');
                        break;
                    }
                    case '2':
                        await displayLedgerState(providers, bboardApi.deployedContract, logger);
                        break;
                    case '3':
                        await displayPrivateState(providers, logger);
                        break;
                    case '4':
                        displayDerivedState(currentState, logger);
                        break;
                    case '5':
                        logger.info('Exiting application...');
                        return;
                    default:
                        logger.error(`Invalid choice: ${choice}`);
                }
            }
            catch (e) {
                logError(logger, e);
                logger.info('Returning to menu...');
            }
        }
    }
    finally {
        subscription.unsubscribe();
    }
};
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';
const WALLET_LOOP_QUESTION = `
Choose Wallet Configuration:
  1. Build fresh random seed wallet
  2. Recreate wallet from seed
  3. Exit
Select choice: `;
const buildWallet = async (config, rli, logger) => {
    if (config instanceof StandaloneConfig) {
        return GENESIS_MINT_WALLET_SEED;
    }
    while (true) {
        const choice = await rli.question(WALLET_LOOP_QUESTION);
        switch (choice.trim()) {
            case '1':
                return toHex(randomBytes(32));
            case '2':
                return (await rli.question('Enter wallet seed: ')).trim();
            case '3':
                return undefined;
            default:
                logger.error(`Invalid choice: ${choice}`);
        }
    }
};
export const run = async (config, testEnv, logger) => {
    const rli = createInterface({ input, output, terminal: true });
    const providersToBeStopped = [];
    try {
        const envConfiguration = await testEnv.start();
        logger.info(`Environment started with configuration: ${JSON.stringify(envConfiguration)}`);
        const seed = await buildWallet(config, rli, logger);
        if (seed === undefined) {
            return;
        }
        const walletProvider = await MidnightWalletProvider.build(logger, envConfiguration, seed);
        providersToBeStopped.push(walletProvider);
        const walletFacade = walletProvider.wallet;
        await walletProvider.start();
        const unshieldedState = await waitForUnshieldedFunds(logger, walletFacade, envConfiguration, unshieldedToken());
        const nightBalance = unshieldedState.balances[unshieldedToken().raw];
        if (nightBalance === undefined) {
            logger.info('No funds received, exiting...');
            return;
        }
        logger.info(`Your NIGHT wallet balance is: ${nightBalance}`);
        if (config.generateDust) {
            const dustGeneration = await generateDust(logger, seed, unshieldedState, walletFacade);
            if (dustGeneration) {
                logger.info(`Submitted dust generation registration transaction: ${dustGeneration}`);
                await syncWallet(logger, walletFacade);
            }
        }
        const zkConfigProvider = new NodeZkConfigProvider(config.zkConfigPath);
        const providers = {
            privateStateProvider: levelPrivateStateProvider({
                privateStateStoreName: config.privateStateStoreName,
                signingKeyStoreName: `${config.privateStateStoreName}-signing-keys`,
                privateStoragePasswordProvider: () => 'Feedback-Test-2026!',
                accountId: seed,
            }),
            publicDataProvider: indexerPublicDataProvider(envConfiguration.indexer, envConfiguration.indexerWS),
            zkConfigProvider: zkConfigProvider,
            proofProvider: httpClientProofProvider(envConfiguration.proofServer, zkConfigProvider),
            walletProvider: walletProvider,
            midnightProvider: walletProvider,
        };
        await mainLoop(providers, rli, logger);
    }
    catch (e) {
        logError(logger, e);
    }
    finally {
        try {
            rli.close();
            rli.removeAllListeners();
        }
        catch (e) {
            logError(logger, e);
        }
        finally {
            try {
                for (const wallet of providersToBeStopped) {
                    logger.info('Stopping wallet...');
                    await wallet.stop();
                }
                if (testEnv) {
                    logger.info('Stopping test environment...');
                    await testEnv.shutdown();
                }
            }
            catch (e) {
                logError(logger, e);
            }
        }
    }
};
function logError(logger, e) {
    if (e instanceof Error) {
        logger.error(`Error: '${e.message}'`);
        logger.debug(`${e.stack}`);
    }
    else {
        logger.error(`Unknown error encountered`);
    }
}
//# sourceMappingURL=index.js.map