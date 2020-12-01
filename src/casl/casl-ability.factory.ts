import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Client } from "src/clients/client.model";
import { User } from "src/users/user.model";
import { Action } from "./constants";
import { reqUser } from "./dto/req-user.dto";

type Subjects = typeof User | Client | User | 'all' | 'client' | 'report' | 'status' | 'category' | 'otherRoles' | 'users' | 'contactMessage';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: reqUser) {

        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        if (user.role === 'admin') {
            can(Action.Manage, 'all');
        }

        if (user.role === 'client') {
            can(Action.Update, 'client');
            can(Action.Create, 'report');
            can(Action.ReadOwn, 'report');
            can(Action.ReadOwn, 'contactMessage');

        }

        if (user.role === 'support') {
            can(Action.UpdateAny, 'client');
            can(Action.ReadAny, 'client');
            can(Action.DeleteAny, 'client');
            can(Action.Create, 'client');
            can(Action.ReadAny, 'contactMessage');

        }

        return build();
    }
}