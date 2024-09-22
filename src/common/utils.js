let utils = {
    isEquaalJson(a, b) {
        // https://blog.csdn.net/weixin_55633731/article/details/119257453
        console.log(a, b);
        if (typeof a == typeof b) {
            // 判断Object
            if (typeof a == 'object') {
                for (let i = 0; i < a.length; i++) {
                    console.log("object");
                    if (!this.isEquaalJson(a[i], b[i])) {
                        console.log("object错误");
                        return false
                    }
                }
            }
            // 判断数组
            if (Array.isArray(a)) {
                a.map((item, index) => {
                    console.log("Array");
                    if (!this.isEquaalJson(a[index], b[index])) {
                        console.log("Arr错误");
                        return false
                    }
                })
            }
            // 判断内容
            if (a != b) {
                console.log("内容错误");
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    },
    // 加密
    utf8_encode(r) {
        r = r.replace(/\r\n/g, "\n");
        var e = ""
        for (var t = 0; t < r.length; t++) {
            var n = r.charCodeAt(t)
            n < 128 ?
                (e += String.fromCharCode(n)) :
                n > 127 && n < 2048 ?
                    ((e += String.fromCharCode((n >> 6) | 192)),
                        (e += String.fromCharCode((63 & n) | 128))) :
                    ((e += String.fromCharCode((n >> 12) | 224)),
                        (e += String.fromCharCode(((n >> 6) & 63) | 128)),
                        (e += String.fromCharCode((63 & n) | 128)));
        }
        return e;
    },
    // 解密
    utf8_decode(utftext) {
        var string = '';
        var i = 0;
        var c, c2, c3;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1)
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string
    },
    // base64加密
    encode(r) {
        var e, t, n, o, a, i, c, f = '', u = 0;
        var _keyStr = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        for (r = this.utf8_encode(r); u < r.length;)
            (o = (e = r.charCodeAt(u++)) >> 2),
                (a = ((3 & e) << 4) | ((t = r.charCodeAt(u++)) >> 4)),
                (i = ((15 & t) << 2) | ((n = r.charCodeAt(u++)) >> 6)),
                (c = 63 & n),
                isNaN(t) ? (i = c = 64) : isNaN(n) && (c = 64),
                (f =
                    f + _keyStr.charAt(o) +
                    _keyStr.charAt(a) +
                    _keyStr.charAt(i) +
                    _keyStr.charAt(c))

        return f;
    },
    // base64解密
    base64decode(input) {
        var _keyStr = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
            output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        if (!input) return input;
        input = input.replace(/[^A-Za-z0-9+/=]/g, '');
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8_decode(output);
        return output
    },
    // 转金额为中文
    moneyUp(n) {
        console.log("n:", n);

        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
            return ''
        }
        console.log("n2:", n);
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠' : '';
        var a = n.split('.')[1] || '';
        n = Math.abs(n);
        var s = '';
        if (a) {
            for (var i = 0; i < fraction.length; i++) {
                if (a[i]) {
                    s += (digit[Math.abs(a[i])] + fraction[i]).replace(/零./, '')
                }
            }
        }
        s = s || '整'
        n = Math.floor(n);

        for (var k = 0; k < unit[0].length && n > 0; k++) {
            var p = ''
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][k] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    // 金额千分制
    regMoneyAndDou(money) {
        if (money == '0' || !money) {
            return '0'
        }
        money = money.toString()
        var source = money.replace(/,/g, '').split('.');
        source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
        if (source[1]) {
            money = source[0] + '.' + source[1];
        } else {
            money = source[0];
        }
        return money
    },
    // 获取url后面的参数
    getUrlParameter(param) {
        let reg = new RegExp('[&,?,&amp;]' + param + '=([^\\&]*)', 'i')
        let hrefStr = location.search || location.hash;
        console.log("hrefStr:", hrefStr)
        hrefStr = decodeURIComponent(decodeURIComponent(hrefStr));
        let value = reg.exec(hrefStr);
        return value ? value[1] : ''
    }
}

export default utils