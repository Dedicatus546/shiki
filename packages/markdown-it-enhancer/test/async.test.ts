import fs from 'node:fs/promises'
import { MarkdownIt } from 'markdown-it-enhancer'
import { codeToHtml } from 'shiki'
import { expect, it } from 'vitest'
import { fromAsyncCodeToHtml } from '../src/async'

it('async', { timeout: 10_000 }, async () => {
  const md = new MarkdownIt()
  md.use(fromAsyncCodeToHtml(codeToHtml, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  }))
  await md.isReady()

  const result = await md.render(await fs.readFile(new URL('./fixtures/a.md', import.meta.url), 'utf-8'))

  await expect(result).toMatchFileSnapshot('./fixtures/a.async.out.html')
})
