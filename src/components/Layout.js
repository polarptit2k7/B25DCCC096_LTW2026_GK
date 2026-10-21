import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

// Thanh menu luôn hiện; phần nội dung đổi theo trạng thái tải dữ liệu
const Layout = ({ loading, error }) => {
  let content = <Outlet />;
  if (error) content = <p>{error}</p>;
  else if (loading) content = <p>Đang tải...</p>;

  return (
    <div>
      <NavBar />
      <div className="container">{content}</div>
    </div>
  );
};

export default Layout;
