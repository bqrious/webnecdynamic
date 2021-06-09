sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (MessageToast, JSONModel, Controller) {
	"use strict";
	return Controller.extend("necs.controller.Services", {
		onInit: function () {
			//var oJsonModel = new JSONModel("./model/data.json");
			//this.getView().setModel(oJsonModel, "ObjectPageModel");
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("services").attachMatched(this._onRouteMatched, this);
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
			//if (oArgs.subSection=="services") subSect="servicetypes";
			//this.byId("ObjectPageLayout").setSelectedSection("container-necs---"+oSect+"--"+subSect+"Section");
			 ;
			if (oSubSubSection=="undefined" && subSect=="servicetypes") {this.scrollTo(this.byId("servicetypesSectionSS1"), this.byId("ObjectPageLayout")); console.log("st  "+subSect);}
			if (oSubSubSection=="undefined" && subSect=="solutions") {this.scrollTo(this.byId("solutionsSectionSS1"), this.byId("ObjectPageLayout"));console.log("sl  "  +subSect);}
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


		handleLink1Press: function () {
			var msg = 'Page 1 a very long link clicked';
			MessageToast.show(msg);
									this.byId("ObjectPageLayout").scrollToSection("container-necs---services--solutionsSectionSS1");
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

