/*
 * サブスク通帳 — 価格カタログ（大学生向け）
 *
 * 定期更新ではこのファイルだけを書き換える。アプリ本体は触らない。
 *   - price は税込。currency を省略したプランは円 (JPY)。price: 0 は「無料（条件つき）」。
 *   - c は請求サイクル: "1w" 毎週 / "2w" 2週ごと / "4w" 4週ごと / "30d" 30日ごと / "1m" 毎月 / "6w" 6週ごと / "2m" / "3m" / "6m" / "1y" 毎年 / "2y"。
 *     ゲームの月パスは "30d"、バージョンごとのバトルパスは "6w" を目安にする。
 *   - tier が同じプラン同士は「同じ内容で支払いサイクル違い」(年払い節約の提案に使う)。
 *   - seats は家族・Duo などで一緒に使える最大人数（割り勘の提案に使う）。
 *   - cond は利用条件。"学生" は学割・学生無料のプランで、学割の提案と卒業後の試算に使う。
 *     学生プランの after には、卒業後に移るプランの id を書く。
 *   - note はプランごとの補足（1文）。
 *   - checked はその価格を確認した日、confidence は確認の確かさ:
 *       high = 2026年の改定情報や公式の現行価格で確認 / mid = 複数の二次情報で確認 / low = 古い情報、要確認
 *   - includes は、そのサービスに含まれる別サービスの id (重複契約の検出とセット提案に使う)。
 *   - プランの id はユーザーの登録と結びついているので変えない。
 *   - cat: video, music, books, study, software, ai, game, social, cloud, telecom, membership, life, delivery（定期便・宅配）, fitness（健康・美容・コンタクト）, other
 */
