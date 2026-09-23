# 应用名与安卓引擎

- **Task**: 安装包名称定为「Suno中文通」。并查清一个安装包注入 `dist/suno-copilot.user.js` 是否可行、用哪颗引擎。
- **Result**: 图标和窗口标题用「Suno中文通」。可行的做法是把 Mozilla 的 GeckoView 打进这一个安装包。没有可以当库引用的 Chrome 内核。
- **名称范围**: 这次只指定这个安卓安装包。电脑扩展清单里现有的「Suno 音乐通」没有改。
- **实机**: 登录和 `/create` 页面都还是 `NOT_YET_VERIFIED`。

## 名称

用户指定：Suno中文通。四个字连写，Suno 与中文之间不加空格。

## 查过的资料

- Chromium 开发者在 chromium-dev 说明：安卓没有一份可以放进普通应用的 Chromium 库。WebView 的接口只能调系统网页组件。自己集成 Chromium 的 content 层可以做，但没有稳定接口，也没有现成的 AAR，安全更新要自己跟整颗浏览器。
- Google 开发者博客：继承 Android WebView 的内嵌网页不符合其 OAuth 安全浏览器政策。登录会得到 `disallowed_useragent`。用系统浏览器或 Custom Tabs 是 Google 要求的替代。Custom Tabs 不能往页面里注入脚本，而且饼干不在本应用里，登录完回不到这个窗口。
- Kiwi：2025 年 1 月后仓库归档，不再维护。
- Cromite：GPL v3。维护者在 2026 年写明发布暂停，没有下一版日期。不作为底子。
- GeckoView：Mozilla 仍在发布，Maven 地址 `https://maven.mozilla.org/maven2/`，依赖 `org.mozilla.geckoview:geckoview`。文档写明可以把扩展放在 APK 的 assets 里，用 `WebExtensionController.ensureBuiltIn` 装上。内容脚本即现有的 `suno-copilot.user.js`。`GeckoSessionSettings.USER_AGENT_MODE_DESKTOP` 用来要桌面版页面。2026-08 的接口文档仍在更新（示例版本 156）。
- 体积：只含一种 CPU 架构时，2024 年 GeckoView 125 的空应用 arm64 包有人测得约 140 MB。更早的 Mozilla 回复写过大约 50 MB。精确体积随版本变化，这次没有自己编译称重。三星平板用 arm64 即可，不必打进四种架构。

## 建议

第一版用 GeckoView，应用名「Suno中文通」。内核是 Firefox，不是 Chrome。脚本只在 `https://suno.com/` 注入。用户代理设为桌面版。

Chrome 内核不是不能做，而是要自己编译和维护整颗 Chromium。那是另一个工程，不放进第一版。

第一版仍只看三件事：装上这一个包、在包里登录并保持登录、`/create` 上能看见现有中文。GeckoView 里 Google 登录会不会被拒，要在平板上才知道。
