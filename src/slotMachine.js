import React, { useState } from "react";

const SlotMachine = ({ user }) => {
  const [spinned, setSpinned] = useState(null);
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
  const doors = Array.from({ length:3 }, (_, index) => index + 1);
  
  document.querySelector('#spinner').addEventListener('click', spin);
  document.querySelector('#reseter').addEventListener('click', init);


  const init = (firstInit = true, groups = 1, duration = 1) => {
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

  const spin = async () => {
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

  return (
    <div> 
      <h2>Welcome, {user.name}!</h2>
      <div className="slot-machine">
        {doors.map((door) => (
          <div key={door} className={`door door${door}`}>
            <div className="boxes">
              {/* Box content goes here */}
            </div>
          </div>
        ))}
      </div>
      <button id="spinner" onClick={spin} disabled={spinned}>
        Spin
      </button>
      <button id="reseter" onClick={() => init(true)}>
        Reset
      </button>
    </div>
  );
};

export default SlotMachine;

   