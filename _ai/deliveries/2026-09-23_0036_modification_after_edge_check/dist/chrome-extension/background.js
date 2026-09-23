/**
 * Suno Copilot - Background Service Worker (Manifest V3)
 * Provides CORS-free background translation pipeline for dynamic song descriptions
 * (Restored per explicit User Directive to preserve musical flavor for uncataloged songs)
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate' && request.text) {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=' + encodeURIComponent(request.text);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const translated = data[0].map(item => item[0]).join('');
        sendResponse({ success: true, translation: translated });
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep message channel open for async response
  }
});
