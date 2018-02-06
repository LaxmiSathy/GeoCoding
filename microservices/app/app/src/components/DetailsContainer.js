import React, { Component } from 'react';
import GetInput from  './GetInput';
import DirectionsDiv from './ShowDirection';
import axios from 'axios';

class DetailsContainer extends Component {
    state = {
        source: '',
        destination: '',
        Divpresent: false,
        distance: null,
        duration: null,
        route: null,
        status: null
    }
    getDirectionsHandler = () => {
        const presentState = this.state.Divpresent;
        this.setState({
            Divpresent: !presentState
        });
        axios.get('https://api.birdie81.hasura-app.io/api/'+this.state.source+'/'+this.state.destination)
        .then(response  =>  {   
            this.setState({
                source: "chennai",
                distance: response.data.distance,
                duration: response.data.duration,
                route: response.data.route,
                dirstring: response.data.directionString,
                status: 500
            });  
            this.props.clicked(this.state.Divpresent,this.state.source,this.state.destination,this.state.dirstring);
            
        })
        .catch(function (error) {
            console.log('error');
        });
    }
    goBackHandler = () => {
        const presentState = this.state.Divpresent;
        this.setState({
            Divpresent: !presentState
        });
        this.setState({
            source: '',
            destination: '',
            Divpresent: false,
            distance: null,
            duration: null,
            route: null,
            status: null
        });
        this.props.clicked(this.state.Divpresent,this.state.source,this.state.destination,this.state.dirstring);
    }
    getsourcevalue = () => {
        var sourceval = document.querySelector("#source").value;
        this.setState({
            source: sourceval
        });
    }
    getdestinationvalue = () => {
        var destinationval = document.querySelector("#destination").value;
        this.setState({
            destination: destinationval
        });
    }
    render() {  
        const direction = (<p dangerouslySetInnerHTML={{__html: this.state.route}}></p>)
        let showInput = (
            <GetInput sourceValue={this.getsourcevalue} destinationvalue={this.getdestinationvalue} click={this.getDirectionsHandler} />
        );
        if(this.state.Divpresent) {
            showInput = (<DirectionsDiv 
                source={this.state.source} 
                destination={this.state.destination}  
                distance={this.state.distance} 
                duration={this.state.duration} 
                directions={direction}
                click={this.goBackHandler} 
                status={this.state.status}
                />);    
        }
        else {
            showInput = (<GetInput sourceValue={this.getsourcevalue} destinationValue={this.getdestinationvalue} click={this.getDirectionsHandler} />);
            
        }
        
        return (
            <div>
                {showInput}
            </div>
        );
    }
}

export default DetailsContainer;