$(document).ready(function() {
	refresh();
});

function refresh() {
	$.ajax({
        type: "GET",
        url: "http://localhost:81/GoServer/cctray.xml",
        contentType: "text/plain",
        async: true
    }).success(function(data) {
		var projects = mergeProjects(xmlToJson(data).Projects.Project);
		projects.sort(function(a, b) { return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0; });
		
		$("#projectsTemplate").template("projectsTemplate");
		$.tmpl("projectsTemplate", projects).appendTo("#display>ul");
	});
}
	
function mergeProjects(projectsRaw) {
	var projectsMap = {};
	var projects = [];
	for (var i = 0; i < projectsRaw.length; i++) {
		var nameSections = projectsRaw[i].name.split(" :: ");
		if (projectsMap[nameSections[0]]) {
			projectsMap[nameSections[0]].addEntry(projectsRaw[i]);
		} else {
			var project = new Project(nameSections[0]);
			project.addEntry(projectsRaw[i]);
			projects.push(project);
			projectsMap[nameSections[0]] = project;
		}	
	}
	return projects;
}