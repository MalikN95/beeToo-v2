var instance = M.Tabs.init(document.querySelectorAll('.tabs'))

const addTaskForm = document.querySelector('.add-task')
const addTaskFormOpenBtn = document.querySelector('.add-task-form')
const taskFormCloseBtn = document.querySelector('.form-close')

if(taskFormCloseBtn) {
    taskFormCloseBtn.onclick = () => {
        taskFormCloseBtn.parentNode.style.display = 'none'
    }
}

if(addTaskFormOpenBtn) {
    addTaskFormOpenBtn.onclick = (event) => {
        event.preventDefault()
        addTaskForm.style.display = 'block'
    }
}

const taskAddetNotion = document.querySelector('.task-added-notion')
const notionCloseBtn = document.querySelector('.notion-close')

if(notionCloseBtn) {
    notionCloseBtn.onclick = () => {
        notionCloseBtn.parentNode.style.display = 'none'
    }
}



const taskCompletedBtn = document.querySelectorAll('.task-completed-btn')

if(taskCompletedBtn.length) {
    taskCompletedBtn.forEach((e) => {
        e.onclick = () => {
            axios({
                method: 'post',
                url: '/task/completed',
                data: {
                    taskId: e.value,
                    taskStatus: e.checked
                }
            })
            .then(res => {
                const task = e.parentNode.parentNode.parentNode.parentNode
                if(!res.data) {
                    task.classList.remove('deep-orange')
                    task.classList.add('green')
                } else{
                    task.classList.remove('green')
                    task.classList.add('deep-orange')
                }
            })
        }
    })
}
const taskEditBtn = document.querySelectorAll('.task-edit-btn')
if(taskEditBtn.length) {
    taskEditBtn.forEach((e) => {
        e.onclick = () => {
            axios({
                method: 'post',
                url: '/task/find-for-update',
                data: {
                    taskId: e.dataset
                }
            })
            .then(res => {
                const editForm = document.querySelector('.add-task')
                const editFormAction = document.querySelector('.add-task form')
                const editFormName = document.querySelector('.add-task-name')
                const editFormEmail = document.querySelector('.add-task-email')
                const editFormId = document.querySelector('.add-task .task-id')
                const editFormText = document.querySelector('.add-task-text')
                const formLabel = document.querySelectorAll('.add-task label')
                const saveBtn = document.querySelector('.add-task button')
                if(res.data && editForm) {
                    editFormName.value = res.data.userName
                    editFormEmail.value = res.data.userEmail
                    editFormId.value = res.data._id
                    editFormText.textContent = res.data.text
                    saveBtn.textContent = 'Сохранить изменения'
                    formLabel.forEach(e => {
                        e.classList.add('active')
                    })
                    editFormAction.action = '/task/update'
                    editForm.classList.add('d-block')
                }
            })
        }
    })
}



//Pagination

const paginationLenth = document.querySelector('.pagination-lenght').value
if( paginationLenth> 1 ) {
    const paginationPage = document.querySelector('.pagination .pages')
    for (let i = 0; i < paginationLenth; i++) {
        const item = document.createElement('li')
        item.classList.add('waves-effect')
        item.innerHTML = `<a href="?skip=${i*3}">${i+1}</a>`
        paginationPage.appendChild(item)
    }
}