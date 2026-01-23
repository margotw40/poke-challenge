'use client';

import Image from "next/image";
import { useEffect, useState, useCallback } from 'react';
import styles from './page.module.css';
import ActionButton from './components/atoms/ActionButton';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_shiny: string;
  };
  cries: {
    latest: string;
  };
}

const MAX_GUESSES = 5;
const INITIAL_SCALE = 5;
const SUCCESS_RESPONSE = "You got it!";
const FAIL_RESPONSES = [
  "Not quite!",
  "Try again!",
  "So close!",
  "Nope!",
  "Wrong!",
  "Better luck next time!"
];

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guess, setGuess] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [imageScale, setImageScale] = useState(INITIAL_SCALE);

  const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setGuess('');
    setGuessCount(0);
    setFeedback('');
    setImageScale(INITIAL_SCALE);

    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon ${randomId}`);
      }

      const data: Pokemon = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGuess = () => {
    if (!guess.trim() || !pokemon) return;

    const newGuessCount = guessCount + 1;
    setGuess('');

    // remove -f or -m from the api name response for gendered pokemon
    const isCorrect = guess.toLowerCase() === pokemon.name.toLowerCase().replace(/-[fm]/g, '');
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback(SUCCESS_RESPONSE);
      setImageScale(1);

      if (pokemon.cries?.latest) {
        const audio = new Audio(pokemon.cries.latest);
        audio.play().catch((err) => console.error('Error playing cry:', err));
      }

      setTimeout(() => {
        fetchPokemon();
      }, 2000);

    } else if (newGuessCount >= MAX_GUESSES) {
      setImageScale(1);
      setGuessCount(newGuessCount);

    } else {
      setFeedback(FAIL_RESPONSES[Math.floor(Math.random() * FAIL_RESPONSES.length)]);
      setImageScale(INITIAL_SCALE - (newGuessCount * 0.8));
      setGuessCount(newGuessCount);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return (
    <div className={styles.container}>
      <link href="https://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet" />

      <header className={styles.header}>
        <h1 className={styles.title}>
          Who&apos;s that Pokémon?
        </h1>
        <h2 className={styles.subtitle}>
          Oops all shinies...
        </h2>
      </header>

      <main className={`flex flex-col items-center gap-4 ${styles.main}`}>

        <p className={styles.score}>
          Score: {score}
        </p>

        <div className={styles.imageContainer}>
          {isLoading ? (
            <p>Loading...</p>
          ) : pokemon ? (
            <div
              className={styles.imageScaling}
              style={{ transform: `scale(${imageScale})` }}
            >
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={256}
                height={256}
              />
            </div>
          ) : null }
        </div>

        {guessCount >= MAX_GUESSES && pokemon ? (
          <p className={styles.answer}>
            The Answer Was: {pokemon.name}
          </p>
        ) : (
          <>
            <div>
              <input
                id="guessInput"
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                placeholder="Guess the Pokémon..."
                className={styles.guessInput}
                aria-label="Pokemon guess input"
                disabled={isLoading}
              />
              <ActionButton onClick={handleGuess} text="Guess" disabled={isLoading} />
            </div>

            <p>
              Guesses: {guessCount}/5
            </p>

            {feedback && (
              <p
                className={
                  feedback === SUCCESS_RESPONSE
                    ? styles.correct
                    : styles.incorrect
                }
              >
                {feedback}
              </p>
            )}
          </>
        )}

        <ActionButton
          onClick={fetchPokemon}
          text={guessCount >= MAX_GUESSES ? 'Next Pokémon' : 'Skip'}
        />
      </main>
    </div>
  );
}