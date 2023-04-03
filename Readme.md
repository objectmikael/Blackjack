# BLACKJACK

<br>
<hr>

## Pseudocode

- On game load, display an empty gameboard with an active _Start Game_ button 
- On _Start Game_ clicked, shuffle the deck and deal four card
    - The first card is dealt to the _Player_ face-up 
    - The second card is dealt to the _Dealer_ face-down 
    - The third card is dealt to the _Player_ face-up
    - The fourth card is dealt to the _Dealer_ face-up 
- After the first four cards are dealth check for _Player_/_Dealer_ blackjack 
    - If the _Dealer_ has 21 and the _Player_ doesn't -> _Dealer_ wins
    - If the _Dealer_ doesn't have 21 and the _Player_ has 21 -> _Player_ wins
    - If the _Dealer_ and the _Player_ has 21 -> It's a tie or push 
    - If neither _Dealer_ or _Player_ has 21, the game continues 
- _Game Continues logic_
    - A _HIT_ and _STAND_ button is displayed on the screen 
        - If _HIT_ is clicked...
            - The _Player_ will recieve a new card face up 
            - The new sum of the cards will be calculated and displayed on the screen 
            - The _HIT_ button will remain active as long as the sum of the _Player's_ hand is less than or equal to 21
            - If the _Player_ hits and the new sum is greater than 21, the _Player_ will bust -> _Dealer_ Wins
            - A new round begins
        - If _STAND_ is clicked...
            - The _Player's_ score will be finalized 
            - Both buttons will be disabled 
            - The _Dealer_ will reveal the face-down card and the sum of the cards will be calculated and displayed on the screen
            - The _Dealer_ must accept a new card while the sum is less than 17 
            - If the _Dealer's_ sum is greater than 21, the _Dealer_ bust -> _Player_ wins
            - If the _Dealer's_ sum is between 17 and 21, both the _Player's_ sum and the _Dealer_ sum must be compared 
    - A _compareSum_ function will now determine the winner 
        - If the _Dealer's_ sum is greater than the _Player's_ sum -> _Dealer_ wins
        - If the _Dealer's_ sum is less than the _Player's_ sum -> _Player_ wins
        - If the _Dealer's_ sum equals the _Player's_ sum -> _Dealer_ wins -> It's a tie or push
        - Once the sums are compared and a winner is confirmed, a new round begins 
- _Endgame logic_
    - A new round will be dealt until there are 20 cards left in the shoot
    - A message will display, indicating that the game is over and give the _Player_ the option to start a new game 
    - The original _Start Game_ button will be repurposed and changed to _Play Again_  

<br>
<hr>

## Wireframe <br>
<kbd><img src="Resources/Gameplay Window.png" width="300"></kbd>