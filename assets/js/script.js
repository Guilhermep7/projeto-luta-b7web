const fighter1 = createFighter1('BONIEKY')
const fighter2 = createFighter2('BLANKA')

stage.start(
   fighter1,
   fighter2,
   document.querySelector('#fighter1'),
   document.querySelector('#fighter2'),
   document.querySelector('.fighter1Info'),
   document.querySelector('.fighter2Info'),
   document.querySelector('#reset')
)

function checkOrientation() {
   if (window.matchMedia("(orientation: portrait)").matches) {
       alert("Por favor, inverta o celular para modo paisagem.");
   }
}
checkOrientation();
window.addEventListener("orientationchange", checkOrientation);