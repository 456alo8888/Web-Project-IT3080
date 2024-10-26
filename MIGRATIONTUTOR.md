Các bước install ban đầu:

1. npm install --save-dev sequelize-cli

2. npm sequelize-cli init

3. chỉnh sửa trong config/config.json để kết nối với database mysql 
	0. npm install dotenv
	1. Sửa file config.json thành config.js (khi sử dụng Sequelize thì có thể tải các biến môi trường) 
	2. Thay đổi nội dung trong các environments 'development' , 'test' , 'production' thành các giá trị lưu trong .env  

Tạo migration cho các model và tạo table trong database:

1. Chạy các lệnh cmd sau: 
# Admin model
npx sequelize-cli model:generate --name Admin --attributes username:string,password:string,update_fee_authority:boolean,update_resident_authority:boolean,create_fee_authority:boolean,receive_authority:boolean,is_root:boolean,first_name:string,last_name:string

# Resident model
npx sequelize-cli model:generate --name Resident --attributes first_name:string,middle_name:string,last_name:string,age:integer,gender:string,phone_number:string,id_card_number:string,room_id:integer

# Receipt model
npx sequelize-cli model:generate --name Receipt --attributes admin_id:integer,resident_id:integer,money_amount:float,bill_id:integer

# Donation_receipt model
npx sequelize-cli model:generate --name Donation_receipt --attributes resident_id:integer,fee_name:string,admin_id:integer,money_amount:float

# Fee model
npx sequelize-cli model:generate --name Fee --attributes name:string,fee_type:string,created_by_id:integer,total:float,house_count:integer

# Bill model
npx sequelize-cli model:generate --name Bill --attributes room_id:integer,bill_name:string,deadline:date,cost:float

# Room model
npx sequelize-cli model:generate --name Room --attributes room_number:integer,head_resident_id:integer

# Membership model
npx sequelize-cli model:generate --name Membership --attributes resident_id:integer,room_id:integer


2. Thay đổi các file trong folder migrations thành đuôi .cjs


3. Tạo các bảng trong cơ sở dữ liệu (thông qua file migration) bằng lệnh: ```npx sequelize-cli db:migrate```