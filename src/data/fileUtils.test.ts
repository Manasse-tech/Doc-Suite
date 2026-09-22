import { describe, expect, it } from 'vitest'
import { formatBytes, getDocKind } from './fileUtils'

describe('file import rules', () => {
  it.each([
    ['report.pdf', 'pdf'],
    ['notes.docx', 'word'],
    ['budget.xlsx', 'excel'],
    ['presentation.pptx', 'slide'],
  ])('detects %s as %s', (name, kind) => {
    expect(getDocKind(name)).toBe(kind)
  })

  it('formats local file sizes for the library', () => {
    expect(formatBytes(512)).toBe('1 Ko')
    expect(formatBytes(2 * 1024 * 1024)).toBe('2,0 Mo')
  })
})
