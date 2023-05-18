// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"


// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

let intervalId;
// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++
        
                    // change the background
                    document.body.classList.add('break-mode');
        
                    // delay the UI update
                    setTimeout(() => {
                        // change the painel
                        workTittle.classList.remove('active');
                        breakTittle.classList.add('active');
                    }, 1000); // 1 second delay
                } else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++
        
                    // change the background
                    document.body.classList.remove('break-mode');
        
                    // delay the UI update
                    setTimeout(() => {
                        // change the painel
                        breakTittle.classList.remove('active');
                        workTittle.classList.add('active');
                    }, 1000); // 1 second delay
                }
            }
        
            seconds = 59;
        }
    }

    // start countdown
    intervalId = setInterval(timerFunction, 1000); // 1000 = 1s
}

function reset() {
    clearInterval(intervalId);
  
    // Reset timer values
    workMinutes = workTime;
    seconds = "00";
  
    // Update the UI
    document.getElementById('minutes').innerHTML = workMinutes;
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
  
    //reset the panel
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');

    // reset the background
    document.body.classList.remove('break-mode');

    // reset the buttons
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

  }
  