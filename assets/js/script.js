document.querySelector('.hamberger-icon').addEventListener('click' , function(){
    document.querySelector('.menu').classList.toggle('show');
});

function submitdata (){
    let FirstnameDOM = document.querySelector('input[name=Firstname]')
    let LastnameDOM = document.querySelector('input[name=Lastname]')
    let UsernameDOM = document.querySelector('input[name=Username]')
    let PasswordDOM = document.querySelector('input[name=Password]')
    let ConfrimpasswordDOM = document.querySelector('input[name=Confrime]')
}


let userData = {
   Firstname: FirstnameDOM.value,
   Lastname: LastnameDOM.value,
   Username: UsernameDOM.value,
   Password: PasswordDOM.value,
   Confrimpassword: ConfrimpasswordDOM.value
 
}

console.log('Summit' , userData)