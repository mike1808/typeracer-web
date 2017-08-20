import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '10px 0',
    },
    wpm: {
        fontSize: 24,
        marginLeft: 10,
    },
    progress: {
        flex: 1,
    }
};

const TypeProgress = ({ classes, wpm, progress }) => (
    <div className={classes.root}>
        <LinearProgress className={classes.progress} mode="determinate" value={progress} />
        <span className={classes.wpm}>{wpm} WPM</span>
    </div>
);


TypeProgress.propTypes = {
    classes: PropTypes.object.isRequired,
    wpm: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
};

export default withStyles(styles)(TypeProgress);
