import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import TypeWord from '../TypeWord/TypeWord';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        width: 1000,
    }),
});


const TypeText = (props) => {
    const { classes, words, currentWordIndex, currentWordCorrectCount, currentWordErrorCount } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <p style={{ fontSize: 24 }}>
                    {words.map((word, index) => (
                        <TypeWord
                            key={index}
                            word={word}
                            completed={index < currentWordIndex}
                            highlighted={index === currentWordIndex}
                            correctCount={index === currentWordIndex ? currentWordCorrectCount : 0}
                            errorCount={index === currentWordIndex ? currentWordErrorCount : 0}
                        />
                    ))}
                </p>
            </Paper>
        </div>
    );
};


TypeText.propTypes = {
    classes: PropTypes.object.isRequired,
    words: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentWordIndex: PropTypes.number.isRequired,
    currentWordCorrectCount: PropTypes.number.isRequired,
    currentWordErrorCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(TypeText);
