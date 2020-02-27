"use strict"

const { User } = require('../models')
const jwt = require('../helper/jwt')
const bcrypt = require('../helper/bcrypt')

class UserController {
    static create(req, res, next) {
        const obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        User.create(obj)
            .then((user) => {
                let token = jwt.generateToken(user)
                res.status(201).json({ user, token })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    next('wrong email/password')
                } else {
                    if (!bcrypt.checkPassword(req.body.password, user.password)) {
                        next('wrong email/password')
                    } else {
                        let token = jwt.generateToken(user)
                        res.status(200).json({ user, token })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogle(req, res, next) {
        let email = req.body.email;
        console.log(email)
        User.findOne({
            where:
                { email: email }
        })
            .then((user) => {
                let password = 'kodok';
                if (!user) {
                    return User.create({
                        username: email,
                        email: email,
                        password
                    });
                } else {
                    return user;
                }
            })
            .then((user) => {
                let { email, _id } = user;
                let token = jwt.generateToken(user);
                res.json({
                    status: 200,
                    message: 'login success',
                    token: token,
                    user: {
                        email,
                        _id
                    }
                });
            })
            .catch(next);
    }

}

module.exports = UserController