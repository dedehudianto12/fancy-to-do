

function dataMyTodo() {
    $.ajax({
        method: 'get',
        url: `${BASE_URL}todos`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((datas) => {
            $('#todo').empty()
            $('#doing').empty()
            $('#done').empty()
            datas.forEach(element => {
                if (!element.ProjectId) {
                    if (element.status === 'todo') {
                        $('#todo').append(
                            `<div class="d-flex flex-column mb-3" style="border: solid 5px red; border-radius: 10px;">
                            <div class="pl-4 pt-2 pb-2">
                                <h1>${element.title}</h1>
                                <h3>${element.description}</h3>
                                <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                            </div>
                            <div class="d-flex justify-content-around pb-3">
                                <div>
                                <button type="button" 
                                onclick="findTodo(${element.id})"
                                class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                                Update
                              </button>
                                    <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                                </div>
                                <div>
                                    <button type="button" onclick="changeStatusUpTodo(${element.id})" class="btn btn-success">Doing</button>
                                </div>
                            </div>
                        </div>`
                        )
                    } else if (element.status === 'doing') {
                        $('#doing').append(
                            `<div class="d-flex flex-column mb-3" style="border: solid 5px green; border-radius: 10px;">
                            <div class="pl-4 pt-2 pb-2">
                                <h1>${element.title}</h1>
                                <h3>${element.description}</h3>
                                <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                            </div>
                            <div class="d-flex justify-content-around pb-3">
                                <div>
                                    <button type="button" onclick="changeStatusDownTodo(${element.id})" class="btn btn-success">Todo</button>
                                </div>
                                <div>
                                <button type="button"
                                onclick="findTodo(${element.id})"
                                 class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                                Update
                              </button>
                                    <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                                </div>
                                <div>
                                    <button type="button" onclick="changeStatusUpTodo(${element.id})" class="btn btn-success">Done</button>
                                </div>
                            </div>
    
                        </div>`
                        )
                    } else {
                        $('#done').append(
                            `<div class="d-flex flex-column mb-3" style="border: solid 5px blue; border-radius: 10px;">
                            <div class="pl-4 pt-2 pb-2">
                                <h1>${element.title}</h1>
                                <h3>${element.description}</h3>
                                <h4>${moment(element.due_date).format("MMM Do YYYY")}</h4>
                            </div>
                            <div class="d-flex justify-content-around pb-3">
                                <div>
                                    <button type="button" onclick="changeStatusDownTodo(${element.id})" class="btn btn-success">Doing</button>
                                </div>
                                <div>
                                <button type="button" 
                                onclick="findTodo(${element.id})" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                                Update
                              </button>
                                    <button type="button" onclick="deleteTodo(${element.id})" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>`
                        )
                    }
                }
            });
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

let tempId = ''
let checkIsProject = ''
function findTodo(id, check) {
    $.ajax({
        method: 'get',
        url: `${BASE_URL}todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            $('#update_title').val(todo.title)
            $('#update_description').val(todo.description)
            $('#update_due_date').val(new Date(todo.due_date).toISOString().substring(0, 10))
            tempId = todo.id
            checkIsProject = todo.ProjectId
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

$('#updateTodo').on('submit', function (event) {
    event.preventDefault()
    updateTodoController(tempId)
})



function updateTodoController(tempId) {
    let title = $('#update_title').val()
    let description = $('#update_description').val()
    let due_date = $('#update_due_date').val()
    $.ajax({
        method: 'put',
        url: `${BASE_URL}todos/${tempId}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(todo => {
            dataMyTodo()
            if (checkIsProject) {
                myProjectTodo(projectId)
            }
            $('#staticBackdrop').modal('hide')
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function changeStatusDownTodo(id) {
    $.ajax({
        method: 'patch',
        url: `${BASE_URL}todos/${id}/down`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            dataMyTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function changeStatusUpTodo(id) {
    $.ajax({
        method: 'patch',
        url: `${BASE_URL}todos/${id}/up`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            console.log('okk')
            dataMyTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}


function deleteTodo(id) {
    $.ajax({
        method: 'delete',
        url: `${BASE_URL}todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(todo => {
            let fixedId = `lucu${id}`
            $("#" + fixedId).remove();
            dataMyTodo()
        })
        .fail(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}

function addTodoController() {
    let title = $('#add_title').val();
    let description = $('#add_description').val();
    let due_date = $('#add_due_date').val();
    $.ajax({
        method: 'post',
        url: `${BASE_URL}todos`,
        data: {
            title,
            description,
            due_date
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((todo) => {
            $('#exampleModal').modal('hide')
            $('#add_title').val('')
            $('#add_description').val('');
            $('#add_due_date').val('');
            dataMyTodo()
        })
        .fail(err => {
            $('#add_title').val('')
            $('#add_description').val('');
            $('#add_due_date').val('');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.responseJSON.message}`,
                footer: '<a href>Why do I have this issue?</a>'
            })
        })
}




