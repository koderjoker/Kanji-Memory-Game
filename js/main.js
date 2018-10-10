/* Lists to hold kanji and their meanings at the same index */
n5kanji = ['一', '七', '万', '三', '上', '下', '中', '九', '二', '五', '人', '今',
           '休', '会', '何', '先', '入', '八', '六', '円', '出', '分', '前', '北',
           '十', '千', '午', '半', '南', '友', '口', '古', '右', '名', '四', '国',
           '土', '外', '多', /**/ '週', '道', '金', '長', '間', '雨', '電', '食',
           '飲', '駅', '高', '魚'];

n5meaning = ['one', 'seven', '10000', '3', 'up', 'down', 'inside', 'nine', 'two',
             'five', 'person', 'now', 'rest', 'meet', 'what', 'before', 'enter',
             'eight', 'six', 'yen', 'exit', 'part', 'infront', 'north', '10', '1000',
             'noon', 'half', 'south', 'friend', 'mouth', 'old', 'right', 'name',
             '4', 'country', 'soil', 'outside', 'many', /**/ 'week', 'road', 'gold',
             'long', 'space', 'rain', 'electricity', 'eat', 'drink', 'station',
             'tall', 'fish'];


/* Generate list of cards from kanjis and their meanings */
function generateArray(array1, array2) {
  indexArray = [];
  while (indexArray.length != 8) {
    index = Math.floor(Math.random() * array1.length);
    if (!indexArray.includes(index)) {
      indexArray.push(index);
    }
  }
  newArray = [];
  for (i=0; i<8; i++) {
    newArray.push(array1[indexArray[i]]);
    newArray.push(array2[indexArray[i]]);
  }
  return newArray;
}


/* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Generate an array of random kanji and their meanings
array = generateArray(n5kanji, n5meaning);
// Shuffle the array
array = shuffle(array);


/* Loop through the cards and set kanji and meanings */
let allCards = document.querySelectorAll('.card');
for (i=0; i<16; i++)
{
  allCards[i].innerText = array[i];
}


/* Card game eventlisteners */
let openCards = [];
let matchCards = 0;
let movesShown = document.querySelector('.moves');
let movesCount = 0;
let frogs = 3;

// Go through all the cards
allCards.forEach(function(card) {
  // If a card is clicked
  card.addEventListener('click', function(e) {
    // Card can't flip if two are already flipped over
    if (openCards.length != 2) {
      // Check shown cards < 2
      if (openCards.length < 2) {
        //Check for double click
        if (openCards.length == 0 || openCards[0].innerText != card.innerText) {
          // Show cards
          card.classList.add('open','show');
          openCards.push(card);
        }
      }
      // If shown cards >= 2
      if (openCards.length == 2) {
        // Find location of card1 if in kanji list
        if (n5kanji.indexOf(openCards[0].innerText) != -1)
        {
          card1 = n5kanji.indexOf(openCards[0].innerText);
        }
        // Find location of card1 if in meaning list
        else {
          card1 = n5meaning.indexOf(openCards[0].innerText);
        }
        // Find location of card2 if in kanji list
        if (n5kanji.indexOf(openCards[1].innerText) != -1)
        {
          card2 = n5kanji.indexOf(openCards[1].innerText);
        }
        // Find location of card1 if in meaning list
        else {
          card2 = n5meaning.indexOf(openCards[1].innerText);
        }

        // If the kanji is matched with its meaning, keep them open
        if (card1 == card2)
        {
          openCards[0].classList.remove('open','show');
          openCards[1].classList.remove('open','show');
          openCards[0].classList.add('match');
          openCards[1].classList.add('match');
          openCards = [];
          matchCards++;
        }

        // If not matched, hide again
        else {
          setTimeout(function(e) {
            openCards.forEach(function(card) {
              card.classList.remove('open','show');
            });
            openCards = [];
          }, 1200);
        }
        // Count number of moves
        movesCount++;
        // If moves is a multiple of 8
        if (movesCount % 8 == 0) {
          let frog = document.querySelector('.frogs li');
          // If a frog is available, remove it
          if (frog != null) {
            frog.remove();
            // Decrease Frogs
            frogs--;
          }
        }
        // Change number of moves
        movesShown.innerText = movesCount;
      }
    }
  });
});


/* Game reset event listener */
let reset = document.querySelector('.redo');

// If reset button is clicked
reset.addEventListener('click', function(e) {
  // Refreshes page
  window.location.reload();
});


/* Timer display */
let seconds = 0;
timer = document.querySelector('.timer')
int = setInterval(function() {
  // Update timer
  timer.innerHTML = seconds++;
  // If all cards are matched
  if (matchCards == 8) {
    clearInterval(int);
    // Call happy modal
    happy();
  }
  // If time is up
  if (seconds == 120) {
    clearInterval(int);
    // Call angry modal
    angry();
  }
}, 1000);


/* If player on time- happy modal */
function happy() {
  // Display modal
  document.querySelector('.modal-happy').style.display = "block";
  // Overlay the back screen
  document.querySelector('.modal-overlay').style.display = "block";
  // Moves taken
  document.querySelector('.mov').innerHTML = movesCount;
  // Time taken
  document.querySelector('.tim').innerHTML = seconds;
  // Frogs won
  document.querySelector('.frog').innerHTML = frogs;
}


/* If player late- angry modal */
function angry() {
  // Display modal
  document.querySelector('.modal-angry').style.display = "block";
  // Overlay the back screen
  document.querySelector('.modal-overlay').style.display = "block";
}


/* Reload page function */
let reload = document.querySelectorAll('.reload');
reload.forEach(function(reload) {
  // If link clicked
  reload.addEventListener('click', function(e) {
    window.location.reload();
  });
});
