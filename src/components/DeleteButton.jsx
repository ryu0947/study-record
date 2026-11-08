export const DeleteButton = ({ id, onDelete }) => {
  return (
    <button
      type="button"
      onClick={() => onDelete(id)}
      style={{ marginLeft: "10px" }}
    >
      削除
    </button>
  );
};
