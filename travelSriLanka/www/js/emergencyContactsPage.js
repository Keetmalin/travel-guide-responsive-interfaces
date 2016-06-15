
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




};

//these methods will load the respective contacts of each category
function loadPolice() {

    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/loadPolice',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var divID = ["R11", "R12", "R13" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
            var headerID = ["R11H", "R12H", "R13H" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
            var telephoneID = ["R11T", "R12T", "R13T" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
            var addressID = ["R11A", "R12A", "R13A" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
            var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

            for (i = 0; i < 12 ; i++) {

                document.getElementById(divID[i]).style.display = "none";


            }



            for (i = 0; i < Object.keys(obj.result).length; i++) {

                document.getElementById(divID[i]).style.display = "block";
                document.getElementById(headerID[i]).innerText = obj.result[i].Name;
                document.getElementById(telephoneID[i]).innerText = 'Telephone: ' + obj.result[i].Telephone;
                document.getElementById(addressID[i]).innerText = 'Address: ' + obj.result[i].Address;

            }
            hideLoadingOverlay();

        }
    });

}
function loadHospital() {

    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/loadHospital',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var divID = ["R11", "R12", "R13" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
            var headerID = ["R11H", "R12H", "R13H" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
            var telephoneID = ["R11T", "R12T", "R13T" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
            var addressID = ["R11A", "R12A", "R13A" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
            var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

            for (i = 0; i < 12 ; i++) {

                document.getElementById(divID[i]).style.display = "none";


            }

            for (i = 0; i < Object.keys(obj.result).length; i++) {

                document.getElementById(divID[i]).style.display = "block";
                document.getElementById(headerID[i]).innerText = obj.result[i].Name;
                document.getElementById(telephoneID[i]).innerText = 'Telephone: ' + obj.result[i].Telephone;
                document.getElementById(addressID[i]).innerText = 'Address: ' + obj.result[i].Address;

            }
            hideLoadingOverlay();

        }
    });
}
function loadAirLine() {

    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/loadAirLine',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var divID = ["R11", "R12", "R13" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
            var headerID = ["R11H", "R12H", "R13H" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
            var telephoneID = ["R11T", "R12T", "R13T" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
            var addressID = ["R11A", "R12A", "R13A" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
            var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

            for (i = 0; i < 12 ; i++) {

                document.getElementById(divID[i]).style.display = "none";


            }

            for (i = 0; i < Object.keys(obj.result).length; i++) {

                document.getElementById(divID[i]).style.display = "block";
                document.getElementById(headerID[i]).innerText = obj.result[i].Name;
                document.getElementById(telephoneID[i]).innerText = 'Telephone: ' + obj.result[i].Telephone;
                document.getElementById(addressID[i]).innerText = 'Address: ' + obj.result[i].Address;

            }
            hideLoadingOverlay();

        }
    });
}
function loadBank() {

    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/loadBank',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var divID = ["R11", "R12", "R13" , "R14", "R21", "R22" , "R23", "R24", "R31" , "R32", "R33", "R34"];
            var headerID = ["R11H", "R12H", "R13H" , "R14H", "R21H", "R22H" , "R23H", "R24H", "R31H" , "R32H", "R33H", "R34H"];
            var telephoneID = ["R11T", "R12T", "R13T" , "R14T", "R21T", "R22T" , "R23T", "R24T", "R31T" , "R32T", "R33T", "R34T"];
            var addressID = ["R11A", "R12A", "R13A" , "R14A", "R21A", "R22A" , "R23A", "R24A", "R31A" , "R32A", "R33A", "R34A"];
            var districtID = ["R11D", "R12D", "R13D" , "R14D", "R21D", "R22D" , "R23D", "R24D", "R31D" , "R32D", "R33D", "R34D"];

            for (i = 0; i < 12 ; i++) {

                document.getElementById(divID[i]).style.display = "none";


            }

            for (i = 0; i < Object.keys(obj.result).length; i++) {

                document.getElementById(divID[i]).style.display = "block";
                document.getElementById(headerID[i]).innerText = obj.result[i].Name;
                document.getElementById(telephoneID[i]).innerText = 'Telephone: ' + obj.result[i].Telephone;
                document.getElementById(addressID[i]).innerText = 'Address: ' + obj.result[i].Address;

            }
            hideLoadingOverlay();

        }
    });
}


//set listeners to each button to display the relevant contacts of each category
document.getElementById("policeButton").addEventListener("click", loadPolice);
document.getElementById("hospitalButton").addEventListener("click", loadHospital);
document.getElementById("airLinesButton").addEventListener("click", loadAirLine);
document.getElementById("banksButton").addEventListener("click", loadBank);

//add new ontact to the database
function addNewContact() {

    var contactID = document.getElementById("contactID").value;
    var nameD = document.getElementById("nameD").value;
    var telephoneD = document.getElementById("telephoneD").value;
    var addressD = document.getElementById("addressD").value;
    var latD = document.getElementById("latD").value;
    var longD = document.getElementById("longD").value;
    var categoryD = document.getElementById("categoryD").value;

    $("#addNewEmergencyContact").modal("hide");
    showLoadingOverlay();

    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/addNewContact',
        dataType: 'jsonp',
        data: { contactID:contactID , nameD:nameD, telephoneD:telephoneD , addressD:addressD, latD:latD , longD:longD , categoryD:categoryD},
        success: function (obj, textstatus) {

            //hide the add new contact window
            $("#addNewEmergencyContact").modal("hide");

            // $("#register").modal("hide");
            // $("#loginSuccessful").modal("show");
            hideLoadingOverlay();


        }
    });
}

//sey listener to the addnew contact window button
document.getElementById("submit-buttonD").addEventListener("click", addNewContact);

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