/**
 * Created by ASUS-PC on 5/6/2016.
 */



document.getElementById("clickMe").addEventListener("click", clickMe);

function clickMe(){
    document.getElementById("hello").innerText = "Keet is a good boy : " + device.platform;
}