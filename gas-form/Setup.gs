/**
 * セットアップ用スクリプト
 * このファイルは初回セットアップ後に削除可能
 */

/**
 * スプレッドシートを作成する
 */
function createSpreadsheet() {
  // スプレッドシートを作成
  const ss = SpreadsheetApp.create('Hiroki Yoga 予約データ');

  // シートを取得
  const sheet = ss.getSheets()[0];
  sheet.setName('予約データ');

  // ヘッダー行を追加
  sheet.appendRow([
    '受付日時',
    'お名前',
    'メールアドレス',
    'お電話番号',
    '希望日時（第1希望）',
    '希望日時（第2希望）',
    'レッスン形式',
    'メッセージ'
  ]);

  // ヘッダー行のスタイル設定
  const headerRange = sheet.getRange(1, 1, 1, 8);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#FFD166');
  headerRange.setHorizontalAlignment('center');

  // 列幅の自動調整
  sheet.autoResizeColumns(1, 8);

  // 作成完了メッセージ
  const spreadsheetId = ss.getId();
  const spreadsheetUrl = ss.getUrl();

  Logger.log('✅ スプレッドシートを作成しました！');
  Logger.log('');
  Logger.log('📋 スプレッドシートID: ' + spreadsheetId);
  Logger.log('🔗 URL: ' + spreadsheetUrl);
  Logger.log('');
  Logger.log('次のステップ:');
  Logger.log('1. Code.gs の SPREADSHEET_ID を上記のIDに変更');
  Logger.log('2. Code.gs の YOUR_EMAIL をあなたのメールアドレスに変更');
  Logger.log('3. clasp push で更新');
  Logger.log('4. Webアプリとしてデプロイ');

  return {
    id: spreadsheetId,
    url: spreadsheetUrl
  };
}
