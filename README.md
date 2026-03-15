# ✍️ Tập Viết Chữ - Bảo Học Ngoan

Ứng dụng web hướng dẫn bé tập viết chữ dành cho học sinh lớp 1 đến lớp 5, tối ưu cho **iPad** (Chrome/Safari) và sẵn sàng deploy lên **Vercel**.

## 📸 Tính năng chính

- **Viết chữ theo nét:** Hiệu ứng animation SVG vẽ từng nét chữ lần lượt, giúp bé quan sát và tập viết theo.
- **Đa dạng font chữ tiểu học:** Hỗ trợ 7 kiểu font HP001 (4 ô ly, 5 ô ly, nét thường, nét đậm, ô ly kẻ).
- **Tua nhanh tốc độ:** Nút chuyển đổi tốc độ viết 1x / 2x / 3x, tiện cho việc xem lại nhanh.
- **Tạm dừng / Tiếp tục / Hủy:** Điều khiển hoàn toàn quá trình viết chữ.
- **Thanh tiến trình (Progress Bar):** Hiển thị phần trăm hoàn thành theo thời gian thực.
- **Zoom linh hoạt:** Thanh trượt phóng to/thu nhỏ trang vở ô ly từ 50% đến 200%.
- **Giao diện tối ưu iPad:** Nút bấm lớn (touch target > 48px), thiết kế Glassmorphism hiện đại, tự động thu gọn bảng điều khiển khi đang viết.

## 🛠️ Công nghệ sử dụng

| Thành phần       | Công nghệ                          |
|-------------------|-------------------------------------|
| Framework         | Next.js 16 (App Router)            |
| Ngôn ngữ          | TypeScript + React                  |
| Styling           | Vanilla CSS (Glassmorphism)        |
| Hiệu ứng viết    | SVG `stroke-dashoffset` + CSS Animation |
| Font chữ          | HP001 Tiểu Học (.ttf)              |
| Deploy            | Vercel                              |

## 📁 Cấu trúc thư mục

```
viet-chu-ipad/
├── public/
│   └── fonts/                      # 7 file font HP001 (.ttf)
│       ├── HP001_4_hang_normal.ttf
│       ├── HP001_4_hang_bold.ttf
│       ├── HP001_4_hang_1_o_ly.ttf
│       ├── HP001_4_hang_2_o_ly.ttf
│       ├── HP001_5_hang_normal.ttf
│       ├── HP001_5_hang_bold.ttf
│       └── HP001_5_hang_1_o_ly.ttf
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout chính (viewport iPad)
│   │   ├── page.tsx                # Trang chủ, ghép nối các component
│   │   └── globals.css             # CSS toàn cục, @font-face, animations
│   └── components/
│       ├── ControlPanel.tsx        # Bảng điều khiển (nhập text, chọn font, zoom, tua nhanh)
│       ├── ProgressBar.tsx         # Thanh tiến trình
│       └── WritingCanvas.tsx       # Canvas SVG vẽ chữ với animation
├── package.json
└── README.md
```

## 🚀 Chạy trên máy tính (Development)

### Yêu cầu
- **Node.js** phiên bản 18 trở lên (khuyên dùng LTS)
- **npm** (đi kèm Node.js)

### Cài đặt và chạy

```bash
# 1. Clone dự án (hoặc tải về)
git clone <url-repo-cua-ban>
cd viet-chu-ipad

# 2. Cài đặt thư viện
npm install

# 3. Chạy server phát triển
npm run dev
```

Mở trình duyệt tại địa chỉ: **http://localhost:3000**

> 💡 **Mẹo:** Trên Chrome, bấm `F12` → biểu tượng thiết bị di động (hoặc `Ctrl+Shift+M`) → chọn **iPad Air** để xem giao diện giả lập iPad.

## ☁️ Deploy lên Vercel

### Qua GitHub (Khuyên dùng)

1. Đẩy code lên một Repository GitHub.
2. Đăng nhập [vercel.com](https://vercel.com) bằng tài khoản GitHub.
3. Chọn **Add New → Project** → Import repo vừa tạo.
4. Bấm **Deploy**. Vercel tự động nhận diện Next.js và build.
5. Nhận đường link dạng `https://ten-du-an.vercel.app` để mở trên iPad.

### Qua Vercel CLI (Nhanh, không cần GitHub)

```bash
# Deploy bản nháp
npx vercel

# Chốt bản chính thức
npx vercel --prod
```

## 📱 Hướng dẫn sử dụng

1. **Nhập nội dung:** Gõ chữ cần tập viết vào ô văn bản. Nhấn `Enter` để xuống dòng.
2. **Chọn font:** Chọn kiểu chữ từ menu thả xuống (nét thường, nét đậm, ô ly,...).
3. **Bấm "Viết chữ":** Ứng dụng sẽ bắt đầu vẽ từng chữ một trên trang vở ô ly.
4. **Tua nhanh:** Bấm nút ⏩ để tăng tốc viết lên 2x hoặc 3x.
5. **Tạm dừng / Tiếp tục:** Bấm ⏸ để dừng, bấm ▶ để tiếp.
6. **Hủy:** Bấm ⏹ để xóa và bắt đầu lại.

## 📝 Ghi chú

- Ứng dụng **không cần backend** — toàn bộ logic chạy trên trình duyệt.
- Tối ưu cho **iPad A16** nhưng hoạt động tốt trên mọi thiết bị có trình duyệt hiện đại.
- Font chữ HP001 là font chuyên dụng cho tập viết tiểu học Việt Nam.

---

*Dự án được xây dựng với ❤️ để giúp các bé luyện viết chữ đẹp.*
