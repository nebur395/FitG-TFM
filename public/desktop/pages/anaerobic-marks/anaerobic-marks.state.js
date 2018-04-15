angular.module('fitGApp')

    .controller('anaerobicMarksCtrl', ['$scope', '$stateParams', 'marksService', 'notificationService',
        function ($scope, $stateParams, marksService, notificationService) {

            // inputs visual variables
            $scope.exName = $stateParams.exName;
            $scope.marksList = [];
            $scope.chartLabels = [];
            $scope.chartSeries = ['Repetitions average', 'Weight average', 'Time average'];
            $scope.chartData = [];
            $scope.chartOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
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
                $scope.chartData = [[], [], []];
                for (let i = 0; i < marks.length; i++) {
                    $scope.chartLabels[i] = marks[i].dateYMD;
                    $scope.chartData[0][i] = marks[i].avgRep;
                    $scope.chartData[1][i] = marks[i].avgWeight;
                    $scope.chartData[2][i] = marks[i].avgTime;
                }
            };

            $scope.isEmpty = function () {
                return $scope.marksList.length === 0;
            };

            $scope.formatList = function (marks) {
                for (let i = 0; i < marks.length; i++) {
                    marks[i].dateYMD = marks[i].creationDate.slice(0, 10);
                    marks[i].dateHHMM = marks[i].creationDate.slice(11, 16);
                    marks[i].avgRep = marks[i].repetitions.reduce((a, b) => a + b, 0) / marks[i].repetitions.length;
                    marks[i].avgWeight = marks[i].weight.reduce((a, b) => a + b, 0) / marks[i].weight.length;
                    marks[i].avgTime = marks[i].time.reduce((a, b) => a + b, 0) / marks[i].time.length;
                    marks[i].series = marks[i].repetitions.length > 0 ? marks[i].repetitions.length : 0;
                    marks[i].series = marks[i].weight.length > 0 ? marks[i].weight.length : marks[i].series;
                    marks[i].series = marks[i].time.length > 0 ? marks[i].time.length : marks[i].series;
                }
            };

            $scope.getMarks = function () {
                marksService.getAnaerobics($stateParams.exID)
                    .then(marks => {
                        $scope.formatList(marks);
                        $scope.marksList = marks;
                        $scope.populateChart(marks);
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getMarks();

        }]);
