var mainApp = angular.module('mainApp', []);

mainApp.controller('BillOfLadingController', function ($scope, $http) {
	$scope.blNumber = '';
	$scope.importer = '';
	$scope.consignee = {
		code : '',
		address : ''
	};

	$scope.consigneeInfo = function () {
		if (this.consignee.code && this.consignee.address) {
			return 'Consignee : ' + this.consignee.code + ' | '
				+ 'Address : ' + this.consignee.address;
		} else {
			return '';
		}
	};

	$scope.getDataFromServer = function () {
		$http.get('/getBillOfLadingByNumber/', { params : { blNumber : $scope.blNumber } })
			.then(function (res) {
				$scope.blNumber = res.data.blNumber;
				$scope.importer = res.data.importer;
				$scope.consignee.code = res.data.consignee;
			});
	};

	$scope.getConsigneeInfo = function () {
		$http.get('/getThirdPartyByCode/', { params : { code : $scope.consignee.code } })
			.then(function (res) {
				$scope.consignee.code = res.data.code;
				$scope.consignee.address = res.data.address;
		});
	};
});