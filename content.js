(function () {
  "use strict";

  // ========== 多语言系统 ==========
  const I18N = {
    zh: {
      name: "简体中文",
      enableMode: "开启下载模式",
      disableMode: "下载模式已开启",
      selectAll: "全选",
      deselectAll: "清空选择",
      invertSelection: "反选",
      downloadSelected: "下载选中",
      downloadStatic: "仅静态图",
      downloadAnimated: "仅动态图",
      downloadBoth: "静态+动态",
      noSelection: "请先勾选要下载的贴纸",
      done: "下载完成！",
      doneWithFail: "下载完成！{success}成功 {fail}失败",
      downloading: "下载中",
      converting: "转换GIF中",
      gifOption: "动态图转为GIF",
      panelTitle: "LINE Sticker 下载器",
      langLabel: "语言",
      progress: "{current}/{total}",
      bubbleLabel: "LINE 下载器",
      tipShortcuts: "Ctrl+A 全选 · Shift+点击 连选 · ESC 关闭",
      tipDrag: "拖动可移动位置",
      gifHelp:
        "<b>勾选</b>：转为 GIF，兼容性最好<br><b>不勾选</b>：下载 APNG，画质更优但部分平台无法显示动画",
    },
    "zh-TW": {
      name: "繁體中文",
      enableMode: "開啟下載模式",
      disableMode: "下載模式已開啟",
      selectAll: "全選",
      deselectAll: "清空選擇",
      invertSelection: "反選",
      downloadSelected: "下載選取項目",
      downloadStatic: "僅靜態圖",
      downloadAnimated: "僅動態圖",
      downloadBoth: "靜態+動態",
      noSelection: "請先勾選要下載的貼圖",
      done: "下載完成！",
      doneWithFail: "下載完成！{success}成功 {fail}失敗",
      downloading: "下載中",
      converting: "轉換GIF中",
      gifOption: "動態圖轉為GIF",
      panelTitle: "LINE Sticker 下載器",
      langLabel: "語言",
      progress: "{current}/{total}",
      bubbleLabel: "LINE 下載器",
      tipShortcuts: "Ctrl+A 全選 · Shift+點擊 連選 · ESC 關閉",
      tipDrag: "拖動可移動位置",
      gifHelp:
        "<b>勾選</b>：轉為 GIF，相容性最好<br><b>不勾選</b>：下載 APNG，畫質更優但部分平台無法顯示動畫",
    },
    ja: {
      name: "日本語",
      enableMode: "ダウンロードモード開始",
      disableMode: "ダウンロードモードがオン",
      selectAll: "すべて選択",
      deselectAll: "選択をクリア",
      invertSelection: "選択反転",
      downloadSelected: "選択したものをダウンロード",
      downloadStatic: "静止画のみ",
      downloadAnimated: "動画のみ",
      downloadBoth: "静止画+動画",
      noSelection: "ダウンロードするステッカーを選択してください",
      done: "ダウンロード完了！",
      doneWithFail: "ダウンロード完了！{success}成功 {fail}失敗",
      downloading: "ダウンロード中",
      converting: "GIF変換中",
      gifOption: "動画をGIFに変換",
      panelTitle: "LINE Sticker\nダウンローダー",
      langLabel: "言語",
      progress: "{current}/{total}",
      bubbleLabel: "LINE ダウンローダー",
      tipShortcuts: "Ctrl+A 全選択 · Shift+クリック 範囲選択 · ESC 閉じる",
      tipDrag: "ドラッグで移動",
      gifHelp:
        "<b>チェック</b>：GIF に変換、互換性最高<br><b>チェックなし</b>：APNG ダウンロード、画質優秀だが一部プラットフォームで動作しない",
    },
    en: {
      name: "English",
      enableMode: "Enable Download Mode",
      disableMode: "Download Mode On",
      selectAll: "Select All",
      deselectAll: "Clear Selection",
      invertSelection: "Invert",
      downloadSelected: "Download Selected",
      downloadStatic: "Static Only",
      downloadAnimated: "Animated Only",
      downloadBoth: "Both",
      noSelection: "Please select stickers first",
      done: "Download complete!",
      doneWithFail: "Download complete! {success} success {fail} failed",
      downloading: "Downloading",
      converting: "Converting to GIF",
      gifOption: "Convert animation to GIF",
      panelTitle: "LINE Sticker Downloader",
      langLabel: "Language",
      progress: "{current}/{total}",
      bubbleLabel: "LINE Downloader",
      tipShortcuts: "Ctrl+A Select All · Shift+Click Range · ESC Close",
      tipDrag: "Drag to move",
      gifHelp:
        "<b>Checked</b>: Convert to GIF, best compatibility<br><b>Unchecked</b>: Download APNG, better quality but some platforms cannot play animation",
    },
    ko: {
      name: "한국어",
      enableMode: "다운로드 모드 시작",
      disableMode: "다운로드 모드 켜짐",
      selectAll: "모두 선택",
      deselectAll: "선택 초기화",
      invertSelection: "선택 반전",
      downloadSelected: "선택 항목 다운로드",
      downloadStatic: "정적 이미지만",
      downloadAnimated: "동적 이미지만",
      downloadBoth: "정적+동적",
      noSelection: "다운로드할 스티커를 선택해주세요",
      done: "다운로드 완료!",
      doneWithFail: "다운로드 완료! {success} 성공 {fail} 실패",
      downloading: "다운로드 중",
      converting: "GIF 변환 중",
      gifOption: "동적 이미지를 GIF로 변환",
      panelTitle: "LINE Sticker 다운로더",
      langLabel: "언어",
      progress: "{current}/{total}",
      bubbleLabel: "LINE 다운로더",
      tipShortcuts: "Ctrl+A 전체 선택 · Shift+클릭 범위 · ESC 닫기",
      tipDrag: "드래그로 이동",
      gifHelp:
        "<b>체크</b>：GIF로 변환, 호환성 최고<br><b>체크 해제</b>：APNG 다운로드, 화질 우수하지만 일부 플랫폼에서 동작하지 않음",
    },
  };

  // 检测语言优先级：用户手动选择 > 浏览器语言 > 网页语言
  const detectLang = () => {
    const savedLang = localStorage.getItem("line-downloader-lang");
    if (savedLang && I18N[savedLang]) return savedLang;

    const browserLang = navigator.language || navigator.userLanguage || "";
    if (browserLang === "zh-TW" || browserLang === "zh-HK") return "zh-TW";
    if (browserLang.startsWith("zh")) return "zh";
    if (browserLang.startsWith("ja")) return "ja";
    if (browserLang.startsWith("ko")) return "ko";

    const pageLang = document.documentElement.lang || "";
    if (pageLang === "zh-TW" || pageLang === "zh-HK") return "zh-TW";
    if (pageLang.includes("zh")) return "zh";
    if (pageLang.includes("ja")) return "ja";
    if (pageLang.includes("ko")) return "ko";

    return "en";
  };

  let currentLang = detectLang();
  let TEXT = I18N[currentLang];

  const fmt = (str, vars) => {
    return str.replace(/\{(\w+)\}/g, (_, key) =>
      vars[key] !== undefined ? vars[key] : `{${key}}`,
    );
  };

  let downloadMode = false;
  let selectedTypes = "both";
  let convertToGif = false;
  let lastCheckedIndex = -1;

  // ========== 已下载标记（当前页面会话，刷新清除）==========
  const downloadedMap = new Map(); // stickerId -> Set(['png', 'gif'])

  // ========== 气泡状态 ==========
  let isExpanded = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let bubbleStartX = 0;
  let bubbleStartY = 0;
  const DRAG_THRESHOLD = 5;

  // ========== 位置记忆 ==========
  const BUBBLE_POS_KEY = "line-bubble-pos";

  const getSavedPos = () => {
    try {
      const saved = localStorage.getItem(BUBBLE_POS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  const savePos = (x, y, side) => {
    localStorage.setItem(BUBBLE_POS_KEY, JSON.stringify({ x, y, side }));
  };

  // ========== 初始化 ==========
  const init = () => {
    if (document.querySelector("#line-bubble-container")) return;

    const items = document.querySelectorAll(".FnStickerPreviewItem");
    if (items.length === 0) {
      setTimeout(init, 800);
      return;
    }
    addBubbleAndPanel();
  };

  // ========== 模式切换 ==========
  const toggleMode = () => {
    downloadMode = !downloadMode;
    const panel = document.querySelector("#line-panel");
    const bubble = document.querySelector("#line-bubble");
    const statusText = document.querySelector("#line-status-text");
    const statusDot = document.querySelector("#line-status-dot");

    if (downloadMode) {
      addCheckboxes();
      if (panel) panel.classList.add("mode-active");
      if (bubble) bubble.classList.add("mode-on");
      if (statusText) statusText.textContent = TEXT.disableMode;
      if (statusDot) {
        statusDot.style.background = "#00c853";
        statusDot.style.boxShadow = "0 0 6px #00c853";
      }
    } else {
      removeCheckboxes();
      if (panel) panel.classList.remove("mode-active");
      if (bubble) bubble.classList.remove("mode-on");
      if (statusText) statusText.textContent = TEXT.enableMode;
      if (statusDot) {
        statusDot.style.background = "#ccc";
        statusDot.style.boxShadow = "none";
      }
    }
  };

  // ========== 根据气泡位置更新面板展开方向（带动画过渡） ==========
  let currentPanelDir = { h: "right", v: "bottom" }; // 记录当前方向

  const updatePanelPosition = (animate = false) => {
    const bubble = document.querySelector("#line-bubble");
    const panel = document.querySelector("#line-panel");
    if (!bubble || !panel) return;

    const bubbleRect = bubble.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const newH =
      bubbleRect.left + bubbleRect.width / 2 < viewportCenterX
        ? "left"
        : "right";
    const newV =
      bubbleRect.top + bubbleRect.height / 2 < viewportCenterY
        ? "bottom"
        : "top";

    // 方向没变，直接更新位置
    if (
      !animate ||
      (newH === currentPanelDir.h && newV === currentPanelDir.v)
    ) {
      applyPanelPosition(panel, newH, newV);
      currentPanelDir = { h: newH, v: newV };
      return;
    }

    // 方向变了，先淡出 → 换位置 → 淡入
    const originalTransition = panel.style.transition;
    panel.style.transition = "opacity 0.15s ease, transform 0.15s ease";
    panel.style.opacity = "0";
    panel.style.transform = "translateY(10px)";

    setTimeout(() => {
      applyPanelPosition(panel, newH, newV);
      currentPanelDir = { h: newH, v: newV };
      requestAnimationFrame(() => {
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
        setTimeout(() => {
          panel.style.transition = originalTransition;
        }, 150);
      });
    }, 150);
  };

  const applyPanelPosition = (panel, h, v) => {
    if (h === "left") {
      panel.style.right = "auto";
      panel.style.left = "0";
    } else {
      panel.style.left = "auto";
      panel.style.right = "0";
    }

    if (v === "bottom") {
      panel.style.bottom = "auto";
      panel.style.top = "calc(100% + 12px)";
    } else {
      panel.style.top = "auto";
      panel.style.bottom = "calc(100% + 12px)";
    }
  };

  // ========== 展开/收起面板 ==========
  const expandPanel = () => {
    isExpanded = true;
    const container = document.querySelector("#line-bubble-container");
    const bubble = document.querySelector("#line-bubble");
    const panel = document.querySelector("#line-panel");
    const arrow = document.querySelector("#line-bubble-arrow");

    container.classList.add("expanded");
    bubble.classList.add("expanded");
    if (panel) {
      updatePanelPosition();

      panel.style.display = "flex";
      panel.style.opacity = "0";
      panel.style.transform = "translateY(10px)";
      panel.style.pointerEvents = "none";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.opacity = "1";
          panel.style.transform = "translateY(0)";
          panel.style.pointerEvents = "auto";
        });
      });
    }
    if (arrow) arrow.style.transform = "rotate(180deg)";

    if (!downloadMode) {
      toggleMode();
    }

    updateSelectCount();
  };

  const collapsePanel = () => {
    isExpanded = false;
    const container = document.querySelector("#line-bubble-container");
    const bubble = document.querySelector("#line-bubble");
    const panel = document.querySelector("#line-panel");
    const arrow = document.querySelector("#line-bubble-arrow");

    container.classList.remove("expanded");
    bubble.classList.remove("expanded");
    if (panel) {
      panel.style.opacity = "0";
      panel.style.transform = "translateY(10px)";
      panel.style.pointerEvents = "none";
      setTimeout(() => {
        if (!isExpanded) panel.style.display = "none";
      }, 250);
    }
    if (arrow) arrow.style.transform = "rotate(0deg)";

    // 收起面板时自动关闭下载模式
    if (downloadMode) {
      toggleMode();
    }
  };

  const toggleExpand = () => {
    if (isExpanded) {
      collapsePanel();
    } else {
      expandPanel();
    }
  };

  // ========== 勾选框 ==========
  const addCheckboxes = () => {
    const items = document.querySelectorAll(".FnStickerPreviewItem");

    items.forEach((li, index) => {
      if (li.querySelector(".sticker-checkbox")) return;

      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "sticker-checkbox";
      checkboxContainer.style.cssText = `
                position: absolute;
                top: 6px;
                left: 6px;
                z-index: 100;
                width: 26px;
                height: 26px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,255,255,0.9);
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            `;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.index = index;
      checkbox.style.cssText = `
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: #667eea;
                margin: 0;
            `;

      checkbox.addEventListener("click", (e) => {
        const isChecked = checkbox.checked;

        // 每次点击时都根据当前 DOM 顺序重新计算索引，
        // 避免 LINE 懒加载/动态插入贴图后索引失效
        const allCheckboxes = Array.from(
          document.querySelectorAll(".sticker-checkbox input"),
        );
        const currentIndex = allCheckboxes.indexOf(checkbox);

        if (
          e.shiftKey &&
          lastCheckedIndex !== -1 &&
          currentIndex !== -1 &&
          lastCheckedIndex !== currentIndex
        ) {
          const start = Math.min(lastCheckedIndex, currentIndex);
          const end = Math.max(lastCheckedIndex, currentIndex);

          for (let i = start; i <= end; i++) {
            const cb = allCheckboxes[i];
            if (cb) {
              cb.checked = isChecked;
              updateItemStyle(cb.closest(".FnStickerPreviewItem"), isChecked);
            }
          }
        } else {
          updateItemStyle(li, isChecked);
        }

        lastCheckedIndex = currentIndex;
        updateSelectCount();
      });

      checkboxContainer.appendChild(checkbox);

      // 右下角已下载标签
      const dataStrForBadge = li.dataset.preview;
      let stickerIdForBadge = "";
      if (dataStrForBadge) {
        try {
          const dataForBadge = JSON.parse(dataStrForBadge);
          stickerIdForBadge = dataForBadge.id || index;
        } catch (e) {}
      }

      const downloadBadge = document.createElement("div");
      downloadBadge.className = "sticker-download-badge";
      downloadBadge.dataset.stickerId = String(stickerIdForBadge);
      downloadBadge.style.cssText = `
                position: absolute;
                bottom: 4px;
                right: 4px;
                z-index: 101;
                font-size: 10px;
                font-weight: bold;
                color: #00c853;
                background: rgba(255,255,255,0.95);
                padding: 2px 5px;
                border-radius: 4px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                pointer-events: none;
                display: none;
                line-height: 1.2;
                white-space: nowrap;
            `;

      // 如果有已下载记录，显示标签
      updateDownloadBadge(stickerIdForBadge, downloadBadge);

      if (getComputedStyle(li).position === "static") {
        li.style.position = "relative";
      }

      li.appendChild(checkboxContainer);
      li.appendChild(downloadBadge);
    });
    updateSelectCount();
  };

  const removeCheckboxes = () => {
    document.querySelectorAll(".sticker-checkbox").forEach((el) => el.remove());
    document.querySelectorAll(".FnStickerPreviewItem").forEach((li) => {
      li.style.boxShadow = "";
      li.style.transform = "";
      li.style.zIndex = "";
      li.style.borderRadius = "";
    });
    lastCheckedIndex = -1;
    updateSelectCount();
  };

  const updateItemStyle = (li, checked, failed = false) => {
    if (failed) {
      // 下载失败：橙色边框
      li.style.boxShadow =
        "0 0 0 3px #ff9800, 0 4px 16px rgba(255, 152, 0, 0.35)";
      li.style.transform = "scale(1.03)";
      li.style.transition = "all 0.2s ease";
      li.style.borderRadius = "10px";
      li.style.zIndex = "20";
    } else if (checked) {
      li.style.boxShadow =
        "0 0 0 3px #667eea, 0 4px 16px rgba(102, 126, 234, 0.35)";
      li.style.transform = "scale(1.03)";
      li.style.transition = "all 0.2s ease";
      li.style.borderRadius = "10px";
      li.style.zIndex = "20";
    } else {
      li.style.boxShadow = "";
      li.style.transform = "";
      li.style.zIndex = "";
      li.style.borderRadius = "";
    }
  };

  // ========== 已下载标记更新 ==========
  const updateDownloadBadge = (stickerId, badgeEl) => {
    if (!badgeEl) {
      const badges = document.querySelectorAll(".sticker-download-badge");
      for (const b of badges) {
        if (b.dataset.stickerId === String(stickerId)) {
          badgeEl = b;
          break;
        }
      }
    }
    if (!badgeEl) return;

    const downloaded = downloadedMap.get(String(stickerId));
    if (!downloaded || downloaded.size === 0) {
      badgeEl.style.display = "none";
      badgeEl.textContent = "";
      return;
    }

    const parts = [];
    if (downloaded.has("png")) parts.push("PNG");
    if (downloaded.has("apng")) parts.push("APNG");
    if (downloaded.has("gif")) parts.push("GIF");
    badgeEl.textContent = parts.join(" ") + "✓";
    badgeEl.style.display = "block";
  };

  // ========== 气泡拖动 & 贴边 ==========
  const initBubbleDrag = () => {
    const container = document.querySelector("#line-bubble-container");
    const bubble = document.querySelector("#line-bubble");
    if (!container || !bubble) return;

    const onMouseDown = (e) => {
      if (e.target.closest("#line-panel")) return;

      isDragging = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;

      const rect = container.getBoundingClientRect();
      bubbleStartX = rect.left;
      bubbleStartY = rect.top;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;

      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        isDragging = true;
        container.classList.add("dragging");
      }

      if (isDragging) {
        e.preventDefault();
        let newX = bubbleStartX + dx;
        let newY = bubbleStartY + dy;

        const rect = container.getBoundingClientRect();
        newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
        newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));

        container.style.left = newX + "px";
        container.style.right = "auto";
        container.style.top = newY + "px";
        container.style.bottom = "auto";

        // 拖动过程中实时更新面板位置
        if (isExpanded) {
          updatePanelPosition(true);
        }
      }
    };

    const onMouseUp = (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      container.classList.remove("dragging");

      if (isDragging) {
        snapToEdge();
      } else {
        toggleExpand();
      }

      isDragging = false;
    };

    bubble.addEventListener("mousedown", onMouseDown);

    // 触摸支持
    bubble.addEventListener(
      "touchstart",
      (e) => {
        if (e.target.closest("#line-panel")) return;
        const touch = e.touches[0];
        isDragging = false;
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;
        const rect = container.getBoundingClientRect();
        bubbleStartX = rect.left;
        bubbleStartY = rect.top;
      },
      { passive: true },
    );

    bubble.addEventListener(
      "touchmove",
      (e) => {
        const touch = e.touches[0];
        const dx = touch.clientX - dragStartX;
        const dy = touch.clientY - dragStartY;

        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
          isDragging = true;
          container.classList.add("dragging");
        }

        if (isDragging) {
          let newX = bubbleStartX + dx;
          let newY = bubbleStartY + dy;
          const rect = container.getBoundingClientRect();
          newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
          newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));
          container.style.left = newX + "px";
          container.style.right = "auto";
          container.style.top = newY + "px";
          container.style.bottom = "auto";

          // 拖动过程中实时更新面板位置
          if (isExpanded) {
            updatePanelPosition(true);
          }
        }
      },
      { passive: true },
    );

    bubble.addEventListener("touchend", () => {
      container.classList.remove("dragging");
      if (isDragging) {
        snapToEdge();
      } else {
        toggleExpand();
      }
      isDragging = false;
    });
  };

  const snapToEdge = () => {
    const container = document.querySelector("#line-bubble-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;

    const side = centerX < viewportCenter ? "left" : "right";
    const margin = 20;

    let targetX;
    if (side === "left") {
      targetX = margin;
      container.style.left = targetX + "px";
      container.style.right = "auto";
    } else {
      targetX = window.innerWidth - rect.width - margin;
      container.style.right = margin + "px";
      container.style.left = "auto";
    }

    const targetY = Math.max(
      margin,
      Math.min(rect.top, window.innerHeight - rect.height - margin),
    );
    container.style.top = targetY + "px";
    container.style.bottom = "auto";

    savePos(targetX, targetY, side);

    // 如果面板是展开状态，重新计算面板位置
    if (isExpanded) {
      updatePanelPosition();
    }
  };

  // ========== 创建气泡和面板 ==========
  const addBubbleAndPanel = () => {
    const container = document.createElement("div");
    container.id = "line-bubble-container";

    const savedPos = getSavedPos();
    if (savedPos) {
      if (savedPos.side === "left") {
        container.style.cssText = `
                    position: fixed;
                    left: ${savedPos.x}px;
                    top: ${savedPos.y}px;
                    z-index: 99999;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                `;
      } else {
        container.style.cssText = `
                    position: fixed;
                    right: ${window.innerWidth - savedPos.x - 180}px;
                    top: ${savedPos.y}px;
                    z-index: 99999;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                `;
      }
    } else {
      container.style.cssText = `
                position: fixed;
                right: 30px;
                bottom: 30px;
                z-index: 99999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            `;
    }

    // ========== 气泡 ==========
    const bubble = document.createElement("div");
    bubble.id = "line-bubble";
    bubble.style.cssText = `
            background: white;
            border-radius: 50px;
            padding: 10px 18px;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25), 0 2px 8px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            user-select: none;
            transition: box-shadow 0.3s ease, transform 0.2s ease;
            white-space: nowrap;
        `;

    const iconWrap = document.createElement("div");
    iconWrap.className = "bubble-icon-wrap";
    iconWrap.style.cssText = `
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: background 0.3s ease;
        `;
    iconWrap.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        `;

    const label = document.createElement("span");
    label.id = "line-bubble-label";
    label.textContent = TEXT.bubbleLabel;
    label.style.cssText = `
            font-size: 14px;
            font-weight: 600;
            color: #333;
        `;

    const arrow = document.createElement("span");
    arrow.id = "line-bubble-arrow";
    arrow.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        `;
    arrow.style.cssText = `
            display: flex;
            align-items: center;
            transition: transform 0.3s ease;
            margin-left: 4px;
        `;

    bubble.appendChild(iconWrap);
    bubble.appendChild(label);
    bubble.appendChild(arrow);
    container.appendChild(bubble);

    // ========== 展开面板 ==========
    const panel = document.createElement("div");
    panel.id = "line-panel";
    panel.style.cssText = `
            position: absolute;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
            padding: 14px 18px;
            display: none;
            flex-direction: column;
            gap: 8px;
            min-width: 260px;
            max-width: 320px;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.25s ease, transform 0.25s ease;
            pointer-events: none;
        `;

    const titleRow = document.createElement("div");
    titleRow.style.cssText =
      "display: flex; justify-content: space-between; align-items: center; gap: 8px;";

    const title = document.createElement("div");
    title.id = "line-panel-title";
    title.textContent = TEXT.panelTitle;
    title.style.cssText =
      "font-weight: bold; font-size: 13px; color: #333; white-space: pre-line; flex: 1; min-width: 0;";
    titleRow.appendChild(title);

    const rightGroup = document.createElement("div");
    rightGroup.style.cssText =
      "display: flex; align-items: center; gap: 4px; flex-shrink: 0;";

    const langSelect = document.createElement("select");
    langSelect.style.cssText = `
            font-size: 11px;
            padding: 2px 6px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #f8f8f8;
            color: #666;
            cursor: pointer;
            outline: none;
            min-width: 70px;
            z-index: 100000;
        `;
    for (const [key, dict] of Object.entries(I18N)) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = dict.name;
      if (key === currentLang) opt.selected = true;
      langSelect.appendChild(opt);
    }
    langSelect.addEventListener("change", () => {
      currentLang = langSelect.value;
      TEXT = I18N[currentLang];
      localStorage.setItem("line-downloader-lang", currentLang);
      updatePanelLanguage();
    });
    rightGroup.appendChild(langSelect);

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            padding: 0 4px;
            line-height: 1;
        `;
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      collapsePanel();
    });
    rightGroup.appendChild(closeBtn);
    titleRow.appendChild(rightGroup);

    panel.appendChild(titleRow);

    // 状态指示
    const statusRow = document.createElement("div");
    statusRow.id = "line-status-row";
    statusRow.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #f0f4ff;
            border-radius: 10px;
            font-size: 12px;
            color: #667eea;
        `;
    statusRow.innerHTML = `
            <span id="line-status-dot" style="width:8px;height:8px;border-radius:50%;background:#ccc;display:inline-block;transition:all 0.3s;"></span>
            <span id="line-status-text">${TEXT.enableMode}</span>
        `;
    panel.appendChild(statusRow);

    const modeBtn = document.createElement("button");
    modeBtn.id = "line-mode-toggle";
    modeBtn.textContent = TEXT.enableMode;
    modeBtn.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            display: none;
        `;
    modeBtn.addEventListener("click", toggleMode);
    panel.appendChild(modeBtn);

    const controls = document.createElement("div");
    controls.id = "line-download-controls";
    controls.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            margin-top: 4px;
        `;

    const selectHeader = document.createElement("div");
    selectHeader.style.cssText =
      "display: flex; justify-content: space-between; align-items: center;";
    const selectTitle = document.createElement("span");
    selectTitle.textContent = "选择贴图";
    selectTitle.style.cssText =
      "font-size: 13px; font-weight: 600; color: #333;";
    const selectCount = document.createElement("span");
    selectCount.id = "line-select-count";
    selectCount.textContent = "已选 0 / 0";
    selectCount.style.cssText = "font-size: 12px; color: #667eea;";
    selectHeader.appendChild(selectTitle);
    selectHeader.appendChild(selectCount);
    controls.appendChild(selectHeader);

    const selectRow = document.createElement("div");
    selectRow.style.cssText = "display: flex; gap: 6px;";

    const selectAllBtn = createSmallBtn(TEXT.selectAll, () => {
      document.querySelectorAll(".sticker-checkbox input").forEach((cb) => {
        cb.checked = true;
        updateItemStyle(cb.closest(".FnStickerPreviewItem"), true);
      });
      updateSelectCount();
    });

    const invertBtn = createSmallBtn(TEXT.invertSelection, () => {
      document.querySelectorAll(".sticker-checkbox input").forEach((cb) => {
        cb.checked = !cb.checked;
        updateItemStyle(cb.closest(".FnStickerPreviewItem"), cb.checked);
      });
      updateSelectCount();
    });

    const deselectAllBtn = createSmallBtn(TEXT.deselectAll, () => {
      document.querySelectorAll(".sticker-checkbox input").forEach((cb) => {
        cb.checked = false;
        updateItemStyle(cb.closest(".FnStickerPreviewItem"), false);
      });
      updateSelectCount();
    });

    selectRow.appendChild(selectAllBtn);
    selectRow.appendChild(invertBtn);
    selectRow.appendChild(deselectAllBtn);
    controls.appendChild(selectRow);

    const hasAnimation = () => {
      const items = document.querySelectorAll(".FnStickerPreviewItem");
      for (const li of items) {
        const dataStr = li.dataset.preview;
        if (!dataStr) continue;
        try {
          const data = JSON.parse(dataStr);
          if (data.type === "animation") return true;
        } catch (e) {}
      }
      return false;
    };

    const hasAnimatedStickers = hasAnimation();

    const typeLabel = document.createElement("div");
    typeLabel.textContent = "下载类型";
    typeLabel.style.cssText =
      "font-size: 13px; font-weight: 600; color: #333; margin-top: 4px;";
    controls.appendChild(typeLabel);

    const typeRow = document.createElement("div");
    typeRow.style.cssText = "display: flex; gap: 4px; flex-wrap: wrap;";

    let typeStatic, typeAnimated, typeBoth;

    if (hasAnimatedStickers) {
      typeStatic = createTypeBtn(TEXT.downloadStatic, "static", controls);
      typeAnimated = createTypeBtn(TEXT.downloadAnimated, "animated", controls);
      typeBoth = createTypeBtn(TEXT.downloadBoth, "both", controls);

      typeAnimated.classList.add("active-type");
      typeAnimated.style.background = "#667eea";
      typeAnimated.style.color = "white";
      selectedTypes = "animated";
    } else {
      typeStatic = createTypeBtn(TEXT.downloadStatic, "static", controls);
      typeStatic.classList.add("active-type");
      typeStatic.style.background = "#667eea";
      typeStatic.style.color = "white";
      selectedTypes = "static";
    }

    typeRow.appendChild(typeStatic);
    if (typeAnimated) typeRow.appendChild(typeAnimated);
    if (typeBoth) typeRow.appendChild(typeBoth);
    controls.appendChild(typeRow);

    if (hasAnimatedStickers) {
      const gifOptionRow = document.createElement("div");
      gifOptionRow.style.cssText =
        "display: flex; align-items: center; gap: 6px; margin-top: 2px; position: relative;";

      const gifCheckbox = document.createElement("input");
      gifCheckbox.type = "checkbox";
      gifCheckbox.id = "line-gif-option";
      gifCheckbox.style.cssText =
        "width: 16px; height: 16px; cursor: pointer; accent-color: #667eea;";

      const gifLabel = document.createElement("label");
      gifLabel.htmlFor = "line-gif-option";
      gifLabel.textContent = TEXT.gifOption;
      gifLabel.style.cssText =
        "font-size: 12px; color: #666; cursor: pointer; user-select: none;";

      // 问号提示图标
      const helpIcon = document.createElement("span");
      helpIcon.innerHTML = "?";
      helpIcon.style.cssText = `
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #ddd;
                color: #888;
                font-size: 11px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                flex-shrink: 0;
                user-select: none;
            `;

      // Tooltip
      const tooltip = document.createElement("div");
      tooltip.id = "line-gif-help-tooltip";
      tooltip.style.cssText = `
                position: absolute;
                left: 24px;
                top: 28px;
                background: #333;
                color: white;
                font-size: 11px;
                padding: 8px 12px;
                border-radius: 8px;
                max-width: 220px;
                line-height: 1.5;
                z-index: 100001;
                display: none;
                pointer-events: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
      tooltip.innerHTML = TEXT.gifHelp;

      let tooltipVisible = false;
      helpIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        tooltipVisible = !tooltipVisible;
        tooltip.style.display = tooltipVisible ? "block" : "none";
      });
      // 点击面板其他地方关闭 tooltip
      panel.addEventListener("click", (e) => {
        if (e.target !== helpIcon) {
          tooltipVisible = false;
          tooltip.style.display = "none";
        }
      });

      gifOptionRow.appendChild(tooltip);

      gifCheckbox.checked = true;
      convertToGif = true;
      gifLabel.style.color = "#667eea";
      gifLabel.style.fontWeight = "bold";

      gifCheckbox.addEventListener("change", () => {
        convertToGif = gifCheckbox.checked;
        if (convertToGif) {
          gifLabel.style.color = "#667eea";
          gifLabel.style.fontWeight = "bold";
        } else {
          gifLabel.style.color = "#666";
          gifLabel.style.fontWeight = "normal";
        }
      });

      gifOptionRow.appendChild(gifCheckbox);
      gifOptionRow.appendChild(gifLabel);
      gifOptionRow.appendChild(helpIcon);
      controls.appendChild(gifOptionRow);
    }

    const downloadBtn = document.createElement("button");
    downloadBtn.id = "line-download-btn";
    downloadBtn.textContent = TEXT.downloadSelected;
    downloadBtn.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 12px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 4px;
        `;
    downloadBtn.addEventListener("mouseenter", () => {
      downloadBtn.style.filter = "brightness(1.1)";
      downloadBtn.style.transform = "translateY(-1px)";
    });
    downloadBtn.addEventListener("mouseleave", () => {
      downloadBtn.style.filter = "";
      downloadBtn.style.transform = "";
    });
    downloadBtn.addEventListener("click", downloadSelected);
    controls.appendChild(downloadBtn);

    const tipRow = document.createElement("div");
    tipRow.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 11px;
            color: #999;
            margin-top: 2px;
        `;
    tipRow.innerHTML = `
            <div style="display:flex;align-items:center;gap:6px;">
                <span style="width:16px;text-align:center;flex-shrink:0;">💡</span>
                <span id="line-tip-shortcuts">${TEXT.tipShortcuts}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
                <span style="width:16px;text-align:center;flex-shrink:0;">✥</span>
                <span id="line-tip-drag">${TEXT.tipDrag}</span>
            </div>
        `;
    controls.appendChild(tipRow);

    panel.appendChild(controls);
    container.appendChild(panel);
    document.body.appendChild(container);

    // ========== 全局样式 ==========
    const style = document.createElement("style");
    style.textContent = `
            #line-bubble-container.expanded #line-panel {
                display: flex;
            }
            #line-bubble-container.dragging #line-bubble {
                cursor: grabbing !important;
                box-shadow: 0 8px 30px rgba(102, 126, 234, 0.35) !important;
            }
            #line-bubble:hover {
                box-shadow: 0 6px 24px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            #line-bubble.mode-on .bubble-icon-wrap {
                background: linear-gradient(135deg, #00c853 0%, #00b248 100%) !important;
            }
            .sticker-download-badge {
                animation: badgeAppear 0.3s ease;
            }
            @keyframes badgeAppear {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
    document.head.appendChild(style);

    initBubbleDrag();
  };

  const updateSelectCount = () => {
    const checked = document.querySelectorAll(
      ".sticker-checkbox input:checked",
    ).length;
    const total = document.querySelectorAll(".sticker-checkbox input").length;
    const countEl = document.querySelector("#line-select-count");
    if (countEl) {
      countEl.textContent = `已选 ${checked} / ${total}`;
    }
    const downloadBtn = document.querySelector("#line-download-btn");
    if (downloadBtn && !downloadBtn.disabled) {
      downloadBtn.textContent =
        checked > 0
          ? `${TEXT.downloadSelected} (${checked})`
          : TEXT.downloadSelected;
    }
  };

  const updatePanelLanguage = () => {
    const title = document.querySelector("#line-panel-title");
    if (title) title.textContent = TEXT.panelTitle;

    const bubbleLabel = document.querySelector("#line-bubble-label");
    if (bubbleLabel) bubbleLabel.textContent = TEXT.bubbleLabel;

    const modeBtn = document.querySelector("#line-mode-toggle");
    if (modeBtn) {
      modeBtn.textContent = downloadMode ? TEXT.disableMode : TEXT.enableMode;
    }

    const statusText = document.querySelector("#line-status-text");
    if (statusText) {
      statusText.textContent = downloadMode
        ? TEXT.disableMode
        : TEXT.enableMode;
    }

    const controls = document.querySelector("#line-download-controls");
    if (controls) {
      const smallBtns = controls.querySelectorAll("button");
      if (smallBtns[0]) smallBtns[0].textContent = TEXT.selectAll;
      if (smallBtns[1]) smallBtns[1].textContent = TEXT.invertSelection;
      if (smallBtns[2]) smallBtns[2].textContent = TEXT.deselectAll;

      const typeBtns = controls.querySelectorAll(".line-type-btn");
      typeBtns.forEach((btn) => {
        const type = btn.dataset.type;
        if (type === "static") btn.textContent = TEXT.downloadStatic;
        else if (type === "animated") btn.textContent = TEXT.downloadAnimated;
        else if (type === "both") btn.textContent = TEXT.downloadBoth;
      });

      const gifLabel = controls.querySelector('label[for="line-gif-option"]');
      if (gifLabel) gifLabel.textContent = TEXT.gifOption;

      const tipShortcuts = controls.querySelector("#line-tip-shortcuts");
      if (tipShortcuts) tipShortcuts.textContent = TEXT.tipShortcuts;
      const tipDrag = controls.querySelector("#line-tip-drag");
      if (tipDrag) tipDrag.textContent = TEXT.tipDrag;

      const gifHelpTooltip = controls.querySelector("#line-gif-help-tooltip");
      if (gifHelpTooltip) gifHelpTooltip.innerHTML = TEXT.gifHelp;
    }

    const downloadBtn = document.querySelector("#line-download-btn");
    if (downloadBtn && !downloadBtn.disabled) {
      updateSelectCount();
    }
  };

  const createSmallBtn = (text, onClick) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.style.cssText = `
            background: #f0f0f0;
            color: #555;
            border: none;
            border-radius: 8px;
            padding: 6px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.15s;
            flex: 1;
        `;
    btn.addEventListener("click", onClick);
    btn.addEventListener(
      "mouseenter",
      () => (btn.style.background = "#e0e0e0"),
    );
    btn.addEventListener(
      "mouseleave",
      () => (btn.style.background = "#f0f0f0"),
    );
    return btn;
  };

  const createTypeBtn = (text, type, panel) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.dataset.type = type;
    btn.className = "line-type-btn";
    btn.style.cssText = `
            background: #f5f5f5;
            color: #666;
            border: 2px solid transparent;
            border-radius: 8px;
            padding: 5px 8px;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.15s;
            flex: 1;
        `;
    btn.addEventListener("click", () => {
      panel.querySelectorAll("[data-type]").forEach((b) => {
        b.classList.remove("active-type");
        b.style.background = "#f5f5f5";
        b.style.color = "#666";
        b.style.borderColor = "transparent";
      });
      btn.classList.add("active-type");
      btn.style.background = "#667eea";
      btn.style.color = "white";
      btn.style.borderColor = "#667eea";
      selectedTypes = type;

      const gifCheckbox = document.querySelector("#line-gif-option");
      const gifLabel = document.querySelector('label[for="line-gif-option"]');
      if (gifCheckbox && gifLabel) {
        if (type === "static") {
          gifCheckbox.disabled = true;
          gifCheckbox.checked = false;
          gifLabel.style.color = "#ccc";
          gifLabel.style.fontWeight = "normal";
          convertToGif = false;
        } else {
          gifCheckbox.disabled = false;
          gifCheckbox.checked = true;
          gifLabel.style.color = "#667eea";
          gifLabel.style.fontWeight = "bold";
          convertToGif = true;
        }
      }
    });
    return btn;
  };

  // ========== APNG → GIF 转换 ==========
  const quantize = (rgbaData, width, height) => {
    const colors = [];
    for (let i = 0; i < rgbaData.length; i += 4) {
      const a = rgbaData[i + 3];
      if (a >= 128) {
        colors.push({
          r: rgbaData[i],
          g: rgbaData[i + 1],
          b: rgbaData[i + 2],
        });
      }
    }

    if (colors.length === 0) {
      return {
        palette: [[0, 0, 0]],
        indexOf: () => 0,
      };
    }

    const medianCut = (boxes, depth) => {
      if (depth === 0 || boxes.length >= 255) {
        return boxes;
      }

      let maxBox = boxes[0];
      let maxRange = 0;
      for (const box of boxes) {
        let minR = 255,
          maxR = 0,
          minG = 255,
          maxG = 0,
          minB = 255,
          maxB = 0;
        for (const c of box) {
          minR = Math.min(minR, c.r);
          maxR = Math.max(maxR, c.r);
          minG = Math.min(minG, c.g);
          maxG = Math.max(maxG, c.g);
          minB = Math.min(minB, c.b);
          maxB = Math.max(maxB, c.b);
        }
        const range = Math.max(maxR - minR, maxG - minG, maxB - minB);
        if (range > maxRange) {
          maxRange = range;
          maxBox = box;
        }
      }

      if (maxBox.length <= 1 || maxRange === 0) {
        return boxes;
      }

      let minR = 255,
        maxR = 0,
        minG = 255,
        maxG = 0,
        minB = 255,
        maxB = 0;
      for (const c of maxBox) {
        minR = Math.min(minR, c.r);
        maxR = Math.max(maxR, c.r);
        minG = Math.min(minG, c.g);
        maxG = Math.max(maxG, c.g);
        minB = Math.min(minB, c.b);
        maxB = Math.max(maxB, c.b);
      }
      const rRange = maxR - minR;
      const gRange = maxG - minG;
      const bRange = maxB - minB;

      let sortKey = "r";
      if (gRange >= rRange && gRange >= bRange) sortKey = "g";
      if (bRange >= rRange && bRange >= gRange) sortKey = "b";

      maxBox.sort((a, b) => a[sortKey] - b[sortKey]);

      const mid = Math.floor(maxBox.length / 2);
      const newBoxes = boxes.filter((b) => b !== maxBox);
      newBoxes.push(maxBox.slice(0, mid));
      newBoxes.push(maxBox.slice(mid));

      return medianCut(newBoxes, depth - 1);
    };

    const boxes = medianCut([colors], 8);

    const palette = [];
    for (const box of boxes) {
      let r = 0,
        g = 0,
        b = 0;
      for (const c of box) {
        r += c.r;
        g += c.g;
        b += c.b;
      }
      palette.push([
        Math.round(r / box.length),
        Math.round(g / box.length),
        Math.round(b / box.length),
      ]);
    }

    while (palette.length > 255) {
      palette.pop();
    }

    const indexOf = (r, g, b) => {
      let minDist = Infinity;
      let index = 0;
      for (let i = 0; i < palette.length; i++) {
        const pr = palette[i][0],
          pg = palette[i][1],
          pb = palette[i][2];
        const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
        if (dist < minDist) {
          minDist = dist;
          index = i;
        }
      }
      return index;
    };

    return { palette, indexOf };
  };

  const apngToGif = async (apngBlob) => {
    try {
      const arrayBuffer = await apngBlob.arrayBuffer();

      if (typeof pako !== "undefined") {
        window.pako = pako;
      }

      const img = UPNG.decode(arrayBuffer);
      const frames = UPNG.toRGBA8(img);

      if (!frames || frames.length === 0) {
        throw new Error("No frames extracted from APNG");
      }

      const delays = [];
      if (img.frames && img.frames.length > 0) {
        for (const frame of img.frames) {
          delays.push(frame.delay || 100);
        }
      } else {
        for (let i = 0; i < frames.length; i++) {
          delays.push(100);
        }
      }

      const sentinelCandidates = [
        [255, 0, 255],
        [0, 255, 255],
        [255, 255, 0],
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
        [128, 0, 128],
        [255, 128, 0],
      ];

      const opaqueColorSet = new Set();
      for (const frame of frames) {
        const rgba = new Uint8ClampedArray(frame);
        for (let i = 0; i < rgba.length; i += 4) {
          if (rgba[i + 3] >= 128) {
            opaqueColorSet.add(`${rgba[i]},${rgba[i + 1]},${rgba[i + 2]}`);
          }
        }
      }

      let sentinel = null;
      for (const cand of sentinelCandidates) {
        if (!opaqueColorSet.has(`${cand[0]},${cand[1]},${cand[2]}`)) {
          sentinel = cand;
          break;
        }
      }

      if (!sentinel) {
        sentinel = sentinelCandidates[0];
        console.warn(
          "[apngToGif] Warning: could not find unique sentinel color, using",
          sentinel,
        );
      }

      const encoder = new GIFEncoder();
      encoder.setRepeat(0);
      encoder.setDelay(delays[0] || 100);
      encoder.setSize(img.width, img.height);

      encoder.setSentinelColor(sentinel);
      const transparentHex =
        (sentinel[0] << 16) | (sentinel[1] << 8) | sentinel[2];
      encoder.setTransparent(transparentHex);

      const started = encoder.start();
      if (!started) {
        throw new Error("GIFEncoder.start() returned false");
      }

      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const rgba = new Uint8ClampedArray(frame);

        const imageData = new ImageData(rgba, img.width, img.height);

        encoder.setDelay(delays[i] || 100);
        const frameOk = encoder.addFrame(imageData, true);
        if (!frameOk) {
          throw new Error(`addFrame failed for frame ${i + 1}`);
        }
      }

      encoder.finish();

      const binary = encoder.stream().getData();
      const length = binary.length;
      const uint8Array = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        uint8Array[i] = binary.charCodeAt(i) & 0xff;
      }

      const gifBlob = new Blob([uint8Array], { type: "image/gif" });

      return gifBlob;
    } catch (err) {
      console.error("[apngToGif] FATAL ERROR:", err);
      console.error("[apngToGif] Stack:", err.stack);
      throw err;
    }
  };

  // ========== 下载逻辑 ==========
  const downloadFile = async (url, filename) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: "download", url: url, filename: filename },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response && response.success) {
            resolve(response);
          } else {
            reject(new Error(response?.error || "Unknown error"));
          }
        },
      );
    });
  };

  const downloadBlob = async (blob, filename) => {
    const blobUrl = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: "downloadBlob", blobUrl: blobUrl, filename: filename },
        (response) => {
          URL.revokeObjectURL(blobUrl);
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response && response.success) {
            resolve(response);
          } else {
            reject(new Error(response?.error || "Unknown error"));
          }
        },
      );
    });
  };

  const downloadSelected = async () => {
    const checkedBoxes = document.querySelectorAll(
      ".sticker-checkbox input:checked",
    );
    if (checkedBoxes.length === 0) {
      alert(TEXT.noSelection);
      return;
    }

    const btn = document.querySelector("#line-download-btn");
    const originalText = btn.textContent;
    btn.disabled = true;

    let packName = document.title.replace(/(.+?) (-|–) .+/g, "$1").trim();
    packName = packName.replace(/["\\/:*?<>|]/g, "");

    const authorEl = document.querySelector(".mdCMN38Item01Author");
    let authorName = "";
    if (authorEl) {
      authorName = authorEl.textContent.trim();
      authorName = authorName.replace(/["\\/:*?<>|]/g, "");
    }

    let folderName = packName;
    if (authorName) {
      folderName = `${packName}_${authorName}`;
    }
    if (!folderName) folderName = "line_stickers";

    let addedCount = 0;
    let failCount = 0;
    const totalItems = checkedBoxes.length;

    for (let i = 0; i < checkedBoxes.length; i++) {
      const checkbox = checkedBoxes[i];
      const li = checkbox.closest(".FnStickerPreviewItem");
      const dataStr = li.dataset.preview;
      if (!dataStr) continue;

      let stickerId = "";
      try {
        const data = JSON.parse(dataStr);
        stickerId = data.id || checkbox.dataset.index;
        const baseName = `${folderName}/${String(i + 1).padStart(2, "0")}_${stickerId}`;

        if (
          (selectedTypes === "static" || selectedTypes === "both") &&
          data.staticUrl
        ) {
          try {
            await downloadFile(data.staticUrl, `${baseName}.png`);
            addedCount++;
            // 记录已下载
            if (!downloadedMap.has(String(stickerId))) {
              downloadedMap.set(String(stickerId), new Set());
            }
            downloadedMap.get(String(stickerId)).add("png");
            updateDownloadBadge(stickerId);
            // 下载成功，取消勾选
            checkbox.checked = false;
            updateItemStyle(li, false);
            updateSelectCount();
          } catch (e) {
            console.error(`✗ ${baseName}.png:`, e);
            failCount++;
            // 下载失败，勾选框变橙色
            checkbox.checked = true;
            updateItemStyle(li, true, true);
          }
          await delay(300);
        }

        if (
          (selectedTypes === "animated" || selectedTypes === "both") &&
          data.type === "animation" &&
          data.animationUrl
        ) {
          try {
            if (convertToGif) {
              btn.textContent = `${TEXT.converting} ${i + 1}/${totalItems}`;
              const response = await fetch(data.animationUrl, {
                headers: { Referer: "https://store.line.me/" },
              });
              if (!response.ok) {
                throw new Error(
                  `HTTP ${response.status}: ${response.statusText}`,
                );
              }
              const apngBlob = await response.blob();
              const gifBlob = await apngToGif(apngBlob);
              await downloadBlob(gifBlob, `${baseName}.gif`);
              // 记录已下载 GIF
              if (!downloadedMap.has(String(stickerId))) {
                downloadedMap.set(String(stickerId), new Set());
              }
              downloadedMap.get(String(stickerId)).add("gif");
              updateDownloadBadge(stickerId);
              // 下载成功，取消勾选
              checkbox.checked = false;
              updateItemStyle(li, false);
              updateSelectCount();
            } else {
              await downloadFile(
                data.animationUrl,
                `${baseName}_ANIMATION.png`,
              );
              // 记录已下载 APNG
              if (!downloadedMap.has(String(stickerId))) {
                downloadedMap.set(String(stickerId), new Set());
              }
              downloadedMap.get(String(stickerId)).add("apng");
              updateDownloadBadge(stickerId);
              // 下载成功，取消勾选
              checkbox.checked = false;
              updateItemStyle(li, false);
              updateSelectCount();
            }
            addedCount++;
          } catch (e) {
            console.error(`✗ ${baseName} animation FAILED:`, e);
            failCount++;
            // 下载失败，勾选框变橙色
            checkbox.checked = true;
            updateItemStyle(li, true, true);
          }
          await delay(300);
        }

        const progress = Math.round(((i + 1) / totalItems) * 100);
        if (!convertToGif || selectedTypes === "static") {
          btn.textContent = `${TEXT.downloading} ${progress}%`;
        }
      } catch (err) {
        console.error("Parse error:", err);
      }
    }

    const statusText =
      failCount > 0
        ? fmt(TEXT.doneWithFail, {
            success: addedCount,
            fail: failCount,
          })
        : TEXT.done;

    btn.textContent = statusText;
    setTimeout(() => {
      btn.disabled = false;
      updateSelectCount();
    }, 3000);
  };

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  // ========== 快捷键支持 ==========
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && downloadMode) {
      collapsePanel(); // collapsePanel 内部已包含 toggleMode()
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "a" && downloadMode) {
      e.preventDefault();
      const allCheckboxes = document.querySelectorAll(
        ".sticker-checkbox input",
      );
      const allChecked = Array.from(allCheckboxes).every((cb) => cb.checked);

      if (allChecked) {
        allCheckboxes.forEach((cb) => {
          cb.checked = false;
          updateItemStyle(cb.closest(".FnStickerPreviewItem"), false);
        });
      } else {
        allCheckboxes.forEach((cb) => {
          cb.checked = true;
          updateItemStyle(cb.closest(".FnStickerPreviewItem"), true);
        });
      }
      updateSelectCount();
    }
  });

  // ========== 监听动态加载 ==========
  const observer = new MutationObserver(() => {
    if (!downloadMode) return;
    const items = document.querySelectorAll(".FnStickerPreviewItem");
    const checkboxes = document.querySelectorAll(".sticker-checkbox");
    if (items.length > checkboxes.length) {
      addCheckboxes();
      updateSelectCount();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
