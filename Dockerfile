# Chọn image cơ sở
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn
COPY . .

# Chạy ứng dụng
CMD ["npm", "start"]
