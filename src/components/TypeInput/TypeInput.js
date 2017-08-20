import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';


const TypeInput = ({ value, onChange }) => (
    <TextField
        value={value}
        onChange={onChange}
        InputProps={{ placeholder: 'Type the above text here when the race begins' }}
        fullWidth
        margin="normal"
    />
);


TypeInput.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

export default TypeInput;
