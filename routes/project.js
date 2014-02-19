var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project.find({ _id: projectID }).exec(afterQuery);

  function afterQuery(err, projects) {
    if (err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  form_data.image || (form_data.image = 'http://placekitten.com/500/400');
  form_data.date || (form_data.date = new Date());
  form_data.title = form_data.project_title;
  var newProject = models.Project(form_data);
  newProject.save(function(err, project) {
    if (err) console.log(err);
    console.log(project)
    res.json(project);
  });
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project.find({ _id: projectID }).remove().exec(function(err, projects) {
    if (err) console.log(err);
    res.send(200);
  });
}