export const InputContents = ({ contents, onChange }) => (
  <div>
    <label htmlFor="contents">
      学習内容：
      <input
        type="text"
        value={contents}
        id="contents"
        onChange={onChange}
      />
    </label>
  </div>
);
