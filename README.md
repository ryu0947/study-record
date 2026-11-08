# 学習記録アプリ
学習内容と学習時間を記録するアプリをReactで開発しました。

## 主な仕様
* テキストフォームに学習内容と時間を入力し、登録ボタンを押すと「〇〇：〇時間」の形式で学習記録がDBに登録されます。
* 学習記録は削除可能です。
* 登録されている学習時間の合計を表示しています。
* アプリにアクセスしたら自動でDBから学習記録を取得します。
* 学習内容と学習時間の両方かどちらかが入力されずに登録ボタンを押すとエラーを出します。

<img width="350" height="385" alt="Image" src="https://github.com/user-attachments/assets/aa68cbcf-8924-4a35-829d-7c80744989ad" />

学習記録アプリ<br>
https://study-record-31e61.web.app/

## 使用技術
| 分類           | 使用技術       |
| ------------- | ------------- |
| 開発環境 | Vite 8.3.5 |
| フレームワーク | React 19.2.8 |
| DB | Supabase |
| CI/CD | GitHub Actions |
| テスト | Vitest/React Testing Libraly |
| ホスティング | Firebase Hosting |

## 環境設定の方法
こちらのアプリをクローンして、手元のPCでアプリを動かすまでの手順です。

### 必要なもの
- Node.js 24.22.1
- Supabaseアカウント

### 1. リポジトリをクローン
```bash
git clone https://github.com/ryu0947/study-record.git
cd study-record
```

### 2. パッケージをインストール
```bash
npm install
```

### 3. Supabase の準備
[Supabase](https://supabase.com/) でプロジェクトを作成し、`study-record` テーブルを以下のカラムで作成してください。

| カラム名 | 型 | 備考 |
| -------- | -- | ---- |
| id | uuid | 主キー（自動採番） |
| contents | varchar | 学習内容 |
| time | int4 | 学習時間 |

<img width="734" height="285" alt="Image" src="https://github.com/user-attachments/assets/17ed5c97-0664-4859-8e83-86652765d1f7" />

### 4. 環境変数を設定
プロジェクトのルート直下に `.env` を作成し、Supabase の URL と Publishable Key を設定します。
```
VITE_SUPABASE_URL=あなたのSupabaseのURL
VITE_SUPABASE_PUBLISHABLE_KEY=あなたのPublishable Key
```

### 5. 起動
```bash
npm run dev
```
ブラウザで http://localhost:5173 を開くとアプリが表示されます。
