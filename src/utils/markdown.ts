import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`
      } catch (__) {
        // ignore
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// 添加自定义规则：外部链接在新窗口打开
const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens: any, idx: number, options: any, _: any, self: any) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (
  tokens: any,
  idx: number,
  options: any,
  env: any,
  self: any,
) {
  const aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
  } else {
    tokens[idx].attrs![aIndex][1] = '_blank'
  }
  return defaultRender(tokens, idx, options, env, self)
}

export const renderMarkdown = (content: string) => {
  return md.render(content)
}
