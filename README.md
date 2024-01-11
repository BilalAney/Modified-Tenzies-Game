# Modified-Tenzies-Game
Simple game. Created for practicing React

## How to play
- The player has to select a number to start with, then they have to 'track' that number
I mean like keep selecting it, until they turn all the board into that number.

- The numbers are within the range [1, 10] and randomly generated, unless the player select 7 or more pieces with the same number.

- if the player selects 7 or more numbers with the same number, the numbers still randomly generated but in a narrower range which is 3 numbers.
the range is: selected-1 <= selected <= selected+1, if the number was not an edge number (1 or 10).

- if the selected number was an edge number (1 or 10) then the range will be (1, 2 ,3) if the selected number was 1
and (8, 9, 10) if the selected number was 10.

- The player is limited with the number of selections and deselections.
  
- The player can select 30 times, and deselect 5 times only.
  
***
## How I built it
* I have used React which is a JavaScript library to build it. 
The components are as follows:
1. Timer component (Memoized component)
2. FinishBoard component
3. Dice component (which is the game pieces)
4. Finally, the app component

* I have used pure CSS to style the game.
  It is responsive so you can play it in any screen size.
  **BUT I didn't care much about the responsive design** since i built it to practice React library
* For module bundling I have used Vite module bundler

The code is full of comments that describe what's happening in each part of the program code.
  
*** *** ***

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
