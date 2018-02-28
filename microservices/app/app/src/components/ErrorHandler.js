import React from 'react';
import Paper from 'material-ui/Paper';
import ButtonElement from './SubmitSearch';

const PaperStyle = {
    width: '25%',
    height: '25%',
    position: 'absolute',
    borderRadius: '5px',
    top: 200,
    left: 400,
}

const ErrorHand = (props) => {
    let errorMessage;
    if(props.errormsg === "invalid input") {
        errorMessage = "You have entered an invalid input !!";
    }
    else if(props.errormsg === "no input") {
        errorMessage = "You haven't entered any address.";
    }
    return(
        <div>
            <Paper style={PaperStyle}  elevation={4}>
                <h3 style={{textAlign: 'center',color: 'red'}}> {errorMessage} </h3>
                <br/>
                <br/>
                <ButtonElement click={props.click} label="Try again" />
            </Paper>
            <br/>
            <br/>
        </div>
    );
}

export default ErrorHand;