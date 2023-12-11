import './App.css';
import './slot-machine.css';
import React, { useEffect } from 'react';
import { database } from './firebaseConfig';


(function () {
  const items = [
    '❄️',
    '🍒',
    '🎱',
    '💰',
    '💎',
    '7️⃣',
    '🃏',
    '💣',
    '🥇',
    '🥊',    
    '🍾',
    '🍎',
    '🧊',
    '🔥',
  ];
  const doors = document.querySelectorAll('.door');
  
  document.querySelector('#spinner').addEventListener('click', spin);
  document.querySelector('#reseter').addEventListener('click', init);

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      const pool = ['❓'];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);
    
    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
  

const statsRef = database.ref('stats');

function App () {
  useEffect(() => {
    statsRef.on('value', (snapshot) => {
      const totalWins = snapshot.val().totalWins;
      console.log('Total Wins:', totalWins);
    });
    
    // incrementing wins
    const incrementWins = async () => {
      const statsRef = database.ref('stats');
      await statsRef.transaction((currentData) => {
        if (currentData === null) {
          return { totalWins: 1 };
        } else {
          return { totalWins: (currentData.totalWins || 0) + 1 };
        }
      });
    };

    
    const handleWin = () => {
      // Check if all items in the slot machine are the same
      const doors = document.querySelectorAll('.door');
      const firstDoorItems = doors[0].querySelectorAll('.box');
      const firstItem = firstDoorItems[0].textContent;

      const isWin = Array.from(doors).every((door) => {
        const items = door.querySelectorAll('.box');
        return Array.from(items).every((item) => item.textContent === firstItem);
      });

      if (isWin) {
        // Additional logic for winning
        incrementWins(); // Increment the totalWins count in Firebase
      }
    };

    // Example: Trigger handleWin when the user spins (modify based on your game logic)
    document.querySelector('#spinner').addEventListener('click', () => {
      // Your existing spin logic...

      // Simulate the result for demonstration purposes (modify based on your actual logic)
      const result = ['💰', '💰', '💰']; // Assume all items are the same
      updateSlotMachine(result);

      // Check for a win
      handleWin();
    });
  }, []);

  // Your existing functions...
  const updateSlotMachine = async (result) => {
    // Your existing logic...
    const doors = document.querySelectorAll('.door');
    const firstDoorItems = doors[0].querySelectorAll('.box');
    const firstItem = firstDoorItems[0].textContent;
  
    console.log('Updating slot machine with result:', result);

    // Increment the totalPlays counter
    const playsRef = database.ref('stats/totalPlays');
    await playsRef.transaction((currentPlays) => {
      console.log('Incrementing totalPlays by 1');
      return (currentPlays || 0) + 1;
    });
  
    // Check if the result is a win
    const isWin = Array.from(doors).every((door) => {
      const items = door.querySelectorAll('.box');
      return Array.from(items).every((item) => item.textContent === firstItem);
    });
  
    // If it's a win, increment the totalWins counter
    if (isWin) {
      const winsRef = database.ref('stats/totalWins');
      await winsRef.transaction((currentWins) => {
        console.log('Incrementing totalWins by 1');
        return (currentWins || 0) + 1;
      });
    }
  };




  return (
    <div className='App'>
      <button id="spinner">Spin</button>
      <button id="reseter">Reset</button>
    </div>
  );
};

export default App;