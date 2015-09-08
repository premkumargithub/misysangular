angular.module('voyagerUiApp').directive('miDataGridRevisit',
	function(GridDataSource, ResourcePanel, jQuery) {
		'use strict';

		var gridIsEditable = function(editableFlag) {
			var isEditable = false;

			if (angular.isDefined(editableFlag)) {
				if (String(editableFlag) === 'true') {
					isEditable = true;
				}
			}

			return isEditable;
		};

		return {
			restrict: 'E',
			replace: true,
			scope: {
				miDataGridColumns: '=',
				miDataGridContractable: '=',
				miDataGridCreate: '&',
				miDataGridDefaultRow: '=',
				miDataGridDestroy: '&',
				miDataGridEditable: '=',
				miDataGridOnSelect: '&',
				miDataGridProperties: '=',
				miDataGridRead: '&',
				miDataGridRefreshEvent: '=',
				miDataGridUpdate: '&'
			},
			template: '<div class="data-grid"></div>',
			link: function(scope, element) {
				var toggleGridHide, DataSource;
				element = jQuery(element);

				scope.$on(scope.miDataGridRefreshEvent, function() {
					element.data('kendoGrid').dataSource.read();
					element.data('kendoGrid').refresh();
				});

				scope.getColumnsConfig = function(properties) {
					var columnsWip = [];

					angular.forEach(properties, function(obj) {
						var columnData = {};
						angular.extend(columnData, {
							id: obj.id
						}, obj.columnConfig);
						columnsWip.push(columnData);
					});

					return columnsWip;
				};

				scope.getModelConfig = function(properties) {
					var modelWip = {};

					angular.forEach(properties, function(obj) {
						modelWip[obj.id] = obj.modelConfig;
					});

					return modelWip;
				};

				toggleGridHide = function() {
					var grid, contractButton, expandMessage;
					grid = element;
					contractButton = jQuery(element.children('.contract-and-expand'));
					expandMessage = contractButton.children('.expand-message');

					if (contractButton.hasClass('contract')) {
						expandMessage.animate({
							height: '2em'
						}, 800);
						grid.animate({
							'margin-top': ((-1 * grid.height()) + 27) + 'px'
						}, 800, function() {
							contractButton.removeClass('contract');
							contractButton.addClass('expand');
						});

						ResourcePanel.focusOnFirstField();
					} else {
						expandMessage.animate({
							height: 0
						}, 800);
						grid.animate({
							'margin-top': 0
						}, 800, function() {
							contractButton.removeClass('expand');
							contractButton.addClass('contract');
						});
					}
				};

				DataSource = GridDataSource.get({
					create: scope.miDataGridCreate,
					read: scope.miDataGridRead,
					update: scope.miDataGridUpdate,
					destroy: scope.miDataGridDestroy
				}, scope.getModelConfig(scope.miDataGridProperties));

				element.kendoGrid({
					cancel: function(e) {
						jQuery(element).data('kendoGrid').collapseRow(e.container[0]);
					},
					change: function() {
						var selectedRowUID, unselectedExpandedRows;

						//Callback to listener
						scope.miDataGridOnSelect({
							data: element.data('kendoGrid').dataItem(this.select())
						});

						selectedRowUID = element.data('kendoGrid').select().attr('data-uid');
						unselectedExpandedRows = element.find('.k-master-row:not([data-uid=' + selectedRowUID + ']) .k-icon.k-minus').closest('.k-master-row');

						element.data('kendoGrid').collapseRow(unselectedExpandedRows);
					},
					columns: (function() {
						var columns;

						if (angular.isDefined(scope.miDataGridColumns)) {
							columns = scope.miDataGridColumns;
						} else {
							columns = scope.getColumnsConfig(scope.miDataGridProperties);
						}

						if (gridIsEditable(scope.miDataGridEditable)) {
							columns.unshift({
								command: ['edit', 'destroy'],
								title: '&nbsp;',
								width: '200px',
								attributes: {
									'class': 'commands'
								}
							});
						}

						return columns;
					}()),
					dataBound: function() {
						var dataView = this.dataSource.view();

						//Update position of scrollbar to top of grid content
						jQuery(element.find('.k-grid-content')).perfectScrollbar('update');

						element.find('.k-master-row').on('dblclick', function() {
							toggleGridHide();
						});

						//Add attribute to identify rows by ResourceID. Useful in testing.
						angular.forEach(dataView, function(rowData) {
							var uid, resourceid;
							uid = rowData.uid;
							resourceid = rowData.ResourceID;
							jQuery('tbody', element).find('tr[data-uid=' + uid + ']').attr('data-mi-resource-id', resourceid);
						});
					},
					dataSource: DataSource,
					detailInit: function(e) {
						var hierarchyCell = e.detailCell;
						hierarchyCell.prevAll('.k-hierarchy-cell').append('<div class="ul-extension">&nbsp;</div>');
						element.find('.commands .delete').on('click', function(e) {
							var detailRow, detailMasterRow, rowData;
							detailRow = jQuery(e.currentTarget).closest('.k-detail-row');
							detailMasterRow = detailRow.prev();

							if (detailMasterRow.hasClass('k-grid-edit-row')) {
								element.data('kendoGrid').cancelRow();
							} else {
								rowData = element.data('kendoGrid').dataSource.getByUid(detailMasterRow.attr('data-uid'));
								DataSource.transport.destroy({
									data: rowData,
									success: function() {
										detailRow.remove();
										detailMasterRow.remove();
									},
									error: angular.noop
								});
							}
						});
					},
					detailTemplate: '<ul class="commands"><li class="delete">Delete</li></ul>',
					edit: function(e) {
						element.data('kendoGrid').select(e.container[0]);
						element.data('kendoGrid').expandRow(e.container[0]);
					},
					editable: 'inline',
					groupable: true,
					pageable: {
						buttonCount: 5
					},
					reorderable: true,
					scrollable: true,
					selectable: true,
					sortable: true,
					toolbar: (function() {
						var commandsWip = [];

						if (gridIsEditable(scope.miDataGridEditable)) {
							commandsWip.push('create');
						}

						return commandsWip;
					}())
				});

				//Add custom scrollbar to content body of data grid
				element.find('.k-grid-content').perfectScrollbar({
					scrollYMarginOffset: 10, //Padding added to keep x-rail from overlapping
					wheelPropogation: true,
					wheelSpeed: 15
				});

				if (scope.miDataGridContractable) {
					element.append('<div class="contract-and-expand contract"><div class="expand-message">Open Grid View</div><div class="arrow"></div></div>');
					element.children('.contract-and-expand').on('click', toggleGridHide);
				}
			}
		};
	});
