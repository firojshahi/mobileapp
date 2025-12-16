"use strict";

// ページ本体から読み込まれたタイミングで発火する
window.addEventListener("DOMContentLoaded", function () {

  // 1. localStorageが使えるか確認
  if (typeof localStorage === "undefined") {
    Swal.fire("エラー", "このブラウザはLocal Storageが使えません", "error");
    return;
  } else {
    viewStorage();
    saveLocalStorage();
    delLocalStorage();
    selectTable();
    allClearLocalStorage();
    setupTrashDelegation();
  }
});

// 2. localStorageへの保存（保存処理の関数）
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click", function (e) {
    e.preventDefault();

    const key = document.getElementById("textKey").value;
    const value = document.getElementById("textMemo").value;

    if (key === "" || value === "") {
      Swal.fire("エラー", "Key、Memoはいずれも必須です。", "error");
      return;
    }

    Swal.fire({
      title: "確認",
      text: "LocalStorageに" + "「" + key + " " + value + "」" + "を保存しますか？",
      type: "question",
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        localStorage.setItem(key, value);
        viewStorage();
        Swal.fire("完了", "LocalStorageに" + "「" + key + " " + value + "」" + "を保存しました。", "success");
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });
  }, false);
}

// 全て削除
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click", function (e) {
    e.preventDefault();

    Swal.fire({
      title: "確認",
      text: "全て削除します。よろしいですか？",
      type: "warning",
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        viewStorage();
        Swal.fire("完了", "全て削除しました。", "success");
      }
    });
  }, false);
}

// 選択
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click", function (e) {
    e.preventDefault();
    selectCheckBox("select");
  }, false);
}

// 削除
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click", function (e) {
    e.preventDefault();

    const w_cnt = selectCheckBox("del");
    if (w_cnt === 0) return;

    const chkbox1 = document.getElementsByName("chbox1");
    const table1 = document.getElementById("table1");
    let selectedKeys = [];

    // チェックされた行のキーを収集
    for (let i = 0; i < chkbox1.length; i++) {
      if (chkbox1[i].checked) {
        selectedKeys.push(table1.rows[i + 1].cells[1].textContent);
      }
    }

    Swal.fire({
      title: "確認",
      text: "LocalStorageから選択されている " + w_cnt + " 件を削除しますか？",
      type: "warning",
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        for (let key of selectedKeys) {
          localStorage.removeItem(key);
        }
        viewStorage();
        Swal.fire("完了", w_cnt + " 件を削除しました。", "success");
        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });
  }, false);
}

// チェックボックス処理
function selectCheckBox(mode) {
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].textContent;
        w_textMemo = table1.rows[i + 1].cells[2].textContent;
      }
      w_cnt++;
    }
  }

  if (mode === "select") {
    if (w_cnt === 1) {
      document.getElementById("textKey").value = w_textKey;
      document.getElementById("textMemo").value = w_textMemo;
    } else {
      Swal.fire("注意", "1つだけ選択してください。", "warning");
    }
  } else if (mode === "del" && w_cnt === 0) {
    Swal.fire("注意", "削除するデータを選択してください。", "warning");
  }

  return w_cnt;
}

// localStorageの内容を表示
// localStorageの内容を表示
function viewStorage() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td><input name='chbox1' type='checkbox'></td>" +
      "<td>" + key + "</td>" +
      "<td>" + value + "</td>" +
      '<td><img src="img/trash.png" class="trash" alt="削除" title="この行を削除" style="cursor:pointer; width:20px;"></td>';
    list.appendChild(tr);
  }

  // テーブルソーターの適用（jQueryが必要）
  if ($.fn.tablesorter) {
    $("#table1").tablesorter({
      sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
  }
}

// Event Delegation によるごみ箱クリックでの行削除
function setupTrashDelegation() {
  const table1 = document.getElementById("table1");
  table1.addEventListener("click", function (e) {
    // クリックされた要素がごみ箱アイコン（class="trash"）か判定
    if (e.target.classList.contains("trash")) {
      const tr = e.target.parentNode.parentNode; // <tr>を取得
      const keyCell = tr.cells[1]; // キーが入っているセル（2列目）
      const key = keyCell.textContent;

      Swal.fire({
        title: "確認",
        text: "「" + key + "」を削除しますか？",
        type: "warning",
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem(key);
          viewStorage(); // 表示を更新
          Swal.fire("完了", "「" + key + "」を削除しました。", "success");
        }
      });
    }
  });
}