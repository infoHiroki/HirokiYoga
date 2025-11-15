# Hiroki Yoga 予約フォーム（GAS）

カスタムHTMLフォームを使った予約システム

## 📁 ファイル構成

```
gas-form/
├── appsscript.json   # GASマニフェスト
├── Code.gs           # バックエンド処理（データ保存、メール送信）
├── Index.html        # フォームHTML（デザイン含む）
├── .clasp.json       # clasp設定ファイル
└── README.md         # このファイル
```

## 🚀 セットアップ手順

### 1. claspのインストール

```bash
npm install -g @google/clasp
```

### 2. Googleアカウントでログイン

```bash
clasp login
```

### 3. 新しいGASプロジェクトを作成

```bash
cd gas-form
clasp create --type webapp --title "Hiroki Yoga 予約フォーム"
```

→ スクリプトIDが表示されるので、`.clasp.json`の`scriptId`に設定

### 4. スプレッドシートを作成

1. Google Driveで新しいスプレッドシートを作成
2. スプレッドシートのIDをコピー（URLの`/d/`と`/edit`の間）
3. `Code.gs`の`SPREADSHEET_ID`に設定

### 5. メール設定（オプション）

`Code.gs`の以下を設定：
- `YOUR_EMAIL`：通知を受け取るメールアドレス

### 6. デプロイ

```bash
# ファイルをアップロード
clasp push

# ブラウザでGASエディタを開く
clasp open

# Webアプリとしてデプロイ
# 1. GASエディタで「デプロイ」→「新しいデプロイ」
# 2. 種類：「ウェブアプリ」
# 3. アクセス：「全員」
# 4. デプロイ
```

### 7. サイトに埋め込み

デプロイ後に表示されるWebアプリURLを、`index.html`のContactセクションに埋め込む：

```html
<iframe src="YOUR_WEB_APP_URL"
        width="100%"
        height="900"
        frameborder="0">
</iframe>
```

## 📊 データ管理

予約データは指定したスプレッドシートに自動保存されます。

**保存される項目：**
- 受付日時
- お名前
- メールアドレス
- お電話番号
- 希望日時（第1希望）
- 希望日時（第2希望）
- レッスン形式
- メッセージ

## ✉️ メール通知

- **あなたへ**：新規予約が届くとメール通知
- **お客様へ**（オプション）：自動返信メール

## 🎨 デザイン

サイトのデザインに合わせた黄色（#FFD166）ベースのデザイン。
モバイルファースト・レスポンシブ対応。

## 🔧 更新方法

ローカルで編集後：

```bash
clasp push
```

## 📝 メモ

- WebアプリURLは変更されない（再デプロイしても同じURL）
- スプレッドシートは定期的にバックアップ推奨
- メール送信にはGmailの送信制限あり（1日100通程度）
