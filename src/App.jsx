import { useState, useEffect } from "react";
import { StudyRecords } from "./components/studyRecords";
import { AddButton } from "./components/AddButton";
import { DisplayRecords } from "./components/displayRecords";
import { InputContents } from "./components/InputContents";
import { InputTime } from "./components/InputTime";
import { supabase } from "./lib/supabaseClient";

export const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState("");

  const handleContentsChange = (e) => {
    const value = e.target.value;
    setContents(value);
  };

  const handleTimeChange = (e) => {
    const value = Number(e.target.value);
    setTime(value);
  };

  const handleAddRecord = (contents, time) => {
    if (contents === "" || time === 0 || time === "") {
      setHasError(true);
    } else {
      setHasError(false);
      setRecords([...records, { contents: contents, time: time }]);
      addTodos(contents, time);
      setContents("");
      setTime(0);
    }
  };

  const totalTime = data.reduce((total, record) => {
    return total + record.time;
  }, 0);

  const getTodos = async () => {
    const { data, error } = await supabase.from("study-record").select();
    if (error) {
      console.error(error);
      return;
    }

    setLoading(false);
    setData(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodos = async (contents, time) => {
    const { error } = await supabase
      .from("study-record")
      .insert({ time, contents });

    if (error) {
      console.error(error);
      return;
    }

    await getTodos();
  };

  const handleDeleteTodo = async (id) => {
    await supabase.from("study-record").delete().match({id});
    await getTodos();
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
        hasError={hasError}
        onAdd={handleAddRecord}
      />
      <StudyRecords
        loading={loading}
        hasError={hasError}
        records={data}
        totalTime={totalTime}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
};
