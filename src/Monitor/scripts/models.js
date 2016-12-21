function Project(name) { this.name = name; this.entries = []; this.entriesMap = {}; }
Project.prototype.addEntry = function(entry) { 
	var nameSections = entry.name.split(" :: ");
	if (this.entriesMap[nameSections[1]]) {
		this.entriesMap[nameSections[1]].tasks.push(new Task(entry));
	} else {
		var pipeline = new Pipeline(entry);
		this.entriesMap[nameSections[1]] = pipeline;
		this.entries.push(pipeline); 
	}
};
Project.prototype.lastBuildTime = function() { return this.data.entries.length === 0 ? null : this.data.entries.map(function(entry) { return entry.lastBuildTime; }).sort().reverse()[0]; };
Project.prototype.nextBuildTime = function() { return this.data.entries.length === 0 ? null : this.data.entries.map(function(entry) { return entry.nextBuildTime; }).sort()[0]; };
Project.prototype.status = function() { 
	/*enum[none, successful, building, failed]*/
	// TODO: implement none
	return this.data.entries.length === 0 
		? "None" 
		: this.data.entries
			.map(function(entry) { return entry.activity === "Building" ? 2 /*Building*/ : entry.lastBuildStatus === "Success" ? 1 /*Successful*/ : 3 /*Failed*/; })
			.sort().reverse()
			.map(function(statusCode) { return statusCode === 1 ? "successful" : statusCode === 2 ? "building" : "failed"; })[0];
}; 

function Pipeline(entry) { 
	this.name = entry.name; /*string*/ 
	this.activity = entry.activity; /*enum[Sleeping, Building, CheckingModifications]*/ 
	this.lastBuildStatus = entry.lastBuildStatus; /*enum[Pending, Success, Failure, Exception, Unknown]*/ 
	this.lastBuildLabel = entry.lastBuildLabel; /*string*/
	this.lastBuildTime = entry.lastBuildTime; /*DateTime*/
	this.nextBuildTime = entry.nextBuildTime; /*DateTime*/
	this.webUrl = entry.webUrl; /*URL*/
	this.tasks = [];
}

function Task(entry) {
	this.name = entry.name; /*string*/ 
	this.activity = entry.activity; /*enum[Sleeping, Building, CheckingModifications]*/ 
	this.lastBuildStatus = entry.lastBuildStatus; /*enum[Pending, Success, Failure, Exception, Unknown]*/ 
	this.lastBuildLabel = entry.lastBuildLabel; /*string*/
	this.lastBuildTime = entry.lastBuildTime; /*DateTime*/
	this.nextBuildTime = entry.nextBuildTime; /*DateTime*/
	this.webUrl = entry.webUrl; /*URL*/
}