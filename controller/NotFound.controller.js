sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller,History) {
	"use strict";

	return Controller.extend("necs.controller.NotFound", {

		onInit: function () {
			var oRouter, oTarget;

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data");	// store the data
			}, this);
		},

		// override the parent's onNavBack (inherited from BaseController)
		onNavBack: function (oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			console.log(sPreviousHash);
		


			if (sPreviousHash !== undefined) {
				window.history.go(-1);
				//var oSideItem=oEvent.getSource().getParent().getParent();
				var oView=this.getView().getParent().getParent().getParent();
				//MessageToast.show(oView);
				var oSideNavList = oView.byId('nList');
				var oItem=oSideNavList.getItems();
				//console.log(oItem[0].getKey());
				var oSideItem=oView.byId("sideNavigation");
				//console.log(oSideItem.getId())
				oSideItem.setSelectedKey(sPreviousHash);

			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", {}, true);
			}
		},

	});

});
