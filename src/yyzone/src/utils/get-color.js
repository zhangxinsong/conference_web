import md5 from './md5';
const defineColors = [
    '#709fff',
    '#1594ff',
    '#ffa92f',
    '#b587fa',
    '#06cf86',
    '#fa6771',
    '#73d51c',
    '#8991ff'
];
export default function (str) {
    str = str || '';
    let char = md5(str).charAt(0).toLowerCase();
    let color = defineColors['abcdefghijklmnopqrstuvwxyz0123456789'.indexOf(char) % defineColors.length];
    return color;
}
