import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getRecords, addRecords, deleteRecords } from "../service/studyRecords";
import { App } from "./App";

vi.mock("../service/studyRecords", () => ({
  getRecords: vi.fn(),
  addRecords: vi.fn(),
  deleteRecords: vi.fn(),
}));

describe("学習記録アプリテスト", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getRecords.mockResolvedValue([]);
  });

  test("h1タイトルの表示確認", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText("データを取得中...")).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", { level: 1, name: "学習記録一覧" }),
    ).toBeInTheDocument();
  });

  test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加される（数が一つ増える）", async () => {
    addRecords.mockImplementation(async (contents, time) => {
      return [{ id: 1, contents, time }];
    });
    render(<App />);
    const user = userEvent.setup();
    const textForm = screen.getByRole("textbox");
    const numForm = screen.getByRole("spinbutton");
    const insertBtn = screen.getByRole("button", { name: "登録" });

    await user.type(textForm, "React");
    await user.type(numForm, "1");
    await user.click(insertBtn);

    const insertElement = await screen.findByText("React：1時間");
    expect(insertElement).toBeInTheDocument();

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(1);
  });

  test("削除ボタンを押すと学習記録が削除される（数が1つ減る）", async () => {
    getRecords.mockResolvedValue([{ id: 1, contents: "React", time: 1 }]);
    deleteRecords.mockResolvedValue([]);
    render(<App />);

    const user = userEvent.setup();
    expect(await screen.findAllByRole("listitem")).toHaveLength(1);

    await user.click(await screen.findByRole("button", { name: "削除" }));

    expect(deleteRecords).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });

  describe("入力エラーテスト", () => {
    test("学習内容と学習時間を入力せずに登録を押すとエラーが表示されるか", async () => {
      render(<App />);

      const user = userEvent.setup();

      expect(
        screen.queryByText("未入力の項目があります"),
      ).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "登録" }));

      expect(screen.getByText("未入力の項目があります")).toBeInTheDocument();
      expect(addRecords).not.toHaveBeenCalled();
    });

    test("学習内容のみを入力して登録を押すとエラーが表示されるか", async () => {
      render(<App />);

      const user = userEvent.setup();

      expect(
        screen.queryByText("未入力の項目があります"),
      ).not.toBeInTheDocument();

      await user.type(screen.getByRole("textbox"), "React");
      await user.click(screen.getByRole("button", { name: "登録" }));

      expect(screen.getByText("未入力の項目があります")).toBeInTheDocument();
      expect(addRecords).not.toHaveBeenCalled();
    });

    test("学習時間のみを入力して登録を押すとエラーが表示されるか", async () => {
      render(<App />);

      const user = userEvent.setup();

      expect(
        screen.queryByText("未入力の項目があります"),
      ).not.toBeInTheDocument();

      await user.type(screen.getByRole("spinbutton"), "1");
      await user.click(screen.getByRole("button", { name: "登録" }));

      expect(screen.getByText("未入力の項目があります")).toBeInTheDocument();
      expect(addRecords).not.toHaveBeenCalled();
    });
  });
});
