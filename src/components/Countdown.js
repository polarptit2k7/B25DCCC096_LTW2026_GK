import { useEffect, useState } from "react";

// Tính thời gian còn lại đến 0 giờ ngày diễn ra. Trả về null nếu đã qua.
const calcTimeLeft = (date) => {
  const diff = new Date(`${date}T00:00:00`) - new Date();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const Countdown = ({ date }) => {
  // Hàm khởi tạo -> có giá trị đúng ngay từ lần render đầu, không bị trống 1 giây
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(date));

  useEffect(() => {
    setTimeLeft(calcTimeLeft(date));
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(date)), 1000);
    return () => clearInterval(timer); // rời trang thì đồng hồ dừng hẳn
  }, [date]);

  if (!timeLeft) return <p>Sự kiện đã diễn ra</p>;

  const { days, hours, minutes, seconds } = timeLeft;
  return <p>{`Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`}</p>;
};

export default Countdown;
