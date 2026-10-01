# 🏝️ Mathe Island

Playful maths games for preschool and early primary kids (about 5–7 years), in English and German.
No worksheets and no "solve this": children jump, tap and count, and the maths happens along the way.

**▶ Play now:** <https://koroksengupta.github.io/mathe/>

Mathe Island has three games, all reached from an island map:

| Game | What the child does | What it practises |
|---|---|---|
| 🐸 **Island Hopper** | Hops a frog along numbered islands to land on the gold one | Number line, counting on and back, +1/+2/+3/+5 steps, planning a route, numbers below zero |
| 🌋 **Volcano Tower** | Fills in a number wall shaped like a volcano; it erupts when finished | Adding two numbers, finding the missing part (taking away), number walls (*Zahlenmauern*) |
| 🐢 **Turtle Beach** | Crosses out animals or brings more by boat, then counts | Picture sums, one more / one less, adding and taking away up to 10, missing numbers |

Everything runs in the browser: no install, no account, no ads, no tracking.

---

## Contents

- [For parents](#for-parents)
  - [Getting started](#getting-started)
  - [Levelling up](#levelling-up)
  - [Suggested path](#suggested-path)
- [The games in detail](#the-games-in-detail)
  - [🐸 Island Hopper](#-island-hopper)
  - [🌋 Volcano Tower](#-volcano-tower)
  - [🐢 Turtle Beach](#-turtle-beach)
- [Design principles](#design-principles)
- [Privacy and saved data](#privacy-and-saved-data)
- [For developers](#for-developers)
  - [Project structure](#project-structure)
  - [Running locally](#running-locally)
  - [Deployment](#deployment)
  - [The shared kit (`kit.js` / `kit.css`)](#the-shared-kit-kitjs--kitcss)
  - [Adding a new game](#adding-a-new-game)
  - [Testing checklist](#testing-checklist)
- [Browser support](#browser-support)
- [Support the project](#support-the-project)
- [License](#license)

---

## For parents

### Getting started

1. Open <https://koroksengupta.github.io/mathe/> on a tablet or phone. Holding the device **sideways** works best.
2. Pick a game on the island map, then a level.
3. The question is **read aloud**, so children who can't read yet can still play. Tap the question to hear it again.
4. Tap **🇬🇧 / 🇩🇪** (top right) to switch between English and German. The choice is remembered across all games.
5. **🏠** returns to the level screen, and **🗺️** returns to the island map.

The first tap on a page turns on the sound. Browsers only allow audio after a tap, so the first screen always asks for one.

### Levelling up

Each game shows **five empty stars ☆☆☆☆☆** at the top.

- A **clean win** fills one star. Clean means the first answer was right, with no 💡 hint, no splash, and on Island Hopper level 1 no wasted hops.
- Mistakes **never** take a star away. They just don't add one.
- When all five are filled, a **🏆 LEVEL UP!** screen offers **▶** (next level) or **🔁** (stay and keep playing).
- Finished levels get a **🏆** on their tile. After the last level of a game the child is crowned **CHAMPION!**
- Every win also adds to the ⭐ total shown on the level tiles and on the island map.

All levels are always open, so you can start a child anywhere.

### Suggested path

1. **🐢 Turtle Beach level 1** is the closest to paper worksheets (cross out one picture, count what's left).
2. **🌋 Volcano Tower level 1** only adds two numbers.
3. **🐸 Island Hopper levels 1–2** introduce the number line and planning jumps.
4. Then follow the 🏆 path upward in each game.

Island Hopper's **❄️ level 5 (below zero)** is a stretch for most 5–6 year olds. Let them reach it through the level-up path rather than starting there.

---

## The games in detail

### 🐸 Island Hopper

A frog (or kangaroo, bunny, monkey, cat or unicorn: tap the animal to switch) stands on a line of numbered islands.
One island glows gold, and the banner asks *"Can you land on Island 7?"*. The child presses the jump buttons to get there.

| Level | Jump buttons | Number line |
|---|---|---|
| 🌱 1 | +1 / −1 (**BOOST** / **BLAST**) | 0–10, fixed |
| 🌊 2 | ±1, ±2 | 11 islands, slides between 0 and 16 |
| 🌋 3 | ±1, ±2, ±3 | 11 islands, slides between 0 and 20 |
| 🚀 4 | ±1, ±2, ±5 | 21 islands, slides between 0 and 30 |
| ❄️ 5 | ±1, ±2, ±3 | 11 islands, slides between −10 and 10 (below zero) |

**How it works:**

- **Jump arcs.** Every hop leaves a labelled rainbow (**+3**, **−2**), so after a round the child can see the whole route, e.g. 0 → +5 → +5 → 10.
- **⚡ Jump budget (level 2 and up).** Each round comes with a limited number of jumps, so pressing +1 seven times won't work and the child has to plan (e.g. +3 +3 +1).
  - The budget adapts: it starts with 2 spare jumps, drops to 1 spare after 2 wins in a row, and to exactly the fewest possible after 4.
  - Running out means a **splash** 🌊. The animal returns to the island it started the round on, and the budget loosens again.
- **Sliding number line (level 2 and up).** Between rounds the view slides along the number line, like a camera panning.
  - The animal keeps its number, but every island (including 0) moves to a new spot, so the child has to read the numbers again before jumping.
  - The buttons grey out while the line slides.
- **Special islands.** **0** always has its own purple island, multiples of 10 are teal, and negative numbers are red.
- **Edges.** Jumping past the first or last island makes the animal lean out, wobble and spring back (*"Oops!"*). This costs no ⚡.
- **Double star.** Landing in the fewest possible jumps earns a double star (**PERFECT!**).
- **Keyboard.** ← / → jump −1 / +1. A number key jumps forward by that amount when the level has that jump (`1`, `2`, `3` or `5`), and **Shift** + number jumps back.

### 🌋 Volcano Tower

A number wall (*Zahlenmauer*) built as a volcano. **Every stone is the two stones below it added together.**
The roof from the classic worksheet is the glowing crater. Fill every stone and the volcano rumbles and erupts.

| Level | Wall | Numbers | What's given |
|---|---|---|---|
| 🪨 1 | 3 rows (6 stones) | up to 10 | Bottom row only, so the child only adds |
| 🌋 2 | 3 rows (6 stones) | up to 10 | A mix of stones, so the child also takes away (e.g. top 6 and 3 known means the other is 3) |
| 🔥 3 | 4 rows (10 stones) | up to 20 | A mix of stones |

**How it works:**

- Tap an empty stone, then tap a number bubble. The next stone that can be worked out is picked automatically, bottom-up like on paper.
- **The crater shows the sum for the stone being filled.** A worksheet's fixed "+" roof makes children think they always add, but walls with stones missing at the bottom need taking away. So the crater shows:
  - **green +** when the stone comes from the two stones below it (e.g. 5 + 2);
  - **red −** when it comes from the stone above, so you take away the other stone below (e.g. 10 − 7);
  - **grey ?** when the stone can't be worked out yet, with the banner suggesting another stone.

  The sign flips with an animation, and the voice says *"Now take away!"* / *"Now add!"* whenever it switches. Level 1 always shows +.
- **Every puzzle is fair.** It can always be solved one stone at a time, each from two known neighbours, so the child never has to guess.
- **Help.** **💡**, or two wrong tries on the same stone, lights up the two helper stones, shows dots on them, and reads the sum aloud (*"6 minus 3"*).
- **Rewards.** A wall with no mistakes and no hint earns a double star (**PERFECT!**).

### 🐢 Turtle Beach

Picture sums, just like crossing out drawings on a worksheet, with animals on a sandy island.

| Level | Sums | Numbers |
|---|---|---|
| 🐣 1 | One more / one less (e.g. 4 − 1, 3 + 1) | up to 5 |
| 🐢 2 | Add or take away 1–3 | up to 10 |
| 🦀 3 | Missing number: 5 + ? = 8, 6 − ? = 4 | up to 10 |

**How it works:**

- **Taking away:** *"One swims away. Tap one!"* The tapped animal gets crossed out, like on paper. Then the child counts what's left and picks the answer.
- **Adding:** a boat brings more friends. Tapping the boat makes them hop onto the beach, then the child counts them all.
- **Missing numbers (level 3):**
  - For **+ ?** the boat's load is hidden under a striped cover and the child picks how many are inside. After two wrong tries, dashed spots on the sand show the gap.
  - For **− ?** the child taps animals away until the right number is left. Tapping a crossed-out animal brings it back.
- **Counting help.** Two wrong answers make the animals count themselves out loud with number badges: *1, 2, 3…*
- Animals rotate each round: 🐢 🦀 🐧 🐸 🦭 🐙 🦆 🐠.

---

## Design principles

These choices were deliberate. Please keep them when changing things:

- **No academic language.** No "Addition", "Subtraction" or "Solve". Numbers and **+ −** signs appear, but no maths words.
- **Voice first.** Every instruction is spoken, and tapping the question repeats it.
- **Mistakes are cheap.** Wrong answers wobble and buzz, but nothing is lost. Help appears after the second try, not the first.
- **Short rewards.** Confetti lasts about 1.5 s and a new burst replaces the old one, so fast players never get a screen full of confetti. The next round starts about 2 s after a win (2.5 s on the volcano, to let it erupt).
- **Big touch targets.** Buttons and number bubbles are sized for small fingers. In Island Hopper and Turtle Beach they grey out while a tap would be ignored (during a slide or a celebration).
- **Parents' corner stays out of play.** The "Buy me a coffee" button lives only on the island map, never inside a game.

---

## Privacy and saved data

- **No accounts, cookies, analytics or ads.** Nothing is sent anywhere.
- **Network requests:** only the [Fredoka](https://fonts.google.com/specimen/Fredoka) font from Google Fonts. Offline, the games fall back to a system font and still work.
- **Saved data:** progress lives only in the browser's `localStorage` on that device. A tablet and a phone each keep their own stars.

| Key | What it stores |
|---|---|
| `ih-lang` | Language (`en` / `de`), shared by all games |
| `ih-pal` | Chosen Island Hopper animal |
| `ih-level`, `mathe-volcano-level`, `mathe-beach-level` | Last level played in each game |
| `ih-stars`, `mathe-volcano-stars`, `mathe-beach-stars` | Stars per level (JSON array) |
| `ih-progress`, `mathe-volcano-progress`, `mathe-beach-progress` | Level-up progress: clean wins `c` and finished levels `d` per level (JSON) |

**To reset all progress:** clear the site's data in the browser settings, or run this in the browser console on the site:

```js
Object.keys(localStorage).filter(k => /^(ih|mathe)-/.test(k)).forEach(k => localStorage.removeItem(k));
```

---

## For developers

### Project structure

```
mathe/
├── index.html           # Island map: links to the games, star totals, language, Buy Me a Coffee
├── island-hopper.html   # 🐸 Island Hopper
├── volcano.html         # 🌋 Volcano Tower
├── beach.html           # 🐢 Turtle Beach
├── kit.js               # Shared helpers: storage, language, sound, voice, confetti, pad, levels
├── kit.css              # Shared look: sky & sea, pills, number bubbles, level tiles, celebrations
├── README.md
├── LICENSE              # MIT
└── .github/workflows/
    └── pages.yml        # Deploys the site to GitHub Pages on every push to main
```

It's plain HTML, CSS and JavaScript: **no framework, no build step, no dependencies.**
Each game is one HTML file with its own `<style>` and `<script>`, plus the two shared kit files.

### Running locally

Clone the repo, then open `index.html` directly (double-click works):

```bash
git clone https://github.com/koroksengupta/mathe.git
cd mathe
open index.html        # macOS; on Windows: start index.html; on Linux: xdg-open index.html
```

To test on a phone on the same Wi-Fi, serve the folder and open the printed address on the phone:

```bash
python3 -m http.server 8000
# then visit http://<your-computer's-IP>:8000
```

Keep the files together in one folder, because the games load `kit.js` and `kit.css` by relative path.

### Deployment

The site is hosted on **GitHub Pages**. The `pages.yml` workflow uploads the whole repository and deploys it on every push to `main`, usually live within about a minute.
Pages must be set to **Settings → Pages → Source: GitHub Actions**. It already is for this repo.

### The shared kit (`kit.js` / `kit.css`)

`kit.js` exposes one global object, `Kit`:

| Area | API | Notes |
|---|---|---|
| Storage | `Kit.store.get(key, default)`, `.set(key, value)`, `.json(key, default)` | Safe in private windows (never throws) |
| Language | `Kit.lang`, `Kit.bindLangButton(button, onChange)` | `'en'` or `'de'`, saved in `ih-lang`. One button per page, which can be moved between screens |
| Sound | `Kit.audio()`, `Kit.sfx.tap / boing(k) / whoosh / splash / bonk / clack / rumble / ding / win / perfect` | Web Audio synthesis, no sound files. Call `Kit.audio()` inside a tap handler to unlock audio |
| Voice | `Kit.speak(text)`, `Kit.hush()` | Speech synthesis in the current language; picks a matching device voice when available |
| Helpers | `Kit.restart(el, cls)`, `Kit.pick(array)`, `Kit.rand(lo, hi)` | `restart` re-triggers a CSS animation class |
| Stars | `Kit.stars(key, levels)`, `Kit.addStars(key, levels, level, n)` | Per-level star counts |
| Celebration | `Kit.celebrate({ text, say, perfect, keepConfetti })`, `Kit.confetti.burst({ count, origins, colors, round, emoji, replace })` | Flash, big text, fanfare, confetti. A burst replaces the previous one unless `replace: false` |
| Number pad | `pad = Kit.numberPad(el, max, onPick)` then `pad.enable(bool)`, `pad.markWrong(n)`, `pad.clearMarks()` | Colourful bubbles 0…max |
| Level screen | `Kit.levelTiles(el, levels, stars, current, onStart, done)` | `levels` = `[{ icon, chips: [{ t, cls }] }]`; `cls` can be `minus` or `range` |
| Level-up | `Kit.GOAL` (= 5), `Kit.progress(key, levels)`, `Kit.addClean(key, levels, level)`, `Kit.renderProgress(el, key, levels, level)`, `Kit.levelUp({ nextIcon, last, onNext, onStay })` | `addClean` returns `true` exactly when a win finishes the level |

`kit.css` provides the colour tokens (`--sky-top`, `--sea`, `--gold`, `--go`, `--stop`, …), and the classes `.game`, `.topbar`, `.pill`, `.banner`, `.pad`, `.screen`, `.levels` / `.level`, `.progress`, plus the celebration and level-up overlays.

### Adding a new game

1. **Copy the skeleton.** Copy `volcano.html` or `beach.html`, since both are built fully on the kit.
2. **Set up the page.** Keep the `<link rel="stylesheet" href="kit.css">` and `<script src="kit.js"></script>` lines, the start screen (`.screen`) with its `langSpotStart` slot, and the top bar with 🏠, ⭐, the `.progress` pill and the `langSpotGame` slot.
3. **Define `LEVELS`** as `{ icon, chips, … }` entries, and pick unique storage keys: `mathe-<game>-stars`, `mathe-<game>-progress` and `mathe-<game>-level`.
4. **On every win:**
   - call `Kit.addStars(...)`;
   - decide whether the win was clean and call `Kit.addClean(...)`;
   - call `Kit.renderProgress(...)`;
   - call `Kit.celebrate(...)`;
   - then either start the next round or, if `addClean` returned `true`, call `Kit.levelUp(...)`.
5. **Guard timers.** Guard every delayed callback with a `session` counter (see the existing games), so pressing 🏠 mid-celebration can't start a stray round.
6. **Add both languages** (`en` and `de`) for every text that is shown or spoken.
7. **Link it from the map.** Add a card for the game on `index.html` and include its stars key in the map's star totals.

### Testing checklist

There's no automated test suite in the repo. Before pushing to `main`, check each changed game in a desktop browser **and** on a phone (both sideways and upright):

- [ ] Every level starts, a round can be won, and the next round follows.
- [ ] Wrong answers show the right help (hint, count-along, dashed spots).
- [ ] Five clean wins open the 🏆 level-up screen, and ▶ / 🔁 both work.
- [ ] 🇬🇧/🇩🇪 switches the text and voice, and there is only one language button on screen.
- [ ] Nothing overflows sideways (no horizontal scrolling) and the top bar fits on a narrow phone.
- [ ] The browser console shows no errors.

---

## Browser support

Any current browser: Safari (iOS/iPadOS/macOS), Chrome, Edge or Firefox, on tablet, phone or desktop.

- **Voice:** depends on the voices installed on the device. Safari usually has good English and German voices; some Android devices only have English. The games still work without a voice.
- **No sound on iPhone/iPad?** Check that the silent switch is off and the volume is up.

---

## Support the project

If these games helped your child with numbers, you can [buy me a coffee ☕](https://buymeacoffee.com/tellkoroke). It's totally optional and always appreciated!
The same link, with a QR code, is on the island map.

---

## License

[MIT](LICENSE) © 2026 koroksengupta. You're welcome to use, adapt and share these games, for example in a classroom,
as long as the copyright notice stays with them.
