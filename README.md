# Bài tập lớn bộ môn Thiết kế Web
![Project](https://img.shields.io/badge/Project-Nhóm_1-blue)  
![Status](https://img.shields.io/badge/Status-Hoàn_thành-red)  

**Link demo**: [Demo](https://qh120411.github.io/BTL_TKWEB/) 

*Bài tập lớn của **nhóm 1** với đề tài: Thiết kế giao diện quản lí cho **nhà xe trường UTC*** 🚍

**HƯỚNG DẪN SỬ DỤNG GIT** --- [Link Github](https://gist.github.com/antruongnguyen/6bb4ebbcb8ad3608eeddff97ca615c47)

**HƯỚNG DẪN ĐẶT TÊN COMMIT** --- [Link hướng dẫn](https://viblo.asia/p/dat-ten-commit-message-sao-cho-tinh-nghia-anh-em-chac-chan-ben-lau-OeVKBM605kW)

**LINK FIGMA** --- [Link Figma](https://www.figma.com/design/iGuidKTTSwQe7aK2f92eEH/Trang-web?node-id=0-1&t=YXv9H7UaS0SoyGkc-1)

## Hướng dẫn cơ bản clone và push

1. **Clone repository**: Clone dự án bằng lệnh sau:
    ```bash
    git clone <repository-link>
    ```
   **⚠️Trong trường hợp mà bạn đã clone từ lâu rồi thì luôn luôn dùng `git pull` mỗi khi làm việc để cập nhật code mới trên repository**
    ```bash
    git pull
    ```
3. **Tạo nhánh mới**: Tạo nhánh mới
    ```bash
    git checkout -b <branch-name>
    ```
    **Tạo nhánh mới khi có tính năng mới hoặc fix bug, ... xong rồi pull lại code**
4. **code code**: Tạo file để **code code code** thôi:))
    ```bash
    touch <ten.dinhdangfile>
    ```
 5. **Commit**: Khi thấy ổn rồi thì commit.
    **Lưu ý:   Check lại quy tắc đặt tên commit, chạy golive xem có bug không nếu không có thì commit lại.**
    ```bash
    git add .
    git commit -m "<ten commit>"
    ```
7. **Push lên repo và tạo request**:<br>
   **🚫 Tuyệt đối KHÔNG push trực tiếp vào main.**
   ```bash
   git push origin <branch-name>
   ```

## Lưu ý:
1. Commit luôn phải rõ ràng
2. Đặt tên class theo tiêu chuẩn BEM( search google để biết thêm chi tiết).
3. Bố cục code sao cho dễ nhìn.

# CẤU TRÚC THƯ MỤC
   ```python
    ├── index.html
    │
    ├── folder css
    │           └── các file cho từng chức năng 
    ├── folder js
    │           └── các file cho từng chức năng 
    ├── folder html
    │           └── các file cho từng chức năng
    ├── các file .json
    │
    └── README.md
   ```


   











