# Who's That Pokémon? - Oops All Shinies

A shiny Pokémon guessing game, built with Next.js.

## Getting Started

### Requirements

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. A random zoomed in shiny Pokémon sprite is displayed
2. You have 5 tries to guess the Pokémon
3. After each guess, the image zooms out
4. You gain 1 point for every correct guess

## Future Enhancements

### Features 
- [ ] Support typos and punctuated names - the api returns "mr-mime"
- [ ] Generation selection - currently only supports Gen 1
- [ ] Timed mode - how many can you guess in 1 minute
- [ ] Sound mode - guess Pokémon by their cry
- [ ] Regular mode - not shiny
- [ ] Leaderboard - save your scores and compare them to other players

### Architecture
- [ ] Database to store players and scores for the leaderboard
- [ ] Host the site in AWS and purchase a domain
- [ ] Unit testing with react testing library
- [ ] Integration testing with cypress
- [ ] Front end testing with storybook and chromatic
- [ ] Set up CI/CD deployment pipelines
- [ ] As the project scales, consider breaking out the logic in to a custom hook for reusability
