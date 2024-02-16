<h2>The essence of this project is a summarized representation of the logic in the battle between monsters. The code is designed to be extensible. The OOP method 'Inheritance' is at the forefront</h2>

 <h2> Task: Create a game called "Monsters Combat"</h2>
  <br />
 <h3>Game description:</h3>
 <ul>
   <li>In the game, there are 2 monsters (Skeleton and Spider) and they fight each other</li>
   <li>Each of them has its own attacks. Some have more, and some have fewer. Each attack has a specific damage it deals</li>
   <li>The Skeleton has less health but stronger hits, whereas the Spider is the opposite</li>
   <li> The attack is chosen via a random number (0-monster.attacks.length)</li>
   <li>If a monster gets 2 or more consecutive attacks, its health decreases by 10, as it is considered tired</li>
 </ul>
 <br />
 <h3>How To Play:</h3>
 <ul>
   <li>By clicking the 'Attack' button, we control the game</li>
   <li>Upon clicking, we generate a number from 0 to 100. If the number is greater than 50, the attacker is the first monster in the game, if the number is less than 50, the attacker is the second monster</li>
   <li>The first one to lose all health is the loser.</li>
 </ul>
