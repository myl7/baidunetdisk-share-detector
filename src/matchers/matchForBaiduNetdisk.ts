export interface BaiduNetdiskInfo {
  url: string;
  secret: string;
}

interface LinkMatcher {
  regExp: RegExp;
  complete: (matchedStr: string) => string;
}

type SecretMatcher = RegExp;

const matchForBaiduNetdisk = (text: string): BaiduNetdiskInfo | null => {
  const emojiFilters = [
    /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g,
    / ?#\([\u4e00-\u9fa5]+\) ?/g,
  ];

  for (let emojiFilter of emojiFilters) {
    text = text.replace(emojiFilter, '');
  }

  let url: string | null = null;

  const linkMatchers: LinkMatcher[] = [
    {
      regExp: /s\/[-_0-9a-zA-Z]+/,
      complete: (matchedStr) => 'https://pan.baidu.com/' + matchedStr,
    },
    {
      regExp: /s\/[-_0-9a-zA-Z]+/,
      complete: (matchedStr) => matchedStr,
    },
  ];

  for (let linkMatcher of linkMatchers) {
    let linkMatch = linkMatcher.regExp.exec(text);
    if (linkMatch !== null) {
      url = linkMatcher.complete(linkMatch[0]);
      break;
    }
  }

  if (url === null) {
    return null;
  }

  let secret: string = '';

  const secretMatchers: SecretMatcher[] = [
    /(?:[码][:：])[0-9a-z]{4}\b/,
    /(?:[-_0-9a-zA-Z]{16,}\s+)[0-9a-z{4}]{4}\b/,
    /\b[0-9a-z{4}]{4}\b/,
  ];

  for (let secretMatcher of secretMatchers) {
    let secretMatch = secretMatcher.exec(text);
    if (secretMatch !== null) {
      secret = secretMatch[0];
      break;
    }
  }

  return { url: url, secret: secret };
};

export default matchForBaiduNetdisk;
