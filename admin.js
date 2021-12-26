/*this is an event handler that listens and handles the event
once the submit button is pressed and the event handler method
used is called 'saveIssue'*/
document.getElementById('issuesInputForm').addEventListener('submit', saveIssue);

/* create a fuction called 'saveIssue' and pass in the event into
 it which is the 'e' in side the bracket. and define variables and
 assign user input values to those variables */
function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  //this is a js libery command that generate unique identifier
  var issueId = chance.guid();

  /* status information is set to open because open is the initial
  status */
  var issueStatus = 'Open';


  /*this is use to create a new issue objects with several
  properties*/
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }


/* The code is use to pass the issue value to localStorage
but it first check if the storage is empty */
/*this signifies where we want to store the object on the
 localStorage '(issues)' and the null is use to check if the
 storage is empty */
if(localStorage.getItem('issues') == null) {
  //this is use to initialize an empty array which is called issues
  var issues = [];
  /* the issues objectes from above is moves into the empty array
  i.e stored in the localStorage */
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
} else{
  /*this is use to input new values into the localStorage
  while still displaying the formal value on the array*/
  var issues = JSON.parse(localStorage.getItem('issues'));
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
}
  /* this is use to reset form element, i.e the form is
  initialized and the values are removed */
  document.getElementById('issuesInputForm').reset();

  //this is use to call fetch issues again
  fetchIssues();

  //this is use to prevent the form from submitting
  e.preventDefault();
}

//this function is use to reset the open status to close status
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

//this function is used to delete the issues from the localStorage
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// code to fetch or retrieve items from local storage
function fetchIssues(){
  //the code is fetch item name 'issues' from local storage
  var issues = JSON.parse(localStorage.getItem('issues'));

  /* this code is use to connect to the id of the div section
  where we want the content of the form to display after submiting
  the form */
  var issuesListe = document.getElementById('issuesList');

  // this this use to set the content of "issueList to empty"
  issuesList.innerHTML = '';


  /* this is a for loop that iterate through the issueItem which
  are in the issue object and we are retrieving variable
  properties */
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status =  issues[i].status;


    /* this is use to generate html output that will be displayed on
    the div with the id of 'issueslist' on the html page */
    issuesList.innerHTML += '<div class="well">'+

                            '<h6>Issue ID:' + id + '</h6>'+

                            '<p><span class="label label-info">' + status + '</span></p>'+

                            '<h3><span class="glyphicon glyphicon-user"></span>' + desc + '</h3>' + severity + ' ' + assignedTo +
                            '</div>'+

                            '<button onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</button>'+ ' '+

                            '<button onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</button>'+
                            '</div>';
  }
}
