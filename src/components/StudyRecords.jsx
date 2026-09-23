export const StudyRecords = ({ hasError, records, totalTime }) => (
  <>
    {hasError && <p style={{ color: "red" }}>入力されていない項目があります</p>}
    <ul>
      {records.map((record) => (
        <li key={record.time}>
          <p>
            {record.title}：{record.time}時間
          </p>
        </li>
      ))}
    </ul>
    <p>合計時間：{totalTime}/1000（h）</p>
  </>
);
