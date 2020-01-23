import getBaiduPanInfo from './getBaiduPanInfo';

chrome.contextMenus.create({
  title: 'Try to get the share link and secret',
  contexts: ['selection'],
  onclick: (info, tab) => {
    let baiduPanInfo = getBaiduPanInfo(info.selectionText as string);
    if (baiduPanInfo !== null) {
      chrome.tabs.create({ url: baiduPanInfo.url + '#' + baiduPanInfo.secret });
    } else {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '',
        title: 'Failed to detect share links',
        message: '',
      });
    }
  },
});
