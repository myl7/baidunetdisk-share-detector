import matcher from './matcher';

it('regular copied share text', () => {
  expect(
    matcher(
      '链接:https://pan.baidu.com/s/1cIhV2wBM4o04RGfQlijERg 提取码:1234 ' +
      '复制这段内容后打开百度网盘手机App，操作更方便哦',
    ),
  ).toEqual({
    url: 'https://pan.baidu.com/s/1cIhV2wBM4o04RGfQlijERg',
    secret: '1234',
  });
});

it('simplified share text', () => {
  expect(matcher('s/1cIhV2wBM4o04RGfQl-_ERg 码：1234')).toEqual({
    url: 'https://pan.baidu.com/s/1cIhV2wBM4o04RGfQl-_ERg',
    secret: '1234',
  });
});

it('weird share text', () => {
  expect(matcher('/1cIhV2wBM4o04RGfQl-_ERg 1234')).toEqual({
    url: 'https://pan.baidu.com/s/1cIhV2wBM4o04RGfQl-_ERg',
    secret: '1234',
  });
});

it('share text with emoji', () => {
  expect(
    matcher(
      '链接:https:// #(大笑) pan.baidu.com/s/1cIh#(幸灾乐祸)V2wBM4o #(高兴) 04RGfQlijERg 提取码:1234',
    ),
  ).toEqual({
    url: 'https://pan.baidu.com/s/1cIhV2wBM4o04RGfQlijERg',
    secret: '1234',
  });
});
