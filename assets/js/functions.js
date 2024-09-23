const defaultFighter = {
   name: '',
   life: 1,
   maxLife: 1,
   attack: 0,
   defense: 0
}

const createFighter1 = () => {
   return {
      ...defaultFighter,
      name: 'BONIEKY',
      life: 200,
      maxLife: 200,
      attack: 15,
      defense: 8
   }
}
const createFighter2 = (name) => {
   return {
      ...defaultFighter,
      name: 'BLANKA',
      life: 200,
      maxLife: 200,
      attack: 17,
      defense: 6
   }
}

const stage = {
   fighter1: null,
   fighter2: null,
   fighter1El: null,
   fighter2El: null,

   start(fighter1, fighter2, fighter1El, fighter2El, resetEl){
      this.fighter1 = fighter1
      this.fighter2 = fighter2
      this.fighter1El = fighter1El
      this.fighter2El = fighter2El
      this.fighter1ScoreEl = document.querySelector('#winsFighter1')
      this.fighter2ScoreEl = document.querySelector('#winsFighter2')
      this.resetEl = resetEl
      resetEl.addEventListener('click', () => this.resetFighters())

      this.fighter1El.querySelector('.attackBtn').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))
      this.fighter2El.querySelector('.attackBtn').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
      document.addEventListener('keydown', (evt) => {
         if(evt.key == '1'){
            this.doAttack(fighter1, fighter2)
         }
         if(evt.key == '2'){
            this.doAttack(fighter2, fighter1)
         }
         if(evt.key == 'r'){
            resetFighters()
         }
      })
      this.update()
      this.checkScore = true
   },
   update(){
      this.fighter1El.querySelector('#nameFighter1').innerHTML = `${this.fighter1.name}`
      this.fighter1El.querySelector('#hpFighter1').innerHTML = `${this.fighter1.life.toFixed(1)} <span>HP</span>`
      this.fighter1El.querySelector('#attackPowerFighter1').innerHTML = `${this.fighter1.attack}`
      this.fighter1El.querySelector('#defensePowerFighter1').innerHTML = `${this.fighter1.defense}`
      let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100
      this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`

      this.fighter2El.querySelector('#nameFighter2').innerHTML = `${this.fighter2.name}`
      this.fighter2El.querySelector('#hpFighter2').innerHTML = `${this.fighter2.life.toFixed(1)} <span>HP</span>`
      this.fighter2El.querySelector('#attackPowerFighter2').innerHTML = `${this.fighter2.attack}`
      this.fighter2El.querySelector('#defensePowerFighter2').innerHTML = `${this.fighter2.defense}`
      let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100
      this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`

      if(this.fighter1.life <= 200){
         this.resetEl.style.left = '195%'
      }
      if(this.fighter1.life < 100){
         this.resetEl.style.left = '190%'
      }
      if(this.fighter1.life < 10){
         this.resetEl.style.left = '185%'
      }

   },
   doAttack(attacking, attacked){
      if(attacked.life <= 0){
         log.addMessage(`${attacked.name} já está morto`)
         return;
      }
      if(attacking.life <= 0){
         log.addMessage(`${attacking.name} não consegue atacar sem vida`)
         return;
      }
      const attackFactor = (Math.random()*2).toFixed(1)
      const defenseFactor = (Math.random()*2).toFixed(1)
      const actualAttack = attacking.attack * attackFactor
      const actualDefense = attacked.defense * defenseFactor
      if(actualAttack > actualDefense){
         attacked.life -= actualAttack
         attacked.life = attacked.life < 0 ? 0 : attacked.life
         log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(1)} de <span>dano</span> em ${attacked.name}`)
      } else {
         log.addMessage(`${attacked.name} conseguiu <p>defender</p>`)
         const audioToasty = document.querySelector('#audioToasty')
         audioToasty.currentTime = 0
         audioToasty.play()
         if(attacked == this.fighter1){
            this.fighter1El.querySelector('#imgFighter1').setAttribute('src', 'assets/images/imgToasty.png')
            setTimeout(() => {
               this.fighter1El.querySelector('#imgFighter1').setAttribute('src', 'assets/images/imgBonieky.gif')
            }, 700)
         }
         if(attacked == this.fighter2){
            this.fighter2El.querySelector('#imgFighter2').setAttribute('src', 'assets/images/imgToasty.png')
            setTimeout(() => {
               this.fighter2El.querySelector('#imgFighter2').setAttribute('src', 'assets/images/imgBlanka.gif')
            }, 700)
         }
      }
      if(attacking == this.fighter1){
         this.fighter1El.querySelector('#imgFighter1').setAttribute('src', 'assets/images/boniekyAttack.gif')
         setTimeout(() => {
            this.fighter1El.querySelector('#imgFighter1').setAttribute('src', 'assets/images/imgbonieky.gif')
         }, 700);
         this.moveFighter1img()
         const audioFighter1 = document.querySelector('#audioFighter1')
         audioFighter1.currentTime = 0
         audioFighter1.play()
      }
      if(attacking == this.fighter2){
         this.fighter2El.querySelector('#imgFighter2').setAttribute('src', 'assets/images/blankaAttack.gif')
         setTimeout(() => {
            this.fighter2El.querySelector('#imgFighter2').setAttribute('src', 'assets/images/imgBlanka.gif')
         }, 700);
         this.fighter2El.querySelector('#imgFighter2').style.transform = 'scaleX(1)'
         setTimeout(() => {
            this.fighter2El.querySelector('#imgFighter2').style.transform = 'scaleX(-1)'
         }, 700)
         this.moveFighter2img()
         const audioFighter2 = document.querySelector('#audioFighter2')
         audioFighter2.currentTime = 0
         audioFighter2.play()
      }
      this.update()
      this.updateScore()
   },
   moveFighter1img(){
      if(this.fighter1.life > 0){
         this.fighter1El.querySelector('#imgFighter1').style.marginLeft = '200px'
         setTimeout(() => {
            this.fighter1El.querySelector('#imgFighter1').style.marginLeft = '0px'
         }, 700)
      }
   },
   moveFighter2img(){
      if(this.fighter2.life > 0){
         this.fighter2El.querySelector('#imgFighter2').style.marginRight = '200px'
         setTimeout(() => {
            this.fighter2El.querySelector('#imgFighter2').style.marginRight = '0px'
         }, 700)
      }
   },
   updateScore(){
      if(this.fighter1.life <= 0 && this.checkScore == true){
         let currentScore2 = parseInt(this.fighter2ScoreEl.innerHTML)
         this.fighter2ScoreEl.innerHTML = currentScore2 + 1
         log.addMessage(`<h1>----- PONTO PARA ${this.fighter2.name}!!! -----</h1>`)
         this.checkScore = false
         const audioKO = document.querySelector('#audioKO')
         audioKO.play()
         this.fighter2ScoreEl.style.textShadow = '0px 0px 10px #14d814'
         setTimeout(() => {
            this.fighter2ScoreEl.style.textShadow = 'none'
         }, 700)
      }
      if(this.fighter2.life <= 0 && this.checkScore == true){
         let currentScore1 = parseInt(this.fighter1ScoreEl.innerHTML)
         this.fighter1ScoreEl.innerHTML = currentScore1 + 1
         log.addMessage(`<h1>----- PONTO PARA ${this.fighter1.name}!!! -----</h1>`)
         this.checkScore = false
         const audioKO = document.querySelector('#audioKO')
         audioKO.play()
         this.fighter1ScoreEl.style.textShadow = '0px 0px 10px #14d814'
         setTimeout(() => {
            this.fighter1ScoreEl.style.textShadow = 'none'
         }, 700);
      }
   },
   resetFighters(){
      if(this.fighter1.life == 0 || this.fighter2.life == 0){
         this.fighter1.life = this.fighter1.maxLife
         this.fighter2.life = this.fighter2.maxLife
         this.checkScore = true
         this.update()
         let audioFight = document.querySelector('#audioFight')
         audioFight.play()
         this.fighter2El.querySelector('#imgFighter2').style.filter = 'drop-shadow(0px 0px 15px #14d814'
         setTimeout(() => {
            this.fighter2El.querySelector('#imgFighter2').style.filter = 'none'
         }, 700);
         this.fighter1El.querySelector('#imgFighter1').style.filter = 'drop-shadow(0px 0px 15px #14d814'
         setTimeout(() => {
            this.fighter1El.querySelector("#imgFighter1").style.filter = 'none'
         }, 700);
      }
   }
}

const log = {
   list: [],
   addMessage(msg){
      this.list.unshift(msg)
      this.render()
   },
   render(){
      const logEl = document.querySelector('.log')
      logEl.innerHTML = ''
      for (let i in this.list){
         logEl.innerHTML += `<li>${this.list[i]}</li>`
      }
   }
}