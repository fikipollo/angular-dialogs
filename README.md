# Angular dialogs
## An easy-to-use AngularJS service for using dialogs.
Pure AngularJS component for using dialogs.
This service has been tested using Twitter Bootstrap 3.3.5, AngularJS 1.5.5 and Angular-UI-Bootstrap 2.5.0.

## Getting Started
+ Install with bower (comming soon), `bower install angular-dialogs --save`

+ Or download the [production version][min] or the [development version][max] for JavaScript files, and the [production version][min2] or the [development version][max2] for the CSS stylesheets.

[min]: https://raw.githubusercontent.com/fikipollo/angular-dialogs/master/dist/angular-dialogs.js
[max]: https://raw.github.com/mgcrea/jquery-bootstrap-affix/master/dist/angular-bootstrap-affix.js
[min2]: https://raw.githubusercontent.com/fikipollo/angular-dialogs/master/dist/angular-dialogs.min.css
[max2]: https://raw.githubusercontent.com/fikipollo/angular-dialogs/master/dist/angular-dialogs.css

In your web page:

```html
<link rel="stylesheet" href="/lib/bootstrap.min.css">
<link rel="stylesheet" href="/lib/angular-dialogs.min.css">

<script type="text/javascript" src="/lib/angular.min.js"></script>
<script type="text/javascript" src="/lib/ui-bootstrap-tpls.min.js"></script>
<script type="text/javascript" src="/lib/angular-dialogs.min.js"></script>

<script type="text/javascript" src="app.js"></script>
```

And in your app.js:
```javascript
	var app = angular.module('myApp', ['ang-dialogs']);
```

## Examples
A simple example of the usage would be:

```javascript
	var app = angular.module('myApp', ['ang-dialogs']);
	app.controller('myController', function ($dialogs) {
		this.foo = function(){
			$dialogs.showInfoDialog("This is a dialog!", {
				title: "Hello world!",
				closeTimeout: 10
			});
		}
	}
```

You can find a bunch of more complete examples <a href="https://goo.gl/3xvF4b" target="_blank">here</a>.

## Supported types of dialogs
This service includes some predefined dialogs that you can use, however many options are available for customizing your dialogs.
As a general rule, for showing a dialog, you should call to the corresponding function (depending on the type of dialog to show). This functions accept two parameters: the __message__ that will be displayed in the body of the dialog, and some __options__ that help you to change the default behaviour (an object, optional).
```javascript
$dialogs.showTypeOfDialog("My message", {option1:"value1", option2:"value2"})
```

#### Default dialogs
A simple dialog with a message, no colors.
```javascript
$dialogs.showDefaultDialog("AngularJS rocks!", {title: "Hello"});
```

#### Confirmation dialogs
A Yes/No dialog with a message. Many options are available to change the default appearance (e.g. the text for the buttons), and a callback function can be specified which will be executed when the user chooses an option.
```javascript
$dialogs.showConfirmationDialog("Please confirm", {
	title: "Are you sure?",
	callback: function(option){
			alert("Selected option was '" + option + "'");
	}
});
```

#### Success dialogs
A simple success message. Again, using options you can change the default appearance and behaviour (e.g. an auto-close countdown).
```javascript
$dialogs.showSuccessDialog("The process finished successfully.", {
	closeTimeout: 10
});
```

#### Info dialogs
A dialog showing some useful information.
```javascript
$dialogs.showInfoDialog("This is an important message.", {
	buttonCloseText : 'OK, I understand.'
});
```

#### Wait dialogs
A wait dialog with an animated loading icon. These dialogs do not show any button by default (but could be added). You can programmatically close them using the _closeDialog_ function (see below).
```javascript
$dialogs.showWaitDialog("Loading your data...", {
	title: "Your request is being processed.",
	icon: "glyphicon glyphicon-time"
});

//Close the dialog after 10 seconds
setTimeout(function(){
	$dialogs.closeDialog(); //This will close the last opened dialog
}, 3000);
```

#### Warning dialogs
A dialog showing some warning information.
```javascript
$dialogs.showWarningDialog("It's time to go home"});
```

#### Error dialogs
A dialog showing error messages. Using the available options you can change the default appearance and behaviour (e.g. adding a "Report" button that could send the error message to the developers).
```javascript
$dialogs.showErrorDialog("An error occurred. Please send the report.", {
	title: "Damn it, error detected!",
	reportButton: true,
	reportButtonHandler: function(){
		foo();
		alert("Your report has been sent. Thanks!");
	}
});
```

#### Other dialogs
If none of the previous functions fits to you, you can open a dialog using the following function:
```javascript
$dialogs.showMessage(message, options);
```

# Available options
These are the available options that you can use for customizing your dialogs. All options are optional and default values will be used if not present.

 - **messageType** (string): accepted values are: "default" "info" "confirmation" "success" "warn" "error" and "wait". The type of message. This option is predefined depending on the function that you use for showing the dialog (e.g. if you use _showErrorDialog_, the type would be _error_).

 - **title** (string): the title for the dialog.

 - **callback** (function): the function that is executed when the dialog is closed. The function is called using the selected option (button) pressed by the user.
 ```javascript
  callback: function(option){
		if(option === "ok"){
			foo();
		}else{
			foo2();
		}
	}
```
 - **logMessage** (string): a custom message to print at the JavaScript console. Depending on the type of message, the message will be printed using different outputs (error console, log, etc.). By default the log message will be the same message shown in the dialog body.

 - **button** (boolean): show or hide the buttons (OK, Cancel or Close). Default _true_ for most types of dialogs.
 - **reportButton**  (boolean): show or hide the "Send report" button. Default _false_.

 - **reportButtonHandler** (function): the function to be called when pressing the report button.
 - **buttonReportText** (string): The text shown in the report button.
 - **buttonOkText** (string): The text shown in the OK button.
 - **buttonCancelText** (string): The text shown in the Cancel button.
 - **buttonCloseText** (string): The text shown in the Close button.

 - **spin** (boolean): display a spinning icon (ideal for waiting dialogs). Default: true for waiting dialogs, false for other types.

 - **icon** (string): icon showed in the dialog title. Use a Bootstrap valid glyphicon class (e.g. "glyphicon glyphicon-time").

 - **closable** (boolean): determines if the dialog should be closed when clicking in the backdrop. Default: false.

 - **closeTimeout** (number): number of **seconds** to wait until auto-close  the dialog. Default: undefined (i.e. disabled).


## Changelog
### v0.93
* Added auto-close for dialogs (countdown)
* New options for customizing the text for buttons.
* Handler for the report button
* Improved examples
* Improved documentation

### v0.92
* Close dialogs -> close most recent dialogs, close by id or close by type
* Added spinning icon for wait dialog

### v0.91
* Wait dialogs and spinning icons

### v0.9
* First public version.
* Supports different types of dialogs: default, confirmation, success, info, warning and error dialogs.
* Supports some configurations: title, message, icon, buttons,...
