import { NavLink } from "react-router-dom";

// NavLink tự thêm class "active" cho mục ứng với URL hiện tại.
// Thuộc tính `end` giúp "/events" KHÔNG sáng khi đang ở "/events/new" hoặc "/events/1".
const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" end>
      Trang chủ
    </NavLink>
    <NavLink to="/events" end>
      Danh sách
    </NavLink>
    <NavLink to="/events/new" end>
      Thêm mới
    </NavLink>
  </nav>
);

export default NavBar;
