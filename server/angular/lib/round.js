/*************************************
*   ROUND.JS
*	Use: To round distances
*************************************/

;(function() {
	"use strict";

	module.exports = function round (distance) {
		return (Math.floor( (Number(distance) + 0.05) * 10 )) /10;

	};
	
})();