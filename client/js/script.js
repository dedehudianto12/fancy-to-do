"use strict"


$(document).ready(function () {
    checkUser()
});

const BASE_URL = `http://localhost:3000/`

let projectId = ''

function fetchData() {
    dataMyTodo()
    myProject()
}


function checkUser() {
    if (!localStorage.getItem('token')) {
        regis()
    } else {
        home()
        fetchData()
    }
}

// FORM

function regis() {
    $('#home').hide()
    $('#login').show()
    login()
}

// LOGIN

function login() {
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#loginForm').submit(loginController)
}


// REGISTER

function register() {
    $('#loginForm').hide()
    $('#registerForm').show()
    $('#registerForm').submit(registerController)
}

function home() {
    $('#login').hide()
    $('#home').show()
    myTodo()
    fetchData()
}

function myTodo(event) {
    // event.preventDefault()
    $('#myTodo').show()
    $('#projectTodo').hide()
}


$('#addTodo').on('submit', function (event) {
    event.preventDefault()
    addTodoController()
})

function projectTodo(event) {
    // event.preventDefault()
    $('#projectTodo').show()
    $('#myTodo').hide()
    $('#buttonAddTodo').hide()
    $('#inviteButtons').hide()
    $('#leaveProject').hide()
}

