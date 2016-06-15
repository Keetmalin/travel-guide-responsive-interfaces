
window.onload = function() {

    //-------------------------------------------------------------------------------------
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
    //-------------------------------------------------------------------------------------

    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/ridePage',
        dataType: 'jsonp',

        success: function (obj, textstatus) {

            //load details from the database
            var divID = ["R11", "R12", "R13" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
            var headerID = ["R11H", "R12H", "R13H" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
            var telephoneID = ["R11T", "R12T", "R13T" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
            var addressID = ["R11A", "R12A", "R13A" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
            var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

            for (i = 0; i < Object.keys(obj.result).length; i++) {
                document.getElementById(divID[i]).style.display = "block";
                document.getElementById(headerID[i]).innerText = obj.result[i].Name;
                document.getElementById(telephoneID[i]).innerText = 'Vehicle: ' + obj.result[i].Vehicle;
                document.getElementById(addressID[i]).innerText = 'Capacity: ' + obj.result[i].Capacity;
                document.getElementById(districtID[i]).innerText = 'District: ' + obj.result[i].District;
            }

            hideLoadingOverlay();

        }
    });


};

//pass index of each element to the next page
function loadModalOne() {
    sessionStorage.setItem("rideIndex", 0);
}
function loadModalTwo() {
    sessionStorage.setItem("rideIndex", 1);
}
function loadModalThree() {
    sessionStorage.setItem("rideIndex", 2);
}
function loadModalFour() {
    sessionStorage.setItem("rideIndex", 3);
}
function loadModalFive() {
    sessionStorage.setItem("rideIndex", 4);
}
function loadModalSix() {
    sessionStorage.setItem("rideIndex", 5);
}
function loadModalSeven() {
    sessionStorage.setItem("rideIndex", 6);
}
function loadModalEight() {
    sessionStorage.setItem("rideIndex", 7);
}
function loadModalNine() {
    sessionStorage.setItem("rideIndex", 8);
}
function loadModalTen() {
    sessionStorage.setItem("rideIndex", 9);
}
function loadModalEleven() {
    sessionStorage.setItem("rideIndex", 10);
}
function loadModalTwelve() {
    sessionStorage.setItem("rideIndex", 11);
}
//set listenenrs to each view button in  the page
document.getElementById("R11B").addEventListener("click", loadModalOne);
document.getElementById("R12B").addEventListener("click", loadModalTwo);
document.getElementById("R13B").addEventListener("click", loadModalThree);
document.getElementById("R14B").addEventListener("click", loadModalFour);
document.getElementById("R21B").addEventListener("click", loadModalFive);
document.getElementById("R22B").addEventListener("click", loadModalSix);
document.getElementById("R23B").addEventListener("click", loadModalSeven);
document.getElementById("R24B").addEventListener("click", loadModalEight);
document.getElementById("R31B").addEventListener("click", loadModalNine);
document.getElementById("R32B").addEventListener("click", loadModalTen);
document.getElementById("R33B").addEventListener("click", loadModalEleven);
document.getElementById("R34B").addEventListener("click", loadModalTwelve);

//-------------------------------------------------------------------------------------
//main functionalities used in the user bundle

function showLoadingOverlay() {
    var loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'block';
    var clock = document.getElementById('clock');
    clock.style.display = 'block';
}

function hideLoadingOverlay() {
    var loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'none';
    var clock = document.getElementById('clock');
    clock.style.display = 'none';
}

function signin() {

    showLoadingOverlay();
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/login',
        dataType: 'jsonp',
        data: { userName: userName , password: password },
        success: function (obj, textstatus) {
            //window.alert(obj.keet);
            if ( obj.value == 0 ){

                hideLoadingOverlay();
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
                    //alert();
                    if((sessionStorage.getItem("category")) == "Admin" ){

                        document.getElementById("adminPanelButton").style.display = "block";
                    }
                    //set the userName display area as current logged in user
                    document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");

                    hideLoadingOverlay();
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
    window.location.href = "index.html";
}

function register() {

    showLoadingOverlay();

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
        url: 'http://travelsl.herokuapp.com/user/register',
        dataType: 'jsonp',
        data: { userNameR:userNameR, nameR:nameR , emailR:emailR , passwordR:passwordR , repasswordR:repasswordR , category:category},
        success: function (obj, textstatus) {

            sessionStorage.setItem("userName", userNameR);
            sessionStorage.setItem("category" , category);
            //set current user of the system
            document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");

            //on success, display success msgs, hide current register modal
            $("#selectCategory").modal("hide");
            $("#register").modal("hide");
            hideLoadingOverlay();
            $("#loginSuccessful").modal("show");
        }
    });
}

function registerCorporateAccount() {

    showLoadingOverlay();

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
        url: 'http://travelsl.herokuapp.com/user/register',
        dataType: 'jsonp',
        data: { userNameR: userNameR, nameR:nameR , emailR:emailR , passwordR:passwordR , repasswordR:repasswordR , category:category },
        success: function (obj, textstatus) {

            $("#selectCategory").modal("hide");
            $("#registerCorporateAccount").modal("hide");


            jQuery.ajax({
                type: "GET",
                url: 'http://travelsl.herokuapp.com/user/registerCorporate',
                dataType: 'jsonp',
                data: { userNameR: userNameR, telephone:telephone , Address:Address , District:District , account_id:account_id  , description:description},
                success: function (obj, textstatus) {

                    //if the registration is for a ride
                    if (category == "Driver"){
                        vehicle = document.getElementById("vehicle").value;
                        capacity = document.getElementById("capacity").value;

                        jQuery.ajax({
                            type: "GET",
                            url: 'http://travelsl.herokuapp.com/user/registerDriver',
                            dataType: 'jsonp',
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
                            url: 'http://travelsl.herokuapp.com/user/registerHotel',
                            dataType: 'jsonp',
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
                            url: 'http://travelsl.herokuapp.com/user/registerGuide',
                            dataType: 'jsonp',
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
                            url: 'http://travelsl.herokuapp.com/user/registerPhotographer',
                            dataType: 'jsonp',
                            data: {account_id:account_id },
                            success: function (obj, textstatus) {

                                sessionStorage.setItem("userName", userNameR);
                                sessionStorage.setItem("category" ,category);
                                document.getElementById("userNameSession").innerHTML = sessionStorage.getItem("userName");
                            }
                        });
                    }
                    hideLoadingOverlay();
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
        document.getElementById('myProfileButton').style.display = "none";
        document.getElementById('inboxButton').style.display = "none";

    }
    else{
        document.getElementById('loginButton').style.display = "none";
        document.getElementById('registerButton').style.display = "none";
        document.getElementById('logoutButton').style.display = "block";
        document.getElementById('myProfileButton').style.display = "block";
        document.getElementById('inboxButton').style.display = "block";
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
            url: 'http://travelsl.herokuapp.com/user/getMessages',
            dataType: 'jsonp',
            data: { userName:userName},
            success: function (obj, textstatus) {


                if ( obj.result == ""){

                }
                else{
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



            }
        });
    }

}
//-------------------------------------------------------------------------------------