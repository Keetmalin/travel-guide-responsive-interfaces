/**
 * Created by ASUS-PC on 5/23/2016.
 */

/**
 * Created by ASUS-PC on 5/23/2016.
 */


window.onload = function() {


//add session of the current user in the syste,. If no user, add guest as the current user
    if((sessionStorage.getItem("userName")) == null ){
        document.getElementById("userNameSession").innerHTML = 'Guest';
    }
    else{
        document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
    }
    //add listeners to the various buttons in the html page (respective)
    document.getElementById("login-button").addEventListener("click", signin);
    document.getElementById("logoutButton").addEventListener("click", logout);
    document.getElementById("register-button").addEventListener("click", register);
    document.getElementById("registerCorporateAccount-button").addEventListener("click", registerCorporateAccount);
    document.getElementById("category").addEventListener("click", showDiv);
    document.getElementById("userMenuID").addEventListener("click", showButton);
    document.getElementById("messageMenu").addEventListener("click", showMessages);

    jQuery.ajax({
        type: "GET",
        url: 'http://localhost/travelSL/web/user/photographerPage',
        dataType: 'json',

        success: function (obj, textstatus) {

            for (i = 0; i < Object.keys(obj.result).length; i++) {

                $('.list-group').append(
                    '<div ><span>'+
                    '<a href="#" class="list-group-item">' +
                    '<h4 class="list-group-item-heading">' +obj.result[i].Name + '</h4>' +
                    '<p class="list-group-item-text">Phone: ' + obj.result[i].Telephone +
                    ' , Address: ' + obj.result[i].Address +
                    ' , District: ' + obj.result[i].District +'</p>' +
                    ''+
                    '<button type="button" class="btn btn-danger btn-sm">Delete Account</button></span>'+
                    '</a></div>');

            }

        }
    });


};

//main functionalities used in the user bundle

function signin() {

    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    jQuery.ajax({
        type: "GET",
        url: 'http://localhost/travelSL/web/user/login',
        dataType: 'json',
        data: { userName: userName , password: password },
        success: function (obj, textstatus) {

            if ( obj.value == 0 ){

                //show the error modal
                $("#loginError").modal("show");
                //hide the log in window
                $("#logIn").modal("hide");

            }
            //following is executed if log in is successful
            else{
                //hide log in window
                $("#logIn").modal("hide");
                if (typeof(Storage) !== "undefined") {
                    // Store values as cookies in the sessions in the browser
                    sessionStorage.setItem("userName", obj.result[0].User_Username);
                    sessionStorage.setItem("category" , obj.result[0].category);
                    //set the userName display area as current logged in user
                    document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");

                    //display log in successful window
                    $("#loginSuccessful").modal("show");
                } else {
                    //if the browser does not support cookie requests
                    alert("Browser does not support alerts");
                }
            }

        }
    });

}

function logout() {
    //removes userName and category from the current browser cookie
    sessionStorage.removeItem("userName");
    //set default user as Guest in cookie
    sessionStorage.setItem("userName", "Guest");
    sessionStorage.removeItem("category");
    //set the name display area as guest
    document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");

}

function register() {

    //get necessary details from the input forms
    var userNameR = document.getElementById("userNameR").value;
    var nameR = document.getElementById("nameR").value;
    var emailR = document.getElementById("emailR").value;
    var passwordR = document.getElementById("passwordR").value;
    var repasswordR = document.getElementById("repasswordR").value;
    var category = 'Traveler';

    //send ajax request
    jQuery.ajax({
        type: "GET",
        url: 'http://localhost/travelSL/web/user/register',
        dataType: 'json',
        data: { userNameR:userNameR, nameR:nameR , emailR:emailR , passwordR:passwordR , repasswordR:repasswordR , category:category},
        success: function (obj, textstatus) {

            //on success, display success msgs, hide current register modal
            $("#register").modal("hide");
            $("#loginSuccessful").modal("show");
            sessionStorage.setItem("userName", userNameR);
            sessionStorage.setItem("category" , category);
            //set current user of the system
            document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
        }
    });
}

