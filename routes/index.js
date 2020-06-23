var express = require('express');
const mongoose = require('mongoose');
const studentSchema = require('../schema/studentSchema');
const userSchema = require('../schema/userSchema');
const enums = require('../utility');
var router = express.Router();


const studentModel = mongoose.model('student', studentSchema);
const userModel = mongoose.model('user', userSchema);
/* GET home page. */
router.get('/', function (req, res, next) {

    console.log("Stream passed: ", req.query.branch);
    console.log("Branch passed: ", req.query.subject);

    const SearchBranch = req.query.branch && req.query.branch.trim().toUpperCase();
    const SearchSubject = req.query.subject && req.query.subject.trim().toUpperCase();
    const loggedIn = (req.query.loggedIn && req.query.loggedIn.length > 0 ? true : false);
    console.log("LOGEDIN INIINNINI", req.query.loggedIn);
    const searchObj = {};
    if (SearchBranch) {
        searchObj.branch = SearchBranch;
    }
    if (SearchSubject) {
        searchObj.subject = SearchSubject;
    }

    studentModel.find(searchObj, (err, students) => {
        if (err) {
            console.log(err);
            res.send("ERROR OCCURED: ", err);
        } else {
            res.render('pages/index', {
                loggedIn,
                studentData: students,
                navdata: {SearchBranch, SearchSubject, branches: enums.branch, subjects: enums.subject}
            });
        }
    });

});

router.get('/login', function (req, res, next) {
    console.log("LOGIN PAGE CALLED");
    const pageData = {};

    if (req.query.error) {
        pageData.errorMsg = "Wrong username or password";
    }
    res.render('pages/login', {pageData});
});


router.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const searchObject = {username, password};

    console.log("searchObject: ", searchObject);

    if (username && password && username.length > 0 && password.length > 0) {
        userModel.findOne(searchObject, (err, user) => {
            if (err) {
                res.redirect('/login?error=""');
            } else {

                if (user == null) {
                    res.redirect('/login?error=""');
                } else {
                    res.redirect('/?loggedIn="a"');
                }
            }
        })
    } else {
        res.redirect('/login?error=""');
    }
})
module.exports = router;
