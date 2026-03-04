// ===============================
//  Stamoji Rank - script.js 完全版
//  Railway API 対応
// ===============================

// あなたの Railway API の URL
const API_BASE = "https://emoji-rank-api-production-82e5.up.railway.app";

// -------------------------------
// 絵文字①の検索
// -------------------------------
document.getElementById("emoji1-btn").addEventListener("click", async () => {
  const name = document.getElementById("emoji1-name").value.trim();
  const keyword = document.getElementById("emoji1-keyword").value.trim();
  const resultBox = document.getElementById("emoji1-result");

  if (!name || !keyword) {
    resultBox.innerHTML = "<p>絵文字名とキーワードを入力してください。</p>";
    return;
  }

  resultBox.innerHTML = "<p>検索中...</p>";

  try {
    const res = await fetch(`${API_BASE}/emoji?name=${encodeURIComponent(name)}&keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (data.error) {
      resultBox.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultBox.innerHTML = `
      <p><strong>絵文字名：</strong>${data.name}</p>
      <p><strong>キーワード：</strong>${data.keyword}</p>
      <p><strong>順位：</strong>${data.rank} 位</p>
    `;
  } catch (err) {
    resultBox.innerHTML = "<p>エラーが発生しました（API に接続できません）。</p>";
  }
});

// -------------------------------
// 絵文字②の検索
// -------------------------------
document.getElementById("emoji2-btn").addEventListener("click", async () => {
  const name = document.getElementById("emoji2-name").value.trim();
  const keyword = document.getElementById("emoji2-keyword").value.trim();
  const resultBox = document.getElementById("emoji2-result");

  if (!name || !keyword) {
    resultBox.innerHTML = "<p>絵文字名とキーワードを入力してください。</p>";
    return;
  }

  resultBox.innerHTML = "<p>検索中...</p>";

  try {
    const res = await fetch(`${API_BASE}/emoji?name=${encodeURIComponent(name)}&keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (data.error) {
      resultBox.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultBox.innerHTML = `
      <p><strong>絵文字名：</strong>${data.name}</p>
      <p><strong>キーワード：</strong>${data.keyword}</p>
      <p><strong>順位：</strong>${data.rank} 位</p>
    `;
  } catch (err) {
    resultBox.innerHTML = "<p>エラーが発生しました（API に接続できません）。</p>";
  }
});