function registerCorporateAccount() {

    //get elements from html elements
    var userNameR = document.getElementById("userNameC").value;
    var nameR = document.getElementById("nameC").value;
    var emailR = document.getElementById("emailC").value;
    var passwordR = document.getElementById("passwordC").value;
    var repasswordR = document.getElementById("repasswordC").value;
    var telephone = document.getElementById("telephone").value;
    var Address = document.getElementById("Address").value;
    var District = document.getElementById("District").value;
    var account_id = document.getElementById("account_id").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("description").value;
    var vehicle;
    var capacity;
    var lat;
    var long;


    jQuery.ajax({
        type: "GET",
        url: 'http://localhost/travelSL/web/user/register',
        dataType: 'json',
        data: { userNameR: userNameR, nameR:nameR , emailR:emailR , passwordR:passwordR , repasswordR:repasswordR , category:category },
        success: function (obj, textstatus) {

            $("#registerCorporateAccount").modal("hide");

            jQuery.ajax({
                type: "GET",
                url: 'http://localhost/travelSL/web/user/registerCorporate',
                dataType: 'json',
                data: { userNameR: userNameR, telephone:telephone , Address:Address , District:District , account_id:account_id  , description:description},
                success: function (obj, textstatus) {

                    //if the registration is for a ride
                    if (category == "Driver"){
                        vehicle = document.getElementById("vehicle").value;
                        capacity = document.getElementById("capacity").value;

                        jQuery.ajax({
                            type: "GET",
                            url: 'http://localhost/travelSL/web/user/registerDriver',
                            dataType: 'json',
                            data: { vehicle: vehicle, capacity:capacity , account_id:account_id },
                            success: function (obj, textstatus) {

                                sessionStorage.setItem("userName", userNameR);
                                sessionStorage.setItem("category" ,category);
                                document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
                            }
                        });

                    }
                    //if the registration is for a hotel
                    else if (category == "Hotel"){
                        lat = document.getElementById("lat").value;
                        long = document.getElementById("long").value;

                        jQuery.ajax({
                            type: "GET",
                            url: 'http://localhost/travelSL/web/user/registerHotel',
                            dataType: 'json',
                            data: { lat:lat, long:long , account_id:account_id },
                            success: function (obj, textstatus) {

                                sessionStorage.setItem("userName", userNameR);
                                sessionStorage.setItem("category" ,category);
                                document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
                            }
                        });
                    }
                    //if the registration is for a guide
                    else if (category == "Guide"){

                        jQuery.ajax({
                            type: "GET",
                            url: 'http://localhost/travelSL/web/user/registerGuide',
                            dataType: 'json',
                            data: {account_id:account_id },
                            success: function (obj, textstatus) {

                                sessionStorage.setItem("userName", userNameR);
                                sessionStorage.setItem("category" ,category);
                                document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
                            }
                        });
                    }
                    //if the registration is for a photographer
                    else if (category == "Photographer"){

                        jQuery.ajax({
                            type: "GET",
                            url: 'http://localhost/travelSL/web/user/registerPhotographer',
                            dataType: 'json',
                            data: {account_id:account_id },
                            success: function (obj, textstatus) {

                                sessionStorage.setItem("userName", userNameR);
                                sessionStorage.setItem("category" ,category);
                                document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
                            }
                        });
                    }
                }
            });

        }
    });
}

function showDiv(){

    //this method is used to hide and show unnecessary html elements on the registration page, depending on the user type of registration
    if (document.getElementById("category").value == "Driver"){
        document.getElementById('vehicleDivision').style.display = "block";
        document.getElementById('hotelDivision').style.display = "none";
    }
    if (document.getElementById("category").value == "Hotel"){
        document.getElementById('vehicleDivision').style.display = "none";
        document.getElementById('hotelDivision').style.display = "block";
    }
    if (document.getElementById("category").value == "Photographer"){
        document.getElementById('vehicleDivision').style.display = "none";
        document.getElementById('hotelDivision').style.display = "none";
    }
    if (document.getElementById("category").value == "Guide"){
        document.getElementById('vehicleDivision').style.display = "none";
        document.getElementById('hotelDivision').style.display = "none";
    }
}

function showButton(){
    //this controls the log in , log out, register buttons of the user menu,
    //depending on the user session currently the system is in
    if((sessionStorage.getItem("userName")) == null || sessionStorage.getItem("userName") == 'Guest'){
        document.getElementById('loginButton').style.display = "block";
        document.getElementById('registerButton').style.display = "block";
        document.getElementById('logoutButton').style.display = "none";
    }
    else{
        document.getElementById('loginButton').style.display = "none";
        document.getElementById('registerButton').style.display = "none";
        document.getElementById('logoutButton').style.display = "block";
    }

}

function showMessages(){
    //this method shows the messages of the payments and other notifications of the user logged in

    if((sessionStorage.getItem("userName")) == null || sessionStorage.getItem("userName") == 'Guest'){

    }
    else{
        var userName = sessionStorage.getItem("userName");
        jQuery.ajax({
            type: "GET",
            url: 'http://localhost/travelSL/web/app_dev.php/user/getMessages',
            dataType: 'json',
            data: { userName:userName},
            success: function (obj, textstatus) {

                var divID = ["message1", "message2", "message3" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
                var account = ["corporateAccountName1", "corporateAccountName2", "corporateAccountName3" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
                var timeAndDate = ["timeAndDate1", "timeAndDate2", "timeAndDate3" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
                var message = ["messageDescription1", "messageDescription2", "messageDescription3" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
                var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

                for (i = 0; i < 3; i++) {

                    document.getElementById(divID[i]).style.display = "block";
                    document.getElementById(account[i]).innerText = obj.result[i].User_Username;
                    document.getElementById(timeAndDate[i]).innerText = obj.result[i].Time + ' & ' + obj.result[i].Date;
                    document.getElementById(message[i]).innerText = 'Payment Made for: ' + obj.result[i].Amount + ' & Number of days on reservation: ' + obj.result[i].Description;
                    //document.getElementById(districtID[i]).innerText = 'District: ' + obj.result[i].District;
                }

            }
        });
    }

}