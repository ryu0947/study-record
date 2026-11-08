import { useState, useEffect } from "react";
import { StudyRecords } from "./components/StudyRecords";
import { AddButton } from "./components/AddButton";
import { DisplayRecords } from "./components/DisplayRecords";
import { InputContents } from "./components/InputContents";
import { InputTime } from "./components/InputTime";
import { getRecords, addRecords, deleteRecords } from "../service/studyRecords";

export const App = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState("");
  const [time, setTime] = useState(0);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [hasInputError, setHasInputError] = useState(false);

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(Number(e.target.value));
  };

  const handleAddRecord = async (contents, time) => {
    if (contents === "" || time === 0) {
      setHasInputError(true);
      return;
    }

    setHasInputError(false);

    try {
      const data = await addRecords(contents, time);
      setRecords(data);
      setContents("");
      setTime(0);
    } catch (error) {
      console.error(error);
      setFetchErrorMessage("データを登録出来ませんでした。ページを更新して再度お試しください。");
    }
  };

  const totalTime = records.reduce((total, record) => {
    return total + record.time;
  }, 0);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getRecords();
        setRecords(data);
      } catch (error) {
        console.error(error);
        setFetchErrorMessage("データを取得出来ませんでした。ページを更新して再度お試しください。");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      const data = await deleteRecords(id);
      setRecords(data);
    } catch (error) {
      console.error(error);
      setFetchErrorMessage("データを削除出来ませんでした。ページを更新して再度お試しください。");
    }
  };

  return (
    <div>
      <h1>学習記録一覧</h1>
      <InputContents contents={contents} onChange={handleContentsChange} />
      <InputTime time={time} onChange={handleTimeChange} />
      <DisplayRecords contents={contents} time={time} />
      <AddButton
        contents={contents}
        time={time}
        hasInputError={hasInputError}
        onAdd={handleAddRecord}
      />
      <StudyRecords
        loading={loading}
        fetchErrorMessage={fetchErrorMessage}
        hasInputError={hasInputError}
        records={records}
        totalTime={totalTime}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
};
