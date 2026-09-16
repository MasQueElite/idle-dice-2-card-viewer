import { For, Show } from "solid-js";
import type { CardInfo } from ".";

export function Card(props: CardInfo & { hide: boolean }) {
    return (
        <div classList={{card: true, hide: props.hide, shadow: !props.name.startsWith("-")}}>
            <h3>{props.name}</h3>
            <Show when={!props.hide}>
                <For each={props.desc}>
                    {effect => <p style={{color: effect.bad ? "red" : "green"}}>{effect.text}</p>}
                </For>
            </Show>
        </div>
    )
}