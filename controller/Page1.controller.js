sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
	

	], function(jQuery, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("necs.controller.Page1", {

		onInit: function (oEvent) {

			// set explored app's demo model on this sample
			var oModel = new JSONModel(sap.ui.require.toUrl("necs/mockdata") + "/HRData.json");
			//var oModel = new JSONModel(jQuery.sap.getModulePath("necs", "/mockdata/HRData.json"));

			this.getView().setModel(oModel);

			this.getView().bindElement("/Location/0");

			//testing underscore.js
			var even = _.find([1, 2, 3, 4, 5, 6], function(num) {
				return num % 2 == 0;
			});
			console.warn('LOG');
			console.log(even); // Should write '2'
			console.warn('LOG');
			var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) {
				return num % 2 == 0;
			});
			console.log(evens); // Should write '[2, 4, 6]''
			console.warn('LOG');
			
			var bool = _.contains([1, 2, 3], 3); // Does array contain '3'?
			console.log(bool);
			console.warn('LOG');
			//debugger;
			// underscore.js

		},

		onServicesLinkPress: function (oEvent) {
   			var oText=oEvent.getParameter('id');
			console.log(this.byId(oText).getText())
			var oSect="services"; var sKey="services_servicetypes";
			var oSubSubSection=this.byId(oText).getText();
			sap.ui.core.UIComponent.getRouterFor(this).navTo(oSect, {
				subSection : sKey,
				query: {
						subSubSection : oSubSubSection
					}
				},true /*no history*/);


			
		},

		onServices2LinkPress: function (oEvent) {
   			var oText=oEvent.getParameter('id');
			console.log(this.byId(oText).getText())
			var oSect="services"; var sKey="services_servicetypes";
			var oSubSubSection=this.byId(oText).getText();
			if (oSubSubSection=="REVAMP MY OPERATIONS >") oSubSubSection="Infrastructure";
			if (oSubSubSection=="CRAFT MY PRODUTCS >") oSubSubSection="Application";
			if (oSubSubSection=="SHOULDER MY PROJECT >") oSubSubSection="Managed Services";
			sap.ui.core.UIComponent.getRouterFor(this).navTo(oSect, {
				subSection : sKey,
				query: {
						subSubSection : oSubSubSection
					}
				},true /*no history*/);
		}


	});


	return PageController;

});