window.SUBSCRIPTION_CATALOG = {
  version: "2026-11-14",
  fx: { USD: 158, asOf: "2026-10-30", note: "日銀為替市況 10月30日午後5時（157円55〜56銭、みんかぶ）を丸めた値" },
  services: [
    // ───────── 動画配信 ─────────
    { id: "netflix", name: "Netflix", kana: "ねっとふりっくす ねとふり", cat: "video",
      site: "https://help.netflix.com/ja/node/24926", manage: "https://www.netflix.com/account",
      ref: "https://gigazine.net/news/20260327-netflix-raises-prices/",
      checked: "2026-10-27", confidence: "high", note: "日本は2024年10月改定の料金のまま（2026年3月の値上げは米国のみ）",
      plans: [
        { id: "ads", name: "広告つきスタンダード", price: 890, c: "1m" },
        { id: "standard", name: "スタンダード", price: 1590, c: "1m" },
        { id: "premium", name: "プレミアム", price: 2290, c: "1m" }
      ] },
    { id: "disneyplus", name: "Disney+", kana: "でぃずにーぷらす", cat: "video",
      site: "https://www.disneyplus.com/ja-jp", manage: "https://www.disneyplus.com/ja-jp/account",
      ref: "https://www.pricey.jp/web/articles/4542",
      checked: "2026-10-27", confidence: "high", note: "2026年3月25日改定（既存会員は5月の請求分から）",
      plans: [
        { id: "standard-m", name: "スタンダード（月額）", price: 1250, c: "1m", tier: "standard" },
        { id: "standard-y", name: "スタンダード（年額）", price: 12500, c: "1y", tier: "standard" },
        { id: "premium-m", name: "プレミアム（月額）", price: 1670, c: "1m", tier: "premium" },
        { id: "premium-y", name: "プレミアム（年額）", price: 16700, c: "1y", tier: "premium" }
      ] },
    { id: "unext", name: "U-NEXT", kana: "ゆーねくすと", cat: "video",
      site: "https://video.unext.jp/", manage: "https://video.unext.jp/account",
      ref: "https://selectra.jp/streaming/u-next",
      checked: "2026-10-27", confidence: "high", note: "毎月1,200ポイント付与",
      plans: [{ id: "monthly", name: "月額プラン", price: 2189, c: "1m" }] },
    { id: "hulu", name: "Hulu", kana: "ふーる", cat: "video",
      site: "https://www.hulu.jp/", manage: "https://www.hulu.jp/account",
      ref: "https://selectra.jp/streaming/news/hulu-price-increase-2026",
      checked: "2026-10-27", confidence: "high", note: "2026年10月1日改定（1,026円→1,320円）",
      plans: [
        { id: "standard", name: "月額（通常決済）", price: 1320, c: "1m" },
        { id: "inapp", name: "月額（アプリ内決済）", price: 1450, c: "1m", cond: "アプリ内決済" }
      ] },
    { id: "primevideo-adfree", name: "Prime Video 広告フリー", kana: "ぷらいむびでお", cat: "video",
      site: "https://www.amazon.co.jp/primevideo", manage: "https://www.amazon.co.jp/gp/video/settings",
      ref: "https://pricey.jp/web/articles/4496",
      checked: "2026-10-27", confidence: "mid", note: "プライム会員向けの追加オプション",
      plans: [{ id: "monthly", name: "広告フリー（月額）", price: 390, c: "1m" }] },
    { id: "youtube", name: "YouTube Premium", kana: "ゆーちゅーぶぷれみあむ ようつべ", cat: "video",
      site: "https://www.youtube.com/premium", manage: "https://www.youtube.com/paid_memberships",
      ref: "https://www.gizmodo.jp/2026/04/youtube-premium-price-hike-usa-2026.html",
      checked: "2026-10-27", confidence: "high", note: "iPhoneアプリから申し込むと割高。米国は2026年6月に値上げ",
      includes: ["ytmusic"],
      plans: [
        { id: "individual", name: "個人（月額）", price: 1280, c: "1m", tier: "individual" },
        { id: "individual-y", name: "個人（年額）", price: 12800, c: "1y", tier: "individual" },
        { id: "family", name: "ファミリー", price: 2280, c: "1m", seats: 6, note: "同じ世帯の家族と共有" },
        { id: "student", name: "学生", price: 780, c: "1m", cond: "学生", after: "individual", note: "大学・短大・専門学校の在学生。最長4年" },
        { id: "lite", name: "Premium Lite", price: 780, c: "1m", note: "動画の広告なしのみ。YouTube Music Premium は含まない" }
      ] },
    { id: "appletv", name: "Apple TV", kana: "あっぷるてぃーびー", cat: "video",
      site: "https://www.apple.com/jp/apple-tv-plus/", manageNote: "iPhoneの［設定］→［自分の名前］→［サブスクリプション］",
      ref: "https://www.phileweb.com/news/d-av/202607/18/65608.html",
      checked: "2026-10-27", confidence: "high", note: "2026年7月18日改定（900円→1,200円）",
      plans: [{ id: "monthly", name: "月額", price: 1200, c: "1m" }] },
    { id: "dazn", name: "DAZN", kana: "だぞーん", cat: "video",
      site: "https://www.dazn.com/ja-JP/welcome", manage: "https://www.dazn.com/ja-JP/myaccount",
      checked: "2026-10-27", confidence: "mid", note: "直近の改定は2024年2月",
      plans: [
        { id: "standard", name: "Standard（月額）", price: 4200, c: "1m" },
        { id: "annual-monthly", name: "Standard 年間プラン（月々払い）", price: 3200, c: "1m", cond: "12か月継続" },
        { id: "annual", name: "Standard 年間プラン（一括）", price: 32000, c: "1y" }
      ] },
    { id: "abema", name: "ABEMAプレミアム", kana: "あべま", cat: "video",
      site: "https://abema.tv/about/premium",
      ref: "https://selectra.jp/streaming/sports",
      checked: "2026-10-27", confidence: "mid", note: "情報源によって金額に差あり。公式ページで確認を",
      plans: [
        { id: "premium", name: "プレミアム", price: 1180, c: "1m" },
        { id: "ads", name: "広告つきプレミアム", price: 680, c: "1m" }
      ] },
    { id: "danime", name: "dアニメストア", kana: "でぃーあにめ", cat: "video",
      site: "https://animestore.docomo.ne.jp/",
      checked: "2026-10-27", confidence: "mid", note: "2026年2月改定。App Store/Google Play決済は760円",
      plans: [{ id: "monthly", name: "月額", price: 660, c: "1m" }] },
    { id: "dmmtv", name: "DMM TV（DMMプレミアム）", kana: "でぃーえむえむてぃーびー", cat: "video",
      site: "https://tv.dmm.com/vod/",
      ref: "https://appllio.com/dmm-premium-review",
      checked: "2026-10-27", confidence: "high", note: "アニメ・エンタメ見放題。DMMの各サービスで会員特典あり",
      plans: [{ id: "monthly", name: "DMMプレミアム", price: 550, c: "1m" }] },
    { id: "lemino", name: "Lemino プレミアム", kana: "れみの", cat: "video",
      site: "https://lemino.docomo.ne.jp/",
      checked: "2026-10-27", confidence: "mid", note: "2026年2月改定",
      plans: [{ id: "monthly", name: "月額", price: 1540, c: "1m" }] },
    { id: "niconico", name: "ニコニコプレミアム", kana: "にこにこ にこどう", cat: "video",
      site: "https://premium.nicovideo.jp/",
      ref: "https://av.watch.impress.co.jp/docs/news/2109490.html",
      checked: "2026-11-01", confidence: "mid", note: "2026年8月1日改定（月額790円→990円）。アプリ内課金も990円",
      plans: [
        { id: "monthly", name: "月額", price: 990, c: "1m", tier: "std" },
        { id: "yearly", name: "年額", price: 9900, c: "1y", tier: "std" }
      ] },
    { id: "fod", name: "FODプレミアム", kana: "えふおーでぃー", cat: "video",
      site: "https://fod.fujitv.co.jp/",
      checked: "2026-10-27", confidence: "mid",
      plans: [{ id: "monthly", name: "月額", price: 976, c: "1m" }] },
    { id: "telasa", name: "TELASA", kana: "てらさ", cat: "video",
      site: "https://www.telasa.jp/",
      checked: "2026-10-27", confidence: "mid",
      plans: [{ id: "monthly", name: "月額", price: 990, c: "1m" }] },
    { id: "wowow", name: "WOWOWオンデマンド", kana: "わうわう", cat: "video",
      site: "https://www.wowow.co.jp/",
      ref: "https://selectra.jp/streaming/wowow",
      checked: "2026-10-27", confidence: "mid", note: "2026年8月時点の比較記事でも同額。BS放送とオンデマンド配信の両方を含む",
      plans: [{ id: "monthly", name: "月額", price: 2530, c: "1m" }] },

    // ───────── 音楽 ─────────
    { id: "spotify", name: "Spotify Premium", kana: "すぽてぃふぁい すぽてぃ", cat: "music",
      site: "https://www.spotify.com/jp/premium/", manage: "https://www.spotify.com/jp/account/overview/",
      checked: "2026-10-27", confidence: "high",
      plans: [
        { id: "standard", name: "Standard（個人）", price: 1080, c: "1m" },
        { id: "duo", name: "Duo", price: 1480, c: "1m", seats: 2, note: "同じ住所の2人" },
        { id: "family", name: "Family", price: 1880, c: "1m", seats: 6, note: "同じ住所の家族" },
        { id: "student", name: "Student", price: 580, c: "1m", cond: "学生", after: "standard", note: "18歳以上の大学生など。最長4年・12か月ごとに在学確認" }
      ] },
    { id: "applemusic", name: "Apple Music", kana: "あっぷるみゅーじっく", cat: "music",
      site: "https://www.apple.com/jp/apple-music/", manageNote: "iPhoneの［設定］→［自分の名前］→［サブスクリプション］",
      ref: "https://www.phileweb.com/news/d-av/202607/18/65608.html",
      checked: "2026-10-27", confidence: "high", note: "2026年7月18日改定",
      plans: [
        { id: "individual", name: "個人", price: 1180, c: "1m" },
        { id: "family", name: "ファミリー", price: 1980, c: "1m", seats: 6, note: "ファミリー共有のメンバー" },
        { id: "student", name: "学生", price: 680, c: "1m", cond: "学生", after: "individual", note: "大学などの在学生。最長48か月" }
      ] },
    { id: "amazonmusic", name: "Amazon Music", kana: "あまぞんみゅーじっく", cat: "music",
      site: "https://www.amazon.co.jp/music/unlimited", manage: "https://www.amazon.co.jp/music/settings",
      ref: "https://appllio.com/news/2026-02-04-71276-2602-amazon-music-unlimited-price-increase",
      checked: "2026-10-27", confidence: "mid", note: "2026年2月にStandardプランが登場",
      plans: [
        { id: "unlimited-prime", name: "Unlimited（プライム会員）", price: 1080, c: "1m", cond: "プライム会員" },
        { id: "unlimited", name: "Unlimited（会員以外）", price: 1180, c: "1m" },
        { id: "standard-prime", name: "Standard（プライム会員）", price: 980, c: "1m", cond: "プライム会員", note: "Audible の特典なし" },
        { id: "standard", name: "Standard（会員以外）", price: 1080, c: "1m", note: "Audible の特典なし" },
        { id: "student", name: "Unlimited 学生", price: 580, c: "1m", cond: "学生", after: "unlimited" }
      ] },
    { id: "ytmusic", name: "YouTube Music Premium", kana: "ゆーちゅーぶみゅーじっく", cat: "music",
      site: "https://music.youtube.com/", manage: "https://www.youtube.com/paid_memberships",
      checked: "2026-10-27", confidence: "mid",
      plans: [{ id: "individual", name: "個人", price: 1080, c: "1m" }] },
    { id: "linemusic", name: "LINE MUSIC", kana: "らいんみゅーじっく", cat: "music",
      site: "https://music.line.me/",
      ref: "https://www.watch.impress.co.jp/docs/news/2140737.html",
      checked: "2026-10-27", confidence: "mid", note: "LINE STORE決済の価格。App Store/Google Play決済は一般1,080円・学生580円・年額10,800円",
      plans: [
        { id: "general", name: "一般（月額）", price: 980, c: "1m", tier: "general" },
        { id: "general-y", name: "一般（年額）", price: 9600, c: "1y", tier: "general" },
        { id: "student", name: "学生", price: 480, c: "1m", cond: "学生", after: "general" }
      ] },

    // ───────── 本・マンガ・ニュース ─────────
    { id: "kindleunlimited", name: "Kindle+（旧Kindle Unlimited）", kana: "きんどるぷらす きんどるあんりみてっど kindle unlimited", cat: "books",
      site: "https://www.amazon.co.jp/kindle-dbs/hz/subscribe/ku", manage: "https://www.amazon.co.jp/kindle-dbs/ku/ku-central",
      ref: "https://www.gizmodo.jp/article/2610-kindle-unlimited-to-kindle-plus/",
      checked: "2026-11-01", confidence: "high", note: "2026年10月22日に「Kindle+」へ名称変更（料金・内容は据え置き）",
      plans: [{ id: "monthly", name: "月額", price: 980, c: "1m" }] },
    { id: "audible", name: "Audible", kana: "おーでぃぶる", cat: "books",
      site: "https://www.audible.co.jp/",
      ref: "https://www.phileweb.com/sp/news/hobby/202610/09/8582.html",
      checked: "2026-10-27", confidence: "high", note: "プライム会員でも別料金",
      plans: [{ id: "premium", name: "プレミアムプラン", price: 1500, c: "1m" }] },
    { id: "jumpplus", name: "少年ジャンプ+", kana: "じゃんぷぷらす", cat: "books",
      site: "https://shonenjumpplus.com/",
      ref: "https://appllio.com/app-shonen-jump-plus",
      checked: "2026-10-27", confidence: "mid", note: "週刊少年ジャンプとジャンプGIGAの定期購読",
      plans: [{ id: "jump", name: "週刊少年ジャンプ定期購読", price: 980, c: "1m" }] },
    { id: "dmagazine", name: "dマガジン", kana: "でぃーまがじん", cat: "books",
      site: "https://magazine.dmkt-sp.jp/",
      ref: "https://selectra.jp/streaming/dmagazine",
      checked: "2026-10-27", confidence: "mid", note: "雑誌の読み放題",
      plans: [{ id: "monthly", name: "月額", price: 580, c: "1m" }] },
    { id: "rakutenmagazine", name: "楽天マガジン", kana: "らくてんまがじん", cat: "books",
      site: "https://magazine.rakuten.co.jp/",
      ref: "https://appllio.com/rakuten-magazine-pricing-plans",
      checked: "2026-11-01", confidence: "mid", note: "2026年5月14日改定。楽天モバイル契約者は月額537円・年額5,382円",
      plans: [
        { id: "monthly", name: "月額", price: 597, c: "1m", tier: "std" },
        { id: "yearly", name: "年額", price: 5980, c: "1y", tier: "std" }
      ] },
    { id: "nikkei", name: "日経電子版", kana: "にっけい", cat: "books",
      site: "https://www.nikkei.com/",
      ref: "https://www.toushikiso.com/blog/etc/nikkei-electronic.html",
      checked: "2026-10-27", confidence: "mid", note: "2026年9月時点の比較記事で同額（公式ページは未確認）。学割は期間限定のキャンペーンが中心",
      plans: [{ id: "monthly", name: "月額", price: 4277, c: "1m" }] },

    // ───────── 勉強・語学 ─────────
    { id: "duolingo", name: "Duolingo", kana: "でゅおりんご どぅおりんご", cat: "study",
      site: "https://www.duolingo.com/super",
      ref: "https://aipicks.jp/mag/duolingo-pricing-guide-2026",
      checked: "2026-10-27", confidence: "low", note: "アプリ内の表示価格。ストアや時期で変わる",
      plans: [
        { id: "super-m", name: "Super（月額）", price: 1990, c: "1m", tier: "super" },
        { id: "super-y", name: "Super（年額）", price: 9900, c: "1y", tier: "super" },
        { id: "family-y", name: "Super ファミリー（年額）", price: 13200, c: "1y", seats: 6 },
        { id: "max-m", name: "Max（月額）", price: 4490, c: "1m", tier: "max" },
        { id: "max-y", name: "Max（年額）", price: 22800, c: "1y", tier: "max" }
      ] },
    { id: "studysapuri", name: "スタディサプリENGLISH", kana: "すたでぃさぷり すたさぷ", cat: "study",
      site: "https://eigosapuri.jp/",
      ref: "https://eikaiwa.weblio.jp/ninja-eikaiwa/study-sapuri-toeic-cost/",
      checked: "2026-10-27", confidence: "mid", note: "大学によっては団体割引あり",
      plans: [
        { id: "toeic-m", name: "TOEIC対策 ベーシック（月額）", price: 3278, c: "1m", tier: "toeic" },
        { id: "toeic-y", name: "TOEIC対策 ベーシック（12ヶ月パック）", price: 32736, c: "1y", tier: "toeic" },
        { id: "daily-m", name: "新日常英会話 ベーシック（月額）", price: 2178, c: "1m", note: "金額は要確認" }
      ] },
    { id: "dmmeikaiwa", name: "DMM英会話", kana: "でぃーえむえむえいかいわ", cat: "study",
      site: "https://eikaiwa.dmm.com/",
      ref: "https://exidea.co.jp/blog/study/english/dmm-eikaiwa/",
      checked: "2026-10-27", confidence: "mid", note: "2024年4月に値下げ",
      plans: [{ id: "standard-1", name: "スタンダード 毎日1レッスン", price: 6980, c: "1m" }] },
    { id: "rarejob", name: "レアジョブ英会話", kana: "れあじょぶ", cat: "study",
      site: "https://www.rarejob.com/",
      ref: "https://englishhub.jp/online/rarejob-dmm.html",
      checked: "2026-10-27", confidence: "mid",
      plans: [
        { id: "m8", name: "日常英会話 月8回", price: 4980, c: "1m" },
        { id: "daily", name: "日常英会話 毎日25分", price: 7980, c: "1m" }
      ] },
    { id: "udemy", name: "Udemy パーソナルプラン", kana: "ゆーでみー", cat: "study",
      site: "https://www.udemy.com/ja/",
      ref: "https://webtan.impress.co.jp/n/2025/09/03/49995",
      checked: "2026-10-27", confidence: "low", note: "2025年9月の報道の価格。講座の個別購入とは別",
      plans: [{ id: "personal", name: "パーソナルプラン（月額）", price: 2292, c: "1m" }] },
    { id: "coursera", name: "Coursera Plus", kana: "こーせら", cat: "study",
      site: "https://www.coursera.org/courseraplus",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "plus-m", name: "Plus（月額）", price: 59, currency: "USD", c: "1m", tier: "plus" },
        { id: "plus-y", name: "Plus（年額）", price: 399, currency: "USD", c: "1y", tier: "plus" }
      ] },
    { id: "progate", name: "Progate", kana: "ぷろげいと プログラミング", cat: "study",
      site: "https://prog-8.com/",
      ref: "https://kakaku.com/programming-school/item/005.html",
      checked: "2026-10-27", confidence: "low", note: "情報源によって金額に差あり。公式ページで確認を",
      plans: [{ id: "plus", name: "プラスプラン（月額）", price: 1490, c: "1m" }] },

    // ───────── ノート・制作ツール ─────────
    { id: "goodnotes", name: "Goodnotes", kana: "ぐっどのーと ぐっどのーつ", cat: "software",
      site: "https://www.goodnotes.com/ja", manageNote: "iPhone・iPadの［設定］→［自分の名前］→［サブスクリプション］",
      ref: "https://apps.apple.com/JP/app/id1444383602",
      checked: "2026-10-27", confidence: "mid", note: "App Store の表示価格。旧プランは年額1,350円、買い切りの特別版もあり",
      plans: [
        { id: "basic", name: "ベーシック（年額）", price: 1600, c: "1y" },
        { id: "pro", name: "プロ（年額）", price: 4880, c: "1y", note: "AI機能やコラボ機能つき" }
      ] },
    { id: "notion", name: "Notion", kana: "のーしょん", cat: "software",
      site: "https://www.notion.com/ja/pricing", manage: "https://www.notion.so/",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "plus-m", name: "Plus（月額）", price: 12, currency: "USD", c: "1m", tier: "plus" },
        { id: "plus-y", name: "Plus（年額）", price: 120, currency: "USD", c: "1y", tier: "plus" },
        { id: "edu", name: "Plus（学生・教職員）", price: 0, currency: "USD", c: "1m", cond: "学生", after: "plus-m", note: "大学のメールアドレスで登録すると無料" }
      ] },
    { id: "evernote", name: "Evernote", kana: "えばーのーと", cat: "software",
      site: "https://evernote.com/ja-jp/compare-plans",
      ref: "https://pricey.jp/web/articles/4998",
      checked: "2026-10-27", confidence: "mid", note: "2025年に大幅な料金改定",
      plans: [
        { id: "starter-m", name: "Starter（月額）", price: 1100, c: "1m", tier: "starter" },
        { id: "starter-y", name: "Starter（年額）", price: 7099, c: "1y", tier: "starter" },
        { id: "advanced-m", name: "Advanced（月額）", price: 1799, c: "1m", tier: "advanced" },
        { id: "advanced-y", name: "Advanced（年額）", price: 17899, c: "1y", tier: "advanced" }
      ] },
    { id: "m365", name: "Microsoft 365", kana: "まいくろそふと おふぃす わーど えくせる", cat: "software",
      site: "https://www.microsoft.com/ja-jp/microsoft-365/buy/compare-all-microsoft-365-products", manage: "https://account.microsoft.com/services",
      ref: "https://fyve.co.jp/copilot/articles/copilot-personal-plans-guide",
      checked: "2026-10-27", confidence: "high", note: "2025年1月にCopilot込みで値上げ",
      plans: [
        { id: "personal-m", name: "Personal（月額）", price: 2130, c: "1m", tier: "personal" },
        { id: "personal-y", name: "Personal（年額）", price: 21300, c: "1y", tier: "personal" },
        { id: "family-m", name: "Family（月額）", price: 2740, c: "1m", tier: "family", seats: 6 },
        { id: "family-y", name: "Family（年額）", price: 27400, c: "1y", tier: "family", seats: 6 },
        { id: "premium-m", name: "Premium（月額）", price: 3200, c: "1m", tier: "premium" },
        { id: "premium-y", name: "Premium（年額）", price: 32000, c: "1y", tier: "premium" },
        { id: "edu", name: "Education（大学のアカウント）", price: 0, c: "1m", cond: "学生", after: "personal-m", note: "大学が契約していれば無料で使える場合が多い。大学の案内を確認" }
      ] },
    { id: "adobe", name: "Adobe Creative Cloud", kana: "あどびくりえいてぃぶくらうど ふぉとしょっぷ いらすとれーたー", cat: "software",
      site: "https://www.adobe.com/jp/creativecloud/plans.html", manage: "https://account.adobe.com/plans",
      ref: "https://www.adobe.com/jp/education/students/illustrator.html",
      checked: "2026-10-27", confidence: "mid", note: "CC Proは2025年8月改定の価格。学生・教職員版は初年度が割安",
      plans: [
        { id: "ccpro", name: "Creative Cloud Pro（年間・月々払い）", price: 9080, c: "1m" },
        { id: "student-1", name: "学生・教職員版 Pro（初年度）", price: 2180, c: "1m", cond: "学生", after: "ccpro", note: "年間プラン月々払い。最初の3か月は980円のことも" },
        { id: "student-2", name: "学生・教職員版 Pro（2年目以降）", price: 4180, c: "1m", cond: "学生", after: "ccpro" },
        { id: "photo1tb", name: "フォトプラン 1TB（年間・月々払い）", price: 2380, c: "1m", tier: "photo" },
        { id: "photo1tb-y", name: "フォトプラン 1TB（年間一括）", price: 28480, c: "1y", tier: "photo" }
      ] },
    { id: "clipstudio", name: "CLIP STUDIO PAINT", kana: "くりっぷすたじお くりすた", cat: "software",
      site: "https://www.clipstudio.net/ja/purchase/",
      ref: "https://aipicks.jp/tool/clip-studio-paint/pricing",
      checked: "2026-10-27", confidence: "mid", note: "1デバイスの価格。買い切り版もあり",
      plans: [
        { id: "pro-m", name: "PRO（月額）", price: 480, c: "1m", tier: "pro" },
        { id: "pro-y", name: "PRO（年額）", price: 3000, c: "1y", tier: "pro" },
        { id: "ex-m", name: "EX（月額）", price: 980, c: "1m", tier: "ex" },
        { id: "ex-y", name: "EX（年額）", price: 8300, c: "1y", tier: "ex" }
      ] },
    { id: "canva", name: "Canva Pro", kana: "きゃんば", cat: "software",
      site: "https://www.canva.com/ja_jp/pricing/",
      checked: "2026-10-27", confidence: "low", note: "情報源で金額が食い違う。公式ページで確認を",
      plans: [
        { id: "pro-m", name: "Pro（月額）", price: 1180, c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 11800, c: "1y", tier: "pro" }
      ] },
    { id: "deepl", name: "DeepL Pro", kana: "でぃーぷる ほんやく", cat: "software",
      site: "https://www.deepl.com/ja/pro",
      ref: "https://aipicks.jp/tool/deepl/pricing",
      checked: "2026-10-27", confidence: "low", note: "年払いの価格（月あたり1,150円）",
      plans: [{ id: "starter-y", name: "Starter（年払い）", price: 13800, c: "1y" }] },
    { id: "grammarly", name: "Grammarly Pro", kana: "ぐらまりー", cat: "software",
      site: "https://www.grammarly.com/plans",
      ref: "https://www.eesel.ai/ja/blog/grammarly-ryokin",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "pro-m", name: "Pro（月額）", price: 30, currency: "USD", c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 144, currency: "USD", c: "1y", tier: "pro" }
      ] },

    // ───────── AI ─────────
    { id: "chatgpt", name: "ChatGPT", kana: "ちゃっとじーぴーてぃー openai", cat: "ai",
      site: "https://openai.com/ja-JP/chatgpt/pricing/", manage: "https://chatgpt.com/",
      ref: "https://webtan.impress.co.jp/n/2026/01/20/52037",
      checked: "2026-10-27", confidence: "high", note: "日本は円建て。App Store経由は価格が異なる場合あり",
      plans: [
        { id: "go", name: "Go", price: 1500, c: "1m" },
        { id: "plus", name: "Plus", price: 3000, c: "1m" },
        { id: "pro", name: "Pro", price: 30000, c: "1m" }
      ] },
    { id: "claude", name: "Claude", kana: "くろーど anthropic", cat: "ai",
      site: "https://claude.com/pricing", manage: "https://claude.ai/settings/billing",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "pro", name: "Pro（月額）", price: 20, currency: "USD", c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 200, currency: "USD", c: "1y", tier: "pro" },
        { id: "max5", name: "Max 5x", price: 100, currency: "USD", c: "1m" },
        { id: "max20", name: "Max 20x", price: 200, currency: "USD", c: "1m" }
      ] },
    { id: "googleai", name: "Google AI（Gemini）", kana: "じぇみに ぐーぐるえーあい", cat: "ai",
      site: "https://one.google.com/about/google-ai-plans/", manage: "https://one.google.com/",
      ref: "https://jetstream.blog/2026/08/20/google-ai-plus-university-student-offer-until-december-31-2026/",
      checked: "2026-10-27", confidence: "mid", note: "AI Plusは2026年6月に値下げ（1,200円→725円）。ストレージ付き",
      includes: ["googleone"],
      plans: [
        { id: "plus", name: "Google AI Plus", price: 725, c: "1m" },
        { id: "plus-student", name: "Google AI Plus（大学生は1年無料）", price: 0, c: "1m", cond: "学生", after: "plus", note: "18〜24歳の大学生。2026年12月31日までの申込" },
        { id: "pro", name: "Google AI Pro", price: 2900, c: "1m" },
        { id: "ultra", name: "Google AI Ultra", price: 36400, c: "1m" }
      ] },
    { id: "copilot", name: "GitHub Copilot", kana: "ぎっとはぶこぱいろっと", cat: "ai",
      site: "https://github.com/features/copilot/plans", manage: "https://github.com/settings/billing",
      ref: "https://docs.github.com/ja/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て。学生向け無料プランは2026年4月から新規受付を停止中",
      plans: [
        { id: "pro", name: "Pro（月額）", price: 10, currency: "USD", c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 100, currency: "USD", c: "1y", tier: "pro" },
        { id: "proplus", name: "Pro+", price: 39, currency: "USD", c: "1m" }
      ] },
    { id: "cursor", name: "Cursor", kana: "かーそる", cat: "ai",
      site: "https://cursor.com/pricing",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "pro", name: "Pro（月額）", price: 20, currency: "USD", c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 192, currency: "USD", c: "1y", tier: "pro" }
      ] },
    { id: "perplexity", name: "Perplexity", kana: "ぱーぷれきしてぃ", cat: "ai",
      site: "https://www.perplexity.ai/pro",
      checked: "2026-10-27", confidence: "mid", note: "ドル建て",
      plans: [
        { id: "pro", name: "Pro（月額）", price: 20, currency: "USD", c: "1m", tier: "pro" },
        { id: "pro-y", name: "Pro（年額）", price: 200, currency: "USD", c: "1y", tier: "pro" }
      ] },

    // ───────── ゲーム ─────────
    { id: "nso", name: "Nintendo Switch Online", kana: "にんてんどーすいっちおんらいん", cat: "game",
      site: "https://www.nintendo.com/jp/",
      ref: "https://www.famitsu.com/article/202606/79223",
      checked: "2026-10-27", confidence: "high", note: "2026年7月1日改定",
      plans: [
        { id: "ind-1m", name: "個人 1か月", price: 400, c: "1m", tier: "individual" },
        { id: "ind-3m", name: "個人 3か月", price: 1000, c: "3m", tier: "individual" },
        { id: "ind-12m", name: "個人 12か月", price: 3000, c: "1y", tier: "individual" },
        { id: "family-12m", name: "ファミリー 12か月", price: 5800, c: "1y", seats: 8 },
        { id: "pack-ind", name: "＋追加パック 個人 12か月", price: 5900, c: "1y" },
        { id: "pack-family", name: "＋追加パック ファミリー 12か月", price: 9900, c: "1y", seats: 8 }
      ] },
    { id: "psplus", name: "PlayStation Plus", kana: "ぷれいすてーしょんぷらす ぷれすて", cat: "game",
      site: "https://www.playstation.com/ja-jp/ps-plus/",
      ref: "https://gigazine.net/news/20260519-playstation-plus-price-raising",
      checked: "2026-10-27", confidence: "mid", note: "日本は2023年9月改定の価格のまま（2026年5月の値上げは海外）",
      plans: [
        { id: "essential-1m", name: "エッセンシャル 1か月", price: 850, c: "1m", tier: "essential" },
        { id: "essential-12m", name: "エッセンシャル 12か月", price: 6800, c: "1y", tier: "essential" },
        { id: "extra-1m", name: "エクストラ 1か月", price: 1300, c: "1m", tier: "extra" },
        { id: "extra-12m", name: "エクストラ 12か月", price: 11700, c: "1y", tier: "extra" },
        { id: "premium-1m", name: "プレミアム 1か月", price: 1550, c: "1m", tier: "premium" },
        { id: "premium-12m", name: "プレミアム 12か月", price: 13900, c: "1y", tier: "premium" }
      ] },
    { id: "gamepass", name: "Xbox Game Pass", kana: "えっくすぼっくすげーむぱす", cat: "game",
      site: "https://www.xbox.com/ja-JP/xbox-game-pass",
      ref: "https://news.xbox.com/ja-jp/2026/04/22/xbox-game-pass-update/",
      checked: "2026-10-27", confidence: "mid", note: "Ultimateは2026年4月に値下げ（2,750円→1,550円）。Essential/Premiumは2025年10月時点の価格",
      plans: [
        { id: "ultimate", name: "Ultimate", price: 1550, c: "1m" },
        { id: "pc", name: "PC Game Pass", price: 1300, c: "1m", note: "PC専用" },
        { id: "premium", name: "Premium", price: 1300, c: "1m" },
        { id: "essential", name: "Essential", price: 850, c: "1m" }
      ] },
    { id: "applearcade", name: "Apple Arcade", kana: "あっぷるあーけーど", cat: "game",
      site: "https://www.apple.com/jp/apple-arcade/", manageNote: "iPhoneの［設定］→［自分の名前］→［サブスクリプション］",
      checked: "2026-10-27", confidence: "mid", note: "2026年7月のApple改定の対象かは未確認",
      plans: [{ id: "monthly", name: "月額", price: 900, c: "1m" }] },
    { id: "genshin", name: "原神", kana: "げんしん", cat: "game",
      site: "https://genshin.hoyoverse.com/ja/",
      ref: "https://buffget.com/ja/news/genesis-crystals-vs-welkin-moon-best-value-guide-2026",
      checked: "2026-11-14", confidence: "mid", note: "30日ごとの購入（自動更新ではない）。重ねて買えるのは180日分まで",
      plans: [
        { id: "welkin", name: "空月の祝福（30日）", price: 610, c: "30d" },
        { id: "bp", name: "紀行（祈願の紀行）", price: 1220, c: "6w", note: "バージョンごと（約6週）の購入" }
      ] },
    { id: "starrail", name: "崩壊：スターレイル", kana: "すたーれいる すたれ ほうかい", cat: "game",
      site: "https://hsr.hoyoverse.com/ja-jp/",
      ref: "https://buffget.com/ja/news/oneiric-shards-vs-express-supply-pass-honkai-star-rail-2026",
      checked: "2026-11-14", confidence: "mid", note: "30日ごとの購入（自動更新ではない）。受け取りは毎日ログインが必要",
      plans: [
        { id: "pass", name: "列車補給標章（30日）", price: 610, c: "30d" },
        { id: "bp", name: "無名の勲功（上位）", price: 1220, c: "6w", note: "バージョンごと（約6週）の購入" }
      ] },

    // ───────── SNS・連絡 ─────────
    { id: "discord", name: "Discord Nitro", kana: "でぃすこーど", cat: "social",
      site: "https://discord.com/nitro",
      ref: "https://www.eesel.ai/ja/blog/discord-ryokin",
      checked: "2026-10-27", confidence: "mid", note: "ドル建ての定価。アプリ内では地域の通貨で表示されることがある",
      plans: [
        { id: "basic", name: "Nitro Basic", price: 2.99, currency: "USD", c: "1m" },
        { id: "nitro-m", name: "Nitro（月額）", price: 9.99, currency: "USD", c: "1m", tier: "nitro" },
        { id: "nitro-y", name: "Nitro（年額）", price: 99.99, currency: "USD", c: "1y", tier: "nitro" }
      ] },
    { id: "xpremium", name: "X Premium", kana: "えっくす ついったー", cat: "social",
      site: "https://help.x.com/ja/premium-plus-price-update",
      ref: "https://jetstream.blog/?p=201070",
      checked: "2026-10-27", confidence: "low", note: "2025年時点の価格。決済方法で変わる",
      plans: [
        { id: "premium", name: "プレミアム", price: 1270, c: "1m" },
        { id: "premiumplus", name: "プレミアムプラス", price: 6080, c: "1m" }
      ] },

    // ───────── クラウド・ストレージ ─────────
    { id: "icloud", name: "iCloud+", kana: "あいくらうど", cat: "cloud",
      site: "https://www.apple.com/jp/icloud/", manageNote: "iPhoneの［設定］→［自分の名前］→［iCloud］→［ストレージを管理］",
      ref: "https://www.phileweb.com/news/d-av/202607/18/65608.html",
      checked: "2026-10-27", confidence: "high", note: "2026年7月18日改定。ファミリー共有で家族と分けられる",
      plans: [
        { id: "50gb", name: "50GB", price: 180, c: "1m" },
        { id: "200gb", name: "200GB", price: 540, c: "1m" },
        { id: "2tb", name: "2TB", price: 1800, c: "1m" },
        { id: "6tb", name: "6TB", price: 5500, c: "1m" },
        { id: "12tb", name: "12TB", price: 11000, c: "1m" }
      ] },
    { id: "googleone", name: "Google One", kana: "ぐーぐるわん", cat: "cloud",
      site: "https://one.google.com/about/plans", manage: "https://one.google.com/",
      checked: "2026-10-27", confidence: "mid",
      plans: [
        { id: "100gb", name: "100GB（月額）", price: 250, c: "1m", tier: "100gb" },
        { id: "100gb-y", name: "100GB（年額）", price: 2500, c: "1y", tier: "100gb" },
        { id: "2tb", name: "2TB（月額）", price: 1300, c: "1m", tier: "2tb" },
        { id: "2tb-y", name: "2TB（年額）", price: 13000, c: "1y", tier: "2tb" }
      ] },
    { id: "dropbox", name: "Dropbox", kana: "どろっぷぼっくす", cat: "cloud",
      site: "https://www.dropbox.com/ja/plans",
      checked: "2026-10-27", confidence: "low", note: "2026年の価格は未確認",
      plans: [
        { id: "plus-m", name: "Plus（月額）", price: 1500, c: "1m", tier: "plus" },
        { id: "plus-y", name: "Plus（年額）", price: 14400, c: "1y", tier: "plus" }
      ] },

    // ───────── スマホ・通信 ─────────
    { id: "ahamo", name: "ahamo", kana: "あはも どこも", cat: "telecom",
      site: "https://ahamo.com/",
      ref: "https://selectra.jp/telecom/mobile/ahamo-povo-linemo",
      checked: "2026-10-27", confidence: "high", note: "5分かけ放題つき。機種代は別",
      plans: [
        { id: "basic", name: "30GB", price: 2970, c: "1m" },
        { id: "large", name: "大盛り 110GB", price: 4950, c: "1m" }
      ] },
    { id: "linemo", name: "LINEMO", kana: "らいんも そふとばんく", cat: "telecom",
      site: "https://www.linemo.jp/",
      ref: "https://all-connect.co.jp/magazine/linemo-plan/",
      checked: "2026-10-27", confidence: "mid", note: "ベストプランは使った量で2段階",
      plans: [
        { id: "best-3", name: "ベストプラン（〜3GB）", price: 990, c: "1m" },
        { id: "best-10", name: "ベストプラン（3〜10GB）", price: 2090, c: "1m" },
        { id: "bestv", name: "ベストプランV（30GB）", price: 2970, c: "1m", note: "5分かけ放題つき" }
      ] },
    { id: "rakutenmobile", name: "楽天モバイル", kana: "らくてんもばいる", cat: "telecom",
      site: "https://network.mobile.rakuten.co.jp/",
      ref: "https://selectra.jp/sim/guides/hikaku/gakuwari",
      checked: "2026-10-27", confidence: "mid", note: "使った量で3段階。22歳以下は最強青春プログラムで割引",
      plans: [
        { id: "3gb", name: "最強プラン（〜3GB）", price: 1078, c: "1m" },
        { id: "20gb", name: "最強プラン（〜20GB）", price: 2178, c: "1m" },
        { id: "unlimited", name: "最強プラン（無制限）", price: 3278, c: "1m" },
        { id: "youth-20gb", name: "最強青春プログラム（〜20GB）", price: 1958, c: "1m", cond: "学生", after: "20gb", note: "22歳以下が対象" },
        { id: "youth-unlimited", name: "最強青春プログラム（無制限）", price: 3058, c: "1m", cond: "学生", after: "unlimited", note: "22歳以下が対象" }
      ] },
    { id: "uqmobile", name: "UQ mobile", kana: "ゆーきゅーもばいる えーゆー", cat: "telecom",
      site: "https://www.uqwimax.jp/mobile/",
      ref: "https://www.itmedia.co.jp/mobile/spv/2505/07/news114.html",
      checked: "2026-10-27", confidence: "mid", note: "2025年改定後の価格。ミニミニプランは2023年時点",
      plans: [
        { id: "minimini", name: "ミニミニプラン（4GB）", price: 2365, c: "1m" },
        { id: "komikomi", name: "コミコミプランバリュー（35GB）", price: 3828, c: "1m" },
        { id: "tokutoku", name: "トクトクプラン2（30GB）", price: 4048, c: "1m" }
      ] },
    { id: "ymobile", name: "ワイモバイル", kana: "わいもばいる ymobile", cat: "telecom",
      site: "https://www.ymobile.jp/",
      ref: "https://k-tai.watch.impress.co.jp/docs/news/2100759.html",
      checked: "2026-11-01", confidence: "mid", note: "2026年6月2日に各220円値上げ（6月1日までの契約者は12月31日まで旧料金）",
      plans: [
        { id: "s", name: "シンプル3 S（5GB）", price: 3278, c: "1m" },
        { id: "m", name: "シンプル3 M（30GB）", price: 4378, c: "1m" },
        { id: "l", name: "シンプル3 L（35GB）", price: 5478, c: "1m" }
      ] },
    { id: "iijmio", name: "IIJmio", kana: "あいあいじぇいみお", cat: "telecom",
      site: "https://www.iijmio.jp/",
      ref: "https://k-tai.watch.impress.co.jp/docs/news/2084235.html",
      checked: "2026-10-27", confidence: "mid", note: "ギガプラン（音声）。15GBは2026年3月に値下げ",
      plans: [
        { id: "2gb", name: "2GB", price: 850, c: "1m" },
        { id: "5gb", name: "5GB", price: 950, c: "1m" },
        { id: "10gb", name: "10GB", price: 1400, c: "1m" },
        { id: "15gb", name: "15GB", price: 1600, c: "1m" }
      ] },

    // ───────── 会員・セット ─────────
    { id: "amazonprime", name: "Amazonプライム", kana: "あまぞんぷらいむ あまぷら", cat: "membership",
      site: "https://www.amazon.co.jp/amazonprime", manage: "https://www.amazon.co.jp/mc",
      ref: "https://pricey.jp/web/articles/4496",
      checked: "2026-10-27", confidence: "high", note: "2023年8月改定の価格。米国は2026年に値上げ",
      plans: [
        { id: "monthly", name: "月額", price: 600, c: "1m", tier: "standard" },
        { id: "yearly", name: "年額", price: 5900, c: "1y", tier: "standard" },
        { id: "student-m", name: "Prime Student（月額）", price: 300, c: "1m", tier: "student", cond: "学生", after: "monthly", note: "最長4年" },
        { id: "student-y", name: "Prime Student（年額）", price: 2950, c: "1y", tier: "student", cond: "学生", after: "yearly", note: "最長4年" }
      ] },
    { id: "appleone", name: "Apple One", kana: "あっぷるわん", cat: "membership",
      site: "https://www.apple.com/jp/apple-one/", manageNote: "iPhoneの［設定］→［自分の名前］→［サブスクリプション］",
      ref: "https://www.phileweb.com/news/d-av/202607/18/65608.html",
      checked: "2026-10-27", confidence: "high", note: "2026年7月18日改定。Apple Music・Apple TV・Apple Arcade・iCloud+ を含む",
      includes: ["applemusic", "appletv", "applearcade", "icloud"],
      plans: [
        { id: "individual", name: "個人", price: 1350, c: "1m" },
        { id: "family", name: "ファミリー", price: 2500, c: "1m", seats: 6 }
      ] },
    { id: "lyp", name: "LYPプレミアム", kana: "えるわいぴー やふー らいんすたんぷ", cat: "membership",
      site: "https://premium.yahoo.co.jp/",
      ref: "https://www.smartwatchlife.jp/73256/",
      checked: "2026-10-27", confidence: "mid", note: "LINEスタンプ プレミアムは2026年7月に新規受付を終了し、LYPプレミアムに統合",
      plans: [
        { id: "standard", name: "LYPプレミアム", price: 650, c: "1m" },
        { id: "light", name: "ライトプラン エンジョイパック", price: 290, c: "1m", note: "対象スタンプ使い放題など" }
      ] },

    // ───────── 生活・移動 ─────────
    { id: "uberone", name: "Uber One", kana: "うーばーわん うーばーいーつ", cat: "life",
      site: "https://www.uber.com/jp/ja/u/uber-one/",
      ref: "https://k-tai.watch.impress.co.jp/docs/news/2128587.html",
      checked: "2026-10-27", confidence: "high", note: "2026年7月改定。標準プランは2人で共有できる",
      plans: [
        { id: "monthly", name: "月額", price: 698, c: "1m", tier: "std", seats: 2 },
        { id: "yearly", name: "年額", price: 5598, c: "1y", tier: "std", seats: 2 },
        { id: "student-m", name: "学生（月額）", price: 298, c: "1m", tier: "stu", cond: "学生", after: "monthly" },
        { id: "student-y", name: "学生（年額）", price: 2298, c: "1y", tier: "stu", cond: "学生", after: "yearly" }
      ] },
    { id: "nhk", name: "NHK受信料", kana: "えぬえいちけー じゅしんりょう", cat: "life",
      site: "https://www.nhk-cs.jp/jushinryo/",
      ref: "https://www.pricey.jp/web/articles/4668",
      checked: "2026-10-27", confidence: "high", note: "一人暮らしで収入が一定以下の学生は免除の対象（申請が必要）",
      plans: [
        { id: "chijo-m", name: "地上契約（月払い）", price: 1100, c: "1m", tier: "chijo" },
        { id: "chijo-y", name: "地上契約（12か月前払い）", price: 12276, c: "1y", tier: "chijo" },
        { id: "eisei-m", name: "衛星契約（月払い）", price: 1950, c: "1m", tier: "eisei" },
        { id: "eisei-y", name: "衛星契約（12か月前払い）", price: 21765, c: "1y", tier: "eisei" }
      ] },
    { id: "timescar", name: "タイムズカー", kana: "たいむずかー かーしぇあ", cat: "life",
      site: "https://share.timescar.jp/",
      checked: "2026-10-27", confidence: "low", note: "月額基本料。利用料金は別で、基本料分の利用料が含まれる",
      plans: [{ id: "basic", name: "月額基本料", price: 880, c: "1m" }] },

    // ───────── 健康・フィットネス ─────────
    { id: "chocozap", name: "chocoZAP", kana: "ちょこざっぷ らいざっぷ", cat: "fitness",
      site: "https://chocozap.jp/",
      checked: "2026-10-27", confidence: "mid", note: "2025年4月に初期費用廃止",
      plans: [{ id: "monthly", name: "月額", price: 3278, c: "1m" }] },

    // ───────── 追加（2026-11-14）: ゲーム内の月パス・バトルパス ─────────
    { id: "zzz", name: "ゼンレスゾーンゼロ", kana: "ぜんれすぞーんぜろ ぜんぜろ", cat: "game",
      site: "https://zenless.hoyoverse.com/ja-jp/",
      checked: "2026-11-14", confidence: "low", note: "30日ごとの購入（自動更新ではない）。同じ会社の原神・スタレと同じ価格帯",
      plans: [
        { id: "internot", name: "インターノット会員（30日）", price: 610, c: "30d" },
        { id: "fund", name: "新エリー都ファンド（上位）", price: 1220, c: "6w", note: "バージョンごと（約6週）の購入" }
      ] },
    { id: "wuwa", name: "鳴潮", kana: "めいちょう wuthering waves", cat: "game",
      site: "https://wutheringwaves.kurogames.com/jp/",
      ref: "https://www.topuplive.com/ja/news/wuthering-waves-weekly-subscription.html",
      checked: "2026-11-14", confidence: "low", note: "定価は4.99ドル。日本の価格はストアで確認を",
      plans: [{ id: "lunite", name: "月相観測カード（30日）", price: 610, c: "30d" }] },
    { id: "pokepoke", name: "ポケポケ（ポケモンTCGポケット）", kana: "ぽけぽけ ぽけもんかーど", cat: "game",
      site: "https://www.pokemon.co.jp/ex/pokemontcgpocket/",
      ref: "https://gamepedia.jp/pokemon-tcgp/archives/240",
      checked: "2026-11-14", confidence: "mid", note: "自動更新。初回2週間無料",
      plans: [{ id: "premium", name: "プレミアムパス", price: 980, c: "1m" }] },
    { id: "pazudora", name: "パズドラ", kana: "ぱずどら ぱずるあんどどらごんず", cat: "game",
      site: "https://pad.gungho.jp/",
      ref: "https://kamigame.jp/puzzle-dragons/",
      checked: "2026-11-14", confidence: "mid", note: "自動更新。1週間の無料体験あり",
      plans: [{ id: "pazpass", name: "パズドラパス", price: 980, c: "1m" }] },
    { id: "monst", name: "モンスト", kana: "もんすと もんすたーすとらいく", cat: "game",
      site: "https://www.monster-strike.com/",
      ref: "https://game8.jp/monst/709360",
      checked: "2026-11-14", confidence: "mid", note: "2025年8月に登場",
      plans: [{ id: "monpass-premium", name: "モンパスプレミアム", price: 1980, c: "1m" }] },
    { id: "fortnite", name: "フォートナイト クルー", kana: "ふぉーとないと", cat: "game",
      site: "https://www.fortnite.com/fortnite-crew-subscription?lang=ja",
      ref: "https://www.fortnite.com/fortnite-crew-subscription?lang=ja",
      checked: "2026-11-14", confidence: "mid", note: "公式表示はドル。2026年6月から毎月のV-Bucksが1,000→800に",
      plans: [{ id: "crew", name: "フォートナイト クルー", price: 11.99, currency: "USD", c: "1m" }] },
    { id: "apex", name: "Apex Legends バトルパス", kana: "えーぺっくす", cat: "game",
      site: "https://www.ea.com/ja/games/apex-legends",
      ref: "https://www.pricey.jp/web/articles/2309",
      checked: "2026-11-14", confidence: "low", note: "スプリット（約6週）ごとの購入。現金のみ",
      plans: [
        { id: "premium", name: "プレミアム", price: 1255, c: "6w" },
        { id: "premiumplus", name: "プレミアム+", price: 2484, c: "6w" }
      ] },
    { id: "realms", name: "Minecraft Realms", kana: "まいくら まいんくらふと れるむず", cat: "game",
      site: "https://www.minecraft.net/ja-jp/realms",
      ref: "https://automaton-media.com/articles/newsjp/20261110-478346/",
      checked: "2026-11-14", confidence: "mid", note: "2026年11月に最大50人のProが登場",
      plans: [
        { id: "core", name: "Core", price: 470, c: "1m" },
        { id: "plus", name: "Plus", price: 930, c: "1m" },
        { id: "pro", name: "Pro（最大50人）", price: 4730, c: "1m" }
      ] },
    { id: "playpass", name: "Google Play Pass", kana: "ぐーぐるぷれいぱす", cat: "game",
      site: "https://play.google.com/store/pass/getstarted/?hl=ja",
      ref: "https://www.gizmodo.jp/article/google-play-pass/",
      checked: "2026-11-14", confidence: "low", note: "2022年の提供開始時の価格",
      plans: [
        { id: "monthly", name: "月額", price: 600, c: "1m", tier: "std" },
        { id: "yearly", name: "年額", price: 5400, c: "1y", tier: "std" }
      ] },

    // ───────── 追加: 動画のセットプラン ─────────
    { id: "hulu-disney", name: "Hulu | Disney+ セットプラン", kana: "ふーる でぃずにー せっと", cat: "video",
      site: "https://www.hulu.jp/",
      ref: "https://selectra.jp/streaming/news/hulu-price-increase-2026",
      checked: "2026-11-14", confidence: "mid", note: "Hulu と Disney+ をまとめた割安プラン",
      includes: ["hulu", "disneyplus"],
      plans: [
        { id: "standard", name: "セットプラン", price: 1890, c: "1m" },
        { id: "premium", name: "セットプラン（Disney+ プレミアム）", price: 2150, c: "1m" }
      ] },
    { id: "dmm-dazn", name: "DMM×DAZNホーダイ", kana: "でぃーえむえむ だぞーん ほーだい", cat: "video",
      site: "https://www.dmm.com/digital/dazn/",
      ref: "https://www.goal.com/jp/%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9/what-are-the-disadvantages-of-dmm-dazn-hodai/blt936aa9ef3b051b9a",
      checked: "2026-11-14", confidence: "mid", note: "DAZN Standard と DMMプレミアムのセット",
      includes: ["dazn", "dmmtv"],
      plans: [{ id: "monthly", name: "月額", price: 3480, c: "1m" }] },

    // ───────── 追加: 音楽・本 ─────────
    { id: "awa", name: "AWA", kana: "あわ", cat: "music",
      site: "https://awa.fm/",
      ref: "https://appllio.com/music-subscription-student-plan",
      checked: "2026-11-14", confidence: "mid",
      plans: [
        { id: "general", name: "一般", price: 980, c: "1m" },
        { id: "student", name: "学生", price: 480, c: "1m", cond: "学生", after: "general", note: "中学生から加入できる" }
      ] },
    { id: "rakutenmusic", name: "Rakuten Music", kana: "らくてんみゅーじっく", cat: "music",
      site: "https://music.rakuten.co.jp/",
      ref: "https://appllio.com/music-subscription-student-plan",
      checked: "2026-11-14", confidence: "mid",
      plans: [
        { id: "standard", name: "スタンダード", price: 980, c: "1m" },
        { id: "rakuten", name: "スタンダード（楽天カード・楽天モバイル会員）", price: 780, c: "1m", cond: "楽天会員" }
      ] },
    { id: "audiobookjp", name: "audiobook.jp 聴き放題", kana: "おーでぃおぶっく", cat: "books",
      site: "https://audiobook.jp/",
      ref: "https://appllio.com/audiobookjp-switch-monthlyplan-annualplan",
      checked: "2026-11-14", confidence: "mid", note: "IIJmioのオプションでも提供（2026年10月〜）",
      plans: [
        { id: "monthly", name: "月払い", price: 1330, c: "1m", tier: "std" },
        { id: "yearly", name: "年払い", price: 9990, c: "1y", tier: "std" }
      ] },
    { id: "cmoa", name: "シーモア読み放題", kana: "こみっくしーもあ しーもあ", cat: "books",
      site: "https://www.cmoa.jp/",
      ref: "https://life.oricon.co.jp/rank-manga-apps/special/knowledge/cmoa-fee/",
      checked: "2026-11-14", confidence: "low", note: "2024年時点の価格。提供状況は公式で確認を",
      plans: [
        { id: "light", name: "読み放題ライト", price: 780, c: "1m" },
        { id: "full", name: "読み放題フル", price: 1480, c: "1m" }
      ] },

    // ───────── 追加: スマホ・ネット回線 ─────────
    { id: "home5g", name: "ドコモ home 5G", kana: "どこも ほーむ5g ほーむるーたー", cat: "telecom",
      site: "https://www.docomo.ne.jp/home_5g/",
      ref: "https://selectra.jp/telecom/home-router/docomo-home5g",
      checked: "2026-11-14", confidence: "high", note: "2025年7月に4,950円→5,280円。プロバイダー料込み",
      plans: [{ id: "monthly", name: "月額", price: 5280, c: "1m" }] },
    { id: "wimax", name: "WiMAX（Broad WiMAX）", kana: "わいまっくす ぶろーど", cat: "telecom",
      site: "https://wimax-broad.jp/",
      ref: "https://all-connect.co.jp/magazine/wimax-home-router/",
      checked: "2026-11-14", confidence: "low", note: "代理店の価格。キャッシュバック別",
      plans: [{ id: "monthly", name: "ギガ放題（2か月目以降）", price: 4750, c: "1m" }] },

    // ───────── 追加: 会員・生活 ─────────
    { id: "pontapass", name: "Pontaパス（旧auスマートパスプレミアム）", kana: "ぽんたぱす えーゆー すまーとぱす", cat: "membership",
      site: "https://www.au.com/pontapass/",
      ref: "https://appllio.com/pontapass-guide",
      checked: "2026-11-14", confidence: "high", note: "2026年8月にPontaパス ライト（409円）を統合",
      plans: [
        { id: "monthly", name: "月額", price: 548, c: "1m", tier: "std" },
        { id: "gift12", name: "12か月分ギフトカード", price: 5480, c: "1y", tier: "std" }
      ] },
    { id: "woltplus", name: "Wolt+", kana: "うぉると", cat: "life",
      site: "https://wolt.com/ja/jpn",
      ref: "https://www.appbank.net/2025/01/22/iphone-news/2755776.php",
      checked: "2026-11-14", confidence: "low", note: "2025年1月時点の価格",
      plans: [
        { id: "monthly", name: "月額", price: 498, c: "1m", tier: "std" },
        { id: "yearly", name: "年額", price: 3998, c: "1y", tier: "std" }
      ] },

    // ───────── 追加: 定期便・宅配 ─────────
    { id: "nosh", name: "nosh（ナッシュ）", kana: "なっしゅ", cat: "delivery",
      site: "https://nosh.jp/",
      ref: "https://exidea.co.jp/blog/meal/home-meal/nosh-price/",
      checked: "2026-11-14", confidence: "low", note: "送料別（地域で1,000〜2,000円ほど）。配送間隔は選べる。続けるほど1食が安くなる",
      plans: [
        { id: "10-2w", name: "10食プラン（2週ごと）", price: 5990, c: "2w" },
        { id: "10-1m", name: "10食プラン（毎月）", price: 5990, c: "1m" }
      ] },
    { id: "postcoffee", name: "PostCoffee", kana: "ぽすとこーひー", cat: "delivery",
      site: "https://postcoffee.co/",
      ref: "https://coffee-labo.co.jp/post-coffee-review/",
      checked: "2026-11-14", confidence: "low", note: "送料無料。いつでも解約できる",
      plans: [
        { id: "s", name: "225g", price: 1980, c: "1m" },
        { id: "m", name: "450g", price: 3880, c: "1m" },
        { id: "l", name: "900g", price: 7480, c: "1m" }
      ] },
    { id: "bloomee", name: "bloomee（花の定期便）", kana: "ぶるーみー はな", cat: "delivery",
      site: "https://bloomee.jp/",
      ref: "https://moov.ooo/article/5f4486465e20f4338be01bb6",
      checked: "2026-11-14", confidence: "low", note: "送料別。2024年時点の最安プラン",
      plans: [{ id: "basic-2w", name: "体験プラン（隔週）", price: 980, c: "2w" }] },
    { id: "aircloset", name: "airCloset", kana: "えあくろーぜっと ふく れんたる", cat: "delivery",
      site: "https://www.air-closet.com/",
      ref: "https://subger.com/hu/service/aircloset",
      checked: "2026-11-14", confidence: "low", note: "服のレンタル。金額は要確認",
      plans: [{ id: "light", name: "ライト", price: 7480, c: "1m" }] },
    { id: "mechakari", name: "メチャカリ", kana: "めちゃかり ふく れんたる", cat: "delivery",
      site: "https://mechakari.com/",
      ref: "https://my-best.com/22618",
      checked: "2026-11-14", confidence: "low", note: "服のレンタル。最安プランの目安",
      plans: [{ id: "basic", name: "ベーシック", price: 3476, c: "1m" }] },

    // ───────── 追加: コンタクト・健康 ─────────
    { id: "melsplan", name: "メルスプラン（メニコン）", kana: "めるすぷらん めにこん こんたくと", cat: "fitness",
      site: "https://www.menicon.co.jp/mels/",
      ref: "https://pricey.jp/web/articles/3416",
      checked: "2026-11-14", confidence: "mid", note: "コンタクトの定額制。2025年6月に改定。両眼の価格",
      plans: [
        { id: "1m-lens", name: "1ヶ月交換レンズ（両眼・レンズのみ）", price: 2310, c: "1m" },
        { id: "1day-premio", name: "1DAY プレミオ（両眼）", price: 6270, c: "1m" }
      ] },
    { id: "jins1day", name: "JINS 1DAY おトク定期便", kana: "じんず わんでー こんたくと", cat: "fitness",
      site: "https://www.jins.com/jp/contactlens/",
      ref: "https://www.gizmodo.jp/article/jins-1day-handson/",
      checked: "2026-11-14", confidence: "low", note: "2023年時点の価格。続けるほど割引率が上がる",
      plans: [{ id: "2box", name: "30枚入り2箱（両眼1か月分）", price: 3564, c: "1m" }] },
    { id: "anytime", name: "エニタイムフィットネス", kana: "えにたいむ じむ", cat: "fitness",
      site: "https://www.anytimefitness.co.jp/",
      ref: "https://subger.com/en/us/service/anytime-fitness-jp-plans",
      checked: "2026-11-14", confidence: "low", note: "店舗によって異なる",
      plans: [{ id: "regular", name: "通常会員", price: 7480, c: "1m" }] },
    { id: "asken", name: "あすけん プレミアム", kana: "あすけん だいえっと", cat: "fitness",
      site: "https://www.asken.jp/",
      ref: "https://aipicks.jp/tool/asken/pricing",
      checked: "2026-11-14", confidence: "low", note: "情報源によって金額に差あり",
      plans: [{ id: "monthly", name: "月額", price: 580, c: "1m" }] },
    { id: "calomeal", name: "カロミル プレミアム", kana: "かろみる", cat: "fitness",
      site: "https://www.calomeal.com/",
      ref: "https://aipicks.jp/tool/calomeal/pricing",
      checked: "2026-11-14", confidence: "low",
      plans: [{ id: "premium", name: "プレミアム", price: 480, c: "1m" }] },

    // ───────── 追加: セキュリティ ─────────
    { id: "nordvpn", name: "NordVPN", kana: "のーどぶいぴーえぬ", cat: "software",
      site: "https://nordvpn.com/ja/pricing/",
      ref: "https://atsoho.com/apps/p/nordvpn",
      checked: "2026-11-14", confidence: "mid", note: "1年契約の価格（月あたり540円〜）。初回の割引価格は別",
      plans: [
        { id: "basic-y", name: "ベーシック（1年）", price: 6480, c: "1y" },
        { id: "plus-y", name: "コンプリート（1年）", price: 8280, c: "1y" },
        { id: "ultimate-y", name: "エリート（1年）", price: 11880, c: "1y" }
      ] },
    { id: "virusbuster", name: "ウイルスバスター クラウド", kana: "ういるすばすたー とれんどまいくろ", cat: "software",
      site: "https://www.trendmicro.com/ja_jp/forHome/products/vb.html",
      ref: "https://atsoho.com/apps/compare/nordvpn-vs-virusbuster-cloud",
      checked: "2026-11-14", confidence: "mid",
      plans: [{ id: "auto-1y", name: "あんしん自動更新（1年）", price: 6490, c: "1y" }] }
  ]
};
