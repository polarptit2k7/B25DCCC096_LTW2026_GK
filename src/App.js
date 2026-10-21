const BUILD_TAG = "wn-1726";
/* eslint-disable import/first */
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";
import "./App.css";

const STORAGE_KEY = "gk_events";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1) MOUNTING: chạy 1 lần khi mở app -> đọc localStorage, nếu không có thì gọi API
  useEffect(() => {
    const controller = new AbortController();

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (err) {
      saved = null;
    }

    if (Array.isArray(saved)) {
      setEvents(saved);
      setLoading(false);
    } else {
      axios
        .get("/data/events.json", { signal: controller.signal })
        .then((res) => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return; // request bị hủy -> bỏ qua, không đổi state
          setError("Không tải được dữ liệu");
          setLoading(false);
        });
    }

    // 2) UNMOUNTING: hủy request đang chạy
    return () => controller.abort();
  }, []);

  // 3) UPDATING: mỗi khi events đổi (và đã tải xong, không lỗi) thì lưu vào localStorage
  useEffect(() => {
    if (loading || error) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (err) {
      // bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [events, loading, error]);

  // ----- Các hàm thêm / xóa / cập nhật (không sửa trực tiếp state) -----
  const addEvent = (data) => {
    setEvents((prev) => {
      const nextId = prev.reduce((max, e) => Math.max(max, e.id), 0) + 1;
      return [...prev, { id: nextId, ...data, registered: 0 }];
    });
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const registerEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id && e.registered < e.capacity
          ? { ...e, registered: e.registered + 1 }
          : e
      )
    );
  };

  return (
    <div data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home events={events} />} />
          <Route
            path="events"
            element={
              <EventList
                events={events}
                onDelete={deleteEvent}
                onRegister={registerEvent}
              />
            }
          />
          <Route path="events/new" element={<AddEvent onAdd={addEvent} />} />
          <Route path="events/:id" element={<EventDetail events={events} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
