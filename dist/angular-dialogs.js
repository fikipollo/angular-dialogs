/*! Angular dialogs v0.92 | Rafael Hernandez <https://github.com/fikipollo> | MIT license */
(function () {
    var app = angular.module('ang-dialogs', [
        'ui.bootstrap'
    ]);

    app.service('$dialogs', [
        '$uibModal',
        '$templateCache',
        function ($uibModal, $templateCache) {
            var me = this;
            this.modals = {};
            this.modalStack = [];

            this.getModalInstance = function (modalID) {
                return this.modals[modalID];
            };

            this.showDefaultDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "default";
                config.icon = (config.icon || 'glyphicon glyphicon-info-sign');
                return this.showMessage(message, config);
            };

            this.showInfoDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "info";
                config.icon = (config.icon || 'glyphicon glyphicon-info-sign');
                return this.showMessage(message, config);
            };

            this.showConfirmationDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "confirmation";
                config.icon = (config.icon || 'glyphicon glyphicon-question-sign');
                return this.showMessage(message, config);
            };

            this.showSuccessDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "success";
                config.icon = (config.icon || '	glyphicon glyphicon-ok-circle');
                return this.showMessage(message, config);
            };

            this.showWarningDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "warning";
                config.icon = (config.icon || '	glyphicon glyphicon-exclamation-sign');
                return this.showMessage(message, config);
            };

            this.showErrorDialog = function (message, config) {
                config = (config === undefined) ? {} : config;
                config.messageType = "error";
                config.icon = (config.icon || 'glyphicon glyphicon-remove-circle');
                return this.showMessage(message, config);
            };

            this.showWaitDialog = function (message, config) {
                config = ((config === undefined) ? {} : config);
                config.messageType = "wait";
                config.icon = (config.icon || 'glyphicon glyphicon-time');
                config.button = (config.button || false);
                config.spin = true;
                return this.showMessage(message, config);
            };

            this.showMessage = function (message, config) {
                var callback = (config.callback || null);
                var logMessage = (config.logMessage || message);
                var messageType = (config.messageType || "info");
                // var showTimeout = (config.showTimeout || 0); //TODO
                // var closeTimeout = (config.closeTimeout || 0); //TODO

                delete config.logMessage;
                delete config.callback;
                // delete config.showTimeout;
                // delete config.closeTimeout;

                config.message = (message || "");
                config.title = (config.title || "");
                config.button = (config.button !== false);
                config.reportButton = (config.reportButton || false); //TODO
                config.spin = (config.spin || false); //TODO
                config.closable = (config.closable || false);

                if (messageType === "error") {
                    //TODO CHANGE TO ANGULAR $log
                    console.error(this.logFormat() + logMessage);
                } else if (messageType === "warning") {
                    console.warn(this.logFormat() + logMessage);
                } else if (messageType === "info") {
                    console.info(this.logFormat() + logMessage);
                } else if (messageType === "wait") {
                    console.info(this.logFormat() + logMessage);
                } else { //success
                    console.info(this.logFormat() + logMessage);
                }

                var modalInstance = $uibModal.open({
                    template: $templateCache.get('error.dialog.tpl.html'),
                    backdrop: (config.closable ? true : 'static'),
                    controller: [
                        '$scope',
                        '$uibModalInstance',
                        function ($scope, $uibModalInstance) {
                            $scope.config = config;

                            this.sendReportButtonHandler = function () {
                                //TODO
                                throw "Not implemented"
                            };
                            this.okButtonHandler = function () {
                                //TODO
                                $uibModalInstance.close('ok');
                            };
                            this.cancelButtonHandler = function () {
                                //TODO
                                $uibModalInstance.close('cancel');
                            };
                            this.closeButtonHandler = function () {
                                //TODO
                                $uibModalInstance.dismiss('close');
                            };
                        }
                    ],
                    controllerAs: 'controller'
                });

                modalInstance.result.then(
                        function (result) { //Close
                            me.unregisterModal(modalInstance);
                            if (callback) {
                                callback(result)
                            }
                        },
                        function (reason) { //Dismissed
                            me.unregisterModal(modalInstance);
                            if (callback) {
                                callback(reason)
                            }
                        }
                );

                modalInstance.type = messageType;
                modalInstance.id = this.getNewModalID();
                modalInstance.closable = config.closable || config.button;

                this.modals[modalInstance.id] = modalInstance;
                this.modalStack.push(modalInstance);

                return modalInstance;
            }; //END showMessage

            this.closeDialog = function (params) {
                var modal;
                params = params || {};
                var modalID = params.modalID;
                var option = params.option;
                var type = params.type;

                //Close by ID
                if (modalID !== undefined) {
                    modal = me.getModalInstance(modalID);
                }
                //Close all dialogs for a given type
                else if (type !== undefined) {
                    var m = [];
                    for (var i in me.modalStack) {
                        if (me.modalStack[i].type === type) {
                            m.push(me.modalStack[i]);
                        }
                    }
                    for (var i in m) {
                        me.closeDialog({modalID: m[i].id});
                    }
                    return;
                }
                //Close the most recent dialog
                else if (me.modalStack.length > 0) {
                    for (var i = me.modalStack.length - 1; i >= 0; i--) {
                        if (!me.modalStack[i].closable) {
                            modal = me.modalStack[i];
                            break;
                        }
                    }
                }

                if (modal === undefined) {
                    return;
                }

                var isOpened = modal.opened.$$state.status;
                if (isOpened === 1) {
                    modal.close(option || 'ok');
                } else
                    setTimeout(function () {
                        me.closeDialog(modal.id, option);
                    }, 500);
            };

            this.unregisterModal = function (modal) {
                delete me.modals[modal.id];
                for (var i in me.modalStack) {
                    if (me.modalStack[i].id === modal.id) {
                        me.modalStack.splice(i, 1);
                        return;
                    }
                }
            };

            this.getNewModalID = function () {
                var newID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                if (this.modals[newID] !== undefined)
                    return this.getNewModalID();
                return newID;
            };

            this.logFormat = function () {
                var date = new Date();
                return date.toUTCString() + " > ";
            };

            $templateCache.put('error.dialog.tpl.html',
                    '<div class="modal-{{config.messageType}}">' +
                    '  <div class="modal-header" >' +
                    '    <button type="button" class="close" ' +
                    '            ng-click="controller.closeButtonHandler()"' +
                    '            ng-if="config.closable">' +
                    '            &times;</button>' +
                    '    <h4 class="modal-title" ng-show="config.title != \'\'">' +
                    '      <span class="{{config.icon}}" style=" float: left; padding: 3px; margin-right: 10px; "></span>{{config.title}}' +
                    '    </h4>' +
                    '  </div>' +
                    '  <div class="modal-body" >' +
                    '    <p>' +
                    '        <span ng-if="config.spin" class="glyphicon glyphicon-refresh glyphicon-spin" style=" float: left; padding: 3px; margin-right: 10px; "></span>' +
                    '        {{config.message}}' +
                    '    </p>' +
                    '  </div>' +
                    '  <div class="modal-footer">' +
                    '    <button type="button" class="btn btn-warning" ' +
                    '            ng-click="controller.sendReportButtonHandler()"' +
                    '            ng-if="config.messageType == \'error\' && config.reportButton">' +
                    '            <i class="fa fa-bug"></i> Report error</button>' +
                    '    <button type="button" class="btn btn-success" ' +
                    '            ng-click="controller.okButtonHandler()"' +
                    '            ng-if="config.messageType == \'confirmation\' && config.button">' +
                    '            OK</button>' +
                    '    <button type="button" class="btn btn-danger" ' +
                    '            ng-click="controller.cancelButtonHandler()"' +
                    '            ng-if="config.messageType == \'confirmation\' && config.button">' +
                    '            Cancel</button>' +
                    '    <button type="button" class="btn btn-default" ' +
                    '            ng-click="controller.closeButtonHandler()"' +
                    '            ng-if="config.messageType != \'confirmation\' && config.button">' +
                    '            Close</button>' +
                    '</div>');
        }
    ]);
})();
