import * as React from 'react';
import * as request from 'superagent';
import {Content, TableItem} from './content';
import {CommonCounter} from './common-counter';
import {CommonCounter1} from './common-counter-1';

interface Props {
	name: string
}

interface State {
	counter: number,
	data: TableItem[],
	loading: boolean
}

export class Hello extends React.Component <Props, State> {
	private intervalCounterToken: any = null;
	private intervalItemsToken: any = null;
	private intervalLoadingToken: any = null;
	private randomItemIndex: number = 5;

	state: State = {
		counter: 1,
		data: [],
		loading: true
	};

	private randomIntFromInterval(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	private addRandomCount(): void {
		// Делаем типо того, кто-то лайки ставит в рилтайме по интервалу рандомно
		this.intervalCounterToken = setInterval(() => {
			this.setState({
				counter: this.state.counter + this.randomIntFromInterval(1, 3)
			});
		}, this.randomIntFromInterval(2000, 5000));
	}

	private loadData(): void {
		// Грузим данные для таблички из JSON
		request
			.get('data.json')
			.end((err, res) => {
				let data: TableItem[] = res.body.data;

				// Эмулируем задержку, типа того, данные долго
				// приходят с сервера, чтобы лоадинг показать
				this.intervalLoadingToken = setTimeout(() => {
					this.setState({
						data: data,
						loading: false
					});

					// Запускаем рандомное добавление данных в табличку
					this.appendData();
				}, 2000);
			});
	}

	private appendData(): void {
		// Тут по интервалу генерим данные для таблички (но все эти методы с данными лучше выносить куда-то
		// в контроллеры и ебашить Flux-ом, но это потом... :-)
		this.intervalItemsToken = setInterval(() => {
			this.randomItemIndex++;

			let newRandomItem: TableItem = {
				id: this.randomItemIndex,
				title: `Random item ${this.randomItemIndex}`,
				price: this.randomIntFromInterval(10000, 5000000)
			};

			this.setState({
				data: this.state.data.concat([newRandomItem])
			});

		}, this.randomIntFromInterval(2000, 5000));
	}

	public componentWillUnmount(): void {
		// Очищаем таймеры, чтобы при размаунте компонента не
		// было ошибок setState on unmounted component
		clearInterval(this.intervalCounterToken);
		clearInterval(this.intervalItemsToken);
		clearTimeout(this.intervalLoadingToken);
	}

	public componentDidMount(): void {
		this.addRandomCount();
		this.loadData();
	}

	private plusOne(): void {
		//Добавляем единичку в counter
		this.setState({
			counter: ++this.state.counter
		});
	}

	public render() {
		return (
			<div>
				<h1>Hello, {this.props.name}!</h1>

				<p>Your likes is: {this.state.counter.toString()}</p>

				<button onClick={this.plusOne.bind(this)}>
					Like +1
				</button>

				<hr/>
				<CommonCounter name="Alpha"/>

				<hr/>
				<CommonCounter1 name="Bravo"/>
				<hr/>

				<CommonCounter1 name="Charlie"/>
				<hr/>

				<Content loading={this.state.loading} data={this.state.data}/>
			</div>
		);
	}
}