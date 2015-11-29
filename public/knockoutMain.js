function AppViewModel() {
	this.blNumber = ko.observable('');
	this.consignee = {
		code : ko.observable(''),
		address : ko.observable('')
	};
	this.importer = ko.observable('');
	
	this.consigneeInfo = ko.computed(function () {
		if (this.consignee.code() && this.consignee.address()) {
			return 'Consignee : ' + this.consignee.code() + ' | '
				+ 'Address : ' + this.consignee.address();
		} else {
			return '';
		}
	}, this);
	
	this.getConsigneeInfo = function () {
		var obj = this;
		$.get('/getThirdPartyByCode' , { code : this.consignee.code() }, function (data) {
			obj.consignee.code(data.code);
			obj.consignee.address(data.address);
		});
	};

	this.getDataFromServer = function() {
		var obj = this;

		$.get('/getBillOfLadingByNumber', { blNumber : this.blNumber() }, function (data) {
			obj.blNumber(data.blNumber);
			obj.consignee.code(data.consignee);
			obj.importer(data.importer);
	    });
	};
}

this.viewModel = new AppViewModel();
ko.applyBindings(this.viewModel);