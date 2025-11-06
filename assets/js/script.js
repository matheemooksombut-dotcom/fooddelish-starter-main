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
    alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  // ✅ ตรวจสอบรหัสผ่านตรงกันไหม
  if (userData.Password !== userData.ConfirmPassword) {
    alert("❌ รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง");
    return;
  }

  // ✅ ตรวจสอบความยาวรหัสผ่าน (อย่างน้อย 8 ตัว)
  if (userData.Password.length < 6) {
    alert("⚠️ รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร");
    return;
  }

  // ✅ ผ่านทุกเงื่อนไข → ส่งข้อมูลไป backend
  try {
    console.log('Submit:', userData);

    const response = await axios.post('http://localhost:8000/user', userData);
    console.log('Response:', response.data);

    alert(`✅ ลงทะเบียนสำเร็จ!\nชื่อ: ${userData.Firstname} ${userData.Lastname}`);

    // ✅ เด้งกลับไปหน้าแรก
    window.location.href = 'index.html';

  } catch (error) {
    console.error('Error:', error);
    alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  }
};
