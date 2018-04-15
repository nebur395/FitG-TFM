angular.module('fitGApp')

    .controller('anaerobicMarksCtrl', ['$scope', '$stateParams', 'analysisService', 'notificationService',
        function ($scope, $stateParams, analysisService, notificationService) {

            // inputs visual variables
            $scope.analysisList = [];
            $scope.chartLabels = [];
            $scope.chartSeries = ['Weight', 'B.M.I.', 'Metabolic Age', 'Basal Metabolism',
                'Body Fat', 'Muscle Mass', 'Bone Mass', 'Body Fluids', 'Visceral Adiposity',
                'Daily Caloric Intake'];
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
                    $scope.chartData[0][i] = marks[i].weight;
                    $scope.chartData[1][i] = marks[i].bmi;
                    $scope.chartData[2][i] = marks[i].metabolicAge;
                    $scope.chartData[3][i] = marks[i].basalMetabolism;
                    $scope.chartData[4][i] = marks[i].bodyFat;
                    $scope.chartData[5][i] = marks[i].muscleMass;
                    $scope.chartData[6][i] = marks[i].boneMass;
                    $scope.chartData[7][i] = marks[i].bodyFluids;
                    $scope.chartData[8][i] = marks[i].visceralAdiposity;
                    $scope.chartData[9][i] = marks[i].dailyCaloricIntake;
                }
            };

            $scope.isEmpty = function () {
                return $scope.analysisList.length === 0;
            };

            $scope.formatList = function (analysis) {
                for (let i = 0; i < analysis.length; i++) {
                    analysis[i].dateYMD = analysis[i].creationDate.slice(0, 10);
                    analysis[i].dateHHMM = analysis[i].creationDate.slice(11, 16);
                }
            };

            $scope.getAnalysis = function () {
                analysisService.getAnalysis()
                    .then(analysis => {
                        $scope.formatList(analysis);
                        $scope.analysisList = analysis;
                        $scope.populateChart(analysis);
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAnalysis();

        }]);
