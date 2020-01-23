export interface BaiduPanInfo {
  url: string;
  secret: string;
}

const urlMatcher = /https:\/\/pan\.baidu\.com\/s\/[-0-9a-zA-Z]+/;
const secretMatcher = /\b[0-9a-z]{4}\b/;

const getBaiduPanInfo = (text: string): BaiduPanInfo | null => {
  let urlMatch = urlMatcher.exec(text);
  let url = urlMatch ? urlMatch[0] : null;
  if (url === null) {
    return null;
  }
  let secretMatch = secretMatcher.exec(text);
  let secret = secretMatch ? secretMatch[0] : null;
  if (secret === null) {
    secret = '';
  }
  return { url: url, secret: secret };
};

export default getBaiduPanInfo;
