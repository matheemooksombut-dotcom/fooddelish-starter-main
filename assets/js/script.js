document.querySelector('.hamberger-icon').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('show');
});

const submitdata = async () => {
  let FirstnameDOM = document.querySelector('input[name=Firstname]');
  let LastnameDOM = document.querySelector('input[name=Lastname]');
  let UsernameDOM = document.querySelector('input[name=Username]');
  let PasswordDOM = document.querySelector('input[name=Password]');
  let ConfirmDOM = document.querySelector('input[name=Confrime]');

  let userData = {
    Firstname: FirstnameDOM.value.trim(),
    Lastname: LastnameDOM.value.trim(),
    Username: UsernameDOM.value.trim(),
    Password: PasswordDOM.value,
    ConfirmPassword: ConfirmDOM.value
  };


  
  // ✅ ตรวจสอบว่ากรอกครบไหม
  if (
    !userData.Firstname ||
    !userData.Lastname ||
    !userData.Username ||
    !userData.Password ||
    !userData.ConfirmPassword
  ) {
    alertcontent('danger'); 
    return;
  }

  // ✅ ตรวจสอบรหัสผ่านตรงกันไหม
  if (userData.Password !== userData.ConfirmPassword) {
    alertcontent('wrongpassword');
    return;
  }

  // ✅ ตรวจสอบความยาวรหัสผ่าน (อย่างน้อย 8 ตัว)
  if (userData.Password.length < 6) {
    alertcontent('incasepassword')
    return;
  }

  

  // ✅ ผ่านทุกเงื่อนไข → ส่งข้อมูลไป backend
  try {
    console.log('Submit:', userData);

    const response = await axios.post('http://localhost:8000/Register', userData);
    console.log('Response:', response.data);

    alertcontent('correct');

    // ✅ เด้งกลับไป USER
     setTimeout(() => {
      window.location.href = '../login.html';
    }, 1000);

  } catch (error) {
    console.error('Error:', error);
    alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  }


  
};

//!  alertbox
function alertcontent(type) {
    document.querySelectorAll('.alert-content').forEach(el => {
      el.style.display = 'none'; 
    });
    document.querySelector(`.alert-content.${type}`).style.display='block';
  }


  // ! Login Section 

  // ========================= LOGIN =========================
const Login = async () => {
  let UsernameDOM = document.querySelector('input[name=Username]');
  let PasswordDOM = document.querySelector('input[name=Password]');

  let loginData = {
    Username: UsernameDOM.value.trim(),
    Password: PasswordDOM.value.trim()
  };

  // ✅ ตรวจสอบว่ากรอกครบไหม
  if (!loginData.Username || !loginData.Password) {
    alertcontent('danger');
    return;
  }

  try {
    // ✅ ยิงไปเช็คกับ backend
    const response = await axios.post('http://localhost:8000/login', loginData);
    console.log('Response:', response.data);

    if (response.data.success) {
      alertcontent('correct');

      // เก็บข้อมูลผู้ใช้ไว้ใน localStorage (ไว้แสดงในหน้า user)
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // ✅ เด้งไปหน้า user.html
      setTimeout(() => {
        window.location.href = 'user/user.index.html';
      }, 1000);
    } else {
      alertcontent('wrongpassword');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
  }
};
  
