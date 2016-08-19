# Angular dialogs
## An easy to use AngularJS service for using dialogs.
This service has been tested using Twitter Bootstrap 3.3.5, AngularJS 1.5.5 and Angular-UI-Bootstrap 2.0.1.

## Usage
```javascript
var app = angular.module('TestApp', ['ang-dialogs']);
app.controller('TestController', function ($dialogs) {
	this.foo = function(){
		$dialogs.showInfoDialog("This is a dialog!", {title: "Hello world!"});
	}
}
```

A more complete example can be found at JSFiddle: [https://jsfiddle.net/kLtryf9u/9/](https://jsfiddle.net/kLtryf9u/11/)

## Changelog
### v0.9
* First public version.
* Supports different types of dialogs: default, confirmation, success, info, warning and error dialogs.
* Supports some configurations: title, message, icon, buttons,...
