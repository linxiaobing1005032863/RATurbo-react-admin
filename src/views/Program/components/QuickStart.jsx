import React, { PureComponent } from 'react';
import { Card, Button, Avatar, Row, Col } from 'antd';
import { getContact } from '@api/platform';

class QuickStart extends PureComponent {
	state = {
		contact: []
	};

	componentDidMount() {
		getContact().then(res => {
			this.setState({
				contact: res.data.results
			});
		});
	}

	render() {
		const { contact } = this.state;
		return (
			<Card
				title="Quick Contact"
				className="fat-card"
				bordered={false}
				loading={!contact.length}
			>
				<Row className="quick-start">
					{contact.map((res, index) => {
						return (
							<Col
								className="ac"
								key={index}
								xl={2}
								lg={4}
								md={4}
								sm={4}
								xs={6}
							>
								<Avatar src={res.picture.thumbnail} />
								<p>{res.name.first}</p>
							</Col>
						);
					})}
					<Col className="ac" xl={2} lg={4} md={4} sm={4} xs={6}>
						<Button type="primary" size="small" icon="plus">
							add
						</Button>
					</Col>
				</Row>
			</Card>
		);
	}
}

export default QuickStart;
