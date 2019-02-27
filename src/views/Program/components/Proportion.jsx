import React, { Component } from 'react';
import { Card } from 'antd';
import ET from '@utlis/echartTools';
import { getWordCloud } from '@api/analysis';
import { wordCloudChart } from '@utlis/chartOption';

class Proportion extends Component {
	componentDidMount() {
		this.initChart();
	}

	async initChart() {
		const data = await getWordCloud();
		const option = wordCloudChart(data.data.data);
		console.log(option);
		ET.initChart({ id: 'trading-proportion', option });
	}

	render() {
		return (
			<Card title="trading proportion" className="fat-card">
				<div id="trading-proportion" />
			</Card>
		);
	}
}

export default Proportion;
