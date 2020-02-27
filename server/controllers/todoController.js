"use strict"

const { Todo, User } = require('../models')

class TodoController {
    static create(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.userId
        }
        Todo.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Todo.findAll({ where: { UserId: req.userId } })
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)

    }

    static findOne(req, res, next) {
        Todo.findByPk(req.params.id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    let obj = {
                        name: 'not found',
                        message: 'user not found'
                    }
                    next(obj)
                }
            })
            .catch(next)

    }

    static destroy(req, res, next) {

        Todo.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data > 0) {
                    res.status(200).json(data)
                } else {
                    next('user not found')
                }
            })
            .catch(next)

    }

    static updateAll(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo.update(obj, { where: { id: req.params.id }, returning: true })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)

    }

    static update(req, res, next) {
        let todoId = req.params.id
        Todo.findByPk(req.params.id)
            .then(todo => {
                if (todo.status === 'todo') {
                    Todo.update({ status: 'doing' }, {
                        where: { id: todoId },
                        returning: true,
                        plain: true
                    })
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(next)
                } else if (todo.status === 'doing') {
                    Todo.update({ status: 'done' }, {
                        where: { id: todoId },
                        returning: true,
                        plain: true
                    })
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(next)
                } else {
                    res.status(200).json({ message: 'nothing to update' })
                }
            })
            .catch(next)

    }

    static bakcUpdate(req, res, next) {
        let todoId = req.params.id
        Todo.findByPk(req.params.id)
            .then(todo => {
                if (todo.status === 'doing') {
                    Todo.update({ status: 'todo' }, {
                        where: { id: todoId },
                        returning: true,
                        plain: true
                    })
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(next)
                } else if (todo.status === 'done') {
                    Todo.update({ status: 'doing' }, {
                        where: { id: todoId },
                        returning: true,
                        plain: true
                    })
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(next)
                } else {
                    res.status(200).json({ message: 'nothing to update' })
                }
            })
            .catch(next)
    }
}

module.exports = TodoController