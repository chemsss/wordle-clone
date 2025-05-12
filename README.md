# Mot du jour

To get familiar with the Angular framework, I built with **Angular 19** a French daily word game inspired by **Tusmo**, that I named **Mot du jour**.  
Guess the word of the day using color-coded clues and logic, with a sleek interface and helpful features.  

<br />
<br />

## 🎮 Features  

- 🟥 **Tusmo-style gameplay**
  - Same **color code** as Tusmo to guide your guesses.
  - The **first letter** is always revealed.
  - All **apostrophes** and **hyphens** in the word are shown from the start.

- 📚 **Word bank**
  - Pulled from [lexique.org](https://www.lexique.org), preprocessed and available in the `db/` folder.
  - Some words have been removed for quality and relevance.

- 📅 **Daily gameplay**
  - A new word is generated **each day**.
  - Word resets at **midnight**, based on the **user's local time**.
  - A **live countdown** in the header shows when the next word will appear.  
  
- ⌨️ **User interface**
  - Includes a **virtual keyboard**.
  - Keys for letters not in the word are **grayed out** as feedback.
  
- ❓ **Modals and help**
  - A **help modal** explains the rules.
  - A modal also appears when the user **wins** or **loses**.

- 💾 **Persistence**
  - User progress is **saved in local storage** after each guess.
  - Game state is restored when the user returns.

<br />
<br />

## 🔮 Planned Features

- 🌀 **Unlimited Mode**: Play as many games as you want without waiting for the next day.
- 🧪 **Sandbox Mode**: Change rules like word length, reveal rules, etc. (thanks to a rule-configurable codebase).
- 📈 **History View**: Track your past performance and stats.
- 📖 **Word Definitions**: Integrate a dictionary API to show the word's definition after the game.

<br />
<br />

## 🛠️ Tech Stack

- **Framework**: Angular 19 (Node.js v20.11.1)
- **Language**: TypeScript
- **Styling**: SCSS
- **Storage**: Browser local storage

<br />
<br />

## 🚀 Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/chemsss/tusmo-angular.git
   cd tusmo-angular
   ```

2. Install dependencies (ensure you have Node.js v20.11.1 and Angular 19 installed):

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   ng serve
   ```

- The app will be available at http://localhost:4200 in your browser.
  
<br />
<br />

## 📂 Folder Structure Highlights

- `src/` – Main Angular application.  
- `db/` – Word list database sourced from [Lexique](https://www.lexique.org). See the README in `db/` for the changes in the database.
  
  
<br />
<br />

## 📄 License
This project is open source under the MIT License.
  
  
<br />
<br />

## 🙌 Acknowledgments
- Inspired by Tusmo, Wordle and similar word games.
- Word list from [Lexique](https://www.lexique.org)