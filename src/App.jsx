import { useState } from "react";
import { StudyRecords } from "./components/studyRecords";
import { AddButton } from "./components/AddButton";
import { DisplayRecords } from "./components/displayRecords";
import { InputContents } from "./components/InputContents";
import { InputTime } from "./components/InputTime";

export const App = () => {
  const [contents, setContents] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(true);

  const handleContentsChange = (e) => {
    const value = e.target.value;
    setContents(value);
    validateForm(value, time);
  };

  const handleTimeChange = (e) => {
    const value = Number(e.target.value);
    setTime(value);
    validateForm(value, contents);
  };

  const handleAddRecord = (contents, time) => {
    setRecords([...records, { title: contents, time: time }]);
    setContents("");
    setTime(0);
  };

  const validateForm = (contents, time) => {
    if (contents === "" || time === 0 || time === "") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const totalTime = records.reduce((total, record) => {
    return total + record.time;
  }, 0);

  return (
    <div>
      <h1>学習記録一覧</h1>
      <InputContents
        contents={contents}
        onChange={handleContentsChange}
      />
      <InputTime time={time} onChange={handleTimeChange} />
      <DisplayRecords contents={contents} time={time} />
      <AddButton
        contents={contents}
        time={time}
        hasError={hasError}
        onAdd={handleAddRecord}
      />
      <StudyRecords hasError={hasError} records={records} totalTime={totalTime} />
    </div>
  );
};
