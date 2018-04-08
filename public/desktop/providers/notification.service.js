angular.module('fitGApp')

// 'notification' service manage the ui-notifications of the client side
    .factory('notificationService', function (Notification) {

        return {
            showError: showError,
            showSuccess: showSuccess,
            showWarning: showWarning,
        };

        // show the error message
        function showError(title, message, delay) {
            if (!title && (typeof delay === 'undefined')) {
                Notification.error(message);
            } else if (!title) {
                Notification.error({message: message, delay: delay});
            } else if (typeof delay === 'undefined') {
                Notification.error({title: title, message: message});
            } else {
                Notification.error({title: title, message: message, delay: delay});
            }
        }

        // show the success message
        function showSuccess(title, message, delay) {
            if (!title && (typeof delay === 'undefined')) {
                Notification.success(message);
            } else if (!title) {
                Notification.success({message: message, delay: delay});
            } else if (typeof delay === 'undefined') {
                Notification.success({title: title, message: message});
            } else {
                Notification.success({title: title, message: message, delay: delay});
            }
        }

        // show the warning message
        function showWarning(title, message, delay) {
            if (!title && (typeof delay === 'undefined')) {
                Notification.warning(message);
            } else if (!title) {
                Notification.warning({message: message, delay: delay});
            } else if (typeof delay === 'undefined') {
                Notification.warning({title: title, message: message});
            } else {
                Notification.warning({title: title, message: message, delay: delay});
            }
        }
    });


