# Frontend Website HungThien

## Tổng quan
Repository này chứa mã nguồn frontend cho dự án website HungThien. Frontend được xây dựng bằng React với TypeScript và sử dụng Vite làm công cụ build.



### Môi trường chạy dự án: Node.js v22.13.0
https://nodejs.org/download/release/v22.13.0/

===

Các bước cài đặt: (chế độ development)
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.development (nếu cần thiết)
4. Chạy dự án: npm run dev

===

Cách chạy tại chế độ production:
1. clone code
2. cài đặt thư viện: npm i
3. Update file .env.production (nếu cần thiết)
4. Build dự án: npm run build
5. Chạy dự án: npm run preview




## Công nghệ
- **React**: v18.2.0
- **TypeScript**: v5.7.2
- **Vite**: v6.2.0
- **Ant Design**: v5.24.6
- **Axios**: v1.8.4
- **SASS**: v1.86.1

## Yêu cầu hệ thống
- Node.js (v18+)
- npm hoặc yarn

## Bắt đầu

### Cài đặt
1. Clone repository
```bash
git clone <đường-dẫn-repository>
cd client
```

2. Cài đặt các gói phụ thuộc
```bash
npm install
# hoặc
yarn
```

### Phát triển
Để khởi động máy chủ phát triển:
```bash
npm run dev
# hoặc
yarn dev
```
Điều này sẽ khởi động máy chủ phát triển Vite, thường tại http://localhost:5173

### Build cho môi trường Production
Để tạo bản build cho production:
```bash
npm run build
# hoặc
yarn build
```

### Xem trước bản build Production
Để xem trước bản build production trên máy local:
```bash
npm run preview
# hoặc
yarn preview
```

## Cấu trúc dự án
```
client/
  ├── public/          # Tài nguyên tĩnh
  ├── src/
  │   ├── assets/      # Hình ảnh, font chữ, v.v.
  │   ├── components/  # Các component React có thể tái sử dụng
  │   ├── pages/       # Các component trang
  │   ├── services/    # Các dịch vụ API và tiện ích
  │   ├── styles/      # Style toàn cục và file SASS
  │   ├── types/       # Định nghĩa kiểu TypeScript
  │   ├── App.tsx      # Component ứng dụng chính
  │   └── main.tsx     # Điểm vào của ứng dụng
  ├── .eslintrc        # Cấu hình ESLint
  ├── tsconfig.json    # Cấu hình TypeScript
  ├── vite.config.ts   # Cấu hình Vite
  └── package.json     # Các phụ thuộc và script của dự án
```

## Các Script có sẵn
- `npm run dev` - Khởi động máy chủ phát triển
- `npm run build` - Build cho môi trường production
- `npm run lint` - Kiểm tra code bằng ESLint
- `npm run preview` - Xem trước bản build production trên máy local

## Chất lượng code
Dự án này sử dụng ESLint để đảm bảo chất lượng code:
- ESLint phiên bản mới (v9.21.0)
- Plugin React Hooks
- Tích hợp TypeScript ESLint