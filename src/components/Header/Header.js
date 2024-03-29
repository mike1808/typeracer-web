import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        width: '100%',
    },
};

const Header = (props) => {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography type="title" color="inherit">
                            Typeracer
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
