// 存储待完成的下载任务：downloadId -> { sendResponse, filename }
const pendingDownloads = new Map();

// 监听下载状态变化
chrome.downloads.onChanged.addListener((delta) => {
  const downloadId = delta.id;
  const pending = pendingDownloads.get(downloadId);
  if (!pending) return;

  // 下载完成
  if (delta.state && delta.state.current === "complete") {
    console.log("Download completed:", downloadId, pending.filename);
    pending.sendResponse({
      success: true,
      downloadId: downloadId,
      status: "complete",
    });
    pendingDownloads.delete(downloadId);
  }
  // 下载中断/失败
  else if (delta.state && delta.state.current === "interrupted") {
    const error = delta.error ? delta.error.current : "interrupted";
    console.error("Download interrupted:", downloadId, pending.filename, error);
    pending.sendResponse({
      success: false,
      error: error,
      downloadId: downloadId,
    });
    pendingDownloads.delete(downloadId);
  }
});

// 清理超时任务（防止内存泄漏）
setInterval(() => {
  const now = Date.now();
  for (const [id, pending] of pendingDownloads.entries()) {
    if (now - pending.startTime > 5 * 60 * 1000) {
      // 5分钟超时
      console.warn("Download timeout:", id, pending.filename);
      pending.sendResponse({ success: false, error: "timeout" });
      pendingDownloads.delete(id);
    }
  }
}, 30 * 1000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    const { url, filename } = request;

    chrome.downloads.download(
      {
        url: url,
        filename: filename,
        saveAs: false,
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download failed:", chrome.runtime.lastError);
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          console.log("Download started:", downloadId, filename);
          // 不立即响应，等下载真正完成
          pendingDownloads.set(downloadId, {
            sendResponse: sendResponse,
            filename: filename,
            startTime: Date.now(),
          });
        }
      },
    );

    return true; // 保持消息通道开放，等待异步响应
  }

  if (request.action === "downloadBlob") {
    const { blobUrl, filename } = request;

    chrome.downloads.download(
      {
        url: blobUrl,
        filename: filename,
        saveAs: false,
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Blob download failed:", chrome.runtime.lastError);
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          console.log("Blob download started:", downloadId, filename);
          // 不立即响应，等下载真正完成
          pendingDownloads.set(downloadId, {
            sendResponse: sendResponse,
            filename: filename,
            startTime: Date.now(),
          });
        }
      },
    );

    return true;
  }
});
