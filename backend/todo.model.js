const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({

    task_description: {

        type: String
    },
    task_area: {

        type: String
    },

    task_priority: {

        type: String
    },

    task_date: {

        type: String
    },

    task_completed: {

        type: Boolean
    }

});

module.exports = mongoose.model('Task' ,Task);
