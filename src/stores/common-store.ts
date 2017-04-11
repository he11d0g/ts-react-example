import {Store} from "react-stores";

export namespace CommonStore {
    // State interface
    export interface State {
        counter: number
    }

    // Store's state initial values
    let initialState: State = {
        counter: 0
    };

    export let store: Store<State> = new Store<State>(initialState);
}