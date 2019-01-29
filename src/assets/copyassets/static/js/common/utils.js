
// getQuery 获取浏览器地址栏search后的参数
function getQuery(name) {
    String.prototype.getQuery = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = this.substr(this.indexOf("\?") + 1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    return window.location.href.getQuery(name);
}

function getColor(str) { // 获取颜色
    if (str) {
        let name = hex_md5(str).substr(0, 1);
        switch (name) {
            case 'a':
                return '#e4615c';
            case 'b':
                return '#00c7e6';
            case 'c':
                return '#00e6cd';
            case 'd':
                return '#ffc400';
            case 'e':
                return '#8777d9';

            case 'f':
                return '#e4615c';
            case 'g':
                return '#00c7e6';
            case 'h':
                return '#88d27c';
            case 'i':
                return '#ffbd3f';
            case 'j':
                return '#8777d9';

            case 'k':
                return '#e4615c';
            case 'l':
                return '#00c7e6';
            case 'm':
                return '#88d27c';
            case 'n':
                return '#ffbd3f';
            case 'o':
                return '#8777d9';

            case 'p':
                return '#e4615c';
            case 'q':
                return '#00c7e6';
            case 'r':
                return '#88d27c';
            case 's':
                return '#ffbd3f';
            case 't':
                return '#8777d9';

            case 'u':
                return '#e4615c';
            case 'v':
                return '#00c7e6';
            case 'w':
                return '#88d27c';
            case 'x':
                return '#ffbd3f';
            case 'y':
                return '#8777d9';
            case 'z':
                return '#e4615c';

            case '0':
                return '#00c7e6';
            case '1':
                return '#88d27c';
            case '2':
                return '#ffbd3f';
            case '3':
                return '#8777d9';
            case '4':
                return '#e4615c';
            case '5':
                return '#00c7e6';
            case '6':
                return '#88d27c';
            case '7':
                return '#ffbd3f';
            case '8':
                return '#8777d9';
            case '9':
                return '#fa4f52';

            case '#':
            default:
                return '#00c7e6';
        }
    }
}
