const matcher = (text: string): { url: string, secret: string }[] => {
  // Remove non-ascii chars.
  text = text.replace(/[^\x00-\xff码]+/g, '')

  // Remove paired punctuations.
  text = text.replace(/(\s?)[#$%@:]?((\(\))|(\[])|({})|(<>))\1/g, '')

  // Replace useless chars to spaces.
  const cleanedText = text.replace(/[^a-zA-Z0-9-_:\/.]/g, ' ')

  let urlWIthPos: { url: string, pos: number }[] = []

  // Match url with pos.
  const urlMatcher = /s\/[a-zA-Z0-9-_:\/.]+/g
  let urlMatch
  while ((urlMatch = urlMatcher.exec(cleanedText)) !== null) {
    urlWIthPos.push({ url: 'https://pan.baidu.com/' + urlMatch[0], pos: urlMatcher.lastIndex })
  }

  let links: { url: string, secret: string }[] = []

  const secretMatchers = [
    /(?<=[码][:：])[0-9a-z]{4}\b/,
    /(?<=[-_0-9a-zA-Z]{16,}\s+)[0-9a-z{4}]{4}\b/,
    /\b[0-9a-z{4}]{4}\b/,
  ]

  for (const [ i, info ] of urlWIthPos.entries()) {
    // Match one secret between two url matches.
    let secretRangeEnd = text.length
    if (i < urlWIthPos.length - 1) {
      secretRangeEnd = urlWIthPos[i + 1].pos
    }
    const secretText = text.substring(info.pos, secretRangeEnd)

    let secret = ''
    let secretMatch
    for (const secretMatcher of secretMatchers) {
      if ((secretMatch = secretMatcher.exec(secretText)) !== null) {
        secret = secretMatch[0]
        break
      }
    }

    links.push({ url: info.url, secret: secret })
  }

  return links
}

export default matcher
