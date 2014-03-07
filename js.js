function submitcheck() {
    $("#name").css("border", "1px solid white");
    $("#age").css("border", "1px solid white");
    $("#yoe").css("border", "1px solid white");
    $("#ttu").css("border", "1px solid white");
    $(".error").html("");
    var name = $("#Name").val();
    var age = $("#Age").val();
    var YOE = $("#YOE").val();
    var TTU = $("#TTU").val();
    var Gender=$("#Gender").val();
    var miranda = [0, 0, 0, 0];
    if (name == "") {
        miranda[0] = 1;
        $("#name2").html("* Name should not be blank!!");
        $("#name").css("border", "1px solid red ");
        $("#name").css("margin-left", "9");
    };
    if (age == "") {
        miranda[1] = 1;
        $("#age2").html("* Age should not be blank!!");
        $("#age").css("border", "1px solid red ");
    };
    if (YOE == "") {
        miranda[2] = 1;
        $("#yoe2").html("* Year of Experience should not be blank!!");
        $("#yoe").css("border", "1px solid red");
    };
    if (TTU == "") {
        miranda[3] = 1;
        $("#ttu2").html("* Talent Tree URL should not be blank!!");
        $("#ttu").css("border", "1px solid red");
    };
    var sunny = [" Name ", " Age ", " Year Of Exp. ", " Talent Tree URL "];
    var s1 = " should not be blank!!";
    var s2 = "";
    for (var i = 0; i != 4; ++i) {
        if (miranda[i] == 1) {
            if (s2 != "") {
                s2 = s2 + "&" + sunny[i];
            }
            if (s2 == "") {
                s2 = sunny[i];
            }

        };
    };
    var al1 = 0;
    for (var i = 0; i != 4; ++i) {
        if (miranda[i] != 0) {
            al1++;
        };
    };
    if (al1 != 0) {
        $("#cover").append("<p>" + s2 + s1 + "</p>");
    }
    var ageint = parseInt(age);
    var YOEint = parseInt(YOE);
    var sigage = 0;
    var sigyoe = 0;
    if (ageint < 0 || ageint > 99 || isNaN(ageint) && miranda[1] != 1) {
        $("#cover").append("<p>You Have Input A Wrong Age</p>");
        $("#age2").html("* You Have Input A Wrong Age!!");
        $("#age").css("border", "1px solid red ");
        sigage = 1;
    };
    if (YOEint < 0 || YOEint > 99 || isNaN(YOEint) && miranda[2] != 1) {
        $("#cover").append("<p>You Have Input A Wrong Year of Exp.</p>");
        $("#yoe2").html("* You Have Input A Wrong Year of Exp.!!");
        $("#yoe").css("border", "1px solid red ");
        sigyoe = 1;
    };
    var sigurl = 0;
    var URLarray = TTU.split("_");
    if ((URLarray.length < 4 || URLarray.length > 4) && miranda[3] == 0) {
        sigurl = 1;
        $("#cover").append("<p>You Have Input A Wrong URL, it's should be \"_xxx(a~z & 0~9)_(1~22)_Your Name\"</p>");
        $("#ttu2").html("* You Have Input A Wrong URL, it's should be \"_xxx(a~z & 0~9)_(1~22)_Your Name\"!!");
        $("#ttu").css("border", "1px solid red ");
    };
    if (URLarray.length == 4) {
        var diyige = URLarray[0];
        var dierge = URLarray[1];
        var disange = URLarray[2];
        var disige = URLarray[3];
        if (diyige != "" || disange < 1 || disange > 22 || disige == "") {
            sigurl = 1;
        };
        if (sigurl == 1) {

            $("#cover").append("<p>You Have Input A Wrong URL #</p>");
            $("#ttu2").html("* You Have Input A Wrong URL, it's should be \"_xxx(a~z & 0~9)_(1~22)_Your Name\"!!");
            $("#ttu").css("border", "1px solid red ");
        }
    };
    var sigall = 0;
  	var siggender=0;
  	if(Gender!="Male"&&Gender!='Female')
    {
      $("#gender2").html("* You Have Input A Wrong Gender, it's should be \"Male\" or \"Female\" !!");
      siggender=1;
    }
    sigall = sigage + sigyoe + sigurl + al1+siggender;
    if (sigall == 0) {
        var str = "window.open('http://www.dungeonsanddevelopers.com')";
        str = "window.open('http://www.dungeonsanddevelopers.com/#" + TTU + "');";
        $("#connect").attr("onClick", str);
        var str2 = str + "connect2();";
        $("#connect2").attr("onClick", str2);
        str2 = "<p>You have successfully saved your data!</p>" + "<p>Your name is: " + name + "</p>" + "<p>Your age is: " + age + "</p>" + "<p>Your Experience Year is: " + YOE + "</p>" + "<p>Your URL is: " + TTU + "</p>";
        $("#total").css("display", "none");
        $("#successinfo").append(str2);
        $("#screenshot").css("display", "none");
        $("#successful").css("display", "block");
        //alert($("form").serialize());
        $.post("/postapi", $("form").serialize());
    };
    if (sigall != 0) {
        // $("#total").css("display", "none");
        // $("#Cover").css("display", "block");
    };
    changesub2val();
};

function submit2() {
    $("#total").css("display", "block");
    $("#Cover").css("display", "none");
    $("#cover").html("");
}


function changesub2val() {
    $("#submit2").attr("value", "Ok, I got it.(5)");
    $("#submit2").attr("onClick", "");
    var t1 = setTimeout("$('#submit2').attr('value','Ok, I got it.(4)')", 1000);
    var t2 = setTimeout("$('#submit2').attr('value','Ok, I got it.(3)')", 2000);
    var t3 = setTimeout("$('#submit2').attr('value','Ok, I got it.(2)')", 3000);
    var t4 = setTimeout("$('#submit2').attr('value','Ok, I got it.(1)')", 4000);
    var t5 = setTimeout("$('#submit2').attr('value','Ok, I got it.');$('#submit2').attr('onClick','submit2();')", 5000);
}

