import React, { Component } from 'react';
import MapContainer from './components/Map';
import DetailsContainer from './components/DetailsContainer';


export default class Mainmap extends Component {
	state = {
		source:'',
		destination: '',
		clicked: false
	}
	changeClick = (val,src,dest,dir) => {
		this.setState({
			source: src,
			destination: dest,
			direct: dir,
			clicked: val
		});
	}
	render () {	
		return (
			<div>
				<div className="mainContainer">
					<MapContainer src={this.state.source} dest={this.state.destination} dir={this.state.direct} click={this.state.clicked} />	
					<DetailsContainer clicked={this.changeClick}  /> 
				</div>
			</div>
		);
	}
}

