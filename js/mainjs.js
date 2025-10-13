let mail = document.getElementById("mail");
let pass = document.getElementById("pass");
let submit = document.getElementById("login");

submit.addEventListener("click", function (e) {
    e.preventDefault();

    if ( mail.value === '' || pass.value === '' ) {
        alert("Tên tài khoản hoặc mật khẩu không hợp lệ");
    }
    // else if ( mail.value === "admin" && pass.value === "admin@123") {
    //     window.location.href = "kk.html"; // chuyển trang khác
    // }
    else {
        alert("Tên tài khoản hoặc mật khẩu không đúng");
    }
});