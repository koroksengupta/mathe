# Mathe

Playful maths games for preschool kids. No worksheets, no "solve this": just jumping, sounds and confetti.
Open `index.html` (the island map) and pick a game. Everything runs in the browser: double-click works, no install.
Best on a tablet or phone. Questions are read aloud in English or German (tap 🇬🇧/🇩🇪 to switch).

## 🐸 Island Hopper: number line jumps

Hop along numbered islands to land on the glowing gold one.

| Level | Jumps | Islands |
|---|---|---|
| 🌱 1 | +1 / −1 | 0–10 |
| 🌊 2 | ±1, ±2 | 0–10 |
| 🌋 3 | ±1, ±2, ±3 | 0–10 |
| 🚀 4 | ±1, ±2, ±5 | 0–20 |

From level 2, each round has a ⚡ jump budget, so kids plan their route (e.g. +3 +3 +1). Every hop leaves a labelled arc,
and the fewest possible jumps earns a double star.

## 🌋 Volcano Tower: number walls (Zahlenmauern)

A number wall built as a volcano: every stone is the two stones below it added together. The "+" roof is the crater.
Fill every stone and the volcano erupts.

| Level | Wall | Numbers |
|---|---|---|
| 🪨 1 | 3 rows, bottom row given (adding only) | up to 10 |
| 🌋 2 | 3 rows, mixed stones given (adding and taking away) | up to 10 |
| 🔥 3 | 4 rows, mixed stones given | up to 20 |

Every puzzle can be solved one stone at a time. 💡 (or two wrong tries) lights up the two stones that help and shows dots.

## 🐢 Turtle Beach: picture sums

Like crossing out pictures on a worksheet: tap animals to cross them out (take away) or tap the boat to bring more friends
(add), then count and pick the answer.

| Level | Sums | Numbers |
|---|---|---|
| 🐣 1 | one more / one less | up to 5 |
| 🐢 2 | add or take away 1–3 | up to 10 |
| 🦀 3 | missing number: 4 + ? = 6, 6 − ? = 4 | up to 10 |

Two wrong answers make the animals count themselves out loud: 1, 2, 3 …

## Files

- `index.html`: island map
- `island-hopper.html`, `volcano.html`, `beach.html`: the games
- `kit.js`, `kit.css`: shared sound, voice, confetti, stars and number buttons
