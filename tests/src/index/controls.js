mocha.setup('bdd');

let controls = Object.create(null);
let start = document.getElementById('start');
start.addEventListener('click', () => {
  start.remove();
  controls.iframe = document.getElementById('iframe').contentWindow;
  controls.child = window.open('child.html');

  mocha.run();
});

export default controls;
