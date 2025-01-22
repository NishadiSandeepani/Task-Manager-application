const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Completed', 'Not Completed'],
        default: 'Not Completed',
    },
});

module.exports = mongoose.model('Task', taskSchema);
