const { validationResult } = require('express-validator');
const { loadUsers, storeUser } = require('../data/dbModule');
const bcrypt = require('bcrypt');


//let user = loadUsers()
module.exports = {
    login: (req, res, next) => {
        res.render('usuarios-login', { title: 'Login de usuario' });
    },
    procesoLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            let {id, nombre, avatar} = loadUsers().find(user => user.email === req.body.email);
            req.session.userLogin = {
                id,
                nombre,
                avatar

            }

            return res.redirect('/')
        }else{
            return res.render('usuarios-login', { 
                title: 'Login de usuario',
                errors : errors.mapped()
            })
        }
    },
    registro: (req, res, next) => {
        res.render('usuarios-registro', { title: 'Registro de usuario' });
    },
    procesoRistro: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { nombre, apellido, phone, email, contraseña, contraseña2, avatar } = req.body



            const users = loadUsers();



            const id = users[users.length - 1].id;

            const newUser = {
              //  id: id + 1,
              id : users[users.length - 1] ? + users[users.length - 1].id + 1 : 1,


                ...req.body,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                phone: +phone,
                email: email.trim(),
                contraseña: bcrypt.hashSync(contraseña.trim(),10),
                contraseña2:null,
                avatar: null,
            }

            const newUsers = [...users, newUser];

            storeUser(newUsers);
            console.log(newUsers)
            res.redirect('/usuarios/login');



            /////////////////////////////////////////////////////////////////////////////////////
        } else {
            console.log(errors)
            return res.render('usuarios-registro', {
                errors: errors.mapped(),
                old: req.body
            })
        }


    },
    perfil : (req, res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('perfil', {
            title : 'Perfil del usuario',
            user
        })
    },
    editar : (req,res) => {
        res.send(req.body);
    },
    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}