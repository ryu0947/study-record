export const AddButton = ({ contents, time, hasError, onAdd }) => (
  <div>
    <button
      type="button"
      onClick={() => onAdd(contents, time)}
      disabled={hasError}
    >
      登録
    </button>
  </div>
);
