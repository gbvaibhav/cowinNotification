sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.cowinnotification.cowinNotification.controller.App", {
		onInit: function () {

		},
		playSound: function () {
			var aud = new Audio("./model/not.mp3");
			aud.play();
		},
		getBU: function () {
			var context = this;
			// create XHR object
			var xhttp = new XMLHttpRequest();
			var date = new Date().getDate() + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() +
				1))) + "-" + new Date().getFullYear();

			// gets everytime fired when the XHR request state changes
			xhttp.onreadystatechange = function () {
				// 4 means request is finished and response is ready
				// 200 means request is just fine
				if (this.readyState == 4 && this.status == 200) {
					debugger;
					// "this" refers here to the XHR object
					// sap.base.Log.info(this.responseText);
					var JSONData = JSON.parse(this.responseText);
					var availableData = JSONData.centers.filter((x) => {
						return x.sessions.filter(y => y.available_capacity > 0 && y.min_age_limit === 18).length > 0;
					});
					context.getView().setModel(new sap.ui.model.json.JSONModel({
						results: availableData
					}), "localModelBU");

					sap.m.MessageToast.show("Bangalore Urban refreshed", {
						my: sap.ui.core.Popup.Dock.CenterCenter,
						at: sap.ui.core.Popup.Dock.CenterCenter
					});
					if (availableData.length > 0) {
						context.playSound();
					} else {
						setTimeout(function () {
							context.getBU();
						}, 15000);
					}
					debugger;
				}
			};
			// set the XHR request parameters
			xhttp.open("GET", "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=265&date=" + date, true);

			// fire the XHR request
			xhttp.send();
		},
		getBBMP: function () {
			var context = this;
			var xhttpbbmp = new XMLHttpRequest();
			var datebbmp = new Date().getDate() + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : ("0" + (new Date().getMonth() +
				1))) + "-" + new Date().getFullYear();

			// gets everytime fired when the XHR request state changes
			xhttpbbmp.onreadystatechange = function () {
				// 4 means request is finished and response is ready
				// 200 means request is just fine
				if (this.readyState == 4 && this.status == 200) {
					debugger;
					// "this" refers here to the XHR object
					// sap.base.Log.info(this.responseText);
					var JSONData = JSON.parse(this.responseText);
					var availableData = JSONData.centers.filter((x) => {
						return x.sessions.filter(y => y.available_capacity > 0 && y.min_age_limit === 18).length > 0;
					});
					context.getView().setModel(new sap.ui.model.json.JSONModel({
						results: availableData
					}), "localModelBBMP");
					sap.m.MessageToast.show("BBMP refreshed", {
						my: sap.ui.core.Popup.Dock.CenterBottom,
						at: sap.ui.core.Popup.Dock.CenterBottom
					});
					if (availableData.length > 0) {
						context.playSound();
					} else {
						setTimeout(function () {
							context.getBBMP();
						}, 15000);
					}
					debugger;
				}
			};
			// set the XHR request parameters
			xhttpbbmp.open("GET", "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=294&date=" + datebbmp,
				true);

			// fire the XHR request
			xhttpbbmp.send();
		},
		getData: function () {
			this.getBU();
			this.getBBMP();
		}
	});
});