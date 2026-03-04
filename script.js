// ===============================
//  Stamoji Rank - script.js（HTML構造対応版）
// ===============================

const API_BASE = "https://emoji-rank-api-production-82e5.up.railway.app";

// すべての絵文字フォームにイベントを付与
document.querySelectorAll(".emojiForm").forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const key = form.dataset.key; // emoji1 / emoji2
    const name = form.querySelector('input[name="my"]').value.trim();
    const keyword = form.querySelector('input[name="q"]').value.trim();
    const resultBox = document.getElementById(
      key === "emoji1" ? "emojiResult1" : "emojiResult2"
    );

    if (!name || !keyword) {
      resultBox.innerHTML = "<p>絵文字名とキーワードを入力してください。</p>";
      return;
    }

    resultBox.innerHTML = "<p>検索中...</p>";

    try {
      const res = await fetch(
        `${API_BASE}/emoji?name=${encodeURIComponent(name)}&keyword=${encodeURIComponent(keyword)}`
      );
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
});
