export const AddButton = ({ contents, time, onAdd }) => (
  <div>
    <button type="button" onClick={() => onAdd(contents, time)}>
      登録
    </button>
  </div>
);
