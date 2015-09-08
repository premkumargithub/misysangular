var mod = angular.module('mockResources', []);
mod.service('resources', function() {
	return {
		get: function() {
			return {
				'Views': {
					'Home': {
						'Header': {
							'AccountManagementTabs': {
								'Messages': {
									'DisplayText': 'Messages'
								}
							}
						},
						'MainContent': {
							'GenericPanel': {
								'SaveButton': {
									'DisplayText': 'Save'
								},
								'CancelButton': {
									'DisplayText': 'Cancel'
								},
								'DeleteButton': {
									'DisplayText': 'Delete'
								}
							},
							'AddNew': {
								'DisplayText': 'Add new'
							},
							'FilterInput': {
								'FindButton': {
									'DisplayText': 'Find'
								}
							}
						},
						'Dashboard': {
							'DisplayText': 'Dashboard'
						},
						'Shortcuts': {
							'DisplayText': 'Shortcuts'
						},
						'Planning': {
							'DisplayText': 'Planning'
						},
						'Purchasing': {
							'DisplayText': 'Purchasing'
						},
						'Production': {
							'DisplayText': 'Production'
						},
						'StockControl': {
							'DisplayText': 'Stock Control'
						},
						'MasterFiles': {
							'DisplayText': 'Master Files',
							'Submenus': {
								'MasterFiles': {
									'DisplayText': 'Master Files',
									'Items': {
										'DisplayText': 'Items',
										'Tabs': {
											'Master': {
												'DisplayText': 'Master',
												'Legends': {
													'DefaultUnitsOfMeasure': {
														'DisplayText': 'Default Units of Measure'
													},
													'GeneralLedgerInterface': {
														'DisplayText': 'General Ledger Interface'
													},
													'SerialLotTracking': {
														'DisplayText': 'Serial/Lot Tracking'
													}
												},
												'Strings': {
													'ForEach': {
														'DisplayText': 'per'
													}
												}
											},
											'Stock': {
												'DisplayText': 'Stock',
												'Legends': {
													'Defaults': {
														'DisplayText': 'Defaults'
													}
												}
											},
											'Costs': {
												'DisplayText': 'Costs'
											},
											'History': {
												'DisplayText': 'History'
											}
										}
									},
									'Boms': {
										'DisplayText': 'Bills of Material',
										'Tabs': {
											'Header': {
												'DisplayText': 'Header'
											},
											'Revision': {
												'DisplayText': 'Revision'
											},
											'Material': {
												'DisplayText': 'Material'
											}
										}
									},
									'Suppliers': {
										'DisplayText': 'Suppliers',
										'Tabs': {
											'Address': {
												'DisplayText': 'Address',
												'Legends': {
													'Address': {
														'DisplayText': 'Address'
													},
													'ContactInformation': {
														'DisplayText': 'Contact Information'
													}
												}
											},
											'Items': {
												'DisplayText': 'Items'
											}
										}
									},
									'Jobs': {
										'DisplayText': 'Jobs',
										'Tabs': {
											'Header': {
												'DisplayText': 'Header',
												'Legends': {
													'AccumulatedCosts': {
														'DisplayText': 'Accumulated Costs'
													},
													'PurchasingCosts': {
														'DisplayText': 'Purchasing Costs'
													},
													'ProductionCosts': {
														'DisplayText': 'Production Costs'
													}
												}
											},
											'Quantities': {
												'DisplayText': 'Quantities'
											},
											'Costs': {
												'DisplayText': 'Costs'
											},
											'History': {
												'DisplayText': 'History'
											}
										}
									},
									'Locations': {
										'DisplayText': 'Locations',
										'Tabs': {
											'Address': {
												'DisplayText': 'Address',
												'Legends': {
													'Address': {
														'DisplayText': 'Address'
													},
													'GeneralLedgerInterface': {
														'DisplayText': 'General Ledger Interface'
													},
													'CASL': {
														'DisplayText': 'Corresponding Accounting Sales Location'
													}
												}
											},
											'Items': {
												'DisplayText': 'Items'
											},
											'Bins': {
												'DisplayText': 'Bins'
											},
											'BinHistory': {
												'DisplayText': 'Bin History'
											}
										}
									}
								},
								'LookUps': {
									'DisplayText': 'Look-Ups',
									'ProductCode': {
										'DisplayText': 'Product Code'
									}
								}
							}	
						},
						'Reports': {
							'DisplayText': 'Reports'
						},
						'Accounting': {
							'DisplayText': 'Accounting',
							'Submenus': {
								'Accounting': {
									'DisplayText': 'Accounting',
									'PeriodEnd': {
										'DisplayText': 'Period End'
									},
									'CostAdjustment': {
										'DisplayText': 'Cost Adjustment'
									},
									'ChartOfAccounts': {
										'DisplayText': 'Chart of Accounts'
									},
									'AccountsSets': {
										'DisplayText': 'Accounts Sets'
									},
									'AccountingReports': {
										'DisplayText': 'Accounting Reports'
									},
									'TaxServices': {
										'DisplayText': 'Tax Services'
									},
									'CurrencyServices': {
										'DisplayText': 'Currency Services'
									}
								}
							}
						},
						'Purchasing': {
							'DisplayText': 'Purchasing',
							'Submenus': {
								'Purchasing': {
									'DisplayText': 'Purchasing',
									'SupplySchedule': {
										'DisplayText': 'Supply Schedule'
									},
									'PurchaseOrders': {
										'DisplayText': 'Purchase Orders'
									},
									'ProcessMRP': {
										'DisplayText': 'Proces MRP'
									},
									'PrintSendOrders': {
										'DisplayText': 'Print/Send Orders'
									},
									'PurgeClosedOrders': {
										'DisplayText': 'Purge Closed Orders'
									},
									'PurchasingReports': {
										'DisplayText': 'Purchasing Reports'
									},
									'AdditionalCosts': {
										'DisplayText': 'Additional Costs'
									}
								}
							}
						},
						'Admin': {
							'DisplayText': 'Admin',
							'Submenus': {
								'Admin': {
									'DisplayText': 'Administration',
									'Users': {
										'DisplayText': 'Users',
										'VerifyPassword': {
											'DisplayText': 'Verify Password'
										},
										'PasswordsMatch': {
											'DisplayText': 'Passwords match.'
										},
										'PasswordsDoNotMatch': {
											'DisplayText': 'Please enter matching passwords.'
										}
									},
									'SecurityGroups': {
										'DisplayText': 'Security Groups',
										'Tabs': {
											'Permissions': {
												'DisplayText': 'Permissions'
											}
										}
									},
									'CompanyProfile': {
										'DisplayText': 'Company Profile'
									},
									'CompanyOptions': {
										'DisplayText': 'Company Options'
									}
								}
							}
						}
					},
					'Login': {
						'Footer': {
							'TOS': {
								'DisplayText': 'Terms of Service'
							},
							'PrivacyPolicy': {
								'DisplayText': 'Privacy Policy'
							},
							'UsePolicy': {
								'DisplayText': 'Use Policy'
							}
						},
						'Default': {
							'DisplayText': 'Log in',
							'CompanyID': {
								'DisplayText': 'Company ID'
							},
							'ForgotPassword': {
								'DisplayText': 'Forgot your password?'
							},
							'LoginButton': {
								'DisplayText': 'Login'
							},
							'SaveCompanyID': {
								'DisplayText': 'Save Company ID'
							}
						},
						'Recovery': {
							'Form': {
								'DisplayText': 'Reset your password',
								'CompanyName': {
									'DisplayText': 'Company ID'
								},
								'ContinueButton': {
									'DisplayText': 'Continue'
								},
								'HaveAuthCode': {
									'DisplayText': 'I already have an Authorization Code'
								}
							}, 
							'Aside': {
								'DisplayText': 'Having Trouble?',
								'CapsLock': {
									'DisplayText': 'Check that your CAPS LOCK is off.'
								},
								'TryAgain': {
									'DisplayText': 'Try logging in again by clicking your browser\'s Back button.'
								},
								'Continue': {
									'DisplayText': 'If you want to reset your password, enter your Company Name and User Name and click CONTINUE.'
								}
							}
						},
						'Authorization': {
							'Form': {
								'DisplayText': 'Enter your authorization code',
								'CompanyName': {
									'DisplayText': 'Company ID'
								},
								'AuthCode': {
									'DisplayText': 'Authorization code'
								},
								'ContinueButton': {
									'DisplayText': 'Continue'
								}
							},
							'Aside': {
								'DisplayText': 'Authorization email',
								'Emailed': {
									'DisplayText': 'We emailed an Authorization Code'
								},
								'To': {
									'DisplayText': ' to '
								},
								'FollowInstructions': {
									'DisplayText': '. Please follow the instructions in this email.'
								},
								'CheckSpam': {
									'DisplayText': 'If you cannot locate this email, it may have been gobbled up by an over-zealous spam filter.'
								},
								'Assistance': {
									'DisplayText': 'For additional assistance, please contact MISys Customer Service at 802-457-4600.'
								}
							}
						},
						'Security': {
							'Form': {
								'DisplayText': 'Enter your security answer',
								'CompanyName': {
									'DisplayText': 'Company ID'
								},
								'AuthCode': {
									'DisplayText': 'Authorization code'
								},
								'ContinueButton': {
									'DisplayText': 'Continue'
								}
							},
							'Aside': {
								'DisplayText': 'Security question and answer',
								'AnswerQuestion': {
									'DisplayText': 'To further secure your password recovery, please enter your security answer.'
								},
								'Assistance': {
									'DisplayText': 'For additional assistance, please contact MISys Customer Service at 802-457-4600.'
								}
							}
						},
						'Reset': {
							'Form': {
								'DisplayText': 'Reset Password',
								'NewPassword': {
									'DisplayText': 'New Password'
								},
								'NewPasswordConfirm': {
									'DisplayText': 'Confirm New Password'
								},
								'PasswordsMatch': {
									'DisplayText': 'Passwords match.'
								},
								'PasswordsDoNotMatch': {
									'DisplayText': 'Please enter matching passwords.'
								},
								'ResetButton': {
									'DisplayText': 'Reset'
								}
							},
							'Aside': {
								'DisplayText': 'Password requirements',
								'MinLength': {
									'DisplayText': 'Choose a password with at least 8 characters.'
								},
								'Pattern': {
									'DisplayText': 'Include 1 number, 1 upper-case character, 1 lower-case letter, and one special character (! @ # $ % & + ? *).'
								},
								'Additional': {
									'DisplayText': 'Note: Be sure to follow any additional requirements set by your company.'
								}
							}
						}
					}
				},
				'Directives': {
					'MiDataGrid': {
						'GroupingMessage': {
							'DisplayText': 'Drag a column header and drop it here to group by that column'
						},
						'Paging': {
							'Of': {
								'DisplayText': 'of'
							},
							'Items': {
								'DisplayText': 'items'
							}
						},
						'Commands': {
							'View': {
								'DisplayText': 'View'
							},
							'Edit': {
								'DisplayText': 'Edit'
							},
							'Delete': {
								'DisplayText': 'Delete'
							}
						}
					},
					'MiCapsTooltip': {
						'DisplayText': 'CAPS Lock is on.'
					},
					'MiHelpMenu': {
						'NewTab': {
							'DisplayText': 'Open Help in new tab'
						}
					},
					'ModalWindow': {
						'SaveMessage': {
							'DisplayText': 'Would you like to save changes for '
						},
						'SaveMessageGeneric': {
							'DisplayText': 'Would you like to save changes'
						}
					},
					'PasswordStrengthMeter': {
						'DisplayText': 'Password Strength',
						'StrengthLabels': {
							'Invalid': {
								'DisplayText': 'Does not meet requirements.'
							},
							'Weak': {
								'DisplayText': 'Weak'
							},
							'Fair': {
								'DisplayText': 'Fair'
							},
							'Good': {
								'DisplayText': 'Good'
							},
							'Strong': {
								'DisplayText': 'Strong'
							}
						}
					}
				},
				'Services':	{
					'ApiResource': {
						'BadNetwork': {
							'DisplayText': 'Unexpected network response, please try again soon.'
						},
						'CloseButton': {
							'DisplayText': 'Close'
						},
						'IncorrectAnswer': {
							'DisplayText': 'Security answer was incorrect.'
						}
					},
					'ModalWindow': {
						'DefaultHeading': {
							'DisplayText': 'Attention'
						},
						'CancelButton': {
							'DisplayText': 'Cancel'
						},
						'CloseButton': {
							'DisplayText': 'Close'
						},
						'NoButton': {
							'DisplayText': 'No'
						},
						'OkButton': {
							'DisplayText': 'OK'
						},
						'SaveButton': {
							'DisplayText': 'Save'
						},
						'YesButton': {
							'DisplayText': 'Yes'
						}
					}
				},
				'Resources': {
					'Account': {
						'Properties': {
							'ID': {
								'DisplayText': 'Account No.'
							},
							'Name': {
								'DisplayText': 'Description'
							},
							'Status': {
								'DisplayText': 'Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive'
								}
							},
							'Type': {
								'DisplayText': 'Type',
								'Options': {
									'0': 'Income Statement',
									'1': 'Balance Sheet',
									'2': 'Retained Earnings',
									'3': 'Bank',
									'4': 'Account Receivable',
									'5': 'Other Current Asset',
									'6': 'Fixed Asset',
									'7': 'Other Asset',
									'8': 'Accounts Payable',
									'9': 'Credit Card',
									'10': 'Other Current Liability',
									'11': 'Long Term Liability',
									'12': 'Equity',
									'13': 'Income',
									'14': 'COGS',
									'15': 'Expense',
									'16': 'Other Income',
									'17': 'Other Expense',
									'18': 'Cash',
									'19': 'Inventory Asset',
									'100': 'Undefined'
								}
							}
						}
					},
					'Bom': {
						'Properties': {
							'AllowEffectiveDateOverride': {
								'DisplayText': 'Allow Effective Date Override'
							},
							'AssemblyLead': {
								'DisplayText': 'Assembly Lead'
							},
							'AutoBuildOption': {
								'DisplayText': 'Auto-build',
								'Options': {
									'1':'Never',
									'2':'Zero',
									'3':'Minimum',
									'4':'Reorder'
								}
							},
							'Author': {
								'DisplayText': 'Author'
							},
							'BuildQuantity': {
								'DisplayText': 'Build Quantity'
							},
							'BurdenRate': {
								'DisplayText': 'Burden Rate'
							},
							'CostRollupEnabled': {
								'DisplayText': 'Cost Rollup Enabled'
							},
							'Description': {
								'DisplayText': 'Description'
							},
							'DocumentPath': {
								'DisplayText': 'Document Path'
							},
							'Eco': {
								'DisplayText': 'ECO No.'
							},
							'EffectiveEndDate': {
								'DisplayText': 'Effective To'
							},
							'EffectiveStartDate': {
								'DisplayText': 'Effective From'
							},
							'LastMaintainedDate': {
								'DisplayText': 'Last Maintained'
							},
							'Revision': {
								'DisplayText': 'Revision No.'
							},
							'RevisionDate': {
								'DisplayText': 'Revision Date'
							},
							'RevisionComment': {
								'DisplayText': 'Comment'
							},
							'UnitsPerLead': {
								'DisplayText': 'Units Per Lead'
							}
						}
					},
					'Item': {
						'DisplayText': 'Item',
						'Properties': {
							'AccountSetID': {
								'DisplayText': 'Account Set'
							},
							'Cost': {
								'DisplayText': 'Unit Cost'
							},
							'Cycle': {
								'DisplayText': 'Inventory Cycle'
							},
							'Description': {
								'DisplayText': 'Item Description'
							},
							'ExtendedDescription': {
								'DisplayText': 'Extended Description'
							},
							'ID': {
								'DisplayText': 'Item No.'
							},
							'LastPhysicalInventoryDate': {
								'DisplayText': 'Last PI Date'
							},
							'LeadInDays': {
								'DisplayText': 'Order Lead (Days)'
							},
							'LotDispensationMethod': {
								'DisplayText': 'Default Sort (TODO)',
								'Options': {
									'0': 'SL Number',
									'1': 'Expiration Date',
									'2': 'FIFO',
									'3': 'LIFO'
								}
							},
							'LotSize': {
								'DisplayText': 'Lot Size'
							},
							'MaximumLevel': {
								'DisplayText': 'Maximum'
							},
							'MinimumLevel': {
								'DisplayText': 'Minimum'
							},
							'OnOrderQuantity': {
								'DisplayText': 'On Order'
							},
							'Pick': {
								'DisplayText': 'Pick Sequence'
							},
							'PurchasingUnitOfMeasure': {
								'DisplayText': 'Purchase Unit'
							},
							'RecentCost': {
								'DisplayText': 'Recent Cost'
							},
							'Reference': {
								'DisplayText': 'Reference'
							},
							'ReorderQuantity': {
								'DisplayText': 'Reorder Quantity'
							},
							'ReorderLevel': {
								'DisplayText': 'Reorder Level'
							},
							'ReserveQuantity': {
								'DisplayText': 'Reserve'
							},
							'SalesID': {
								'DisplayText': 'Sales Item Number'
							},
							'StandardCost': {
								'DisplayText': 'Standard Cost'
							},
							'Status': {
								'DisplayText': 'Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive',
									'2': 'Engineering'
								}
							},
							'StockQuantity': {
								'DisplayText': 'Stock'
							},
							'StockingUnitOfMeasure': {
								'DisplayText': 'Stock Unit'
							},
							'Tracking': {
								'DisplayText': 'Serial/Lot Track Type',
								'Options': {
									'0': 'Common Item - Not Tracked',
									'1': 'Lot Tracked',
									'2': 'Serialized'
								}
							},
							'Type': {
								'DisplayText': 'Item Type',
								'Options': {
									'0': 'Raw Material',
									'1': 'Resource',
									'2': 'Assembled',
									'3': 'Bulk Issue',
									'4': 'Outside Processing',
									'99': 'Not Inventoried',
									'100': 'Comment Only'
								}
							},
							'Variance': {
								'DisplayText': 'Variance'
							},
							'Weight': {
								'DisplayText': 'Weight'
							},
							'WipQuantity': {
								'DisplayText': 'WIP'
							}
						}
					},
					'ItemLocation': {
						'Properties': {
							'LocationID': {
								'DisplayText': 'Location No.'
							},
							'PreferredLocation': {
								'DisplayText': 'Preferred'
							},
							'Pick': {
								'DisplayText': 'Pick Sequence'
							},
							'StockQuantity': {
								'DisplayText': 'Stock'
							},
							'WipQuantity': {
								'DisplayText': 'WIP'
							},
							'ReserveQuantity': {
								'DisplayText': 'Reserve'
							},
							'OrderQuantity': {
								'DisplayText': 'On Order'
							},
							'MaximumLevel': {
								'DisplayText': 'Maximum'
							},
							'MinimumLevel': {
								'DisplayText': 'Minimum'
							},
							'ReorderLevel': {
								'DisplayText': 'Reorder Level'
							},
							'ReorderQuantity': {
								'DisplayText': 'Reorder Quantity'
							},
							'Variance': {
								'DisplayText': 'PI Variance'
							},
							'LastPhysicalInventoryDate': {
								'DisplayText': 'Last PI Date'
							},
							'LastUsedDate': {
								'DisplayText': 'Last Date Used'
							}
						}
					},
					'ItemValuations': {
						'DisplayText': 'Item Valuations',
						'Properties': {
							'CostType': {
								'DisplayText': 'Cost Type',
								'Options': {
									'0': 'Standard',
									'1': 'Average',
									'2': 'Recent'
								}
							}
						}
					},
					'Jobs': {
						'DisplayText': 'Jobs',
						'Properties': {
							'ID': {
								'DisplayText': 'Job No.'
							},
							'Name': {
								'DisplayText': 'Description'
							},
							'Status': {
								'DisplayText': 'Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive'
								}
							},
							'AccountSetID': {
								'DisplayText': 'Account Set'
							},
							'AccumulatedOrderCost': {
								'DisplayText': 'On Order'
							},
							'AccumulatedReceivedCost': {
								'DisplayText': 'Received'
							},
							'AccumulatedReserveCost': {
								'DisplayText': 'Reserve'
							},
							'AccumulatedStockCost': {
								'DisplayText': 'Stock'
							},
							'AccumulatedUsedCost': {
								'DisplayText': 'Used'
							},
							'AccumulatedWipCost': {
								'DisplayText': 'WIP'
							},
							'DocumentPath': {
								'DisplayText': 'Document'
							}
						}
					},
					'JobDetails': {
						'Properties': {
							'JobItemID': {
								'DisplayText': 'Item No.'
							},
							'ItemDescription': {
								'DisplayText': 'Item Description'
							},
							'PartID': {
								'DisplayText': 'Part No.'
							},
							'PartDescription': {
								'DisplayText': 'Part Description'
							},
							'LocationID': {
								'DisplayText': 'Location No.'
							},
							'Type': {
								'DisplayText': 'Type'
							},
							'StockQuantity': {
								'DisplayText': 'Stock'
							},
							'WipQuantity': {
								'DisplayText': 'WIP'
							},
							'ReserveQuantity': {
								'DisplayText': 'Reserve'
							},
							'OrderQuantity': {
								'DisplayText': 'OnOrder'
							},
							'UsedQuantity': {
								'DisplayText': 'Used'
							},
							'ReceivedQuantity': {
								'DisplayText': 'Received'
							},
							'StockCost': {
								'DisplayText': 'Stock'
							},
							'WipCost': {
								'DisplayText': 'WIP'
							},
							'ReserveCost': {
								'DisplayText': 'Reserve'
							},
							'OrderCost': {
								'DisplayText': 'OnOrder'
							},
							'UsedCost': {
								'DisplayText': 'Used'
							},
							'ReceivedCost': {
								'DisplayText': 'Received'
							}
						}
					},
					'Location': {
						'Properties': {
							'AccountSegment': {
								'DisplayText': 'AccountSegment'
							},
							'AccountSetID': {
								'DisplayText': 'Account Set ID'
							},
							'Address1': {
								'DisplayText': 'Address1'
							},
							'Address2': {
								'DisplayText': 'Address2'
							},
							'Address3': {
								'DisplayText': 'Address3'
							},
							'Address4': {
								'DisplayText': 'Address4'
							},
							'BinDispensationMethod': {
								'DisplayText': 'BinDispensationMethod'
							},
							'City': {
								'DisplayText': 'City'
							},
							'ContactName': {
								'DisplayText': 'Contact Name'
							},
							'Country': {
								'DisplayText': 'Country'
							},
							'ExcludeFromMps': {
								'DisplayText': 'ExcludeFromMps'
							},
							'Fax': {
								'DisplayText': 'Fax'
							},
							'FieldXml': {
								'DisplayText': 'FieldXml'
							},
							'ID': {
								'DisplayText': 'Location No.'
							},
							'Name': {
								'DisplayText': 'Description'
							},
							'Phone': {
								'DisplayText': 'Phone'
							},
							'Reference': {
								'DisplayText': 'Reference'
							},
							'SalesLocationID': {
								'DisplayText': 'Sales Location ID'
							},
							'State': {
								'DisplayText': 'State'
							},
							'Status': {
								'DisplayText': 'Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive'
								}
							},
							'Zip': {
								'DisplayText': 'Zip'
							},
							'ResourceID': {
								'DisplayText': 'ResourceID'
							}
						}
					},
					'RecoveryValues': {
						'Properties': {
							'AuthCode': {
								'DisplayText': 'Authorization Code'
							}
						}
					},
					'SecurityGroup': {
						'Properties': {
							'ID': {
								'DisplayText': 'Group ID'
							},
							'Description': {
								'DisplayText': 'Description'
							},
							'Permissions': {
								'SelectAll': {
									'DisplayText': 'Select All'
								},
								'ModifyBatch': {
									'DisplayText': 'Modify Batch'
								},
								'PostBatch': {
									'DisplayText': 'Post Batch'
								},
								'PerformDirectTransfer': {
									'DisplayText': 'Perform Direct Transfer'
								},
								'EnableAutoBuild': {
									'DisplayText': 'Enable Auto Build'
								},
								'AdjustCosts': {
									'DisplayText': 'Adjust Costs'
								},
								'Assign': {
									'DisplayText': 'Assign'
								},
								'Delete': {
									'DisplayText': 'Delete'
								},
								'PurgeTransactionHistory': {
									'DisplayText': 'Purge Transaction History'
								},
								'Modify': {
									'DisplayText': 'Modify'
								},
								'ModifyBatch': {
									'DisplayText': 'Modify Batch'
								},
								'View': {
									'DisplayText': 'View'
								},
								'CustomizeUI': {
									'DisplayText': 'Customize UI'
								},
								'Post': {
									'DisplayText': 'Post'
								},
								'Release': {
									'DisplayText': 'Release'
								},
								'Start': {
									'DisplayText': 'Start'
								},
								'Complete': {
									'DisplayText': 'Complete'
								},
								'Invoice': {
									'DisplayText': 'Invoice'
								},
								'Close': {
									'DisplayText': 'Close'
								},
								'PurgeClosed': {
									'DisplayText': 'Purge Closed'
								},
								'Plan': {
									'DisplayText': 'Plan'
								},
								'PurgeDetails': {
									'DisplayText': 'Purge Details'
								},
								'Expedite': {
									'DisplayText': 'Expedite'
								},
								'Receive': {
									'DisplayText': 'Receive'
								},
								'Print': {
									'DisplayText': 'Print'
								},
								'ResetStatistics': {
									'DisplayText': 'Reset Statistics'
								},
								'ResetVariance': {
									'DisplayText': 'Reset Variance'
								},
								'BasicAccess': {
									'DisplayText': 'Basic Access'
								},
								'Setup': {
									'DisplayText': 'Setup'
								},
								'ShowCosts': {
									'DisplayText': 'Show Costs'
								},
								'ImportData': {
									'DisplayText': 'Import Data'
								},
								'ExportData': {
									'DisplayText': 'Export Data'
								},
								'PerformPeriodEnd': {
									'DisplayText': 'Perform Period End'
								},
								'PurgeTransactionHistory': {
									'DisplayText': 'Purge Transaction History'
								},
								'GLAccounts': {
									'DisplayText': 'GL Accounts'
								},
								'InstallCustomReports': {
									'DisplayText': 'Install Custom Reports'
								},
								'AdditionalPOCosts': {
									'DisplayText': 'Additional PO Costs'
								}
							}
						}
					},
					'Suppliers': {
						'Properties': {
							'Address1': {
								'DisplayText': 'Address1'
							},
							'Address2': {
								'DisplayText': 'Address2'
							},
							'Address3': {
								'DisplayText': 'Address3'
							},
							'Address4': {
								'DisplayText': 'Address4'
							},
							'City': {
								'DisplayText': 'City'
							},
							'Contact': {
								'DisplayText': 'Contact'
							},
							'ContactEmail': {
								'DisplayText': 'Email'
							},
							'Country': {
								'DisplayText': 'Country'
							},
							'CurrencyID': {
								'DisplayText': 'Currency'
							},
							'ID': {
								'DisplayText': 'Supplier No.'
							},
							'Fax': {
								'DisplayText': 'Fax'
							},
							'Name': {
								'DisplayText': 'Name'
							},
							'Phone': {
								'DisplayText': 'Telephone'
							},
							'Reference': {
								'DisplayText': 'Reference'
							},
							'ShortName': {
								'DisplayText': 'Short Name'
							},
							'State': {
								'DisplayText': 'State/Province'
							},
							'Status': {
								'DisplayText': 'Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive'
								}
							},
							'Terms': {
								'DisplayText': 'Terms'
							},
							'Website': {
								'DisplayText': 'Website'
							},
							'Zip': {
								'DisplayText': 'ZIP/Postal'
							}
						}
					},
					'User': {
						'Properties': {
							'AccountStatus': {
								'DisplayText': 'Account Status',
								'Options': {
									'0': 'Active',
									'1': 'Inactive',
									'2': 'Locked'
								}
							},
							'AccountType': {
								'DisplayText': 'Group ID'
							},
							'SecurityGroupID': {
								'DisplayText': 'Group ID'
							},
							'EmailAddress': {
								'DisplayText': 'Email Address'
							},
							'ID': {
								'DisplayText': 'User ID'
							},
							'Name': {
								'DisplayText': 'Name'
							},
							'Password': {
								'DisplayText': 'Password',
								'MinLength': {
									'DisplayText': 'Choose a password with at least 8 characters.'
								},
								'Pattern': {
									'DisplayText': 'Include 1 number, 1 upper-case character, 1 lower-case letter, and one special character (! @ # $ % & + ? *).'
								},
								'Additional': {
									'DisplayText': 'Note: Be sure to follow any additional requirements set by your company.'
								}
							},
							'RequireSecurityAnswer': {
								'DisplayText': 'Require Security Answer on Login'
							},
							'SecurityAnswer': {
								'DisplayText': 'Security Answer'
							},
							'SecurityQuestion': {
								'DisplayText': 'Security Question'
							}
						}
					}
				}
			};
		},
		getPropertyByString: function(strRef) {
			var i, objProperty = this.get(), properties = strRef.split('.');
			
			for(i = 0; i < properties.length; i+=1) {
				if(objProperty.hasOwnProperty(properties[i])) {
					objProperty = objProperty[properties[i]];
				} else {
					objProperty = {};
					break;
				}
			}
			
			return objProperty;
		}
	};
});