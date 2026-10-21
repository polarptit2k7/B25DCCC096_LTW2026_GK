import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Bước 1: kiểm tra ô trống
    if (!name.trim() || !location.trim() || !date || !capacity.trim()) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Bước 2: sức chứa phải là số nguyên từ 10 đến 1000
    const cap = Number(capacity);
    if (!Number.isInteger(cap) || cap < 10 || cap > 1000) {
      setMessage("Sức chứa phải từ 10 đến 1000");
      return;
    }

    // Hợp lệ: số lưu kiểu number, thêm xong về trang Danh sách
    onAdd({ name: name.trim(), location: location.trim(), date, capacity: cap });
    navigate("/events", { replace: true }); // replace: Back không quay lại form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Tên sự kiện</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="location">Địa điểm</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="date">Ngày diễn ra</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="capacity">Sức chứa</label>
        <input
          id="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <button type="submit">Thêm</button>
      {message && <p className="error-text">{message}</p>}
    </form>
  );
};

export default AddEvent;
