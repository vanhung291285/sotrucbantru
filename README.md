# Sổ trực bán trú · GitHub và Vercel

Dự án dùng Vercel để chuyển từ tên miền của trường đến ứng dụng Apps Script hiện có. Trình duyệt hiển thị địa chỉ Google sau khi chuyển. Quyền truy cập do bản triển khai Apps Script quản lý.

## 1. Đưa mã lên GitHub

Tạo kho riêng tư, ví dụ `so-truc-ban-tru-vercel`. Giải nén gói và tải nội dung trong gói lên thư mục gốc của kho. Giữ nguyên thư mục `api`. Sau khi tải, ở gốc phải có `vercel.json`, `package.json` và `api/open.js`.

## 2. Nhập kho vào Vercel

1. Trong Vercel, chọn **Add New → Project** rồi **Import** kho GitHub vừa tạo. Nếu kho không hiện, cấp quyền để Vercel truy cập kho đó.
2. Chọn **Framework Preset → Other** và giữ **Root Directory** là thư mục gốc. Giữ các thiết lập build mặc định.
3. Trong **Environment Variables**, đặt biến `APPS_SCRIPT_EXEC_URL` bằng URL đầy đủ của bản Apps Script dành cho giáo viên, kết thúc bằng `/exec`. Bật môi trường **Production**.
4. Bấm **Deploy**. Mở link `vercel.app` để thử. Nếu thêm hoặc thay biến sau đó, triển khai lại.

## 3. Gắn tên miền riêng

Trong **Project → Settings → Domains**, thêm tên miền phụ, ví dụ `diemdanh.tenmiencuatruong.vn`. Tại nơi quản lý DNS, tạo bản ghi theo giá trị Vercel hiển thị. Khi Vercel xác minh xong, thử mở tên miền phụ trên điện thoại.

Nếu địa chỉ Vercel hiện thông báo 503, kiểm tra biến `APPS_SCRIPT_EXEC_URL` và môi trường triển khai. Nếu trang đã chuyển đến Google nhưng Google yêu cầu quyền truy cập, kiểm tra bản triển khai Apps Script bằng chính đường dẫn `/exec`.

Tài liệu chính thức:
- https://vercel.com/docs/git
- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/environment-variables
- https://vercel.com/docs/domains/working-with-domains/add-a-domain
