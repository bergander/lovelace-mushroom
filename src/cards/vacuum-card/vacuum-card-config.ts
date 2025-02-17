import { LovelaceCardConfig } from "custom-card-helpers";
import { array, assign, boolean, object, optional, string } from "superstruct";
import { actionsSharedConfigStruct, ActionsSharedConfig } from "../../shared/config/actions-config";
import { layoutSharedConfigStruct, LayoutSharedConfig } from "../../shared/config/layout-config";
import { entitySharedConfigStruct, EntitySharedConfig } from "../../shared/config/entity-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";

export const VACUUM_COMMANDS = [
    "start_pause",
    "stop",
    "locate",
    "clean_spot",
    "return_home",
] as const;

export type VacuumCommand = typeof VACUUM_COMMANDS[number];

export type VacuumCardConfig = LovelaceCardConfig &
    EntitySharedConfig &
    LayoutSharedConfig &
    ActionsSharedConfig & {
        hide_state?: boolean;
        commands?: VacuumCommand[];
    };

export const vacuumCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    assign(entitySharedConfigStruct, layoutSharedConfigStruct, actionsSharedConfigStruct),
    object({
        hide_state: optional(boolean()),
        commands: optional(array(string())),
    })
);
