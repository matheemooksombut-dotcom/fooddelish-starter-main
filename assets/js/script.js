document.querySelector('.hamberger-icon').addEventListener('click' , function(){
    document.querySelector('.menu').classList.toggle('show');
});

function submitdata() {
  let FirstnameDOM = document.querySelector('input[name=Firstname]');
  let LastnameDOM = document.querySelector('input[name=Lastname]');
  let UsernameDOM = document.querySelector('input[name=Username]');
  let PasswordDOM = document.querySelector('input[name=Password]');
  let ConfirmDOM = document.querySelector('input[name=Confirm]');

  let userData = {
    Firstname: FirstnameDOM.value,
    Lastname: LastnameDOM.value,
    Username: UsernameDOM.value,
    Password: PasswordDOM.value,
    ConfirmPassword: ConfirmDOM.value
  };

  console.log('Submit:', userData);
  alert(`✅ ข้อมูลถูกส่งแล้ว\nชื่อ: ${userData.Firstname}\nนามสกุล: ${userData.Lastname}`);
}