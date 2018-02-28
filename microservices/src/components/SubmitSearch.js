import React from 'react';
import Button from 'material-ui/Button';

const ButtonStyle = {
   backgroundColor: '#00ACC1',
   color: 'white',
   fontWeight: 'bold',
   borderRadius: '4px'
}
const ButtonElement = (props) => {
    return (
        <p style={{textAlign: 'center'}}>
            <Button raised dense style={ButtonStyle} onClick={props.click}>
                {props.label}
            </Button>
        </p>
    );
}

export default ButtonElement;