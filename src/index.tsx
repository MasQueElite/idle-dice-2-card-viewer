/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App.tsx";

interface Description {
    text: string,
    bad: boolean
}

export interface CardInfo {
    name: string,
    desc: Description[]
}

export interface Options {
    pretty: boolean,
    showNegs: boolean,
    hidden: string[]
}

render(() => <App/>, document.querySelector("#root")!);