import { Loading } from "../components/Loading";
import { DeleteButton } from "./DeleteButton";

export const StudyRecords = ({
  loading,
  hasError,
  records,
  totalTime,
  onDelete,
}) => {
  return (
    <>
      {loading && <Loading />}
      {hasError && <p style={{ color: "red" }}>未入力の項目があります</p>}
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <p>
              {record.contents}：{record.time}時間
              <DeleteButton id={record.id} onDelete={onDelete} />
            </p>
          </li>
        ))}
      </ul>
      <p>合計時間：{totalTime}/1000（h）</p>
    </>
  );
};
