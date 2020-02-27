
function onSignIn(googleUser) {
    event.preventDefault();
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

    let email = profile.U3
    if (email === undefined) {
        email = profile.Au
    }

    $.ajax({
        url: `http://localhost:3000/users/login-google`,
        method: 'POST',
        data: {
            google_token: id_token,
            email
        }
    })
        .done((data) => {
            Swal.fire('Loggin Success!', 'You are now loggin in our web!', 'success');
            localStorage.setItem('token', data.token);
            checkUser();
        })
        .fail((err) => {
            Swal.fire({
                title: 'Ops...',
                type: 'error',
                text: err.responseJSON.message
            });
        });
}


function loginController() {
    event.preventDefault()
    let email = $('#email_login').val();
    let password = $('#password_login').val();
    $.ajax({
        method: 'post',
        url: `${BASE_URL}users/login`,
        data: {
            email,
            password
        }
    })
        .done((data) => {
            Swal.fire('Loggin Success!', 'You are now loggin in our web!', 'success');
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user.id)
            checkUser()
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

function registerController() {
    event.preventDefault()
    let username = $('#username_register').val();
    let email = $('#email_register').val();
    let password = $('#password_register').val();
    $.ajax({
        method: 'post',
        url: `${BASE_URL}users/register`,
        data: {
            username,
            email,
            password
        }
    })
        .done((data) => {
            Swal.fire('Loggin Success!', 'You are now loggin in our web!', 'success');
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user.id)
            checkUser()
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

function logOut() {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    localStorage.clear()
    auth2.signOut().then(function () {
        console.log('User signed out.');

    });

    checkUser()
}