// ウィンドウがアクティブになったときの処理
function focus()
{
    //console.log(getCurrentTime() + " ウィンドウがアクティブになりました");
    clearInterval(timer);

    playAnimation();
}

// ウィンドウが非アクティブになったときの処理
function blur()
{
    //console.log(getCurrentTime() + " ウィンドウが非アクティブになりました");
    stopAnimation();

    // 非アクティブ時は1秒間隔でアニメーション停止を繰り返す(既にアニメーション停止しているものは処理スキップ)
    timer = setInterval(() =>
    {
        stopAnimation();
    }, 1000);
}

// 現在時刻の取得 (フォーマット: HH:MM:SS)
function getCurrentTime()
{
    return new Date().toLocaleTimeString('ja-JP', { hour12: false });
}

// アニメーション再生
function playAnimation()
{
    // imgタグ一覧取得
    const imgList = document.getElementsByTagName("img");
    for (const img of imgList)
    {
        // &static=1 が含まれるURLのみ対象
        if (img.src.includes("&static=1"))
        {
            //console.log(img.src);

            // URL書き換え(&static=1 除去)
            const newSrcURL = img.src.replace("&static=1", "");
            img.src = newSrcURL;
            //console.log(img.src);
        }
    }
}

// アニメーション停止
function stopAnimation()
{
    // imgタグ一覧取得
    const imgList = document.getElementsByTagName("img");
    for (const img of imgList)
    {
        // https://ドメイン名/proxy/image.webp または https://ドメイン名/proxy/avatar.webp が含まれるURLのみ対象
        const regex = /^https:\/\/([^\/]+)\/proxy\/(image|avatar)\.webp\?.*$/;
        if (regex.test(img.src))
        {
            //console.log(img.src);

            // 既に静止画像の場合はスキップ
            if (img.src.includes("&static=1"))
            {
                //console.log("skip");
                continue;
            }

            // URL書き換え(&static=1 付与)
            const newSrcURL = img.src + "&static=1";
            img.src = newSrcURL;
            //console.log(img.src);
        }
    }
}


// イベントリスナー登録
window.addEventListener("blur", blur);
window.addEventListener("focus", focus);

// タイマーは必要に応じてセット/クリアするためグローバル変数で保持
let timer = undefined;
