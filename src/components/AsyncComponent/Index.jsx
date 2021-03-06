import React, { PureComponent } from 'react';
import WrapAnimation from '@components/WrapAnimation/Index';
import { inject } from 'mobx-react';

/**
 * 懒加载模块
 * @param {componentInfo} object 懒加载模块信息
 * componentInfo 内部参数
 * {asyncComponent} 动态import的方法
 * {animate} 动画名称
 * {path} 校验路径
 */
@inject('layoutStore')
class AsyncComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			component: null,
			animate: null
		};
	}

	async componentDidMount() {
		const {
			componentInfo: [asyncComponent, animate],
			path
		} = this.props;
		// 检查路径是否已加载 判断是否显示loading
		this.props.layoutStore.checkIsInitial(path);
		const { default: component } = await asyncComponent;
		this.setState({
			component: component,
			animate: animate
		});
	}

	render() {
		const { component: C, animate } = this.state;
		if (animate === 'notAnimate') {
			return <C {...this.props} />;
		}
		return C ? (
			<WrapAnimation animate={animate}>
				<C {...this.props} />
			</WrapAnimation>
		) : null;
	}
}
export default AsyncComponent;
