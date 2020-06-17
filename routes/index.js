var express = require('express');
const mongoose = require('mongoose');
const studentSchema = require('../schema/attendanceSchema');
const enums = require('../utility');
var router = express.Router();


const studentModel = mongoose.model('student', studentSchema);
/* GET home page. */
router.get('/', function (req, res, next) {

    console.log("Stream passed: ", req.query.branch);
    console.log("Branch passed: ", req.query.subject);

    const SearchBranch = req.query.branch && req.query.branch.trim().toUpperCase();
    const SearchSubject = req.query.subject && req.query.subject.trim().toUpperCase();

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
            res.render('pages/index', {studentData: students, navdata:{SearchBranch, SearchSubject, branches: enums.branch, subjects: enums.subject }});
        }
    });

});

module.exports = router;
