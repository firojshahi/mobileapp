"use strict";

window.addEventListener('DOMContentLoaded', () => {
  const item = document.querySelectorAll('.item');
  item.forEach(function (element, index) {
    setTimeout(function () {
      element.classList.add('fade-in');
    }, 200 * index);
  });
}, false
);
