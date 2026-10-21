import { useNavigate, useParams } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useParams luôn trả chuỗi -> đổi sang số; "abc" -> NaN nên find() không thấy
  const event = events.find((e) => e.id === Number(id));

  return (
    <div>
      {event ? (
        <>
          <p>{`Tên sự kiện: ${event.name}`}</p>
          <p>{`Địa điểm: ${event.location}`}</p>
          <p>{`Ngày: ${event.date}`}</p>
          <p>{`Số chỗ: ${event.registered}/${event.capacity}`}</p>
          <Countdown date={event.date} />
        </>
      ) : (
        <p>Không tìm thấy sự kiện</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default EventDetail;
