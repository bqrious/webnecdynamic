sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (MessageToast, JSONModel, Controller) {
	"use strict";
	return Controller.extend("necs.controller.About", {
		onInit: function () {
			var oHRData = new JSONModel("./mockdata/HRData.json");
			this.getView().setModel(oHRData, "HRData");
			//this.getView().bindElement("/HRData");
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("about").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;

			oArgs = oEvent.getParameter("arguments");
			
			oView = this.getView();
			console.log(oArgs.subSection);
			var pos = oArgs.subSection.search("_");
			var oSect = oArgs.subSection.substr(0,pos);
			var subSect = oArgs.subSection.slice(pos+1);
			//if(!oSect) oSect=sKey;
			console.log(oSect);
			console.log(subSect);
			if (oArgs.subSection=="about") subSect="company";
			if (oArgs.subSection=="services") subSect="servicetypes";
			this.byId("ObjectPageLayout").setSelectedSection("container-necs---"+oSect+"--"+subSect+"Section");



		},
		handleLink1Press: function () {
			//var msg = 'Page 1 a very long link clicked';
			//MessageToast.show(msg);
									//this.byId("ObjectPageLayout").setSelectedSection("container-necs---about--visionSection");
									//console.log(this.byId("ObjectPageLayout").getSelectedSection())
			//this.byId("companySection").setSelectedSubSection("container-necs---about--goalsSectionSS2");
			//console.log(this.byId("companySection").getSelectedSubSection());



		},
		handleLink2Press: function () {
			var msg = 'Page 2 long link clicked';
			MessageToast.show(msg);
		},
		handleEditBtnPress: function () {
			var msg = 'An edit box should appear when you click on the "Edit header" button';
			MessageToast.show(msg);
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	});
}, true);