function connect2() {
    $("#successinfo").html("");
    $("#total").css("display", "block");
    $("#screenshot").css("display", "block");
    $("#successful").css("display", "none");
    var emailaddress = $('#OperateEmail').val();
    $.get('/getapi', {
        email: emailaddress
    }, function (data) {
        var temp = jQuery.parseJSON(data);
        //alert(temp.bool);
        if (temp.bool == 'False') {
            alert('Some error about DataBase, Please submit again!!!')
        };
        if (temp.bool == 'True') {
            if (temp.ADMIN == 'False') {
                var userinfo = 'Welcome user: ' + temp.name + " <a href='/index'>Logout</a>";
                //alert(temp.ADMIN)
                $('#connect').css('display', 'block');
            }
            if (temp.ADMIN == 'True') {
                var userinfo = 'Welcome Admin: ' + temp.name + " <a href='/index'>Logout</a>";
                $("#admin").css('display', 'block');
                $('#connect').css('display', 'block');
                $("#currentemail").css('display', 'block');
            }
            $("#connect").css('background', '-webkit-gradient(linear, center top, center bottom, from(#F2F5A9), to(#FFBF00))');
            $("#userinfo").html(userinfo);
        }

    });
};

function gettest() {
    $("#Email").css('border', '1px solid white');
    $("#emailerror").html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    var emailadd = $('#email').val();
    var addarray = emailadd.split('@');
    if (addarray.length == 2 && addarray[1] != '' && addarray[0] != '') {
        //$("#adminemail").attr("value",emailadd);
        $.get('/getapi', {
            email: emailadd
        }, function (data) {
            //alert(data);
            var temp = jQuery.parseJSON(data);
            if (temp.bool == 'False') {
                $("#Login").css('display', 'none');
                $("#total").css('display', 'block');
                $("#userinfo").html('Welcome!New User(' + emailadd + ')!!Please input your information and submit!');
                $("#userinfo").css('display', 'block');
                //$("#connect").css('display', 'none');
                $("#connect").css('background', '-webkit-gradient(linear, center top, center bottom, from(#6E6E6E), to(#F2F2F2))');
                $("#connect").attr('onClick', "alert('Please Successfully Submit You Data First!!')");
                var currentemailadd = $('#email').val();
                $("#OperateEmail").attr("value", currentemailadd);
                $("#currentemail").html("Current Operation Account is: " + currentemailadd);
            };
            if (temp.bool == 'True') {
                $("#Name").attr('value', temp.name);
                $("#Age").attr('value', temp.age);
                $("#YOE").attr('value', temp.yoe);
                $("#Gender").attr('value',temp.Gender);
                $("#TTU").attr('value', temp.URL);
                var str = "window.open('http://www.dungeonsanddevelopers.com')";
                str = "window.open('http://www.dungeonsanddevelopers.com/#" + $("#TTU").attr('value') + "');";
                $("#connect").attr("onClick", str);
                //alert($("#Name").val());
                $("#Login").css('display', 'none');
                $("#total").css('display', 'block');
                if (temp.ADMIN == 'False') {
                    var userinfo = 'Welcome user: ' + temp.name + " <a href='/index'>Logout</a>";
                }
                if (temp.ADMIN == 'True') {
                    var userinfo = 'Welcome Admin: ' + temp.name + " <a href='/index'>Logout</a>";
                    $("#admin").css('display', 'block');
                    $("#currentemail").css('display', 'block');
                }
                $("#userinfo").html(userinfo);
                $("#userinfo").css('display', 'block');
                var currentemailadd = $('#email').val();
                $("#currentemail").html("Current Operation Account is: " + currentemailadd);
                $("#OperateEmail").attr("value", currentemailadd);
                //alert(temp.ADMIN);
            };
        })
    } else {
        $("#Email").css('border', '1px solid red');
        $("#emailerror").html('&nbsp;* You should input a correct email address!');

    };
}

function Check() {
    $('#Adminemail').css('border', '1px solid white');
    var emailaddress = $('#adminemail').val();
    var addarray = emailaddress.split('@');
    if (addarray.length == 2 && addarray[1] != '' && addarray[0] != '') {
        var currentemailadd = $('#adminemail').val();
        $.get('/getapi', {
            email: currentemailadd
        }, function (data) {
            var temp = jQuery.parseJSON(data);
            if (temp.bool == 'True') {
                $("#currentemail").html("Current Operation Account is: " + currentemailadd);
                $("#OperateEmail").attr("value", currentemailadd);
                $("#Name").attr('value', temp.name);
                $("#Age").attr('value', temp.age);
                $("#YOE").attr('value', temp.yoe);
                $("#Gender").attr('value',temp.Gender);
                $("#TTU").attr('value', temp.URL);
                var str = "window.open('http://www.dungeonsanddevelopers.com')";
                str = "window.open('http://www.dungeonsanddevelopers.com/#" + $("#TTU").attr('value') + "');";
                $("#connect").attr("onClick", str);
            } else {

                $('#Adminemail').css('border', '1px solid red');
                alert('No such Account!!!Please input again!!');
            }

        });
        //$("#currentemail").html("Current Operation Account is: "+currentemailadd);
        //$("#OperateEmail").attr("value",currentemailadd);

    } else {
        $('#Adminemail').css('border', '1px solid red');
        alert('Plz input an emali adress. (Ex:abc123@abc.com)');
    }

}