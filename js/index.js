	var myApp = new Framework7({
		modalTitle: 'Coradius',
		material: true,
	});
	var $$ = Dom7;
	var base_url = 'https://mappapi.coradius.in/api.php';
	var mainView = myApp.addView('.view-main', {});
	var token = localStorage.getItem("token");
	var school_code = localStorage.getItem("school_code");
	var username = localStorage.getItem("username");
	if(navigator.onLine==true) {
		if(token != null && token != 'undefined' && username != null && username != 'undefined' && school_code != null && school_code != 'undefined') {
			$$.ajax({
				url: base_url + '?rquest=dashboard&token='+token+'&username='+username+'&school_code='+school_code,
				method: 'GET',
				success: function (data) {
					var json = JSON.parse(data);
					if (json.response == 200) {
						document.location.href='dashboard.html';
					} else {
						//document.location.href='index.html';
					}
				},
				failed: function (data) {
					//document.location.href='index.html';
				}
			});
		} else {
				$$('.button').on('click', function () {
				var b = $$('#username').val();
				var c = $$('#password').val();
				$$('.button').prop('disabled','disabled');
				$$('.button').text('Signing In');
				$$('.ks-preloaders').css('display','block');
				$$.ajax({
					url: base_url + '?rquest=verifyschool_code&username='+b+'&password='+c+'&format=json',
					method: 'GET',
					success: function (json2) {
						var json = JSON.parse(json2);
						if (json.response == 200) {
							$$('.ks-preloaders').css('display','none');
							var codes = json.data.code;
							var for_info = codes[0];
							localStorage.setItem("school_code_curr", for_info);
							localStorage.setItem("token", json.data.token);
							localStorage.setItem("school_code", json.data.code);
							localStorage.setItem("username", json.data.username);
							localStorage.setItem("class", json.data.class);
							localStorage.setItem("sec", json.data.sec);
							document.location.href='dashboard.html';
						} else {
							$$('.button').prop('disabled',false);
							$$('.button').text('Sign In');
							$$('.ks-preloaders').css('display','none');
							$$("#msg").html("<b>Invalid Username/Password.</b>");
						}
					},
					failed: function (data) {
						$$('.ks-preloaders').css('display','none');
						document.location.href='index.html';
					}
				});
			});
		}
	} else {
		$$("#msg").html("<b style='color:red;'>No Internet.</b>");
	}