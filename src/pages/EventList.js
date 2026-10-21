import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onRegister }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  // Hàm xử lý khi gõ vào ô tìm kiếm (tên bắt buộc theo đề)
  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  // Hai điều kiện áp dụng cùng lúc, không sửa mảng gốc
  const keyword = query.trim().toLowerCase();
  const filtered = events
    .filter((e) => e.name.toLowerCase().includes(keyword))
    .filter((e) => {
      const isFull = e.registered >= e.capacity;
      if (status === "full") return isFull;
      if (status === "available") return !isFull;
      return true;
    });

  return (
    <div>
      <FilterBar
        query={query}
        status={status}
        onQueryChange={handleQueryShift}
        onStatusChange={handleStatusChange}
      />
      <p>{`Tìm thấy ${filtered.length} sự kiện`}</p>
      <EventTable
        events={filtered}
        onDelete={onDelete}
        onRegister={onRegister}
      />
    </div>
  );
};

export default EventList;
