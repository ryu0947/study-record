export const InputTime = ({time, onChange}) => (
  <div>
    <label htmlFor="time">
      学習時間：
      <input
        type="number"
        id="time"
        min="0"
        value={time}
        onChange={onChange}
      />
      時間
    </label>
  </div>
);
