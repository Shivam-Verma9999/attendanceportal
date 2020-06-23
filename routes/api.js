const apiRouter = require('express').Router();
const mongoose = require('mongoose');

const studentSchema = require('../schema/studentSchema');

const studentModel = mongoose.model('student', studentSchema);

apiRouter.get('/', (req, res) => {
    studentModel.find((err, students) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            res.send(students);
            console.log(students);
        }
    })
});
apiRouter.put('/', (req, res) => {
    console.log("PUT REQUEST BODY: ", req.body);
    const newStudent = new studentModel(req.body);
    const errorMsg = newStudent.validateSync()
    console.log("Validation message", errorMsg);

    newStudent.save((err, newStudent) => {
        if (err) {
            console.log('Eror SAVING: ', err);
            res.send(errorMsg);

        } else {
            console.log(newStudent);
            res.send(newStudent);
        }
    })

});
module.exports = apiRouter;