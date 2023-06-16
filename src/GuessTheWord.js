import React, { useState, useEffect } from 'react';
import rose0 from './rose0.png';
import rose1 from './rose1.png';
import rose2 from './rose2.png';
import rose3 from './rose3.png';
import rose4 from './rose4.png';
import rose5 from './rose5.png';

const Rose = () => {
  const words = ['bluebell', 'marigold', 'sunflower', 'snapdragon', 'buttercup', 'dandelion', 'honeysuckle', 'hydrangea', 'blossom'];
  const maxGuesses = 6;
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedWord, setGuessedWord] = useState([]);
  const [guessesRemaining, setGuessesRemaining] = useState(maxGuesses);
  const [gameStatus, setGameStatus] = useState('playing');
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [message, setMessage] = useState('');

  useEffect(() => {
    selectRandomWord();
  }, []);

  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWord(words[randomIndex].toLowerCase());
    setGuessedWord(Array.from({ length: words[randomIndex].length }, () => '_'));
    setGuessesRemaining(maxGuesses);
    setUsedLetters(new Set());
    setMessage('');
    setGameStatus('playing');
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') {
      return;
    }

    if (usedLetters.has(letter)) {
      setMessage('You already guessed that letter!');
      return;
    }

    setUsedLetters(new Set(usedLetters.add(letter)));

    if (selectedWord.includes(letter)) {
      const newGuessedWord = [...guessedWord];
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
          newGuessedWord[i] = letter;
        }
      }

      setGuessedWord(newGuessedWord);

      if (!newGuessedWord.includes('_')) {
        setGameStatus('win');
        setMessage('Congratulations! You won! 🌹');
      }
    } else {
      setGuessesRemaining(guessesRemaining - 1);

      if (guessesRemaining === 1) {
        setGameStatus('lose');
        setMessage(`Game over! 
        The word was "${selectedWord}".`);
      }
    }
  };

  const renderRoseImage = () => {
    const imageIndex = maxGuesses - guessesRemaining;
    let roseImage;

    if (imageIndex === 0) {
      roseImage = rose0;
    } else if (imageIndex === 1) {
      roseImage = rose1;
    } else if (imageIndex === 2) {
      roseImage = rose2;
    } else if (imageIndex === 3) {
      roseImage = rose3;
    } else if (imageIndex === 4) {
      roseImage = rose4;
    } else {
      roseImage = rose5;
    }

    return (
      <img
        src={roseImage}
        alt={`Rose ${imageIndex}`}
      />
    );
  };

  const renderGuessedWord = () => {
    return (
      <div className="rose-word">
        {guessedWord.map((letter, index) => (
          <span key={index} className="rose-letter">
            {letter}
          </span>
        ))}
      </div>
    );
  };

  const renderUsedLetters = () => {
    return (
      <div className="rose-used-letters">
        <p className='highlighter'>Used Letters: {Array.from(usedLetters).join(', ')}</p>
        <div className="rose-message">{message}</div>
      </div>
    );
  };

  return (
    <div className="rose-container">
      
      {gameStatus === 'playing' && (
        <div>
          <div>{renderRoseImage()}</div>
          <div>{renderGuessedWord()}</div>
          <div>{renderUsedLetters()}</div> 
          <div className="rose-buttons">
            {Array.from({ length: 26 }, (_, index) => (
              <button
                key={index}
                onClick={() => handleGuess(String.fromCharCode(97 + index))}
              >
                {String.fromCharCode(97 + index)}
              </button>
            ))}
          </div>   
          <p className='line'>Hint: Flower name</p>&nbsp;&nbsp;
          <div className='line'>Remaining: {guessesRemaining}</div>
          
        </div>
          )}

          {gameStatus !== 'playing' && (
            <div className='result'>
              <h2 className='highlighter'>{message}</h2>
              <button className='btn' onClick={() => selectRandomWord()}>Play Again</button>
            </div>
          )}
          <br />
          
        <footer>
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a href="https://anyaparanya.com" className="link-grey">
              anyaParanya
            </a>
          </p>
        </footer>
        </div>
        );
    };
    
    export default Rose;
