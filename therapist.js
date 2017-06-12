var therapySession;

//Responses when user clicks submit while input is empty
var emptyLineResponses = [
	"*crickets chirping*",
	"*beep boop*",
	"Hello??",
	"Try typing something, genius.",
	"and....?",
	"You didn't say anything."];

//Responses when no other response will work
var genericResponses = [
	"Uh huh.",
	"Go on.",
	"Why do you say that?",
	"That's very interesting.",
	"Fascinating...",
	"Keep talking.",
	"Wow, okay."];

//Responses when user asks a question
const questionResponses = [
	"Why do you ask that?",
	"What do <em>you</em> think?",
	"That's an interesting question.",
	"How long have you wanted to know that?",
	"That depends on who you ask."];

//Responses when user ends statement with exclamation
const exclamationResponses = [
	"Please calm down.",
	"No need to get so excited.",
	"You sound very passionate about that.",
	"Would you care to restate that in a more neutral tone?"];

//values for switching point of view;
//when user says 'I ....' computer switches POV and repeats the statement
const povSwitches = {
	"I": "you",
	"i": "you",
	"me": "you",
	"myself": "yourself",
	"am": "are",
	"my": "your",
	"My": "your",
	"I'm": "you're",
	"I'd": "you'd",
	"I'll": "you'll",
	"i'm": "you're",
	"i'd": "you'd",
	"i'll": "you'll"
}

//applied right before POV switch response
const questionStarts = [
	"Why do you say that",
	"How is it that",
	"Can you tell me more about how",
	"And why is it that",
	"Can you explain why you say that"];

//called when program loads
function initialize() {
	therapySession = "<p> I am psychotherapist bot. What is your problem? </p>";
	conversation.innerHTML = therapySession;
	randomGif();
}

//called when submit button pressed
function submitLine() {

	var patientLine = textbox.value.trim();
	$("#textbox").val("");

 	var therapistLine;

	//Choose a response based on last character (question or exclamation)
	if (lastChar(patientLine) == "?") {
		therapistLine = randomElement(questionResponses);
	} else if (lastChar(patientLine) == "!") {
		therapistLine = randomElement(exclamationResponses);
	} else {
		therapistLine = createQuestion(patientLine);
	}

	//Response if patientLine is empty
	if (patientLine == "") {
	therapistLine = randomElement(emptyLineResponses);
	}

    	//see if patientLine warrants a gif
	if (patientLine == "gif") {
	    randomGif();
	    therapistLine = "Here you go!<p><iframe src=\"//giphy.com/embed/" + myObj.data.id + " \" width=\"300\" frameBorder=\"0\"></iframe></p>";
	    //this isn't using id that gets passed back from randomGif yet
		patientLine = "";
	}

	// Still no good response, so use a basic response.
	if (therapistLine == null) {
		therapistLine = randomElement(genericResponses);
	}

	//adds the next line to the session
	therapySession += "<p> <em>" + patientLine + "</em> </p>";
	therapySession += "<p>" + therapistLine + "</p>";
	conversation.innerHTML = therapySession;
}

//returns a random element from the array passed in
function randomElement(myArray) {
	var index = Math.floor(Math.random() * myArray.length);
	return myArray[index];
}

//returns the last character of the string passed it
function lastChar(myString) {
	return myString.substring(myString.length - 1);
}

//If patient line includes "you," create a question based on the line
function createQuestion(patientLine) {
	if (patientLine.toLowerCase().indexOf("you") != -1) {
		return null;
	}

	//remove the period if there is one
	if (lastChar(patientLine) == ".") {
		patientLine = patientLine.substring(0, patientLine.length - 1);
	}

	//add spaces at beginning and end of new line
	var modifiedLine = " " + patientLine + " ";
	var found = false;

	//loop through properties and replace POV values
	for (var property in povSwitches) {
		if (povSwitches.hasOwnProperty(property)) {
			var modifiedProperty = " " + property + " ";
			//regular expression object to replace value in all strings
			var propRegEx = new RegExp(modifiedProperty,"g");
		if (modifiedLine.indexOf(modifiedProperty) != -1) {
			modifiedLine = modifiedLine.replace(propRegEx,
				" " + povSwitches[property] + " ");
			//set to true if replacement is made, so we know a match to one of the pov values was found
			found = true;
		}
		}
	}

	//If a replacement was made, returns the question
	if (found) {
		//remove trailing spaces
		modifiedLine = modifiedLine.substring(0, modifiedLine.length - 1);

		//returns full questions
		return randomElement(questionStarts) + " " + modifiedLine + "?";
	}

	//return null when no replacement made
	return null;
}

//gets a random gif from Giphy
function randomGif(id) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myObj = JSON.parse(this.responseText);
			//id = myObj.data.id;
			//return id;
		}
	};
	xmlhttp.open("GET", "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg", true);
	xmlhttp.send();

}
