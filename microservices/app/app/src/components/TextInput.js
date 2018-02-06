import React from 'react';
import TextField from 'material-ui/TextField';

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

const Text = (props) => {
    return (
        <div style={inputContainer}>
            <TextField id="source" label="   Source"  style={srctextStyle} onChange={props.source} />
            <TextField id="destination" label="   Destination"  style={desttextStyle} onChange={props.destination} />
        </div>
    );
}

export default Text;