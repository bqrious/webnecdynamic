sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (MessageToast, JSONModel, Controller) {
	"use strict";
	return Controller.extend("necs.controller.Industries", {
		onInit: function () {
			var oHealthModel = new JSONModel("./mockdata/img.json");
			this.getView().setModel(oHealthModel, "IndustryData");
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("industries").attachMatched(this._onRouteMatched, this);
			var svgLogo = sap.ui.require.toUrl("necs/images/healthcare-medical-it-consulting-services.svg")

			var oJsonModel = new JSONModel({
				imageWidth: "50%",
				svgLogo: svgLogo});

			this.getView().setModel(oJsonModel, "Healthcare");
			/*
			this.getView().setModel(new JSONModel({
				imageWidth: "50%",
				svgLogo: svgLogo
			},"Healthcare"));
			*/

		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;

			oArgs = oEvent.getParameter("arguments");
			var oQuery = oArgs["?query"];
			var oSubSubSection=oQuery.subSubSection;

			
			oView = this.getView();
			console.log(oArgs.subSection);
			var pos = oArgs.subSection.search("_");
			var oSect = oArgs.subSection.substr(0,pos);
			var subSect = oArgs.subSection.slice(pos+1);
			//if(!oSect) oSect=sKey;
			console.log("Services Controller")
			console.log(oSect);
			console.log(subSect);
			console.log(oSubSubSection);
			//if (oArgs.subSection=="about") subSect="company";
			if (oArgs.subSection=="services") subSect="servicetypes";
			//this.byId("ObjectPageLayout").setSelectedSection("container-necs---"+oSect+"--"+subSect+"Section");
			
			
			if (oSubSubSection=="Infrastructure") this.scrollTo(this.byId("servicetypesSectionSS1"), this.byId("ObjectPageLayout"));
			if (oSubSubSection=="Application") this.scrollTo(this.byId("servicetypesSectionSS2"), this.byId("ObjectPageLayout"));
			if (oSubSubSection=="Managed Services") this.scrollTo(this.byId("servicetypesSectionSS4"), this.byId("ObjectPageLayout"));

		},

		scrollTo: function(section, opl) {  //this thigy important since scrolling wont work until dom is ready.
		  const id = section.getId();
		  const ready = !!opl.getScrollingSectionId(); // DOM of opl is fully ready
		  const fn = () => opl.scrollToSection(id);
		  return ready ? fn() : opl.attachEventOnce("onAfterRenderingDOMReady", fn);
		},

		onGetQuotePress:  function (oEvent) {
			var oQuoteButton=this.byId("quoteButton");
			//oQuoteButton.removeStyleClass();
			oQuoteButton.addStyleClass("red");
			//console.log(oQuoteButton.getStyleClass())
		},

		onAfterRendering: function () {

			var oQuoteButton=this.byId("quoteButton");

		},

		handleLink1Press: function () {
			//var msg = 'Page 1 a very long link clicked';
			//MessageToast.show(msg);
									this.byId("ObjectPageLayout").scrollToSection("container-necs---services--servicetypesSectionSS2");
									//console.log(this.byId("ObjectPageLayout").getSelectedSection())
									//"container-necs---services--servicetypesSectionSS1"
												//this.byId("servicetypesSection").setSelectedSubSection("container-necs---services--servicetypesSectionSS2");
			//console.log(this.byId("servicetypesSection").getSelectedSubSection());


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
		},
		onContactUsPress: function () {
			var msg = 'Contact Us';
			//MessageToast.show(msg);
			sap.ui.core.UIComponent.getRouterFor(this).navTo("about", {
				subSection : "company"
			});

		}
	});
}, true);

