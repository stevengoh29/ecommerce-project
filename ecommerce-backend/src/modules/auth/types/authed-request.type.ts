import { Request } from "express";
import { Store } from "src/modules/stores/entities/store.entity";
import { User } from "src/modules/users/entities/user.entity";

export type AuthedRequest = Request & {
    user: User,
    store?: Store
}