import React, { Component } from 'react';
import MapContainer from './components/Map';
import DetailsContainer from './components/DetailsContainer';

export default class Mainmap extends Component {
	state = {
		source:'',
		destination: '',
		clicked: false,
		mapReset: false
	}
	changeClick = (val,src,dest,dir) => {
		this.setState({
			source: src,
			destination: dest,
			direct: dir,
			clicked: val
		});
	}
	changeMapBack = () => {
		const val = this.state.clicked;
		this.setState({
			clicked: !val
		});
	}
	render () {	
		return (
			<div>
				<div className="mainContainer">
					<MapContainer src={this.state.source} mapReset={this.state.mapReset} dest={this.state.destination} dir={this.state.direct} click={this.state.clicked} />	
					<DetailsContainer changeMapBack={this.changeMapBack} clicked={this.changeClick}  /> 
				</div>
			</div>
		);
	}
}

