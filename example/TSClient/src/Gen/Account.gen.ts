import { CodableResult, CodableResult_JSON, CodableResult_decode } from "./OtherDependency/CodableResult.gen.js";
import { SubmitError, SubmitError_JSON, SubmitError_decode } from "./SubmitError.gen.js";
import { IRawClient } from "./common.gen.js";
import { identity } from "./decode.gen.js";

export interface IAccountClient {
    signin(request: AccountSignin_Request): Promise<CodableResult<AccountSignin_Response, SubmitError<AccountSignin_Error>>>;
}

class AccountClient implements IAccountClient {
    rawClient: IRawClient;

    constructor(rawClient: IRawClient) {
        this.rawClient = rawClient;
    }

    async signin(request: AccountSignin_Request): Promise<CodableResult<AccountSignin_Response, SubmitError<AccountSignin_Error>>> {
        const json = await this.rawClient.fetch(request, "Account/signin") as CodableResult_JSON<AccountSignin_Response, SubmitError_JSON<AccountSignin_Error>>;
        return CodableResult_decode(json, identity, (json: SubmitError_JSON<AccountSignin_Error>): SubmitError<AccountSignin_Error> => {
            return SubmitError_decode(json, identity);
        });
    }
}

export const buildAccountClient = (raw: IRawClient): IAccountClient => new AccountClient(raw);

export type AccountSignin = never;

export type AccountSignin_Request = {
    email: string;
    password: string;
};

export type AccountSignin_Response = {
    userName: string;
};

export type AccountSignin_Error = "email" | "password" | "emailOrPassword";