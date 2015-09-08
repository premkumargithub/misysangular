//valuely, and with a little shame, ripped from this example: http://bl.ocks.org/NPashaP/96447623ef4d342ee09b
/* global d3 */

angular.module('voyagerUiApp').directive('pieChart',
	function() {
		'use strict';
		
		var initPieChart = function(element, fData){
			// function to handle pieChart.
			function pieChart(pD){
				var pC ={}, pieDim ={w:200, h: 200};
				pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
				
				// create svg for pie chart.
				var piesvg = d3.select(element).append('svg')
					.attr('width', pieDim.w).attr('height', pieDim.h).append('g')
					.attr('transform', 'translate('+pieDim.w/2+','+pieDim.h/2+')');
					
				// create function to draw the arcs of the pie slices.
				var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

				// create a function to compute the pie slice angles.
				var pie = d3.layout.pie().sort(null).value(function(d) { return d.value; });

				// Draw the pie slices.
				piesvg.selectAll('path').data(pie(pD)).enter().append('path').attr('d', arc)
					.each(function(d) {
						this._current = d;
					})
					.style('fill', function(d) {
						return d.data.color;
					});
					
				return pC;
			}
			
			pieChart(fData);
		};
		
		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '='
			},
			templateUrl: 'views/directives/pie-chart.html',
			link: function(scope, element) {
				initPieChart(element[0], scope.data);
			}
		};
	});