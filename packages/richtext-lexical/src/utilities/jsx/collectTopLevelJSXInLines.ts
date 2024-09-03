import { linesFromStartToContentAndPropsString } from '../../features/blocks/server/linesFromMatchToContentAndPropsString.js'
import { createTagRegexes } from '../../features/blocks/server/markdownTransformer.js'

export function collectTopLevelJSXInLines(
  lines: Array<string>,
  jsxToMatch: string,
): {
  content: string
  propsString: string
}[] {
  const finds: {
    content: string
    propsString: string
  }[] = []
  const regex = createTagRegexes(jsxToMatch)

  const linesLength = lines.length

  for (let i = 0; i < linesLength; i++) {
    const startMatch = lines[i].match(regex.regExpStart)
    if (!startMatch) {
      continue // Try next transformer
    }

    const linesLength = lines.length

    const { content, endLineIndex, propsString } = linesFromStartToContentAndPropsString({
      endLineIndex: i,
      isEndOptional: false,
      lines,
      linesLength,
      regexpEndRegex: regex.regExpEnd,
      startLineIndex: i,
      startMatch,
    })

    console.log({ content, lines, propsString })

    finds.push({
      content,
      propsString,
    })

    i = endLineIndex
    continue
  }

  return finds
}
