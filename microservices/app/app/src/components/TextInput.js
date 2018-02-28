import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const srctextStyle = {
    width: '90%',
    margin: '7px 10px 2px',
}
const desttextStyle = {
    width: '90%',
    margin: '5px 11px',
}
const inputContainer = {
    borderRadius: '5px'
}
const modeStyle ={
    width: '45%',
    marginLeft: '5%',
    backgroundColor: 'white',
    border: 'none'
}
const latlongStyle ={
    width: '40%',
    marginLeft: '6%'
}

class Text extends Component  {
    state = {
        mode: 'driving',
    }
    handleChange = name => event => {
        this.setState({ mode: event.target.value });
        this.props.mode(event.target.value);
    };
    getMode = (a) => {
        this.setState({mode: a});
    }
    render() {
        let texts = null;
        if(this.props.userInputValue === 1) {
            texts = (
                <div>
                <TextField id="sourceLat" label="    Src Lat" type="number"  style={latlongStyle}  onChange={() =>{ this.props.latlong(1) }} />
                <TextField id="sourceLong" label="    Src Long" type="number"  style={latlongStyle}  onChange={() =>{ this.props.latlong(2) }} />
                <TextField id="destinationLat" label="    Dest Lat" type="number"  style={latlongStyle}  onChange={() =>{ this.props.latlong(3) }} /> 
                <TextField id="destinationLong" label="       Dest Long" type="number"  style={latlongStyle}  onChange={() =>{ this.props.latlong(4) }} />
                </div>
            );
        }
        else {
            texts = (
                <div>
                <TextField id="source" label="    Source" style={srctextStyle}  onChange={this.props.source} /> 
                <TextField id="destination" label="     Destination"  style={desttextStyle}  onChange={this.props.destination} />
                <br />
                </div>
            );
        }
        return (
            <div style={inputContainer} onload="initialize()">
                {texts}
                <br />
                <span style={{marginLeft:'4%',color: 'grey'}}>Mode:</span> 
                <Select
                    style={modeStyle}
                    value={this.state.mode}
                    onChange={this.handleChange('mode')}
                    inputProps={{
                    id: 'age-native-simple',
                    }}
                >
                    <MenuItem value="driving" selected>Driving</MenuItem>
                    <MenuItem value="walking">Walking</MenuItem>
                    <MenuItem value="transit">Transit</MenuItem>
                </Select>
                
            </div>
        );
        
    }
}


export default Text;