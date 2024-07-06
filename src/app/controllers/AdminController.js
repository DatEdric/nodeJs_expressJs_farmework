const Admin = require('../models/AdminModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../middlewares/authenticate');


class AdminController {
    
    dashboard(req, res, next) {
        res.render('admin/dashboard');
    }
    dashboardCenter(req, res, next) {
        res.render('admin/dashboard-center');
    }
    register(req, res, next) {
        res.render('admin/registerPage');
    }

    sendReqRegister(req, res, next) {
        const { username, pwd } = req.body;
        Admin.findOne({ username })
            .then(existingAdmin => {
                if (existingAdmin) {
                    return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
                }
                const newAdmin = new Admin({ username, password: pwd });
                return newAdmin.save();
            })
            .then(() => {
                res.redirect('login-page');
            })
            .catch(err => {
                next(err);
            });
    }
    signInPage(req, res, next) {
        res.render('admin/signInPage')
    }

    signIn(req, res, next) {
        const { username , pwd } = req.body;

        Admin.findOne({ username })
        .then(admin => {
            if (!admin) {
                return res.json({ message: 'tài khoản hoặc mật khẩu không đúng' });
            }
            argon2.verify(admin.password, pwd)
             .then(isPasswordVailid => {
                console.log(isPasswordVailid);
                if(!isPasswordVailid) {
                    return res.status(400).json({message: 'mau khau sai'})
                }
                const token = jwt.sign({username : admin.username}, 'secret_key', { expiresIn: '1h' });
                res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 giờ
                res.redirect('/admin/dashboard-center');
             }) 
        })

        .catch(err => {
            next(err); 
        });
    }       

    profile(req, res, next) {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.redirect('/admin/signInPage');
        }

        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                return res.redirect('/admin/signInPage');
            }
            Admin.findOne({ username: decoded.username })
                .then(admin => {
                    if (!admin) {
                        return res.redirect('/admin/signInPage');
                    }
                    res.render('admin/profile', { admin });
                })
                .catch(err => {
                    next(err);
                });
        });
    }
}

module.exports = new AdminController;
