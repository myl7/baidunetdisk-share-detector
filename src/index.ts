import matchForBaiduNetdisk from './matchers/matchForBaiduNetdisk';

chrome.contextMenus.create({
  title: 'Try to get the share link and secret',
  contexts: ['selection'],
  onclick: (info, tab) => {
    let baiduNetdiskInfo = matchForBaiduNetdisk(info.selectionText as string);
    if (baiduNetdiskInfo !== null) {
      chrome.tabs.create({ url: baiduNetdiskInfo.url + '#' + baiduNetdiskInfo.secret });
    } else {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '/icon_60x60.png',
        title: 'Failed to detect share links',
        message: '',
      });
    }
  },
});
