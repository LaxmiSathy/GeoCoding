import React from 'react';
import Paper from 'material-ui/Paper';
import Text from './TextInput';
import ButtonElement from './SubmitSearch';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

const PaperStyle = {
    width: '25%',
    height: '25%',
    position: 'absolute',
    borderRadius: '5px',
    top: 200,
    left: 400,
}

const NoInput = (props) => {
    return(
        <div>
            <Paper style={PaperStyle}  elevation={4}>
                <h3 style={{textAlign: 'center',color: 'red'}}> You haven't entered any address. </h3>
                <br/><br/>
                <ButtonElement click={props.click} label="Try again" />
            </Paper>
            <br/>
            <br/>
        </div>
    );
}

export default NoInput;