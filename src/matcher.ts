const matcher = (text: string): {
  url: string;
  secret: string;
} | null => {
  const emojiFilters = [
    /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g,
    / ?#\([\u4e00-\u9fa5]+\) ?/g,
  ]

  for (let emojiFilter of emojiFilters) {
    text = text.replace(emojiFilter, '')
  }

  let url: string | null = null

  const linkMatchers: {
    regExp: RegExp;
    complete: (matchedStr: string) => string;
  }[] = [
    {
      regExp: /s\/[-_0-9a-zA-Z]+/,
      complete: (matchedStr) => 'https://pan.baidu.com/' + matchedStr,
    },
    {
      regExp: /\/[-_0-9a-zA-Z]+/,
      complete: (matchedStr) => 'https://pan.baidu.com/s' + matchedStr,
    },
  ]

  for (let linkMatcher of linkMatchers) {
    let linkMatch = linkMatcher.regExp.exec(text)
    if (linkMatch !== null) {
      url = linkMatcher.complete(linkMatch[0])
      break
    }
  }

  if (url === null) {
    return null
  }

  let secret: string = ''

  const secretMatchers: RegExp[] = [
    /(?<=[码][:：])[0-9a-z]{4}\b/,
    /(?<=[-_0-9a-zA-Z]{16,}\s+)[0-9a-z{4}]{4}\b/,
    /\b[0-9a-z{4}]{4}\b/,
  ]

  for (let secretMatcher of secretMatchers) {
    let secretMatch = secretMatcher.exec(text)
    if (secretMatch !== null) {
      secret = secretMatch[0]
      break
    }
  }

  return { url: url, secret: secret }
}

export default matcher
