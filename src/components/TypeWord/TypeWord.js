import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TypeWord.css'

const Caret = () => <span className="Caret">|</span>;

const TypeChar = ({ char, correct, error, caret }) => (
    <span className={classNames('TypeChar', {
        'TypeChar__correct': correct,
        'TypeChar__error': error,
    })}>{char}{caret && <Caret />}</span>
);


const TypeWord = ({ completed, highlighted, word, correctCount, errorCount }) => (
    <span className={classNames('TypeWord', {
        'TypeWord__completed': completed,
        'TypeWord__highlighted': highlighted,
    })}>
        {completed ? (
            <span className="TypeWord__regular">{word}</span>
        ) : (
            <span>
                {highlighted && correctCount === 0 && errorCount === 0 && <Caret />}
                {word.split('').map((char, index) => (
                    <TypeChar
                        key={index}
                        char={char}
                        correct={index < correctCount}
                        error={index >= correctCount && index < (correctCount + errorCount)}
                        caret={index === correctCount + errorCount - 1}
                    />
                ))}
            </span>
        )}

    </span>
);

TypeWord.propTypes = {
    completed: PropTypes.bool.isRequired,
    highlighted: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,

    correctCount: PropTypes.number,
    errorCount: PropTypes.number,

};

TypeWord.defaultProps = {
    correctCount: 0,
    errorCount: 0,
};

export default TypeWord;
