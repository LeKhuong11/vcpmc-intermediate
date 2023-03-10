# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Account to login project 
    Account 1: 
        userName: tuyetnguyen@alta.com
        password: 123456
        role: admin
    
    Account 2:
        userName: den@gmail.com
        password: 123456
        role: user
    
    Account 3:
        userName: pmq@gmail.com
        password: 123456
        role: user

# Các chức năng của admin: 
    Xem feedback từ các user
    Thêm xóa sửa các dữ liệu ở trong ứng dụng, quản lý ứng dụng

# Các chức năng của user:
    Chỉ có thể xem mà không thể thêm, sửa, xóa dữ liệu

# Công nghệ sử dụng: 
    - typescript, reactjs, ant-design, redux, react-router-dom v6, redux-toolkit, styled-components, sass, react-icons.

# Các chức năng: 
    - Đăng nhập, đăng xuất.
    - Phân quyền user, admin.
    - Tìm kiếm các bản ghi, play-list, hợp đồng, Thiết bị, ...
    - Phân trang.
    - Trang cá nhân: 
        + Hiển thị thông tin của nguòi dùng.
        + Cập nhật thông tin người dùng.
        + Đổi mật khẩu nguòi dùng
    - Kho bản ghi: 
        + Chỉnh sửa bản ghi.
        + Phê duyệt bản ghi.
    - Play-list:
        + Xem chi tiết play-list
        + Chỉnh sửa play-list.
        + Thêm play-list mới.
        + Xóa play-list.
    - Lập lịch phát:
        + Xem chi tiết lịch phát.
    - Quản lý: 
        - Quản lý hợp đồng: 
            + Xem chi tiết hợp đồng.
            + Thêm hợp đồng.
            + Hủy Hợp đồng.
            + Chỉnh sửa hợp đồng.
        - Quản lý thiết bị:
            + Chọn danh sách thiết bị để xóa.
            + Thêm thiết bị.
        - Đối tác ủy quyền: 
            + Chỉnh sửa đối tác ủy quyền.
        - Đơn vị sửa dụng: 
            + Xóa Đơn vị sử dụng.
            + Xem chi tiết đơn vị sử dụng.
            + Xem tiết các người dùng trong đơn vị sử dụng.
            + Xóa người dùng trong đơn vị sử dụng.
            + Thêm nguòi dùng trong đơn vị sử dụng.
    - Cài đặt: 
        - Phân quyền nguòi dùng: 
            + Xem chi tiết người dùng.
            + Chỉnh sửa nguòi dùng.
            + Xem vài trò nguòi dùng.
        - Thông tin tác phẩm: 
            + Chỉnh sửa tên thể loại các tác phẩm        
    - Hỗ trợ: 
        - Hướng dẫn sử dụng: 
            + Xem chi tiết các hướng dẫn sử dụng
        - Feedback: 
            + Gửi feedback(với user).
            + Xem feedback(với admin)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
