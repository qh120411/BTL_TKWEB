let mail = document.getElementById("mail");
let pass = document.getElementById("pass");
let submit = document.getElementById("login");
let message = document.querySelector('.message');
let loader = document.querySelector('.loader');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

submit.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = '';

    if ( mail.value.trim() === '' || pass.value.trim() === '' ) {
        loader.style.display = "block";
        setTimeout(function() {
            loader.style.display = 'none';
            message.innerText = '⚠️ Vui lòng nhập đầy đủ thông tin';
        }, 1000);
        return;
    }
    else if ( mail.value.trim() === "admin" && pass.value.trim() === "admin@123") {
        loader.style.display = "block";
        setTimeout(function() {
            loader.style.display = 'none';
            message.innerText = '✅ Đăng nhập thành công!';
        }, 1000);
        delay(1500).then(() => {
            window.location.href = "../html/home.html";
        });
        return;
    }
    else {
        loader.style.display = "block";
        setTimeout(function() {
            loader.style.display = 'none';
            message.innerText = '❌ Tài khoản hoặc mật khẩu không đúng!';
        }, 1000);
        return;
    }

});