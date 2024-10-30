const addBtn = document.querySelector('#add-btn');
const NewInputTask = document.querySelector('#task-input');
const taskContainer = document.querySelector('#tasks');
const countValue = document.querySelector('.count-value');
const error = document.querySelector('#error');


let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = (event) => {
    event.preventDefault();

    const taskName = NewInputTask.value.trim();
    if(!taskName){
        error.style.display = 'block';
        error.innerText = 'Input must not be empty!!!';
        setTimeout(() => {
            error.style.display = 'none';
        }, 800);
        return;
    }
    else{
        const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <img class="editimg" src="imgs/edit.png">
        </button>
        <button class="delete">
        <img class="deleteimg" src="imgs/delete.png">
        </button>
        </div>`

        taskContainer.insertAdjacentHTML('beforeend', task);
    }

    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach((editbtn) => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == 'edit')){
                targetElement = e.target.parentElement;
            }
            NewInputTask.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const taskCheck = document.querySelectorAll('.task-check');
    taskCheck.forEach((checkbox) => {
        checkbox.onchange = () => {
            checkbox.nextElementSibling.classList.toggle('completed');
            if(checkbox.checked) {
                taskCount -= 1;
            }else{
                taskCount += 1;
            }
            displayCount(taskCount);
        }
    })

  taskCount += 1;
  displayCount(taskCount);
  NewInputTask.value = '';

};

addBtn.addEventListener('click', addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    NewInputTask.value = '';
}