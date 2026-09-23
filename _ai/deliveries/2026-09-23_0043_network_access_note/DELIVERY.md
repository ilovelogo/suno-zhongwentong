# 这一版会访问哪些网络

- **Task**: 查清 v1.3.0 插件自己会不会访问谷歌，以及还会不会访问别的网址。
- **Result**: 插件自己只多访问一个地址：`https://translate.googleapis.com/`。按钮、词库、教程不走网络。歌曲灰字里词典盖不住的英文，才会发给这个谷歌翻译接口。
- **依据**: `dist/chrome-extension/manifest.json`、`dist/chrome-extension/background.js`、`src/core/injector.js` 的 `fetchDynamicTranslation`。`src/` 里没有别的 `fetch`，样式里没有外链。
- **未在大陆断网条件下实测**这次请求能不能连上。下面写的是代码会发出的请求。

## 可以写进说明的话

Suno 音乐通 v1.3.0 在已经打开的 `suno.com` 之外，还会访问谷歌的翻译接口：

`https://translate.googleapis.com/translate_a/single`

查询参数是 `client=gtx`、`sl=auto`、`tl=zh-CN`。没有谷歌账号，也没有 API 密钥。发出去的内容是页面上一段还没被本地词库译完的英文，通常是歌曲介绍或风格描述，不是整页网页。

在中国大陆，这个地址属于谷歌服务，经常和普通访问谷歌一样连不上。连不上时，词库里已有的中文照常显示；词库没有的那一段不会被机器补译。

使用 Suno 网站本身就需要能打开外网。插件没有再去请求 Suno 的接口，歌曲、账号、生成都是网站自己的流量。

## 什么时候会打到谷歌

只在给歌曲灰字补中文时。扩展的后台脚本 `background.js` 收到 `action: 'translate'` 后，用 `fetch` 请求上面的地址。清单里的 `host_permissions` 只有 `https://translate.googleapis.com/*`。

油猴脚本没有扩展后台。它会在网页里直接 `fetch` 同一个地址。这一路有没有被浏览器跨域拦住，本次没有实测。

下面这些情况不发请求：

- 导航、模式名、`+ Audio` / `+ Voice` / `+ Inspo`、问号卡片、教程。这些中文打进安装包。
- 整段英文和本地词库完全对上。代码注释写明整段命中后不送谷歌。
- 浏览器 `localStorage` 里已经存过这句的纯中文（键名 `sc_trans_` 加这句英文的小写）。命中后直接用缓存。

词典只盖住半段时，没盖住的那半段仍会送去谷歌。谷歌返回后，代码会把整句中文写进 `localStorage`。所以同一句第二次打开不再请求。

## 没有的其他插件流量

- 没有字体、CDN、统计、更新检查。
- 清单里还有一项本地 `storage` 权限。源码里没有 `chrome.storage` 调用，翻译缓存写在当前网页的 `localStorage`。
- 油猴头里的 `@namespace https://github.com/suno-partner` 和 `@icon https://suno.com/favicon.ico` 是脚本说明，不是翻译通道。
