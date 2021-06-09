sap.ui.define([
	"sap/ui/core/UIComponent", 
	'necs/lib/underscore',
	'necs/lib/Justgage',
	'necs/lib/raphael',
		"sap/ui/Device"


	],
	function (UIComponent, underscore, Justgage, raphael, Device) {
	"use strict";

	return UIComponent.extend("necs.Component", {

		metadata: {
			manifest: "json"
		},
			init : function () {
			UIComponent.prototype.init.apply(this, arguments);

			// Parse the current url and display the targets of the route that matches the hash
			this.getRouter().initialize();
		},

		getContentDensityClass : function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	
		
	});
});