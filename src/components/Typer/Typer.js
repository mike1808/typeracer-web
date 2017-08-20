import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypeProgress from '../TypeProgress/TypeProgress';
import TypeText from '../TypeText/TypeText';
import TypeInput from '../TypeInput/TypeInput';
import './Typer.css';


const createWords = text => text.split(/\s+/);

class Typer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wordIndex: 0,
            correctCount: 0,
            errorCount: 0,
            input: '',
            startTime: -1,
            wpm: 0,
        };

        this.words = createWords(this.props.text.trim());
        this.charsCount = this.props.text.trim().length;
        this.started = false;
    }

    start() {
        this.started = true;
        this.setState({ startTime: Date.now() });

        this.wpmInterval = setInterval(this.calculateWPM, 500);
    }

    handleChange = (event) => {
        if (!this.started) {
            this.start();
        }

        let value = event.target.value;
        let correctCount = 0;
        let errorCount = 0;
        let wordIndex = this.state.wordIndex;

        const word = this.words[wordIndex];

        if (word.slice(0, value.length) === value) {
            correctCount = value.length;
        } else {
            for (let i = 0; i < Math.min(value.length, word.length); i++) {
                if (value[i] === word[i]) {
                    correctCount++;
                } else {
                    break;
                }
            }
            errorCount = value.length - correctCount;
        }

        if (correctCount >= word.length && value[value.length - 1] === ' ') {
            wordIndex++;
            value = '';
            correctCount = 0;
            errorCount = 0;
        }

        this.setState({ correctCount, errorCount, input: value, wordIndex })
    };

    calculateCorrectCharsCount() {
        const { wordIndex, correctCount } = this.state;
        const spaceCount = wordIndex;
        return this.words.slice(0, wordIndex).reduce((chars, word) => chars + word.length, spaceCount) +
            correctCount;
    }

    calculateWPM = () => {
        const { startTime } = this.state;
        const charsCount = this.calculateCorrectCharsCount();

        const minutes = (Date.now() - startTime) / 1000 / 60;
        const cpm = charsCount / minutes;
        const wpm = Math.floor(cpm / 5);
        this.setState({ wpm });
    };

    calculateProgress() {
        return this.calculateCorrectCharsCount() / this.charsCount * 100;
    }

    render() {
        const {
            wordIndex,
            correctCount,
            errorCount,
            input,
            wpm,
        } = this.state;

        const progress = this.calculateProgress();

        return (
            <div className="Typer">
                <TypeProgress
                    progress={progress}
                    wpm={wpm}
                />
                <TypeText
                    words={this.words}
                    currentWordIndex={wordIndex}
                    currentWordCorrectCount={correctCount}
                    currentWordErrorCount={errorCount}
                />
                <TypeInput value={input} onChange={this.handleChange} />
            </div>
        );
    }
}

Typer.propTypes = {
    text: PropTypes.string.isRequired,
};

Typer.defaultProps = {
    text: 'The best talent ignores job postings and social media spam, but they do respond to someone they know and respect. Leverage your employees’ contacts and Teamable’s intelligence to standout from the noise and recruit top talent.',
};


export default Typer;
