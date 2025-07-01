function OpenCards() {
    var AllElem = document.querySelectorAll('.elem');
    var fullElemPage = document.querySelectorAll('.fullElem');
    var AllFullElemBackBtn = document.querySelectorAll('.fullElem .back');

    AllElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })
    AllFullElemBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}
OpenCards();


function todoList() {
    let currentTask = [];

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse((localStorage.getItem('currentTask')))
    } else {
        // localStorage.setItem('currentTask', currentTask)
        console.log("empty");

    }

    function RenderTask() {
        let allTask = document.querySelector('.allTask');
        let sum = ''

        currentTask.forEach((elem, idx) => {
            sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>Imp</span></h5>
                        <button id=${idx}>Mark As Completed </button>
                    </div>`
        })
        allTask.innerHTML = sum;

        localStorage.setItem('currentTask', JSON.stringify(currentTask));
        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                RenderTask()
            })
        })

    }

    RenderTask();


    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector(' .addTask form #input-task');
    let taskDetailsInput = document.querySelector(' .addTask form textarea');
    let taskCheckBox = document.querySelector(' .addTask form #check');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(taskInput.value);
        // console.log(taskDetailsInput.value);
        // console.log(taskCheckBox.value); 

        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckBox.checked
        })
        RenderTask();
        taskCheckBox.checked = false
        taskInput.value = ''
        taskDetailsInput = ''

    })

}

todoList();

//Daily Planner
function dailyPlanner() {
    let dayPlanner = document.querySelector(".day-planner");
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}


    let hrs = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00-${7 + idx}:00`);



    console.log(hrs);

    var wholeDaySum = ''


    hrs.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''
        wholeDaySum = wholeDaySum + ` 
    <div class="day-planner-time">
        <p>${elem}</p>
        <input id=${idx} type="text" placeholder="..." value=${savedData}>
     </div>`;
    })

    dayPlanner.innerHTML = wholeDaySum;

    let dayplannerInput = document.querySelectorAll('.day-planner input');

    dayplannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner();

//Motivation

function MotivationalQuote() {
    let motivationContent = document.querySelector('.motivation-2 h1');
    let motivationAuthor = document.querySelector('.motivation-3 h2');

    async function fetchQuote() {
        let response = await fetch('http://api.quotable.io/random');
        let data = await response.json()

        motivationContent.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }
    fetchQuote();

    let refBtn = document.querySelector('.quote-btn');
    refBtn.addEventListener('click', function () {
        location.reload();

    })
}

MotivationalQuote();

//Pomodoro
let timer = document.querySelector('.pomo-timer h1');
let startBtn = document.querySelector('.pomo-timer .Start-timer');
let pauseBtn = document.querySelector('.pomo-timer .Pause-timer');
let reseteBtn = document.querySelector('.pomo-timer .Reset-timer');
let isWorkSession=true;

let totalSeconds = 25 * 60;
let timerInterval = null

function updateTimer() {
    let mintues = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(mintues).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`

}

function startTimer() {
    clearInterval(timerInterval)
    if(isWorkSession){
        totalSeconds=25*60
         timerInterval=setInterval(function(){
        if(totalSeconds>0){
            totalSeconds--  
            updateTimer()
        }else{
            isWorkSession=false
            clearInterval(timerInterval)
            timer.innerHTML='05:00'
        }
        
    },10)
        
    }else{
        totalSeconds=5*60
         timerInterval=setInterval(function(){
        if(totalSeconds>0){
            totalSeconds--
            updateTimer()
            
        }else{
            isWorkSession=true
            clearInterval(timerInterval)
            timer.innerHTML='25:00'
        }
        
    },10)    
        
    }
    



}
function pauseTimer() {
    clearInterval(timerInterval)
}

function resetTimer() {
    totalSeconds = 25 * 60
    clearInterval(timerInterval)
    updateTimer()

}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
reseteBtn.addEventListener('click', resetTimer);

