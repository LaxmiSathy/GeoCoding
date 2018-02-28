import React from 'react';
import Paper from 'material-ui/Paper';
import ButtonElement from './SubmitSearch';
import  ErrorHand from './ErrorHandler';
import Card,{CardContent} from 'material-ui/Card';
import '../main.css';

const PaperStyle = {
    width: '40%',
    height: '100%',
    margin: '0px',
    float: 'left',
    top: 0,
    position: 'absolute',
    backgroundColor: '#E0F7FA'
}
const DetailsDiv = {
    width: '35%',
    marginLeft: '2%',
    marginTop: '2%',
    border: '1px solid white',
    borderRadius: '3px',
    position: 'absolute',
    textAlign: 'center'
}
const Dist = {
    width: '47%',
    height: '20%',
    marginBottom: '10px',
    marginTop: '8px',
    marginLeft: '8px',
    backgroundColor: 'white',
    display: 'inline-block',
    textAlign: 'center' 
}
const Time = {
    width: '47%',
    height: '20%',
    marginBottom: '10px',
    marginTop: '8px',
    marginLeft: '10px',
    backgroundColor: 'white',
    display: 'inline-block',
    textAlign: 'center' 
}
const Directions = {
    width: '97%',
    height: '70%',
    margin: 'auto',
    marginBottom: '5px',
    overflow: 'auto' 
}
const load = {
    zIndex: '9999',
    display: 'inline',
}
const endNodes = {
    backgroundColor: '#f1f1f1',
    fontSize: '23px',
    fontWeight: '400'
}
const nodeStyle ={
    height: '27px',
    width: '18px',
    padding: '5px'
}
const DirectionsDiv = (props) => {
    if((props.statusMessage === "OK")&&(props.status===500)) {
        return(
            <div>
                <Paper style={PaperStyle}  elevation={4}>         
                        <Card style={Dist} elevation={4}>
                            <CardContent>                
                                <h1>Distance : <br /> </h1>
                                <h3 className="dat">{props.distance}</h3>
                            </CardContent>
                        </Card>
                        <Card style={Time} elevation={4}>
                            <CardContent>
                                <h1>Time : <br /> </h1>
                                <h3 className="dat">{props.duration} </h3>
                            </CardContent>
                        </Card>
                        <Card style={Directions}  elevation={4}>
                            <CardContent>
                                <h1> Directions : <br /> </h1>
                                <div style={endNodes}>
                                    <img style={nodeStyle} src="https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1" alt="source" />
                                    <span>  {props.source}</span> 
                                </div>
                                {props.directions}
                                <div style={endNodes}>
                                    <img style={nodeStyle} src="https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-b.png&text=B&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1" alt="destination" />
                                    <span>  {props.destination}</span>
                                </div>
                            </CardContent>
                        </Card>
                        <ButtonElement click={props.click} label="Go back" />
                </Paper>
            </div>
        );
    }
    else if(props.status===500) {
        return(
            <Card style={DetailsDiv}>
                <CardContent style={{padding: '0px'}}>
                    <h1>loading</h1>
                    <img src={require('./loading')} alt="loading" height="30px" width="30px" style={load} />
                    <p style={{color:'grey',fontSize:'12px'}}>If it takes longer time to load,  please hit go back. </p>
                    <ButtonElement click={props.tryagain} label="Go back" />
                </CardContent>
            </Card> 
        )
        
    }
    else if(props.statusMessage===null) {
        return(
            <ErrorHand errormsg="invalid input" click={props.tryagain} />
        );
    }
}

            
export default DirectionsDiv; 