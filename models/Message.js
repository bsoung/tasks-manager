var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	task: {type: String, default: ''}, // id number of task
	text: {type: String, default: ''},
	timestamp: {type: Date, default: Date.now}
});

MessageSchema.methods.summary = function() {
	var summary = {
		profile: this.profile,
		task: this.task,
		text: this.text,
		timestamp: this.timestamp,
		id: this._id.toString()
	}

	return summary;
}

module.exports = mongoose.model('MessageSchema', MessageSchema);