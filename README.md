# Therapist Bot Code Docs

This code documentation records the constants, functions, and enumerations used in the JavaScript code of this application. Also available as a [pdf](https://github.com/mollieswenson/therapist-bot/blob/master/Therapist%20Bot%20Documentation.pdf).

## About the app 

I wrote this app for a course on code documentation. The app is a (mildly rude) therapist who is happy to discuss your problems for hours on end. Try a working demo therapy session at <https://mollieswenson.github.io/therapist-bot/>.

# Constants

Name                 | Description                                                        | Type
-------------------- | ------------------------------------------------------------------ | ----------------
`exclamationResponses` | Responses for when the user's line ends with an exclamation point. | Array of strings
`genericResponses`     | Responses to use when there is no better option.                   | Array of strings
`povSwitches`          | Mapping between first person and second person words               | Object
`questionResponses`    | Responses for when the user's line ends with a question mark.      | Array of strings
`questionStarts`       | First few words of a question                                      | Array of strings

# Functions

## createQuestion(patientLine)

Returns a question that includes content from the patient's line and a switched point of view.

<dl>
  <dt>Parameters</dt>
  <dd>
  <code>patientLine</code>
</dd>
  <dd>Type: String</dd>
  <dd>Text entered by the patient; used to form question</dd>
  <dt>Returns</dt>
  <dd>Type: String</dd>
  <dd>Question including content from the patient’s line</dd>
</dl>

## initialize()

Called when the program loads. Begins the therapy session.

<dl>
  <dt>Parameters</dt>
  <dd>None</dd>
</dl>

## lastChar(myString)

Returns the last character in a string.

<dl>
  <dt>Parameters</dt>
  <dd>
  <code>myString</code>
</dd>
  <dd>Type: String</dd>
  <dd>String to return the last character of</dd>
  <dt>Returns</dt>
  <dd>Type: String</dd>
  <dd>Last character of the string</dd>
</dl>

## randomGif (id)

Gets a random gif from Giphy.

<dl>
  <dt>Parameters</dt>
  <dd>
  <code>id</code>
</dd>
  <dd>Type: String</dd>
  <dd>The Giphy id for the random gif</dd>
</dl>

## submitLine()

Determines how to respond to patient's line and then adds both lines to the session.

<dl>
  <dt>Parameters</dt>
  <dd>None</dd>
</dl>

## randomElement(myArray)

Returns a random element from the specified array.

<dl>
  <dt>Parameters</dt>
  <dd>
  <code>myArray</code>
</dd>
  <dd>Type: Array</dd>
  <dd>An array that is not empty.</dd>
  <dt>Returns</dt>
  <dd>Type: Whatever the random element is</dd>
  <dd>Random element from the specified array</dd>
</dl>

# Enumerations

Property | Description | Value
---|---|---
Generic     | Generic answer that does not make use of the patient response                                                   | 0
Question    | Answer to a question                                                                                            | 1
Exclamation | Answer to a patient response that ends with an exclamation point                                                | 2
PointOfView | Answer that makes use of the patient response by switching the point of view from first person to second person | 3

