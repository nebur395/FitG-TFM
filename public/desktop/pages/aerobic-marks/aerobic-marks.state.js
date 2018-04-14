angular.module('fitGApp')

    .controller('aerobicMarksCtrl', ['$scope', '$stateParams', 'marksService', 'notificationService',
        function ($scope, $stateParams, marksService, notificationService) {

            // inputs visual variables
            $scope.marksList = [];
            $scope.chartLabels = [];
            $scope.chartSeries = ['Distance','Time','Intensity','Heart rate'];
            $scope.chartData = [];
            $scope.chartOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.chartOptions = {
                legend: {display: true},
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {min: 0}
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: false,
                            position: 'right'
                        }
                    ]
                }
            };

            $scope.populateChart = function (marks) {
                $scope.chartData = [[],[],[],[]];
                for (let i = 0; i < marks.length; i++) {
                    $scope.chartLabels[i] = marks[i].date;
                    $scope.chartData[0][i] = marks[i].distance;
                    $scope.chartData[1][i] = marks[i].time;
                    $scope.chartData[2][i] = marks[i].intensity;
                    $scope.chartData[3][i] = marks[i].heartRate;
                }
            };

            $scope.isEmpty = function () {
                return $scope.marksList.length === 0;
            };

            $scope.formatDates = function (marks) {
                for (let i = 0; i < marks.length; i++) {
                    marks[i].date = marks[i].creationDate.slice(0, 10);
                    marks[i].hour = marks[i].creationDate.slice(11, 16);
                }
            };

            $scope.getMarks = function () {
                marksService.getAerobics($stateParams.mark)
                    .then(marks => {
                        $scope.formatDates(marks);
                        $scope.marksList = marks;
                        $scope.populateChart(marks);
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getMarks();

        }]);
