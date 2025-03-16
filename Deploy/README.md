# Deploy

## Nginx

Nginx là một **phần mềm máy chủ web (web server)** mạnh mẽ, hiệu năng cao và miễn phí, thường được sử dụng để phục vụ các website có lượng truy cập lớn hoặc yêu cầu tốc độ nhanh.

🚀 Chức năng chính của Nginx:

- **Web server (HTTP/HTTPS)**: Phục vụ nội dung website tĩnh như HTML, CSS, JS, hình ảnh,...
- **Reverse Proxy**: Làm trung gian tiếp nhận yêu cầu từ người dùng và chuyển tiếp đến các dịch vụ khác bên trong hệ thống.
- **Load Balancer**: Phân phối yêu cầu đến nhiều server, giúp cân bằng tải và tăng khả năng chịu tải của hệ thống.
- **Cache server**: Cache nội dung website để giảm tải cho backend, tăng tốc độ phản hồi.
- **SSL/TLS Termination**: Xử lý mã hóa SSL, hỗ trợ HTTPS hiệu quả.

## 1. Installation local

Trên Windows, ta vào https://nginx.org/en/download.html, chọn tải phiên bản "nginx/Windows" (file .zip).

Sau khi tải về, giải nén file `.zip` vào thư mục mong muốn, ví dụ

```
C:\nginx
```

Sau khi giải nén, bên trong thư mục C:\nginx sẽ có các tệp như sau:

```
C:\nginx
├── conf
├── html
├── logs
├── temp
├── nginx.exe
└── ...
```

Chạy lệnh để khởi động nginx:

```sh
cd C:\nginx
start nginx
```

Kiểm tra Nginx có chạy không bằng cách mở trình duyệt và nhập:

```
http://localhost
```

_Kết quả:_

![image](https://github.com/user-attachments/assets/2e144d37-d93e-4c2c-b27c-34597be801d5)
