(function() {
	var app = angular.module('dialogsApp', ['ang-dialogs']);

	app.controller('MainController', function ($scope, $dialogs) {

		$scope.dialogs = $dialogs;

		$scope.showDefaultDialog = function(){
			$dialogs.showDefaultDialog("Your account has been created!", {title: "Alarm!"});
		};

		$scope.showConfirmationDialog = function(){
			$dialogs.showConfirmationDialog("Are you sure?", {title: "Shutdown your computer?"});
		};

		$scope.showSuccessDialog = function(){
			$dialogs.showSuccessDialog("Your account has been created!", {title: "Alarm!"});
		};

		$scope.showInfoDialog = function(){
			$dialogs.showInfoDialog("Your account has been created!", {title: "Alarm!"});
		};

		$scope.showWaitDialog = function(){
			$dialogs.showInfoDialog("This process may take few minutes, be patient!", {
				title: "Your request is being processed.",
				spin:true,
				icon: "glyphicon glyphicon-time"
			});
		};

		$scope.showWarningDialog = function(){
			$dialogs.showWarningDialog("Your account has been created!", {title: "Alarm!"});
		};

		$scope.showErrorDialog = function(){
			$dialogs.showErrorDialog("Your account has been created!", {title: "Alarm!"});
		};
		$scope.showErrorDialog2 = function(){
			$dialogs.showErrorDialog("Your account has been created!", {title: "Alarm!", reportButton: true});
		};
	});
})();
