/**
 * Hiroki Yoga 予約フォーム - Google Apps Script
 * カスタムHTMLフォームのバックエンド処理
 */

// スプレッドシートID
const SPREADSHEET_ID = '1i-dBeaKj7fK9s4RJ66zaDbbBVrjWOcCInbaABC3zeiQ';

/**
 * Webアプリのエントリーポイント
 * HTMLページを返す
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Hiroki Yoga レッスン予約')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * フォーム送信データを受信してスプレッドシートに保存
 * @param {Object} formData - フォームデータ
 * @return {Object} 成功/失敗のレスポンス
 */
function submitForm(formData) {
  try {
    // スプレッドシートを開く
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName('予約データ');

    // シートがなければ作成
    if (!sheet) {
      sheet = ss.insertSheet('予約データ');
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
    }

    // 現在時刻
    const timestamp = new Date();

    // データを追加
    sheet.appendRow([
      timestamp,
      formData.name || '',
      formData.email || '',
      formData.phone || '',
      formData.datetime1 || '',
      formData.datetime2 || '',
      formData.lessonType || '',
      formData.message || ''
    ]);

    // メール通知を送信（オプション）
    sendNotificationEmail(formData, timestamp);

    return {
      success: true,
      message: '予約を受け付けました。ご予約ありがとうございます！'
    };

  } catch (error) {
    console.error('エラー:', error);
    return {
      success: false,
      message: '送信に失敗しました。お手数ですがInstagramからお問い合わせください。'
    };
  }
}

/**
 * 予約受付の通知メールを送信
 * @param {Object} formData - フォームデータ
 * @param {Date} timestamp - 受付日時
 */
function sendNotificationEmail(formData, timestamp) {
  // あなたのメールアドレスを設定
  const YOUR_EMAIL = 'info.hirokitakamura@gmail.com';

  const subject = '【Hiroki Yoga】新規予約が届きました';

  const body = `
新しい予約が届きました。

━━━━━━━━━━━━━━━━
受付日時: ${Utilities.formatDate(timestamp, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss')}

【お客様情報】
お名前: ${formData.name}
メール: ${formData.email}
電話: ${formData.phone}

【希望日時】
第1希望: ${formData.datetime1}
第2希望: ${formData.datetime2}

【レッスン形式】
${formData.lessonType}

【メッセージ】
${formData.message || 'なし'}
━━━━━━━━━━━━━━━━

スプレッドシートで確認:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}
  `.trim();

  try {
    MailApp.sendEmail(YOUR_EMAIL, subject, body);
  } catch (error) {
    console.error('メール送信エラー:', error);
  }
}

/**
 * 自動返信メールを送信（オプション）
 * @param {string} email - 送信先メールアドレス
 * @param {string} name - お名前
 */
function sendAutoReplyEmail(email, name) {
  const subject = '【Hiroki Yoga】ご予約ありがとうございます';

  const body = `
${name} 様

この度はHiroki Yogaのレッスンにお申し込みいただき、誠にありがとうございます。

ご予約を承りました。
日程調整の上、改めてご連絡させていただきます。

今しばらくお待ちくださいませ。

━━━━━━━━━━━━━━━━
Hiroki Yoga
Instagram: @hirokiplants
━━━━━━━━━━━━━━━━
  `.trim();

  try {
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('自動返信メール送信エラー:', error);
  }
}
