(function() {
	var app = angular.module('dialogsApp', ['ang-dialogs']);

	app.controller('MainController', function ($scope, $dialogs) {

		$scope.dialogs = $dialogs;

		$scope.showDefaultDialog = function(){
			$dialogs.showDefaultDialog("AngularJS rocks!", {
				title: "Hello",
				closable:true
			});
		};

		$scope.showConfirmationDialog = function(){
			$dialogs.showConfirmationDialog("Please confirm that you want to destroy your computer.", {
				title: "Destroy your computer?",
				buttonOkText: 'Yes, please do it!',
				buttonCancelText : 'Maybe later',
				callback: function(option){
					if(option === "ok"){
						alert("Installing Windows Vista...");
					}
				}
			});
		};

		$scope.showSuccessDialog = function(){
			$dialogs.showSuccessDialog("Your account has been created!", {
				title: "Success",
				closeTimeout: 10
			});
		};

		$scope.showInfoDialog = function(){
			$dialogs.showInfoDialog("Your body has the correct number of holes in it. Don't make any more.", {
				title: "Some useful information",
				buttonCloseText : 'I\'ll remember, thanks.'
			});
		};

		$scope.showWaitDialog = function(){
			$dialogs.showWaitDialog("This process may take few seconds, be patient!", {
				title: "Your request is being processed.",
				spin:true,
				icon: "glyphicon glyphicon-time"
			});
			//Close the dialog after 3 seconds
			setTimeout(function(){
				$dialogs.closeDialog();
			}, 3000);
		};

		$scope.showWarningDialog = function(){
			$dialogs.showWarningDialog("You new a coffee now!", {title: "Alert!"});
		};

		$scope.showErrorDialog = function(){
			$dialogs.showErrorDialog("Something really bad happened :(", {title: "Error"});
		};
		$scope.showErrorDialog2 = function(){
			$dialogs.showErrorDialog("Something really bad happened. Please, send a report and we will fix it", {
				title: "Alarm!",
				reportButton: true,
				reportButtonHandler: function(){
					alert("Cool, thanks for the report!");
				}
			});
		};
	});
})();
