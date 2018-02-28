import React from 'react';
import Paper from 'material-ui/Paper';
import Text from './TextInput';
import ButtonElement from './SubmitSearch';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

const PaperStyle = {
    width: '25%',
    height: '44%',
    position: 'absolute',
    borderRadius: '5px',
    top: 45,
    left: 40,
}
const SelectionButtons = {
    marginTop: '1%',
}
const GetInput = (props) => {
    return(
        <div>
            <Paper style={PaperStyle}  elevation={4}>
            <BottomNavigation  value={props.value} onChange={props.handleChange} showLabels style={SelectionButtons}>            
                <BottomNavigationAction label="places"  />
                <BottomNavigationAction label="coordinates" />
            </BottomNavigation>
                <Text userInputValue={props.value} latlong={props.latlong} source={props.sourceValue} destination={props.destinationValue} mode={props.mode}/>
                <ButtonElement click={props.click} label="Get Direction" />
            </Paper>
            <br/>
            <br/>
        </div>
    );
}

  
export default  GetInput; 