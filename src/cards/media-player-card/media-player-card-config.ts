import { LovelaceCardConfig } from "custom-card-helpers";
import { array, assign, boolean, enums, object, optional } from "superstruct";
import { actionsSharedConfigStruct, ActionsSharedConfig } from "../../shared/config/actions-config";
import { layoutSharedConfigStruct, LayoutSharedConfig } from "../../shared/config/layout-config";
import { entitySharedConfigStruct, EntitySharedConfig } from "../../shared/config/entity-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";

export const MEDIA_LAYER_MEDIA_CONTROLS = [
    "on_off",
    "shuffle",
    "previous",
    "play_pause_stop",
    "next",
    "repeat",
] as const;

export type MediaPlayerMediaControl = typeof MEDIA_LAYER_MEDIA_CONTROLS[number];

export const MEDIA_PLAYER_VOLUME_CONTROLS = [
    "volume_mute",
    "volume_set",
    "volume_buttons",
] as const;

export type MediaPlayerVolumeControl = typeof MEDIA_PLAYER_VOLUME_CONTROLS[number];

export type MediaPlayerCardConfig = LovelaceCardConfig &
    EntitySharedConfig &
    LayoutSharedConfig &
    ActionsSharedConfig & {
        use_media_info?: boolean;
        use_media_artwork?: boolean;
        show_volume_level?: boolean;
        volume_controls?: MediaPlayerVolumeControl[];
        media_controls?: MediaPlayerMediaControl[];
        collapsible_controls?: boolean;
    };

export const mediaPlayerCardConfigStruct = assign(
    lovelaceCardConfigStruct,
    assign(entitySharedConfigStruct, layoutSharedConfigStruct, actionsSharedConfigStruct),
    object({
        use_media_info: optional(boolean()),
        use_media_artwork: optional(boolean()),
        show_volume_level: optional(boolean()),
        volume_controls: optional(array(enums(MEDIA_PLAYER_VOLUME_CONTROLS))),
        media_controls: optional(array(enums(MEDIA_LAYER_MEDIA_CONTROLS))),
        collapsible_controls: optional(boolean()),
    })
);
