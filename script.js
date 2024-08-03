'use strict';

let cite = document.querySelectorAll('.cite');
// cite[1].style.textAlign = 'right'; // аналог цикла

for (let i = 0; i <= cite.length; i++) {
  if (i == 1) {
    cite[i].style.textAlign = 'right';
    break;
  }
}
