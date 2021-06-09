sap.ui.define([
		'sap/m/MessageToast',
		'sap/ui/Device',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		 "sap/m/Dialog",

	], function(MessageToast, Device, Controller, JSONModel, Dialog) {
	"use strict";

	var ImageGroupController = Controller.extend("necs.controller.ImageGroup", {

		onInit: function() {

			

			var bIsPhone = Device.system.phone,
			svgLogo = sap.ui.require.toUrl("necs/images/sap-logo.svg"),
			oImgModel;

			this.getView().setModel(new JSONModel({
				imageWidth: bIsPhone ? "5em" : "10em",
				svgLogo: svgLogo
			}));

			// set explored app's demo model on this sample
			oImgModel = new JSONModel(sap.ui.require.toUrl("necs/mockdata") + "/img.json");
			this.getView().setModel(oImgModel, "img");

		},

		handleImage3Press: function(evt) {
			MessageToast.show("The image has been pressed");
		},

		/*

		onBeforeRendering: function(evt) {
			  _oDialog: null;
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("necs.fragment.DialogSAPPrint", this);
                //ALT
                this._oDialog.setModel(this.getView().getModel());
            }
            //below also possible alt to marked: ALT
            //this.getView().addDependent(this._oDialog);
            // toggle compact style
            jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
            this._oDialog.open();

		}
		*/
	});


	return ImageGroupController;

});