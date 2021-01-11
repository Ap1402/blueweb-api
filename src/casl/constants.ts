import { SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "./policy-handler";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
    CreateOwn = 'createOwn',
    CreateAny = 'CreateAny',
    ReadOwn = 'readOwn',
    ReadAny = "readAny",
    DeleteAny = "deleteAny",
    DeleteOwn = "deleteOwn",
    UpdateOwn = "updateOwn",
    UpdateAny = "updateAny",

}

export const CHECK_POLICIES_KEY = 'check_policy';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);