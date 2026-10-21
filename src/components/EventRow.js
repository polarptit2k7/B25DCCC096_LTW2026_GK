import { Link } from "react-router-dom";

const EventRow = ({ event, onDelete, onRegister }) => {
  const { id, name, location, date, capacity, registered } = event;
  const isFull = registered >= capacity;

  return (
    <tr className={isFull ? "row-full" : ""}>
      <td>
        <Link to={`/events/${id}`}>{name}</Link>
      </td>
      <td>{location}</td>
      <td>{date}</td>
      <td>{`${registered}/${capacity}`}</td>
      <td>
        <button onClick={() => onRegister(id)} disabled={isFull}>
          Đăng ký
        </button>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default EventRow;
