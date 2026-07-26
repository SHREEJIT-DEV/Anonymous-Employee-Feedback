import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import { type BBoardDerivedState, type BBoardProviders, type DeployedBBoardContract } from './common-types.js';
import { type Observable } from 'rxjs';
export interface DeployedBBoardAPI {
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<BBoardDerivedState>;
    post: (message: string) => Promise<void>;
    takeDown: () => Promise<void>;
    submitFeedback: (ratingScore: number, category: string, feedbackComment: string) => Promise<void>;
}
export declare class BBoardAPI implements DeployedBBoardAPI {
    readonly deployedContract: DeployedBBoardContract;
    private readonly logger?;
    private constructor();
    readonly deployedContractAddress: ContractAddress;
    readonly state$: Observable<BBoardDerivedState>;
    post(message: string): Promise<void>;
    takeDown(): Promise<void>;
    submitFeedback(ratingScore: number, category: string, feedbackComment: string): Promise<void>;
    static deploy(providers: BBoardProviders, logger?: Logger): Promise<BBoardAPI>;
    static join(providers: BBoardProviders, contractAddress: ContractAddress, logger?: Logger): Promise<BBoardAPI>;
    private static getPrivateState;
}
export * as utils from './utils/index.js';
export * from './common-types.js';
