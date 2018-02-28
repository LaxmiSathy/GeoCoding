import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MapStyle ={
    width: '100%',
    height: '100%',
    margin: '0px'
}
export class MapContainer extends Component {
  state = {
    source: this.props.src,
    destination: this.props.dest,
    clicked: this.props.click
  }

  render() {
  console.log(process.env.GOOGLE_MAPS_API)
    let map = (<Map 
      google={this.props.google} 
      zoom={12} 
      style ={MapStyle}  
      initialCenter={{lat: 13.027271,lng: 80.271369}}>
    </Map>)
    if(this.props.click) {
      map=(<iframe
        title="maps"     
        width="60%"
        height="659vh"
        style={{border: 0,marginLeft:'40%',marginBottom: '0px',paddingBottom: '0px'}}
        src={this.props.dir} >
      </iframe>)
    }
    else if(this.props.click === false) {
      map = (<Map 
        google={this.props.google} 
        zoom={12} 
        style ={MapStyle}  
        initialCenter={{lat: 13.027271,lng: 80.271369}}>
      </Map>)
    }
    return (
      <div>
         {map}  
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBGkDumezTWqlCXMjnog68fqh_-TrSxmVw')
})(MapContainer)