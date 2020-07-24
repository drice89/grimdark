# Grimdark

![Screen Capture](https://media1.giphy.com/media/Q8ChyylVsKBQhWxws4/giphy.gif)

### The story so far...

The year is 42222 - Your ship exits warp space and you hear the blaring of sirens as you are thown from your feet by the jarring of your spacecraft. Suddenly strange creatures seem to pop into existence around you. You manage to get to your feet and grab your rifle. You let out a burst of fire and smash the controls of the closes bulkhead door. You are locked in a small room in the aft of your ship. You check your vessel's computer system:

    Error: 404 Not Found

You craft's central server doesn't seem to be responding. You will need to make your way to the central cabin to restart the engine and make a SOS call. You realize that the ship is in lockdown and the only way to get to the bridge is to use the keycards to manually unlock the doors... if only you could remember where you put them.

### additional information

Grimdark is a 2D top down retro style tile based rouge-like shooter. Your goal is to fight through the mesterious green creatures on the ship to get to the ship's bridge. Along the way, you will have to find the keycards to unlock the next level. The key cards randomly drop off the monsters (there is a 1% drop rate) so get shooting and make sure to watch where your bullets go. Don't stand in one place for too long or the monsters will get you! As you progress through the game you will find that the monsters get faster and more numerous.

This game was written with Vanilla Javascript, webpack, and HTML5 Canvas.

To play the game visit [drice89.github.io/grimdark/](drice89.github.io/grimdark/) or clone the repository

    npm install
    npm start

Open the index.html file in your preferred browser.

This game features collision detections that occur in O(1) (constant) time complexity.

An instance of the "Game" class is created when the game is started. That object carries the "monsters" propety which is an object containing all of the monster objects. The key value of each moster represents their current position as an index on the game map. The game class also contains an array of all bullets that are generated when the player presses the ***spacebar*** 

    class Game {
        ...
        this.bullets = []
        ...
        this.monsters = {}
        ...

On each frame, the game iterates through all of the bullets (which is obviously a linear operation but is constrained by fire rate) and checks to see if the bullet is moving into the same tile as a monster by looking up the new index in the monster's object:

      detectCollision(monsters){
        const monsterCurrentPosition = monsters[this.currentPosition()]

        if (monsterCurrentPosition) {
          monsterCurrentPosition.alive = false
          return true
        }
        return false
      }
    }

If a collision is detected, the monster's "alive" property is set to false and the monster is removed from the monster list after it's move is processed.

### Credits:
Music - Hootsforce by [Gloryhammer](https://gloryhammer.com/) <- Please support this band they are awesome

Tileset - [Tiny Galaxy](https://www.oryxdesignlab.com/tinygalaxy) - license from Oryx Design

Fonts - [Get Swifty](https://fontmeme.com/fonts/get-schwifty-font/)

Special thanks to [Technologies4me](https://www.youtube.com/channel/UCHpHBzk4fz3oeQ31hmCreGg) for their awesome tutorials.
