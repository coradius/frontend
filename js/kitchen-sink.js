var myApp = new Framework7({
	modalTitle: 'Coradius',
	material: true,
	cache: false,
	//swipePanel: 'left',
	cacheDuration: 0,
});
var $$ = Dom7;
var base_url = 'https://mappapi.coradius.in/api.php';
var mainView = myApp.addView('.view-main', {});
// Show/hide preloader for remote ajax loaded pages
$(document).on('ajaxStart', function (e) {
	if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
		return;
	}
	myApp.showPreloader();
});
$(document).on('ajaxComplete', function (e) {
	if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
		return;
	}
	myApp.hidePreloader();
});

document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false );
}

// Global variables to fetch data //
var token = localStorage.getItem("token");
var school_code = localStorage.getItem("school_code");
var username = localStorage.getItem("username");
var class_arr = localStorage.getItem("class");  // comma separated ex. I,II,III....
var sec_arr = localStorage.getItem("sec");  // comma separated ex. B,A....

function populate_select(id, arr) {
	valNew=arr.split(',');
	$.each(valNew, function(key, value) {
		$(id)
          .append($('<option>', { value : value })
          .text(value)); 
	});
}

function setcurrschoolcode(code) {
	var school_code_curr = code;
	localStorage.setItem("school_code_curr", school_code_curr);
	$$(".currschoolcode").text(' : '+school_code_curr);
}

