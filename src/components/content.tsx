import * as React from 'react';

interface Props {
	data: TableItem[],
	loading: boolean
}

interface State {

}

export interface TableItem {
	id: number,
	title: string,
	price: number
}

export class Content extends React.Component <Props, State> {
	public render() {
		if (this.props.loading) {
			return (
				<p>Loading...</p>
			);
		} else {
			return (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Price $</th>
						</tr>
					</thead>
					<tbody>
						{this.props.data.map((item: TableItem, i: number) => {
							return (
								<tr key={i}>
									<td>{item.id.toString()}</td>
									<td>{item.title}</td>
									<td>${item.price.toString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		}
	}
}