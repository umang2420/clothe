let SignIn= document.getElementById("btn2");
SignIn.addEventListener("click", function (e) {
e.preventDefault();
check();
});

function check(){
    let email= document.getElementById("email");
    let password= document.getElementById("password");
    
    if(email.value === "" ){
        document.querySelector("#small2").innerHTML="please enter email";
        return false;
    }
    else{
        document.querySelector("#small2").innerHTML=""
    }

    if(password.value === "" ){
        document.querySelector("#small3").innerHTML="please enter password";
        return false;
}
else{
    document.querySelector("#small3").innerHTML="";
}
}

document.getElementById('form').addEventListener('click', function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
   
    
    const storedUserData = JSON.parse(localStorage.getItem(email));

    if (storedUserData.password === password) {
    alert('Welcome');
    window.location.href = './api.html';
    } else {
    alert('Invalid login credentials');
    }
})