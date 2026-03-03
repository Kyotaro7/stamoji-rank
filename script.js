function savePreviousRank(key, rank) {
  localStorage.setItem(key, String(rank));
}

function getPreviousRank(key) {
  const v = localStorage.getItem(key);
  return v === null ? null : Number(v);
}

function saveDate(key) {
  const d = new Date();
  const formatted = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  localStorage.setItem(key, formatted);
}

function getDate(key) {
  return localStorage.getItem(key);
}

function saveInput(key, my, q) {
  localStorage.setItem(key + ":my", my);
  localStorage.setItem(key + ":q", q);
}

function loadInput(key) {
  return {
    my: localStorage.getItem(key + ":my") ?? "",
    q: localStorage.getItem(key + ":q") ?? ""
  };
}

function diffRank(prev, now) {
  if (!prev) return "";
  const diff = prev - now;
  if (diff > 0) return `（＋${diff}）`;
  if (diff < 0) return `（${diff}）`;
  return "（±0）";
}

async function fetchRank(url) {
  const res = await fetch(url);
  return await res.json();
}

function makeComboKey(baseKey, my, q) {
  return `${baseKey}:${my}:${q}`;
}

function formatRankText(rank) {
  if (!rank || rank === 9999 || rank > 500) {
    return "500位以内にありません";
  }
  return `${rank}位`;
}

/* -------------------------
   ページ読み込み時：入力欄と前回結果を復元（絵文字）
------------------------- */
document.querySelectorAll(".emojiForm").forEach((form, index) => {
  const baseKey = form.dataset.key;
  const saved = loadInput(baseKey);

  form.querySelector('input[name="my"]').value = saved.my;
  form.querySelector('input[name="q"]').value = saved.q;

  const comboKey = makeComboKey(baseKey, saved.my, saved.q);
  const prevRank = getPreviousRank(comboKey);
  const prevDate = getDate(comboKey + ":date");

  const resultBox = document.getElementById(`emojiResult${index + 1}`);

  if (prevRank !== null) {
    resultBox.innerHTML = `
      <p>今回：まだ検索されていません</p>
      <p>前回：${formatRankText(prevRank)}（${prevDate ?? "-"}）</p>
    `;
  }
});

/* -------------------------
   ページ読み込み時：入力欄と前回結果を復元（スタンプ）
------------------------- */
document.querySelectorAll(".stampForm").forEach((form, index) => {
  const baseKey = form.dataset.key;
  const saved = loadInput(baseKey);

  form.querySelector('input[name="my"]').value = saved.my;
  form.querySelector('input[name="q"]').value = saved.q;

  const comboKey = makeComboKey(baseKey, saved.my, saved.q);
  const prevRank = getPreviousRank(comboKey);
  const prevDate = getDate(comboKey + ":date");

  const resultBox = document.getElementById(`stampResult${index + 1}`);

  if (prevRank !== null) {
    resultBox.innerHTML = `
      <p>今回：まだ検索されていません</p>
      <p>前回：${formatRankText(prevRank)}（${prevDate ?? "-"}）</p>
    `;
  }
});

/* -------------------------
   絵文字検索
------------------------- */
document.querySelectorAll(".emojiForm").forEach((form, index) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const baseKey = form.dataset.key;
    const resultBox = document.getElementById(`emojiResult${index + 1}`);

    const fd = new FormData(form);
    const my = fd.get("my");
    const q = fd.get("q");

    saveInput(baseKey, my, q);

    const comboKey = makeComboKey(baseKey, my, q);
    const dateKey = comboKey + ":date";

    resultBox.innerHTML = `<p>検索中…</p>`;

    const data = await fetchRank(`/rank?my=${encodeURIComponent(my)}&q=${encodeURIComponent(q)}`);

    const nowRank = data.rank ?? 9999;
    const prevRank = getPreviousRank(comboKey);
    const prevDate = getDate(dateKey);

    const displayNow = formatRankText(nowRank);

    let displayPrev = "-";
    let diff = "";
    let displayPrevDate = "-";

    if (prevRank !== null) {
      displayPrev = formatRankText(prevRank);
      displayPrevDate = prevDate ?? "-";

      if (prevRank <= 500 && nowRank <= 500) {
        diff = diffRank(prevRank, nowRank);
      }
    }

    savePreviousRank(comboKey, nowRank);
    saveDate(dateKey);

    const nowDate = getDate(dateKey);

    resultBox.innerHTML = `
      <p>今回：${displayNow} ${diff}（${nowDate}）</p>
      <p>前回：${displayPrev}（${displayPrevDate}）</p>
    `;
  });
});

/* -------------------------
   スタンプ検索
------------------------- */
document.querySelectorAll(".stampForm").forEach((form, index) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const baseKey = form.dataset.key;
    const resultBox = document.getElementById(`stampResult${index + 1}`);

    const fd = new FormData(form);
    const my = fd.get("my");
    const q = fd.get("q");

    saveInput(baseKey, my, q);

    const comboKey = makeComboKey(baseKey, my, q);
    const dateKey = comboKey + ":date";

    resultBox.innerHTML = `<p>検索中…</p>`;

    const data = await fetchRank(`/rank-stamp?my=${encodeURIComponent(my)}&q=${encodeURIComponent(q)}`);

    const nowRank = data.rank ?? 9999;
    const prevRank = getPreviousRank(comboKey);
    const prevDate = getDate(dateKey);

    const displayNow = formatRankText(nowRank);

    let displayPrev = "-";
    let diff = "";
    let displayPrevDate = "-";

    if (prevRank !== null) {
      displayPrev = formatRankText(prevRank);
      displayPrevDate = prevDate ?? "-";

      if (prevRank <= 500 && nowRank <= 500) {
        diff = diffRank(prevRank, nowRank);
      }
    }

    savePreviousRank(comboKey, nowRank);
    saveDate(dateKey);

    const nowDate = getDate(dateKey);

    resultBox.innerHTML = `
      <p>今回：${displayNow} ${diff}（${nowDate}）</p>
      <p>前回：${displayPrev}（${displayPrevDate}）</p>
    `;
  });
});
