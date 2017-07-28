// ==UserScript==
// @name        百度/谷歌首页调用bing壁纸
// @namespace    https://github.com/jiashende/BingWallpapers
// @version      0.1
// @description  完全不懂JS的我直接修改了darkz的JS
// @author       jiashen
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant        unsafeWindow
// @connect      global.bing.com
// @connect      www.bing.com
// @connect      cn.bing.com
// @include      *://www.baidu.com/
// @include      *://www.baidu.com/home*
// @include      *://www.baidu.com/?tn=
// @include      *://www.baidu.com/index.php*
// @include      *://www.google.com/
// @include      *://www.google.com.hk/
// @include      *://www.google.com/webhp?hl=*

// ==/UserScript==

(function() {
    'use strict';
    //GM_log('就是测试下输出呀，需要提前在前面增加grant');
    // Your code here...
    var idx=Math.floor(Math.random()*5);
    var url="http://www.bing.com/HPImageArchive.aspx?format=js&idx="+idx+"&n=1&mkt=en-US";
    GM_log('随机壁纸');

    GM_xmlhttpRequest({

        method: "GET",
        url: url,
        onload: function(response) {

            GM_log('bing bg idx is ' +idx);
            var jsonData = null;
            try {
                jsonData = JSON.parse(response.responseText);
                var bgUrl=jsonData.images[0].url;
                if(!/^https?:\/\//.test(bgUrl)){
                    bgUrl="http://cn.bing.com"+bgUrl;
                }
                GM_log('bing bg image url is ' +bgUrl);
                var newHTML         = document.createElement ('div');
                newHTML.innerHTML   = '<div id="cpBackgroundDiv" style="position: fixed;top: 0%;left: 0%; width: 100%;height: 100%;z-index: -1; visibility: visible;"><img id="cpBackgroundImg" src="'+bgUrl+'" style="width: 100%;height: 100%;"></div>';
                document.body.appendChild (newHTML);

            }catch (e) {
                console.log(e);
            }

        }
    });

})();
