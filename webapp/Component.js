sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/cowinnotification/cowinNotification/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.cowinnotification.cowinNotification.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			
				sap.ui.loader.config({
					paths: {
						"callapi": "https://cdn-api.co-vin.in",
					},
					shim: {
						"com/shell/gf/cumulus/child/gfcumuluschild/Component": {},
						"loadMomement/moment.min":{
							export:"moment"
						}
					},
					async: true,
				});

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});