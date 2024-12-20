# Hướng dẫn deploy local từ source code


## Yêu cầu
* `npm` version `>= 20`
* server `mysql` (hoặc `mariadb`)
* kết nối internet và browser
* 2 terminal

## Tiến hành

### Chuẩn bị

1. Tạo `mysql` user và thiết lập mật khẩu nếu chưa có
1. Tạo cơ sở dữ liệu trống trên `mysql`
1. Bật server `mysql`
1. Mở thư mục source code (chứa file `README.md`)
1. Mở thư mục `Backend`, copy file `.env.example` sang file mới cùng thư mục, để tên là `.env` (**CHÚ Ý:** không phải là `.env.txt`). File này lưu các thông tin xác thực của máy local. Sửa đổi các thông tin liên quan trong file mới tạo.

### Khởi động

1. Mở terminal 1, khởi động frontend:
```sh
cd Frontend
npm i # Cài đặt thư viện
npm run dev # Chạy hosting Frontend
```

2. Mở terminal 2, khởi động backend:
```sh
cd Backend
npm i # Cài đặt thư viện
npm run resetdb # Thiết lập database và seed
npm run server # Chạy server Backend
```

Ở terminal 1 sẽ hiện đường dẫn đến trang web được deploy. 

Khi mới khởi động, chỉ có tài khoản ROOT trong database:
```yaml
Username: "ROOT"
Password: "12345678"
```

## Troubleshoot

### Lỗi khi `npm i`

Do chưa thay đổi `Execution Policy` ở trên Windows. 

Phải thay đổi policy:

```bat
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Frontend không hiển thị data và báo lỗi trống

Do backend chưa kết nối được đến database. Kiểm tra các thông tin sau:
* Server `mysql` đã được bật
* Đã có user, user được quyền truy cập database
* Username, password, database name đúng với trong file `Backend/.env`
