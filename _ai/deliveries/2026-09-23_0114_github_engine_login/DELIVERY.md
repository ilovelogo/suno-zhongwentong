# GitHub 上同类做法：页面和 Google 登录

- **Task**: 看 GitHub 上别人怎么做「一个应用打开网页」，哪颗内核能同时打开 Suno 创作页和 Google 登录。应用名仍是「Suno中文通」。
- **Result**: 内嵌网页库过不了 Google 登录。GeckoView 当库嵌进自己的应用，GitHub 上已经有人得到「此浏览器或应用可能不安全」。能过 Google 登录的是一颗真正的浏览器。Suno 的创作页要桌面版。脚本应作为这颗浏览器里的内置扩展，而不是套一层 WebView。
- **本次没有在平板上打开 Firefox 看 `/create`。** 下面是仓库和问题单，不是实机结论。

## 别人实际碰到的

- [mozilla/geckoview#246](https://github.com/mozilla/geckoview/issues/246)（2024-09，仍开放）：把 GeckoView 嵌进应用后登录 Google，页面写「This browser or app may not be secure」。版本 `geckoview:127`。没有人在该问题里给出可用改法。
- [tlsnotary/tlsn-extension#259](https://github.com/tlsnotary/tlsn-extension/issues/259)：WebView 里「用 Google 登录」被同一句话拒绝。他们改成弹出系统浏览器。写明安卓上 Chrome Custom Tabs 和 WebView 的饼干不是同一份，登录完回不到应用里。iOS 可以共用饼干，安卓不行。
- Google 开发者博客：继承 Android WebView 的内嵌页不符合其登录政策，错误是 `disallowed_useragent`。
- 索引里有 `techcow2/sunoai-android`，说明是用 WebView 套 Suno 网站。直接打开该仓库地址得到 404，登录怎么做的没有读到。
- [webcompat/web-bugs#143656](https://github.com/webcompat/web-bugs/issues/143656)：Firefox 安卓打开 `https://suno.com/create`，问题写得不清楚，被关掉。
- [webcompat/web-bugs#156180](https://github.com/webcompat/web-bugs/issues/156180)：Firefox 安卓打开 `suno.com/me` 报图片和声音问题。测试者在 Firefox 140、Android 11 上没能复现，歌曲可以播放。
- [blinkingtwelve/appelflap](https://github.com/blinkingtwelve/appelflap)、[mazzz1y/peel](https://github.com/mazzz1y/peel)：用 GeckoView 把一个网站包成应用，Peel 还支持 Firefox 扩展。这两个仓库没有写 Suno，也没有写 Google 登录已经通过。
- 有的桌面浏览器项目用改用户代理、改 `navigator` 去应付「可能不安全」。Google 随后收紧检测，这种改法会失效。Suno中文通不走这条。

## 和 Suno 页面对得上的条件

创作页的完整按钮（Weirdness、Style Influence 等）在手机版网页上会缺。使用者的做法是浏览器里打开桌面版网站。词库也是按电脑上的桌面创作页写的。所以无论内核是哪一颗，都要桌面版 `suno.com`。

Firefox 内核上，`/create` 是否和电脑 Edge 上看到的是同一套按钮，这次没有在平板上看。webcompat 的两条都没有证明创作页不能用，也没有证明和 Edge 一致。

## 建议

先在平板的 Firefox 里请求桌面版网站，用现在的账号登录，打开 `/create`。这一步不用写安装包。

若这一页能登录，并且 Simple、Advanced、Sounds 和三个加号按钮都在，就按 Firefox 安卓版的做法做「Suno中文通」：它是一颗真正的浏览器，内置一份扩展，扩展内容就是现在的 `suno-copilot.user.js`。不要把 GeckoView 只当成一个没有浏览器身份的库嵌进去，那就是 #246 里失败的做法。

若 Firefox 的桌面版创作页和 Edge 对不上，才需要自己编译整颗 Chromium。那颗才能和现在电脑上的页面一致，也没有现成的小库。Cromite 发布暂停，Kiwi 已停更，都不作底子。
