/**
 * Created by LXH on 2017/11/1.
 */
import Vuex from 'vuex'
export const common = {
    /* 修改当前页面的title值 */
    pageTitle: function (str) {
        if (typeof document != "undefined") {
            document.title = str;
        }
    },
    /* 验证类弹框n秒后自动关闭 */
    autoCloseModal: function (obj, mess, typeNo) {
        let that = obj
        that.msg = {
            text: mess,
            type: typeNo
        };
        setTimeout(function () {
            that.msg.type = 0;
        }, 2000)
    },
    /* 根据code获取授权地址 */
    getInfoByCode: function (that, url, code, path) {
        axios.get(url, {code: code}).then(function (res) {
            // console.log(res)
            var infoId = res.data.serinfoid;
            var WGT = res.data.WGT;
            if (!infoId) {
                that.$router.push(path)
            } else if (!WGT) {
                that.$router.push(window.fromPath)
            }
        });
    },
    /* 转换时间戳为时间 */
    getFormatOfDate: function (date, format) {
        var that = new Date(date * 1);
        // console.log(that)
        var date = {
            "M+": that.getMonth() + 1,
            "d+": that.getDate(),
            "h+": that.getHours() < 10 ? '0' + that.getHours() : that.getHours(),
            "m+": that.getMinutes() < 10 ? '0' + that.getMinutes() : that.getMinutes(),
            "s+": that.getSeconds() < 10 ? '0' + that.getSeconds() : that.getSeconds(),
            "q+": Math.floor((that.getMonth() + 3) / 3),
            "S+": that.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },
    /* 价格转换分为元 */
    getFormatOfPrice: function (fen) {
        var yuan;
        yuan = parseFloat(parseInt(fen) / 100).toFixed(2);
        return yuan;
    },
    getTimer: function (timesamp) {  /* 倒计时 */
        var ts = (new Date(timesamp * 1)) - (new Date());//计算剩余的毫秒数
        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
        dd = this.checkTime(dd);
        hh = this.checkTime(hh);
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);
        return {
            dd: dd,
            hh: hh,
            mm: mm,
            ss: ss
        }
    },
    checkTime: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    getRedirectPath: function (that) { //获得来的路径
        let token = localStorage.token;
        localStorage.redirectUrl = window.location.href
        //console.log(that.$route);
        if (typeof token != 'undefined' && token.trim().length > 0) { //情况一：存在token
            return 1;
        } else { //情况二：不存在token
            that.$store.state.toolBox.redirect_uri.name = that.$route.name;
            that.$store.state.toolBox.redirect_uri.params = that.$route.params;
            return 0;
        }
    },
    onMove: function (value) {
        let overscroll = function (el) {
       
            el.addEventListener('touchstart', function () {
                let top = el.scrollTop
                    , totalScroll = el.scrollHeight
                    , currentScroll = top + el.offsetHeight;
                if (top === 0) {
                    el.scrollTop = 1
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1
                }
            });
            el.addEventListener('touchmove', function (evt) {
                if (el.offsetHeight < el.scrollHeight)
                    evt._isScroller = true
            })
        };
        overscroll(document.querySelector(value));
        document.body.addEventListener('touchmove', function (evt) {
            if (!evt._isScroller) {
                evt.preventDefault()
            }
        })
    },
    onMove2: function (valeu) {
        let overscroll = function (el) {
            el.addEventListener('touchstart', function () {
                let top = el.scrollLeft
                    , totalScroll = el.scrollWidth
                    , currentScroll = top + el.offsetWidth;
                if (top === 0) {
                    el.scrollTop = 1
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1
                }
            });
            el.addEventListener('touchmove', function (evt) {
                if (el.offsetWidth < el.scrollWidth)
                    evt._isScroller = true
            })
        };
        overscroll(document.querySelector(valeu));
        document.body.addEventListener('touchmove', function (evt) {
            if (!evt._isScroller) {
                evt.preventDefault()
            }
        })
    },
    /*token解析*/
    packageUserInfo (info) {
        let that = this
        let Base64 = require('js-base64').Base64;
        let obj = eval('('+ Base64.decode(info) +')');
        return obj
    },
    //转换数字加逗号
    format_number(n){
        let b=parseInt(n).toString();
        let len=b.length;
        if(len<=3){return b;}
        let r=len%3;
        return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
    },
}





export default {common}