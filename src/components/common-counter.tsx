import * as React from "react";
import {StoreComponent, Store} from "react-stores";
import {CommonStore} from "../stores/common-store";

interface Props {
    name: string
}

interface State {
    counter: number
}

interface StoresState {
    common: Store<CommonStore.State>
}

export class CommonCounter extends StoreComponent<Props, State, StoresState> {
    constructor() {
        super({
            common: CommonStore.store
        });
    }

    private increaseCommon():void {
        // You can mutate stores as local component state values
        this.stores.common.setState({
            counter: this.stores.common.state.counter + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Common counter</h1>
                <h2>Common counter "{this.props.name}": {this.stores.common.state.counter}</h2>
                <button onClick={this.increaseCommon.bind(this)}>+1 to common</button>
            </div>
        );
    }
}