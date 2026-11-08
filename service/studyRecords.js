import { supabase } from "../src/lib/supabaseClient";

// 学習記録の取得
export const getRecords = async () => {
  const { data, error } = await supabase.from("study-record").select();

  if (error) {
    throw error;
  }

  return data;
};

// 学習記録の登録
export const addRecords = async (contents, time) => {
  const { error } = await supabase
    .from("study-record")
    .insert({ time, contents });

  if (error) {
    throw error;
  }

  return await getRecords();
};

// 学習記録の削除
export const deleteRecords = async (id) => {
  await supabase.from("study-record").delete().match({ id });
  return await getRecords();
};
