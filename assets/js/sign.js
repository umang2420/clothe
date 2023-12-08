let register = document.getElementById("btn2");
register.addEventListener("click", function (e) {
e.preventDefault();
check();
});

function check(){
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password=document.getElementById("password");
    let number=document.getElementById("number");
    let num = /[^0-9\-\/]/;


    if (name.value === "") {
        document.querySelector("#small1").innerHTML = "Please enter a name";
        return false;
    } else {
        document.querySelector("#small1").innerHTML = "";
        }

        if (email.value === "") {
            document.querySelector("#small2").innerHTML = "Please enter email";
            return false;
            } else {
            document.querySelector("#small2").innerHTML = "";
            }

        if(password.value===""){
            document.querySelector("#small3").innerHTML="please enter password";
            return false;
        }
        else {
            document.querySelector("#small3").innerHTML="";
        }
        if (number.value === "") {
            document.querySelector("#small4").innerHTML = "Please enter a phone number";
            return false;
        }
        else if(num.test(number.value)){
            document.querySelector("#small4").innerHTML = "Please enter a valid number";
            return false;
        }
        else if (number.value.length < 10 || number.value.length > 10) {
            document.querySelector("#small4").innerHTML = "Phone number should not exceed more than 10 digits and should not be less than 10";
            return false;
        } else {
            document.querySelector("#small4").innerHTML = "";
        }
    let Data = {
        name: name.value,
        email: email.value,
        password: password.value,
        number: number.value
        };
    
        localStorage.setItem(Data.email, JSON.stringify(Data));
        alert("Registration successful!");
}




