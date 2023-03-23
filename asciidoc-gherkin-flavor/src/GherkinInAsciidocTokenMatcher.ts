import {
  CustomFlavorRegistry,
  GherkinInMarkdownTokenMatcher,
} from '@cucumber/gherkin'

export class GherkinInAsciidocTokenMatcher extends GherkinInMarkdownTokenMatcher {
  constructor(defaultDialectName = 'en') {
    const asciidocPrefixes = {
      BULLET: '^(\\s*[*\\.-]\\s*)',
      HEADER: '^(={1,6}\\s)',
    }
    super(defaultDialectName, asciidocPrefixes, /^(---[-]*)(.*)/)
  }

  match_TableRow(token: any): boolean {
    if (token.line.lineText.match(/^\s*\|[^=]/)) {
      const tableCells = this.getTableCells(token.line.lineText.trim())

      token.matchedKeyword = '|'
      token.matchedType = 12
      token.matchedItems = tableCells
      return true
    }
    return false
  }

  reset(): void {
    super.reset()
    // @ts-ignore
    super.matchedFeatureLine = false
  }

  getTableCells(trimmedLineText: string): any {
    const cells = []
    let col = 0
    let startCol = col + 1
    let cell = ''
    let firstCell = true
    while (col <= trimmedLineText.length) {
      let chr = trimmedLineText[col]
      col++

      if (chr === '|' || col === trimmedLineText.length + 1) {
        if (firstCell) {
          // First cell (content before the first |) is skipped
          firstCell = false
        } else {
          // Keeps newlines
          const trimmedLeft = cell.replace(/^[ \t\v\f\r\u0085\u00A0]*/g, '')
          const trimmed = trimmedLeft.replace(/[ \t\v\f\r\u0085\u00A0]*$/g, '')
          const cellIndent = cell.length - trimmedLeft.length
          const span = {
            column: startCol + cellIndent,
            text: trimmed,
          }
          cells.push(span)
        }
        cell = ''
        startCol = col + 1
      } else if (chr === '\\') {
        chr = trimmedLineText[col]
        col += 1
        if (chr === 'n') {
          cell += '\n'
        } else {
          if (chr !== '|' && chr !== '\\') {
            cell += '\\'
          }
          cell += chr
        }
      } else {
        cell += chr
      }
    }

    return cells
  }
}
