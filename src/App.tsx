import "./style.css";
import { createEffect, For, on, Show } from "solid-js";
import { createStore } from "solid-js/store";
import json from "./assets/data.json" with { type: "json" };
import { Card } from "./Card";
import type { CardInfo, Options } from ".";

function App() {
    const storedOpts = sessionStorage.getItem("opts");
    const [opts, setOpts] = createStore<Options>(storedOpts ? JSON.parse(storedOpts) : {
        pretty: true,
        showNegs: false,
        hidden: [
            "404", "666", "ASS", "B", "CD", "D10", "D12", "D20", "D4", "D6", "D8", "H", "I", "M", "N", "S", "U", "V", "Y", "ZZZ",
            "-404", "-666", "-ASS", "-B", "-CD", "-D10", "-D12", "-D20", "-D4", "-D6", "-D8", "-H", "-I", "-M", "-N", "-S", "-U", "-V", "-Y", "-ZZZ"
        ]
    });

    const isHidden = (name: string) => opts.hidden.includes(name);
    const isSuperHidden = (name: string) => !opts.showNegs && name.startsWith("-");

    const data: CardInfo[] = json;

    createEffect(on(
        [() => opts.pretty, () => opts.showNegs, () => opts.hidden],
        ([pretty, showNegs, hidden]) => sessionStorage.setItem("opts", JSON.stringify({pretty, showNegs, hidden})),
        {defer: true}
    ));

    return (<>
        <div id="options">
            <label title="Show cards or a list?">
                Pretty
                <input type="checkbox" onChange={e => setOpts("pretty", e.target.checked)} checked={opts.pretty}/>
            </label>
            <label title="Show negative numbers?">
                ShowNegs
                <input type="checkbox" onChange={e => setOpts("showNegs", e.target.checked)} checked={opts.showNegs}/>
            </label>
            <label title="These cards will not show their descriptions (to avoid spoilers)">
                Hidden
                <textarea onInput={e => setOpts("hidden", e.target.value.trim().split(/, ?/).flatMap(name => [name, "-" + name]))}>
                    {opts.hidden.filter(n => !n.startsWith("-")).join(", ")}
                </textarea>
            </label>
        </div>
        <hr class="my-3"/>
        <Show when={opts.pretty} fallback={
            <ul>
                <For each={data}>
                    {card => 
                        <Show when={!isSuperHidden(card.name)}><li>
                            <strong>{card.name}</strong>:
                            <For each={card.desc}>{effect =>
                                <span
                                    hidden={isHidden(card.name)}
                                    style={{color: effect.bad ? "red" : "green"}}
                                    class="mr-2 ml-1"
                                >
                                    {effect.text}
                                </span>}
                            </For>
                        </li></Show>
                    }
                </For>
            </ul>
        }>
            <div id="table">
                <For each={data}>
                    {card =>
                        <Show when={!isSuperHidden(card.name)}>
                            <Card {...card} hide={isHidden(card.name)}/>
                        </Show>
                    }
                </For>
            </div>
        </Show>
    </>);
}

export default App;