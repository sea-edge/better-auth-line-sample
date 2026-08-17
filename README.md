# Better Auth + LINE Login sample

BunのHTTPサーバー、Bun SQLite、Better Authだけで構成した最小のLINEログインサンプルです。

## 起動

```sh
bun install
cp .env.example .env
```

`.env`にLINE Developers Consoleで作成したLINE Login channelの値を設定します。

```dotenv
LINE_CLIENT_ID=Channel ID
LINE_CLIENT_SECRET=Channel secret
```

LINE Developers ConsoleのCallback URLには、次のURLを登録してください。

```text
http://localhost:3000/api/auth/callback/line
```

その後、Better AuthのSQLiteスキーマを作成して起動します。

```sh
bun run db:migrate
bun run dev
```

ブラウザで <http://localhost:3000> を開きます。

## 構成

- `server.ts`: Bun.serveとBetter Authのルーティング
- `auth.ts`: Better Auth、LINE provider、Bun SQLiteの設定
- `public/index.html`: LINEログインとセッション表示の画面
- `data/auth.sqlite`: ローカル開発用データベース（自動生成、Git管理外）

LINEの認証情報が未設定でも画面は表示できますが、ログインボタンは無効になります。
