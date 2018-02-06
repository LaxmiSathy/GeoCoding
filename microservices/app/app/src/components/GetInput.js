import React from 'react';
import Paper from 'material-ui/Paper';
import Text from './TextInput';
import ButtonElement from './SubmitSearch';

const PaperStyle = {
    width: '25%',
    height: '30%',
    position: 'absolute',
    borderRadius: '5px',
    top: 40,
    left: 40
}
const GetInput = (props) => {
    return(
        <div>
            <Paper style={PaperStyle}  elevation={4}>
                <Text source={props.sourceValue} destination={props.destinationValue}/>
                <ButtonElement click={props.click} label="Get Direction" />
            </Paper>
            <br/>
            <br/>
        </div>
    );
}

export default GetInput; 