myApp.onPageInit('cards', function (page) {
  console.log('About page initialized');
  //console.log(page);
});
myApp.onPageInit('students', function (page) {
	//console.log('Students....');
	populate_select("#class", class_arr);
	populate_select("#sec", sec_arr);
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$(".currschoolcode").text(school_code_curr);
	$$('.student_list').on('click', function () {
		var a = $$('#class').val();
		var b = $$('#sec').val();
		$$( "#student_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=student_list&token='+token+'&school_code='+school_code_curr+'&username='+username+'&class='+a+'&sec='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#student_data" ).html(
							$( "#studentlistTemplate" ).render( json.data.stu_list )
						);
					} else {
						$$( "#student_data" ).html("No Record Found.");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
	
});

myApp.onPageInit('fee2', function (page) {
	var calendarDefault = myApp.calendar({
        input: '#from2',
	});
	var calendarDefault = myApp.calendar({
        input: '#to2',
	});
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$('.fee_record2').on('click', function () {
		var a = $$('#from2').val();
		var b = $$('#to2').val();
		//$$('.fee_record').prop('disabled','disabled');
		//$$('.fee_record').text('Getting Record');
		$$('.ks-preloaders').css('display','block');
		$$.ajax({
			url: base_url + '?rquest=fee_record2&token='+token+'&school_code='+school_code_curr+'&username='+username+'&from='+a+'&to='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					$$('.ks-preloaders').css('display','none');
					if(json.data.fee_txn!=null) {
						$$( "#fee_txn_data" ).html(
							$( "#feetxnTemplate" ).render( json.data.fee_txn )
						);
					} else {
						$$( "#fee_txn_data" ).html("No Record Found.");
					}
					
					$$( "#fee_summary_data2" ).html(
						$( "#feerecordTemplate" ).render( json.data.summary )
					);
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
  
});

myApp.onPageInit('expenses', function (page) {
	var calendarDefault = myApp.calendar({
        input: '#from2',
	});
	var calendarDefault = myApp.calendar({
        input: '#to2',
	});
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$('.expenses2').on('click', function () {
		var a = $$('#from2').val();
		var b = $$('#to2').val();
		//$$('.fee_record').prop('disabled','disabled');
		//$$('.fee_record').text('Getting Record');
		$$('.ks-preloaders').css('display','block');
		$$.ajax({
			url: base_url + '?rquest=expenses&token='+token+'&school_code='+school_code_curr+'&username='+username+'&from='+a+'&to='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					$$('.ks-preloaders').css('display','none');
					if(json.data.exp_txn!=null) {
						$$( "#exp_txn_data" ).html(
							$( "#exptxnTemplate" ).render( json.data.exp_txn )
						);
					} else {
						$$( "#exp_txn_data" ).html("No Record Found.");
					}
					
					$$( "#exp_summary_data2" ).html(
						$( "#exprecordTemplate" ).render( json.data.exp_summary )
					);
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
  
});
myApp.onPageInit('fee', function (page) {
	var calendarDefault = myApp.calendar({
        input: '#from',
	});
	var calendarDefault = myApp.calendar({
        input: '#to',
	});
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$('.fee_record').on('click', function () {
		var a = $$('#from').val();
		var b = $$('#to').val();
		//$$('.fee_record').prop('disabled','disabled');
		//$$('.fee_record').text('Getting Record');
		$$('.ks-preloaders').css('display','block');
		$$.ajax({
			url: base_url + '?rquest=fee_record&token='+token+'&school_code='+school_code_curr+'&username='+username+'&from='+a+'&to='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					$$('.ks-preloaders').css('display','none');
					$$( "#fee_data" ).html(
						$( "#feerecordTemplate" ).render( json.data.daywise )
					);
					$$( "#fee_summary_data" ).html(
						$( "#feerecordTemplate" ).render( json.data.summary )
					);
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
  
});

myApp.onPageInit('visitor', function (page) {
	var calendarDefault = myApp.calendar({
        input: '#from_visit',
	});
	var calendarDefault = myApp.calendar({
        input: '#to_visit',
	});
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$('.visit_record').on('click', function () {
		var a = $$('#from_visit').val();
		var b = $$('#to_visit').val();
		$$( "#visit_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=visit_record&token='+token+'&school_code='+school_code_curr+'&username='+username+'&from='+a+'&to='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data.visitors!=null) {
						$$( "#visit_data" ).html(
							$( "#visitrecordTemplate" ).render( json.data.visitors )
						);
					} else {
						$$( "#visit_data" ).html("No Record Found.");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
  
});
myApp.onPageInit('staff', function (page) {
		$$( "#staff_data" ).html("");
		var school_code_curr = localStorage.getItem("school_code_curr");
		$$.ajax({
			url: base_url + '?rquest=staff_record&token='+token+'&school_code='+school_code_curr+'&username='+username,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#staff_data" ).html(
							$( "#stafflistTemplate" ).render( json.data.staff_record )
						);
					} else {
						$$( "#staff_data" ).html("No Record Found.");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
});

myApp.onPageInit('buslist', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$.ajax({
			url: base_url + '?rquest=getbuslist&token='+token+'&school_code='+school_code_curr+'&username='+username,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					 $.each(json.data, function(i, value) {
						$('#bus_no').append($('<option>').text(value).attr('value', i));
					});
					 //console.log(json.data);
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	
	
	$$('.buswise_list').on('click', function () {
		var a = $$('#bus_no').val();
		$$( "#bus_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=bus_student_list&token='+token+'&school_code='+school_code_curr+'&username='+username+'&bus_no='+a,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#bus_data" ).html(
							$( "#buslistTemplate" ).render( json.data.bus_list )
						);
					} else {
						$$( "#bus_data" ).html("No Record Found");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
	
});
myApp.onPageInit('useractivity', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	var calendarDefault = myApp.calendar({
        input: '#from',
	});
	var calendarDefault = myApp.calendar({
        input: '#to',
	});
	$$('.activity_record').on('click', function () {
		var a = $$('#from').val();
		var b = $$('#to').val();
		$$( "#activity_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=user_activity&token='+token+'&school_code='+school_code_curr+'&username='+username+'&from='+a+'&to='+b,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#activity_data" ).html(
							$( "#activityrecordTemplate" ).render( json.data.user_activity )
						);
					} else {
						$$( "#activity_data" ).html("No Record Found");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
	
});

myApp.onPageInit('academic', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$.ajax({
			url: base_url + '?rquest=getteachers&token='+token+'&school_code='+school_code_curr+'&username='+username,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					 $.each(json.data, function(i, value) {
						$('#teachername').append($('<option>').text(value).attr('value', value));
					});
					 //console.log(json.data);
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	
	
	$$('.academic_d_report').on('click', function () {
		var a = $$('#teachername').val();
		$$( "#academic_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=academic_delivery&token='+token+'&school_code='+school_code_curr+'&username='+username+'&teachername='+a,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#academic_data" ).html(
							$( "#academiclistTemplate" ).render( json.data.academic_delivery )
						);
					} else {
						$$( "#academic_data" ).html("No Record Found.");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
	
});

myApp.onPageInit('activitycalendar', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$('.calendar_record').on('click', function () {
		var a = $$('#month').val();
		$$( "#calendar_data" ).html("");
		$$.ajax({
			url: base_url + '?rquest=activity_calendar&token='+token+'&school_code='+school_code_curr+'&username='+username+'&month='+a,
			method: 'GET',
			success: function (json2) {
				var json = JSON.parse(json2);
				if (json.response == 200) {
					if(json.data!=null) {
						$$( "#calendar_data" ).html(
							$( "#calendarTemplate" ).render( json.data.activity_data )
						);
					} else {
						$$( "#calendar_data" ).html("No Record Found.");
					}
				} else {
					//document.location.href='login.html';
				}
			},
			failed: function (data) {
				//document.location.href='login.html';
			}
		});
	});
	
});

myApp.onPageInit('studentview', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	var adm_no = page.query.adm_no; // returning "new"
	$$( "#basic_data" ).html("");
	$$( "#family_data" ).html("");
	$$.ajax({
		url: base_url + '?rquest=studentview&token='+token+'&school_code='+school_code_curr+'&username='+username+'&adm_no='+adm_no,
		method: 'GET',
		success: function (json2) {
			var json = JSON.parse(json2);
			if (json.response == 200) {
				if(json.data!=null) {
					$$( "#stu_photo" ).attr("src",json.data.photo);
					$$( "#basic_data" ).html(
						$( "#basicTemplate" ).render( json.data.basic )
					);
					$$( "#family_data" ).html(
						$( "#familyTemplate" ).render( json.data.family )
					);
					if(json.data.fee != null) {
						$$( "#feehead_data" ).html(
							$( "#feeheadTemplate" ).render( json.data.fee )
						);
					}
					$$( "#total_fee" ).html(json.data.total_fee);
					$$( "#head_label_tp" ).html(json.data.fee_tp[0]['head']);
					$$( "#head_amt_tp" ).html(json.data.fee_tp[0]['head_amt']);
					$$( "#total_fee_tp" ).html(json.data.total_fee_tp);
					$$( "#fee_cat" ).html(json.data.fee_cat);
					$$( "#fee_paid" ).html(json.data.total_paid);
					$$( "#fee_balance" ).html(json.data.total_balance);
					$$( "#feerec_data" ).html(
						$( "#feerecTemplate" ).render( json.data.fee_record )
					);
				} else {
					$$( "#basic_data" ).html("No Record Found.");
				}
			} else {
				//document.location.href='login.html';
			}
		},
		failed: function (data) {
			//document.location.href='login.html';
		}
	});
});

myApp.onPageInit('staffview', function (page) {
	var school_code_curr = localStorage.getItem("school_code_curr");
	var staff_id = page.query.id; // returning "new"
	$$( "#staffbasic_data" ).html("");
	$$.ajax({
		url: base_url + '?rquest=staffview&token='+token+'&school_code='+school_code_curr+'&username='+username+'&id='+staff_id,
		method: 'GET',
		success: function (json2) {
			var json = JSON.parse(json2);
			if (json.response == 200) {
				if(json.data!=null) {
					$$( "#staff_photo" ).attr("src",json.data.photo);
					$$( "#staffbasic_data" ).html(
						$( "#staffbasicTemplate" ).render( json.data.basic )
					);
					$$( "#staffext_data" ).html(
						$( "#staffextTemplate" ).render( json.data.ext )
					);
				} else {
					$$( "#staffbasic_data" ).html("No Record Found.");
				}
			} else {
				//document.location.href='login.html';
			}
		},
		failed: function (data) {
			//document.location.href='login.html';
		}
	});
});

myApp.onPageInit('classwise', function (page) {
	$$( "#strength_data" ).html("");
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$.ajax({
		url: base_url + '?rquest=strength&token='+token+'&school_code='+school_code_curr+'&username='+username,
		method: 'GET',
		success: function (json2) {
			var json = JSON.parse(json2);
			if (json.response == 200) {
				if(json.data!=null) {
					$$( "#strength_data" ).html(
						$( "#strengthTemplate" ).render( json.data.strength )
					);
					$$( "#TT" ).html(json.data.TT);
					$$( "#NT" ).html(json.data.NT);
					$$( "#OT" ).html(json.data.OT);
					$$( "#MT" ).html(json.data.MT);
					$$( "#FT" ).html(json.data.FT);
				} else {
					$$( "#strength_data" ).html("No Record Found.");
				}
			} else {
				//document.location.href='login.html';
			}
		},
		failed: function (data) {
			//document.location.href='login.html';
		}
	});
});

myApp.onPageInit('income', function (page) {
	$$( "#rcvbl_data" ).html("");
	var school_code_curr = localStorage.getItem("school_code_curr");
	$$(".currschoolcode").text(school_code_curr);
	$$.ajax({
		url: base_url + '?rquest=income&token='+token+'&school_code='+school_code_curr+'&username='+username,
		method: 'GET',
		success: function (json2) {
			var json = JSON.parse(json2);
			if (json.response == 200) {
				if(json.data!=null) {
					$$( "#rcvbl_data" ).html(
						$( "#rcvblTemplate" ).render( json.data.recvl )
					);
					$$( "#recvd_data" ).html(
						$( "#recvdTemplate" ).render( json.data.recvd )
					);
					$$( "#bal_data" ).html(
						$( "#balTemplate" ).render( json.data.balance )
					);
					$$("#net_rcvbl").text(json.data.net_rcvbl);
					$$("#net_rcvd").text(json.data.net_rcvd);
					$$("#net_bal_amt").text(json.data.net_bal_amt);
					$$("#net_bal_per").text(json.data.net_bal_per);
				} else {
					$$( "#rcvbl_data" ).html("No Record Found.");
					$$( "#recvd_data" ).html("No Record Found.");
				}
			} else {
				//document.location.href='login.html';
			}
		},
		failed: function (data) {
			//document.location.href='login.html';
		}
	});
});

myApp.onPageInit('logout', function (page) {
	localStorage.removeItem("token");
	localStorage.removeItem("school_code");
	localStorage.removeItem("school_code_curr");
	localStorage.removeItem("username");
	localStorage.removeItem("class");  // comma separated ex. I,II,III....
	localStorage.removeItem("sec");  // comma separated ex. B,A....
	document.location.href='index.html';
});


function dashboard() {
	if(token != null && token != 'undefined' && username != null && username != 'undefined' && school_code != null && school_code != 'undefined') {
		$$.ajax({
			url: base_url + '?rquest=dashboard&token='+token+'&school_code='+school_code+'&username='+username,
			method: 'GET',
			success: function (data) {
				var json = JSON.parse(data);
				if (json.response == 200) {
					
					var codes = json.data.code;
					var for_info = codes[0];
					setcurrschoolcode(for_info);
					$$("#logo").attr('src', json.data[for_info].logo);
					$$("#school_title").text(json.data[for_info].school_title);
					//console.log(json.data.code);
					
					var location_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						location_data.push({
							location: code_data.school_add,
							code: val,
						});
					});
					
					
					
					$$( "#location" ).html(
					  $( "#locationTemplate" ).render( location_data )
					)
					
					var mode_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						$$.each(code_data.mode, function (key2, val2) {
							mode_data.push(val2);
						});
					});
					
					$$( "#modearea" ).html(
					  $( "#modeTemplate" ).render( mode_data )
					)
					
					var type_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						$$.each(code_data.type, function (key2, val2) {
							type_data.push(val2);
						});
					});
					
					$$( "#typearea" ).html(
					  $( "#typeTemplate" ).render( type_data )
					)
					var total_coll = 0;
					var total_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						total_data.push({
							location: code_data.school_add, 
							amount:  code_data.today
						});
						var to_add = parseInt(code_data.today) || 0;
						total_coll = total_coll + to_add;
					});
					
					$$("#total_coll").text(total_coll);
					
					$$( "#totalarea" ).html(
					  $( "#totalTemplate" ).render( total_data )
					)
					
					var strength_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						$$.each(code_data.strength, function (key2, val2) {
							strength_data.push(val2);
						});
					});
					
					$$( "#strentharea" ).html(
						$( "#strenthTemplate" ).render( strength_data )
					);
					
					var attenhead_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						attenhead_data.push({
							location: code_data.school_add,
							present: code_data.staff_atten.Present,
							absent: code_data.staff_atten.Absent,
							leave: code_data.staff_atten.Leave,
							late: code_data.staff_atten.Late
						});
					});
					
					//console.log(attenhead_data);
					
					$$( "#attendanceheadarea" ).html(
						$( "#attendanceheadTemplate" ).render( attenhead_data )
					);
					
					var stu_attenhead_data = [];
					$$.each(codes, function (key, val) {
						var code_data = json.data[val];
						stu_attenhead_data.push({
							location: code_data.school_add,
							present: code_data.stu_atten.Present,
							absent: code_data.stu_atten.Absent,
							leave: code_data.stu_atten.Leave,
							holiday: code_data.stu_atten.Holiday
						});
					});
					
					//console.log(attenhead_data);
					
					$$( "#studentattendanceheadarea" ).html(
						$( "#studentattendanceheadTemplate" ).render( stu_attenhead_data )
					);
					
					//$$("#present").text(json.data.staff_atten.Present);
					//$$("#absent").text(json.data.staff_atten.Absent);
					//$$("#leave").text(json.data.staff_atten.Leave);
					//$$("#late").text(json.data.staff_atten.Late);
					//$$("#spresent").text(json.data.stu_atten.Present);
					//$$("#sabsent").text(json.data.stu_atten.Absent);
					//$$("#sleave").text(json.data.stu_atten.Leave);
					//$$("#sholiday").text(json.data.stu_atten.Holiday);
					
				} else {
					document.location.href='index.html';
				}
			},
			failed: function (data) {
				document.location.href='index.html';
			}
		});
	} else {
		document.location.href='index.html';
	}
}