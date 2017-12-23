(function () {
    'use strict';

    angular
        .module('app.partial')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataService', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataService, logger) {
        var vm = this;
        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataService.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataService.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
