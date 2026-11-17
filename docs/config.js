/*
 * サブスク通帳 — 公開用の設定
 *
 * firebase が空のままだと「引き継ぎコード」「みんなのサブスク」「人気ランキング」は表示されません
 * （ほかの機能と、コピー＆貼り付けでの引き継ぎはそのまま使えます）。
 * apiKey は秘密の値ではなく、公開してよいものです。読み書きできる範囲は firestore.rules で制限しています。
 * 価格の定期更新ではこのファイルを変えません。
 */
window.SUBSC_CONFIG = {
  appUrl: "https://jinbb-shark.github.io/subsc-tsucho/",
  firebase: {
    apiKey: "AIzaSyD8gwQdzxVqVL7HGXqr-G5wMnZImDewPsk",
    projectId: "subsc-tsucho"
  }
};
