
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

    getScore(false);
    index = sessionStorage.getItem("photographerIndex");
    document.getElementById("makePayment").addEventListener("click", makePayment);
    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/photographerPage',
        dataType: 'jsonp',

        //view details loaded from the databsae of each unit
        success: function (obj, textstatus) {

            document.getElementById('modalDescription').innerText = obj.result[index].description;
            document.getElementById('modalTelephone').innerText = 'Phone: ' + obj.result[index].Telephone;
            document.getElementById('modalAddress').innerText = 'Address: ' + obj.result[index].Address;
            document.getElementById('modalDistrict').innerText = 'District: ' + obj.result[index].District;

            hideLoadingOverlay();

        }
    });


};
function getScore(status){
    showLoadingOverlay();
    index = sessionStorage.getItem("photographerIndex");
    var score = 1;
    //
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/photographerPage',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var account_id = obj.result[index].account_id;

            jQuery.ajax({
                type: "GET",
                url: 'http://travelsl.herokuapp.com/user/getReview',
                dataType: 'jsonp',
                data: { account_id:account_id},
                //load details from the database
                success: function (obj, textstatus) {



                    var sum=0;
                    for (i = 0; i < Object.keys(obj.result).length; i++) {

                        sum= sum+ Number(obj.result[i].review);
                    }
                    

                    if (Object.keys(obj.result).length == 0){
                        score = 1;
                    }
                    else{
                        score = sum/Object.keys(obj.result).length;
                    }
                    score = Math.round(score * 100) / 100

                    if (status){
                        $('#star').raty({
                            score    : score,
                            readOnly : true,
                            path: 'lib/img',
                            half: true,
                            number: 5,
                            click: function(score, evt) {
                                setScore(score);
                            }
                        });
                    }else{
                        $('#star').raty({
                            score    : score,
                            path: 'lib/img',
                            half: true,
                            number: 5,
                            click: function(score, evt) {
                                setScore(score);
                            }
                        });
                    }

                    document.getElementById("rating").innerText='Rating: ' + score + ' (' + Object.keys(obj.result).length + ')' ;
                }
            });

            hideLoadingOverlay();
        }
    });
}

function setScore(score){
    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/photographerPage',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var account_id = obj.result[index].account_id;

            jQuery.ajax({
                type: "GET",
                url: 'http://travelsl.herokuapp.com/user/addReview',
                dataType: 'jsonp',
                data: { account_id:account_id, score:score },
                //load details from the database
                success: function (obj, textstatus) {

                    getScore(true);
                }
            });
            hideLoadingOverlay();
        }
    });
}

function makePayment(){

    var numberOfDays = document.getElementById("numberOfDays").value;
    var numberOfRooms = document.getElementById("numberOfRooms").value;
    var cardNumber = document.getElementById("cardNumber").value;
    var amount = document.getElementById("amount").value;
    var booking = document.getElementById("booking").value;
    var userName = sessionStorage.getItem("userName");

    numberOfDays += ',' + numberOfRooms +','+booking;
    showLoadingOverlay();
    jQuery.ajax({
        type: "GET",
        url: 'http://travelsl.herokuapp.com/user/hotelPage',
        dataType: 'jsonp',
        success: function (obj, textstatus) {

            var account_id = obj.result[index].account_id;

            jQuery.ajax({
                type: "GET",
                url: 'http://travelsl.herokuapp.com/user/makePayment',
                dataType: 'jsonp',
                data: { account_id:account_id, userName:userName , amount:amount , numberOfDays:numberOfDays},
                success: function (obj, textstatus) {


                    $("#reservationModal").modal("hide");
                    $("#paymentSuccessful").modal("show");

                }
            });
            hideLoadingOverlay();
        }
    });


}
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