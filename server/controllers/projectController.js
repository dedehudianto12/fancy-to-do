"use strict"

const { Project, userProject, Todo, User } = require('../models')

class ProjectController {
    static create(req, res, next) {
        const obj = {
            name: req.body.name,
            authorId: req.userId
        }
        Project.create(obj)
            .then(data => {
                const body = {
                    ProjectId: data.id,
                    UserId: req.userId
                }
                return userProject.create(body)
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Project.findAll({ include: [User] })
            .then(datas => {
                let temp = []
                datas.forEach(element => {
                    let user = element.dataValues.Users
                    user.forEach(el => {
                        // console.log(el.dataValues)
                        console.log(el.dataValues.id, req.userId)
                        if (el.dataValues.id === req.userId) {
                            // console.log(element.dataValues.Users)
                            temp.push(element)
                        }
                    })
                });
                res.status(200).json(temp)
            })
            .catch(next)
    }

    static addTodo(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.userId,
            ProjectId: req.params.id
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Project.findByPk(req.params.id, { include: [User, Todo] })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static leaveProject(req, res, next) {
        userProject.destroy({ where: { ProjectId: req.params.id, UserId: req.userId } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static joinProject(req, res, next) {
        const checkUser = []
        const body = {}
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    body.UserId = user.dataValues.id
                    body.ProjectId = req.body.id
                    return Project.findByPk(req.body.id, { include: [User] })
                } else {
                    throw ({ name: 'Not Found', message: 'User not found' })
                }
            })
            .then(project => {
                let data = project.dataValues.Users
                data.forEach(el => {

                    if (el.dataValues.id === body.UserId) {
                        checkUser.push(1)
                    }
                })
                if (checkUser.length > 0) {
                    throw ({
                        name: 'Already Join',
                        message: 'You already join this project'
                    })
                } else {
                    return userProject.create(body)
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = ProjectController