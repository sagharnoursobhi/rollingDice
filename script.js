    'use strict';
    //selecting elements
    const score0El = document.querySelector('#score--0');
    const score1El = document.getElementById('score--1');
    const diceEl = document.querySelector('.dice');
    const btn_new = document.querySelector('.btn--new')
    const btn_roll = document.querySelector('.btn--roll')
    const btn_hold = document.querySelector('.btn--hold')
    const current0El = document.getElementById('current--0')
    const current1El = document.getElementById('current--1')
    //how to switch or toggle between classes(add if not exist delete if exist)
    const player_0 = document.querySelector('.player--0');
    const player_1 = document.querySelector('.player--1');
    let currentScore , activePlayer ,scores ,  playing;

    const switchPlayer = ()=>{

        activePlayer = activePlayer === 0 ? 1 : 0;
         player_0.classList.toggle('player--active');
         player_0.classList.toggle('background');
         player_1.classList.toggle('player--active');
         player_1.classList.toggle('background');
    }

    const showModal = ()=>{
        activePlayer ++;
        document.querySelector('.modal').classList.remove('modal-hidden');
        document.querySelector('.modal').classList.add('modal-show');
        document.querySelector('.modal-winner').textContent = 'player' +'\n'+ activePlayer;
        activePlayer--;
    }

    const resettingTheGame = ()=>{
        currentScore = 0;
        activePlayer = 0;
        scores = [0 , 0];
        playing = true;//check whether game must continue or not
        score0El.textContent = 0;
        score1El.textContent = 0;
        current0El.textContent = 0;
        current1El.textContent = 0;
        diceEl.classList.add('hidden');
        document.querySelector('.modal').classList.remove('modal-show');
        document.querySelector('.modal').classList.add('modal-hidden');
        player_0.classList.remove('winner-player');
        player_1.classList.remove('winner-player');
        player_0.classList.add('player--active');
        player_1.classList.remove('player--active');
    }
        resettingTheGame();
        btn_roll.addEventListener('click' , ()=>{
            //1-Generating a new dice
            if(playing){
                diceEl.classList.remove('hidden')
                let dice = Math.trunc(Math.random()*6) + 1;
                //2- Disploy dice
                diceEl.src = `images/dice-${dice}.png`;
                //3-Ckeck for rolled 1 : 
                if( dice !=1 ){
                    currentScore += dice;
                    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                }else
                //if it's true, switch to next player
                {
                document.getElementById(`current--${activePlayer}`).textContent = 0;
                switchPlayer();
                }
            }
        })


    //activating the hold button: the current score will be saved to its relative array position then if the whole score
    // is 100 that player will win the game 
    
        btn_hold.addEventListener('click' , ()=>{
            if(playing){
                scores[activePlayer] += currentScore;
                document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
                if(scores[activePlayer]>= 100){
                    playing = false;
                    document.querySelector(`.player--${activePlayer}`).classList.add('winner-player');
                    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                    showModal();
                }
                else{
                    switchPlayer();
                }
            } 
        })

        btn_new.addEventListener('click' , resettingTheGame);
