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



var currentTask = [];

if (localStorage.getItem('currentTask')) {
    currentTask = JSON.parse((localStorage.getItem('currentTask')))
} else {
    // localStorage.setItem('currentTask', currentTask)
    console.log("empty");

}



function RenderTask() {
    let allTask = document.querySelector('.allTask');
    let sum = ''

    currentTask.forEach( (elem)=> {
        sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>Imp</span></h5>
                        <button>Mark As Completed </button>
                    </div>`
    })

    allTask.innerHTML = sum;

}

RenderTask();


let form = document.querySelector('.addTask form');
let taskInput = document.querySelector(' .addTask form #input-task');
let taskDetailsInput = document.querySelector(' .addTask form textarea');
let taskCheckBox = document.querySelector(' .addTask form #check');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    // console.log(taskInput.value);
    // console.log(taskDetailsInput.value);
    // console.log(taskCheckBox.value); 

    currentTask.push({
        task: taskInput.value,
        details: taskDetailsInput.value,
        imp: taskCheckBox.checked
    })
    localStorage.setItem('currentTask', JSON.stringify(currentTask))
    taskInput.value = ''
    taskDetailsInput.value = ''
    taskCheckBox.checked = ''

    RenderTask();

})

localStorage.clear()