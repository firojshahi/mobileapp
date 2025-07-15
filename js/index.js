"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon-item');
  icons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add('show');
    }, index * 200);
  });
});
