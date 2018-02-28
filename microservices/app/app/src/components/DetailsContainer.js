import React, { Component } from 'react';
import GetInput from  './GetInput';
import DirectionsDiv from './ShowDirection';
import  ErrorHand from './ErrorHandler';
import axios from 'axios';

let srcLat,srcLong,destLat,destLong,mode;
class DetailsContainer extends Component {
    state = {
        source: "",
        destination: "",
        Divpresent: false,
        distance: null,
        duration: null,
        route: [],
        mode: "",
        status: 500,
        statusMessage: null,
        value: 0
    }
    getDirectionsHandler = () => {
        const presentState = this.state.Divpresent;
        this.setState({
            Divpresent: !presentState
        });
        let stat=500;;
        axios.get('https://api.birdie81.hasura-app.io/directions?source='+this.state.source+'&destination='+this.state.destination+'&mode='+mode)
        .then(response  =>  {   
            if(response.status === 200) {
                this.setState({
                    distance: response.data.ResultOutput[0].distance,
                    duration: response.data.ResultOutput[0].duration,
                    route: response.data.ResultOutput[0].route,
                    dirstring: response.data.ResultOutput[0].directionString,
                    statusMessage: response.data.ResultOutput[0].status
                });  
                this.props.clicked(this.state.Divpresent,this.state.source,this.state.destination,this.state.dirstring);
                console.log(this.state.dirstring);
            }
            console.log(response.status)
        })
        .catch(function (error) {
            console.log(error)
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
            route: [],
            statusMessage: null
        });
        this.props.changeMapBack();
    }
    tryAgainHandler = () => {
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
            route: [],
            statusMessage: null
        });
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
    latlong = (select) => {
        if(select===1) {
            var a = document.querySelector("#sourceLat").value;
            srcLat = a;
        }
        else if(select===2) {
            var b = document.querySelector("#sourceLong").value;
            srcLong = b;
        }
        else if(select===3) {
            var c = document.querySelector("#destinationLat").value;
            destLat = c;
        }
        else if(select===4) {
            var d = document.querySelector("#destinationLong").value;
            destLong = d;
        }
        this.setState({
            source: srcLat+","+srcLong,
            destination: destLat+","+destLong
        });
    }
    mode = (modeval) => {
        mode = modeval;
        console.log(mode);
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {  
        const direction = (
            <div> 
                <table>
                    {this.state.route.map(a => {
                        return(
                            <tr>
                                <td dangerouslySetInnerHTML={{__html:a}}></td>
                            </tr>
                        );
                    })}
                </table>
                <br/>
            </div>
        );
        let input = (
            <GetInput 
                latlong={this.latlong} 
                handleChange={this.handleChange} 
                value={this.state.value} 
                mode={this.mode} 
                sourceValue={this.getsourcevalue} 
                destinationvalue={this.getdestinationvalue} 
                click={this.getDirectionsHandler} 
            />
        );
        if(this.state.Divpresent) {
            if(this.state.source === ''||(this.state.destination === '')) {
                input = (<ErrorHand errormsg="no input"  click={this.tryAgainHandler} />);
            }
            else {
                input = (
                    <DirectionsDiv 
                        source={this.state.source} 
                        destination={this.state.destination}  
                        distance={this.state.distance} 
                        duration={this.state.duration} 
                        directions={direction}
                        click={this.goBackHandler} 
                        tryagain={this.tryAgainHandler}
                        status={this.state.status}
                        statusMessage={this.state.statusMessage}
                    />
                );
            }
        }
        else {
            input = (
                <GetInput 
                    latlong={this.latlong} 
                    handleChange={this.handleChange} 
                    value={this.state.value}  
                    mode={this.mode} 
                    sourceValue={this.getsourcevalue} 
                    destinationValue={this.getdestinationvalue} 
                    click={this.getDirectionsHandler} 
                />
            );
        }
        
        return (
            <div>
                {input}
            </div>
        );
    }
}

export default DetailsContainer;