import matcher from './matcher'

chrome.contextMenus.create({
  title: '探测百度云分享链接',
  contexts: [ 'selection' ],
  onclick: (info, _tab) => {
    let links = matcher(info.selectionText as string)

    if (links.length == 0) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '/icon_60x60.png',
        title: '探测失败',
        message: '未探测到百度云分享链接！',
      })
    } else {
      for (const link of links) {
        chrome.tabs.create({ url: link.url + '#secret=' + link.secret })
      }
    }
  },
})
