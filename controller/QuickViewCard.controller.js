sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("necs.controller.QuickViewCard", {

		onInit: function () {
			// load JSON sample data
			var oModel = new JSONModel(sap.ui.require.toUrl("necs/model/cardData.json"));
			this.getView().setModel(oModel);
		},

		onBeforeRendering: function () {
			var oButton = this.byId("buttonBack");
			oButton.setEnabled(false);
		},

		onAfterRendering: function () {
			this.byId("quickViewCardContainer").$().css("maxWidth", "100%");
			this.GauegeDisplay();
		},

		onButtonBackClick: function () {
			var oQuickViewCard = this.byId("quickViewCard");
			oQuickViewCard.navigateBack();
		},

		onNavigate: function (oEvent) {
			var oNavOrigin = oEvent.getParameter("navOrigin");

			if (oNavOrigin) {
				MessageToast.show('Link "' + oNavOrigin.getText() + '" was clicked');
			} else {
				MessageToast.show("Back button was clicked");
			}
		},

		onAfterNavigate: function (oEvent) {
			var oButton = this.byId("buttonBack");
			oButton.setEnabled(!oEvent.getParameter("isTopPage"));
		},

		GauegeDisplay: function() {
			new JustGage({
				id: this.getView().byId("VBox1").sId,
				value: getRandomInt(0, 100),
				min: 0,
				max: 100,
				title: "Sample 2 with FlexBox",
				label: "pounds",
				view: this.oView,
				size: 900,
				});
			new JustGage({
				id: this.getView().byId("VBox2").sId,
				value: getRandomInt(0, 100),
				min: 0,
				max: 100,
				title: "Sample 2 with FlexBox",
				label: "pounds",
				view: this.oView,
				size: 900,
				});
		}

	});
});