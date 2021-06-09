sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/SearchField",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/library",
    'sap/m/Dialog',
    'sap/m/MessagePopover',
    'sap/m/ActionSheet',
    'sap/m/Label',
    'sap/m/TextArea',
    'sap/m/MessageBox',
    'sap/ui/commons/PasswordField',
    'sap/ui/commons/TextField',
    'sap/m/Input',
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/layout/VerticalLayout"



], function(Controller, Device, SearchField, Button, Text, JSONModel, library, Dialog, MessagePopover, ActionSheet, Label, TextArea, MessageBox, PasswordField, TextField, Input,
    HorizontalLayout, VerticalLayout) {
    "use strict";

    var ButtonType = library.ButtonType,
        PlacementType = library.PlacementType;

    return Controller.extend("necs.controller.C", {

        onInit: function() {
            var oModel = new JSONModel(sap.ui.require.toUrl("necs/model") + "/data.json");
            //console.log(oModel);
            this.getView().setModel(oModel);
            this._setToggleButtonTooltip(!Device.system.desktop);

            var oUserButton = this.byId("userButton");
            //MessageToast.show(oUserButton.getText());
            var sUserModel = new sap.ui.model.json.JSONModel();
            sUserModel.setData({ logname: "Guest" });
            this.getView().setModel(sUserModel, "UserModel");

        },

        onAfterRendering: function() {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

        },
        onHomePress: function() {
            var oIconTabHeader = this.byId('iconTabHeader');
            oIconTabHeader.setSelectedKey('invalidKey');
            var oSideNavList = this.byId('nList');
            var oItem = oSideNavList.getItems();
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(false);

            if (this.oI || this.oI == 0) { oItem[this.oI].setVisible(false); }; //very strange this.oI if 0 is not cosidered as available? so must put ||

            sap.ui.core.UIComponent.getRouterFor(this).navTo("home");

        },

        onItemSelect: function(oEvent) {
            var oSideItem = this.byId("sideNavigation");
            var oSubSubSection;
            if (oEvent) { var sKey = oEvent.getParameter("item").getKey(); } else { var sKey = this.byId("sideNavigation").getSelectedKey(); }
            //var sKey=this.byId("sideNavigation").getSelectedKey();

            //this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));

            var oSideItem = this.byId("sideNavigation");
            if (Device.system.phone) { this.onSideNavButtonPress(); }

            var pos = sKey.search("_");
            var oSect = sKey.substr(0, pos);
            var subSect = sKey.slice(pos + 1);
            //var oSubSubSection="services_servicetypes_apps"
            if (!oSect) oSect = sKey;
            console.log("C Controller")
            console.log(sKey)
            console.log(oSect);
            console.log(subSect);
            console.log(oSubSubSection);

            sap.ui.core.UIComponent.getRouterFor(this).navTo(oSect, {
                subSection: sKey,
                query: {
                    subSubSection: oSubSubSection
                }
            }, true /*no history*/ );
        },

        onSelectTab: function(event) {
            console.log(this.oI);
            var oSideNavList = this.byId('nList');
            var oItem = oSideNavList.getItems();

            if (this.oI || this.oI == 0) { oItem[this.oI].setVisible(false); }; //very strange this.oI if 0 is not cosidered as available? so must put ||
            var oTab = event.getParameter('item');
            var oSideItem = this.byId("sideNavigation");
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(true);
            switch (oTab.getKey()) {
                case "about":
                    { this.oI = 0;oItem[0].setVisible(true); break; };
                case "services":
                    { this.oI = 1;oItem[1].setVisible(true); break; };
                case "industries":
                    { this.oI = 2;oItem[2].setVisible(true); break; };
                case "case":
                    { this.oI = 3;oItem[3].setVisible(true); break; };
                case "blog":
                    { this.oI = 4;oItem[4].setVisible(true); break; };
            }
            oSideItem.setSelectedKey(oTab.getKey());
            if (oTab.getKey() == 'blog') {
                /*
                _oDialog: null;
                if (!this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment("necs.fragment.Login", this);
                    //ALT
                    this._oDialog.setModel(this.getView().getModel());
                }
                //below also possible alt to marked: ALT
                //this.getView().addDependent(this._oDialog);
                // toggle compact style
                jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
                this._oDialog.open();
                */
                var oLogname = this.getView().getModel("UserModel").getProperty("/logname");
                if (oLogname == "Guest") this.openDialogLogin();
                else this.onItemSelect();

            } else {
                this.onItemSelect();
            }
        },

        openDialogLogin: function(event) {

            _oDialog: null;
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("necs.fragment.Login", this);
                //ALT
                this._oDialog.setModel(this.getView().getModel());
            }
            //below also possible alt to marked: ALT
            //this.getView().addDependent(this._oDialog);
            // toggle compact style
            jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
            this._oDialog.open();

        },


        onCancelBlog: function(event) {

            this._oDialog.close();
            var oSideNavList = this.byId('nList');
            var oItem = oSideNavList.getItems();
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(false);

            if (this.oI || this.oI == 0) { oItem[this.oI].setVisible(false); }; //very strange this.oI if 0 is not cosidered as available? so must put ||

        },

        onSearchButtonPress: function(event) {
            var that = this;
            var oToolHeader = this.byId("toolHeader");
            var oSearchField = new SearchField(this.createId("searchField"), {
                liveChange: function() {
                    that.onSearch();
                },
                width: "20%"
            })
            var oCloseSearchField = new Button(this.createId("closeButton"), {
                text: "Close",
                type: "Transparent",
                press: function() {
                    that.onClose();
                }
            })
            this.byId("searchButton").destroy();
            oToolHeader.addContent(oSearchField);
            oToolHeader.addContent(oCloseSearchField);
            //console.log(this.byId("closeButton").getText());
        },

        onSearch: function(event) {
            var that = this;
            console.log(that.byId("closeButton").getText());
        },

        onClose: function(event) {
            var that = this;
            var oToolHeader = this.byId("toolHeader");
            var oSearchButton = new Button(this.createId("searchButton"), {
                icon: "sap-icon://search",
                press: function() {
                    that.onSearchButtonPress();
                }
            })
            oToolHeader.addContent(oSearchButton);
            this.byId("searchField").destroy();
            this.byId("closeButton").destroy();
        },

        onSideNavButtonPress: function() {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();

            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        _setToggleButtonTooltip: function(bLarge) {
            var oToggleButton = this.byId('sideNavigationToggleButton');
            if (bLarge) {
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
            }
        },

        _getVal: function(evt) {
            return sap.ui.getCore().byId(evt.getParameter('id')).getText();
        },

        handleFixedNavPress: function(evt) {
            if (this._getVal(evt).indexOf("@") != -1) sap.m.URLHelper.triggerEmail(this._getVal(evt), "Info Request");
            if (this._getVal(evt).indexOf("+") != -1) sap.m.URLHelper.triggerTel(this._getVal(evt));
            if (this._getVal(evt).indexOf("Depok") != -1) sap.m.URLHelper.redirect("https://www.google.com/maps/search/?api=1&query=-6.404753,106.824546", true)

        },

        onContactUsPress: function() {
            var msg = 'Contact Us';
            //MessageToast.show(msg);
            sap.ui.core.UIComponent.getRouterFor(this).navTo("about", {
                subSection: "company"
            });

        },

        onUserNamePress: function(oEvent) {

            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            // close message popover
            var oMessagePopover = this.byId("errorMessagePopover");
            if (oMessagePopover && oMessagePopover.isOpen()) {
                oMessagePopover.destroy();
            }

            var oUserButton = this.byId("userButton");
            var that = this;

            var fnHandleUserMenuItemPress = function(oEvent) {

                var sunText = oEvent.getSource().getText();
                switch (sunText) {
                    case "Login":
                        {

                            //if(oEvent.getSource().getText()==='Login'){
                            //oActionSheet.destroy();	
                            //MessageToast.show(oEvent.getSource().getText() + " destroyed");

                            //Here
                            var dialog = new Dialog({
                                title: 'Logon',
                                type: 'Message',
                                content: [
                                    new VerticalLayout({
                                        content: [
                                            new HorizontalLayout({
                                                content: [
                                                    new Label({ text: 'User Name', labelFor: 'submit2DialogTextarea', width:"5rem"}).addStyleClass("sapUiSmallMarginTop "),
                                                    new Input('submit2DialogTextarea', {
                                                        liveChange: function(oEvent) {
                                                            var qText = oEvent.getParameter('value');
                                                            var parent = oEvent.getSource().getParent();
                                                            parent.getBeginButton().setEnabled(qText.length > 0);
                                                        },

                                                        width: '100%',
                                                        placeholder: 'User Name (required)'
                                                    })
                                                ]
                                            }),
                                            new HorizontalLayout({
                                                content: [
                                                    new Label({ text: 'Password', labelFor: 'submit3DialogTextarea', width:"5rem" }).addStyleClass("sapUiSmallMarginTop "),
                                                    new Input('submit3DialogTextarea', {
                                                        liveChange: function(oEvent) {
                                                            var sText = oEvent.getParameter('value');
                                                            var parent = oEvent.getSource().getParent();
                                                            //parent.getBeginButton().setEnabled(sText.length > 0);
                                                        },
                                                        type: 'Password',
                                                        width: '100%',
                                                        placeholder: 'Password (required)'
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ],
                                beginButton: new Button({
                                    text: 'Submit',
                                    enabled: false,
                                    press: function() {

                                        var qText = sap.ui.getCore().byId('submit2DialogTextarea').getValue();
                                        var sText = sap.ui.getCore().byId('submit3DialogTextarea').getValue();

                                        //var xModel=new sap.ui.model.json.JSONModel();
                                        //xModel.setData({logname : qText});
                                        //sap.ui.getCore().setModel(xModel);

                                        var mPwd = [];
                                        mPwd[0] = qText;
                                        mPwd[1] = sText;
                                        //var sUrl = jQuery.sap.getModulePath("tdk.it", "/db/data/emp_contact/login");
                                        //var sData = JSON.stringify(mPwd);
                                        /*
                                        var oSjax = jQuery.sap.syncPost(sUrl,sData);
                                        //var oResult = JSON.parse(oSjax.data);
                                        var oResult = JSON.parse(oSjax.data);
                                        MessageToast.show(JSON.stringify(oResult.recordset[0].emp_pwd));
                                        //var emp_pwd=JSON.stringify(oResult.recordset[0].emp_pwd);
                                        var emp_pwd=oResult.recordset[0].emp_pwd;
                                        MessageToast.show(emp_pwd+' '+sText);
                                        if (emp_pwd==sText) {
                                        	oUserButton.setText(qText);
                                        	MessageToast.show('You Are Logged In')
                                        } else {MessageToast.show('wrong password')};
								
                                        */
                                        //oUserButton.setText(qText);
                                        that.checkLoginData(qText, sText);
                                        dialog.close();
                                    }
                                }).addStyleClass("sapUiContentPadding"),
                                endButton: new Button({
                                    text: 'Cancel',
                                    press: function() {
                                        dialog.close();
                                    }
                                }),
                                afterClose: function() {
                                    dialog.destroy();
                                }
                            });

                            dialog.open();
                            break;

                        };
                    case "Logout":
                        {
                            //if(oEvent.getSource().getText()==='Logout'){
                            that.getView().getModel("UserModel").setProperty("/logname", "Guest");
                            //that.getRouter().navTo("logon");
                            //location.reload();
                            break;
                        };
                };
                //else{
                //MessageToast.show(oEvent.getSource().getText() + " was pressed")};
            };

            var oActionSheet = new ActionSheet(this.getView().createId("userMessageActionSheet"), {
                title: oBundle.getText("userHeaderTitle"),
                showCancelButton: false,
                buttons: [
                    new Button({
                        text: 'User Settings',
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    }),
                    new Button({
                        text: "Online Guide",
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    }),
                    new Button({
                        text: 'Feedback',
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    }),
                    new Button({
                        text: 'Help',
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    }),
                    new Button({
                        text: 'Logout',
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    }),
                    new Button({
                        text: 'Login',
                        type: sap.m.ButtonType.Transparent,
                        press: fnHandleUserMenuItemPress
                    })
                ],
                afterClose: function() {
                    oActionSheet.destroy();
                }
            });
            // forward compact/cozy style into dialog
            jQuery.sap.syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oActionSheet);
            //jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), oActionSheet);
            oActionSheet.openBy(oEvent.getSource());
        }, //This is the end of onUserNamePress

        checkLoginData: function(oUserName, oPassword) {
            this.getView().getModel("UserModel").setProperty("/logname", oUserName);
            console.log(this.getView().getModel("UserModel").getProperty("/logname"));

        }




    });
});