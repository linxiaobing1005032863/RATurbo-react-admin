import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import routeConfig from '../config/router.config';
import './navigator.scss';

const { SubMenu } = Menu;
class Navigater extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openKeys: []
		};
	}

	componentDidMount() {
		this.initOpenMenu();
	}

	initOpenMenu() {
		const {
			location: { pathname }
		} = this.props;
		const menuOpen = pathname.split('/').reduce((total, obj) => {
			obj &&
				routeConfig.some(route => route.path === '/' + obj) &&
				total.push('/' + obj);
			return total;
		}, []);
		this.setState({
			openKeys: [...menuOpen]
		});
	}

	getMenuTitle(iconType, name) {
		return (
			<span>
				{iconType && <Icon type={iconType} />}
				<span>{name}</span>
			</span>
		);
	}

	getNavMenuItem(menuData) {
		if (!menuData.length) {
			return [];
		}
		return menuData
			.filter(menu => !menu.hideMenu)
			.map(res => this.getSubMenuOrItem(res));
	}

	getSubMenuOrItem(menu) {
		if (
			menu.children &&
			!menu.hideMenu &&
			menu.children.some(child => child.name)
		) {
			const { icon, name, path, children } = menu;
			return (
				<SubMenu title={this.getMenuTitle(icon, name)} key={path}>
					{this.getNavMenuItem(children)}
				</SubMenu>
			);
		}
		return <Menu.Item key={menu.path}>{this.getMenuItem(menu)}</Menu.Item>;
	}

	getMenuItem(menu) {
		const { icon: iconType, name, path } = menu;
		return (
			<Link to={path}>
				{iconType && <Icon type={iconType} />}
				<span>{name}</span>
			</Link>
		);
	}

	handleOpenMenu = openKeys => {
		const moreThanOne =
			openKeys.filter(key => routeConfig.some(route => route.path === key))
				.length > 1;
		this.setState({
			openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
		});
	};

	render() {
		const {
			location: { pathname }
		} = this.props;
		const { openKeys } = this.state;
		return (
			<div className="navigator" mode="inline">
				<Menu
					className="myMenu"
					mode="inline"
					selectedKeys={[pathname]}
					onOpenChange={this.handleOpenMenu}
					openKeys={openKeys}
				>
					{this.getNavMenuItem(routeConfig)}
				</Menu>
			</div>
		);
	}
}
export default Navigater;
