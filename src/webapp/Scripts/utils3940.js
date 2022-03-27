(function (window) {
    'use strict'
    if (!window.Utils) {
        window.Utils = {};
    }

    window.Utils.response = function (callback, datas) {
        if (callback && {}.toString.call(callback) === '[object Function]')
            callback(datas);
    };

    Utils.loaderStyle = function (styleUrl) {
        return new Promise(function (res, rej) {
            let style = document.createElement('link');
            style.href = styleUrl;
            style.type = 'text/css';
            style.rel = 'stylesheet';
            style.onError = rej;
            style.onload = res;
            style.addEventListener('error', rej);
            style.addEventListener('load', res);
            document.head.appendChild(style);
        })
    };

    Utils.loaderScript = function (scriptUrl) {
        return new Promise(function (res, rej) {
            let script = document.createElement('script');
            script.src = scriptUrl;
            script.type = 'text/javascript';
            script.onError = rej;
            script.defer = true;
            script.async = true;
            script.onload = res;
            script.addEventListener('error', rej);
            script.addEventListener('load', res);
            document.head.appendChild(script);
        })
    };

    Utils.downloadFiles = function (url) {
        if (document.getElementById('iframeDownloadFiles')) {
            document.getElementById('iframeDownloadFiles').src = url;
        } else {
            var iframe = document.createElement('iframe');
            iframe.id = 'iframeDownloadFiles';
            // iframe.allow = "geolocation;camera;microphone";
            iframe.style = 'display:none;';
            iframe.loading = 'lazy'
            iframe.referrerpolicy = 'same-origin'
            var firstScriptTag = document.getElementsByTagName('body')[0];
            firstScriptTag.parentNode.insertBefore(iframe, firstScriptTag)
            setTimeout(function () {
                Utils.downloadFiles(url);
            }, 500);
        }
    };

    Utils.isMobile = function () {
        // credit to Timothy Huang for this regex test:
        // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
        } else {
            return false
        }
    };

    Utils.Cookie = {
        set: function (cname, cvalue, exdays, samesite) {
            if (!exdays) exdays = 1;
            if (!samesite) samesite = 'none';

            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();

            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";samesite=" + samesite + ";" + (location.protocol == 'https:' ? 'secure;' : '');
        },
        get: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
    };

    Utils.LocalStorage = {
        set: function (key, value) {
            if (typeof value === 'string')
                window.localStorage.setItem(key, value);
            else
                window.localStorage.setItem(key, JSON.stringify(value));
        },
        setExpiry: function (key, value, ttl = -1) {
            // flow https://www.sohamkamani.com/74ac1b89d3272a1f2dc10b8e731db720/set.svg

            var now = new Date()
            if (ttl == -1) {
                ttl = 365 * 24 * 60 * 60 * 1000 // 1 year
            }

            // `item` is an object which contains the original value
            // as well as the time when it's supposed to expire
            var item = {
                value: value,
                expiresAt: now.getTime() + ttl,
            }

            window.localStorage.setItem(key, JSON.stringify(item));
        },
        get: function (key) {
            return window.localStorage.getItem(key);
        },
        getExpiry: function (key) {
            // flow https://www.sohamkamani.com/da412e86f498ee37bde6bc79654b0019/get.svg
            var itemStr = window.localStorage.getItem(key);

            // if the item doesn't exist, return null
            if (!itemStr) {
                return null
            }

            var item = JSON.parse(itemStr)
            var now = new Date()

            if (typeof item.expiresAt !== undefined) {
                // compare the expiry time of the item with the current time
                if (now.getTime() > item.expiresAt) {
                    // If the item is expired, delete the item from storage
                    // and return null
                    window.localStorage.removeItem(key)
                    return null
                }
                return item.value
            } else {
                return itemStr
            }
        },
        remove: function (key) {
            return window.localStorage.removeItem(key);
        },
    };

    Utils.SessionStorage = {
        set: function (key, value) {
            if (typeof value === 'string')
                window.sessionStorage.setItem(key, value);
            else
                window.sessionStorage.setItem(key, JSON.stringify(value));
        },
        setExpiry: function (key, value, ttl = -1) {
            // flow https://www.sohamkamani.com/74ac1b89d3272a1f2dc10b8e731db720/set.svg

            var now = new Date()
            if (ttl == -1) {
                ttl = 365 * 24 * 60 * 60 * 1000 // 1 year
            }

            // `item` is an object which contains the original value
            // as well as the time when it's supposed to expire
            var item = {
                value: value,
                expiresAt: now.getTime() + ttl,
            }

            window.sessionStorage.setItem(key, JSON.stringify(item));
        },
        get: function (key) {
            return window.sessionStorage.getItem(key);
        },
        getExpiry: function (key) {
            // flow https://www.sohamkamani.com/da412e86f498ee37bde6bc79654b0019/get.svg
            var itemStr = window.sessionStorage.getItem(key);

            // if the item doesn't exist, return null
            if (!itemStr) {
                return null
            }

            var item = JSON.parse(itemStr)
            var now = new Date()

            if (typeof item.expiresAt !== undefined) {
                // compare the expiry time of the item with the current time
                if (now.getTime() > item.expiresAt) {
                    // If the item is expired, delete the item from storage
                    // and return null
                    window.sessionStorage.removeItem(key)
                    return null
                }
                return item.value
            } else {
                return itemStr
            }
        },
        remove: function (key) {
            return window.sessionStorage.removeItem(key);
        },
    };

    Utils.Validate = {
        setInputFilter: function (textbox, inputFilter) {
            ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
                if (textbox) {
                    textbox.addEventListener(event, function () {
                        if (inputFilter(this.value)) {
                            this.oldValue = this.value;
                            this.oldSelectionStart = this.selectionStart;
                            this.oldSelectionEnd = this.selectionEnd;
                        } else if (this.hasOwnProperty("oldValue")) {
                            this.value = this.oldValue;
                            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                        } else {
                            this.value = "";
                        }
                    });
                }
            });
        },
    };

    Utils.Phone = {
        format: function (text) {
            try {
                var phone = text;
                phone = phone.replace(/\D/g, '');

                return phone;
            } catch (e) {
                return text;
            }
        },
        validate: function (text) {
            return Utils.Phone.isMobiphone(text)
                || Utils.Phone.isGmobile(text)
                || Utils.Phone.isIteltelecom(text)
                || Utils.Phone.isVietnammobile(text)
                || Utils.Phone.isViettel(text)
                || Utils.Phone.isVinaphone(text)
                || Utils.Phone.isSfone(text);
        },
        isMobiphone: function (phone) {
            var regex = /^(0120|0121|0122|0126|0128)+\d{7}$|^(84120|84121|84122|84126|84128)+\d{7}$|^(090|093|089|070|079|077|076|078)+\d{7}$|^(8490|8493|8489|8470|8479|8477|8476|8478)+\d{7}$/ig
            return regex.test(phone);
        },
        isIteltelecom: function (phone) {
            var regex = /^(087)+\d{7}$|^(8487)+\d{7}$/ig
            return regex.test(phone);
        },
        isViettel: function (phone) {
            var regex = /^(0162|0163|0164|0165|0166|0167|0168|0169)+\d{7}$|^(84162|84163|84164|84165|84166|84167|84168|84169)+\d{7}$|^(096|097|098|086|032|033|034|035|036|037|038|039)+\d{7}$|^(8496|8497|8498|8486|8432|8433|8434|8435|8436|8437|8438|8439)+\d{7}$/ig
            return regex.test(phone);
        },
        isVinaphone: function (phone) {
            var regex = /^(0123|0124|0125|0127|0129)+\d{7}$|^(84123|84124|84125|84127|84129)+\d{7}$|^(091|094|088|083|084|085|081|082)+\d{7}$|^(8491|8494|8488|8483|8484|8485|8481|8482)+\d{7}$/ig
            return regex.test(phone);
        },
        isVietnammobile: function (phone) {
            var regex = /^(0188|0186|0189)+\d{7}$|^(84188|84186|84189)+\d{7}$|^(092|056|058|052)+\d{7}$|^(8492|8456|8458|8452)+\d{7}$/ig
            return regex.test(phone);
        },
        isGmobile: function (phone) {
            var regex = /^(0199)+\d{7}$|^(84199)+\d{7}$|^(099|059)+\d{7}$|^(8499|8459)+\d{7}$/ig
            return regex.test(phone);
        },
        isSfone: function (phone) {
            var regex = /^(0950|0951|0952|0953|0954|0955|0956)+\d{6}$|^(84950|84951|84952|84953|84954|84955|84956)+\d{6}$/ig
            return regex.test(phone);
        },
    }

    Utils.Notify = {
        showJGrowl: function (message, header, life, sticky, closer, beforeOpenCallback, openCallback, afterOpenCallback, clickCallback, closeCallback, beforeCloseCallback, logCallback) {
            try {
                if (!header) header = "Xé Ngay Trúng Liền";
            } catch (error) {
                if (!header) header = "Xé Ngay Trúng Liền";
            }
            if (!life) life = "3000";
            if (!sticky) sticky = false;
            if (!closer) closer = false;

            $.jGrowl(message, {
                header: '<h2 style="font-size: 2vw; padding-bottom: 3vh;">' + (header ? header : 'Xé Ngay Trúng Liền') + '</h2>',
                life: life ? life : 3000,
                sticky: sticky ? sticky : false,
                closer: closer ? closer : true,
                beforeOpen: function (e, m, o) {
                    /**
                     * Callback to be used before a new notification is opened.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    if (beforeOpenCallback && {}.toString.call(beforeOpenCallback) === '[object Function]') {
                        beforeOpenCallback(e, m, o);
                    }
                },
                open: function (e, m, o) {
                    /**Callback to be used when a new notification is opened.
                     * This callback receives the notification's DOM context, the notifications message and its option object.
                     */
                    if (openCallback && {}.toString.call(openCallback) === '[object Function]') {
                        openCallback(e, m, o);
                    }
                },
                afterOpen: function (e, m, o) {
                    /**
                     * Callback to be used after a new notification is opened.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    if (afterOpenCallback && {}.toString.call(afterOpenCallback) === '[object Function]') {
                        afterOpenCallback(e, m, o);
                    }
                },
                click: function (e, m, o) {
                    /**
                     * Callback to be used when a notification is clicked.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    if (clickCallback && {}.toString.call(clickCallback) === '[object Function]') {
                        clickCallback(e, m, o);
                    }
                },
                close: function (e, m, o) {
                    /**
                     * Callback to be used when a new notification is closed.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    if (closeCallback && {}.toString.call(closeCallback) === '[object Function]') {
                        closeCallback(e, m, o);
                    }
                },
                beforeClose: function (e, m, o) {
                    /**
                     * Callback to be used before a new notification is closed.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    if (beforeCloseCallback && {}.toString.call(beforeCloseCallback) === '[object Function]') {
                        beforeCloseCallback(e, m, o);
                    }
                },
                log: function (e, m, o) {
                    /**
                     * Callback to be used before anything is done with the notification.
                     * This is intended to be used if the user would like to have some type of logging mechanism for all notifications passed to jGrowl.
                     * This callback receives the notification's DOM context, the notification's message and its option object.
                     */
                    //$('#logs').append("<div><strong>#" + $(e).attr('id') + "</strong> <em>" + (new Date()).getTime() + "</em>: " + m + " (" + o.theme + ")</div>")
                    console.log("<div><strong>#" + $(e).attr('id') + "</strong> <em>" + (new Date()).getTime() + "</em>: " + m + " (" + o.theme + ")</div>")
                    if (logCallback && {}.toString.call(logCallback) === '[object Function]') {
                        logCallback(e, m, o);
                    }
                },
                animateOpen: {
                    height: "show",
                    width: "show"
                },
                animateClose: {
                    height: "hide",
                    width: "show"
                }
            });
        },
        swalFire: function (params, callback) {
            if (!params) params = {};
            if (!params.header) params.header = "Xé Ngay Trúng Liền";
            if (!params.title) params.title = '<h2>' + params.header + '</h2>';
            //if (!params.icon) params.icon = 'info';
            if (params.allowOutsideClick === undefined) params.allowOutsideClick = false;

            var width = '100%';
            if (screen.availWidth >= 768)
                width = '70%';
            if (screen.availWidth >= 1044)
                width = '60%';
            if (screen.availWidth >= 1920)
                width = '50%';
            if (!params.width) params.width = width;

            Swal.fire(params).then(function (result) {
                Utils.response(callback, result)
            });
        },
        customTHP: function (message, addClass, callback) {
            //$('.popup-wrapper, .popup, #popupNotification').show();
            $('.popup-wrapper, #popupNotification').show();
            $('#popupNotificationContent').html(message);
            if (addClass) {
                if (Array.isArray(addClass)) {
                    for (var idx = 0; idx < addClass.length; idx++) {
                        $('#popupNotification').addClass(addClass[i]);
                    }
                } else {
                    $('#popupNotification').addClass(addClass);
                }
            }
            Utils.response(callback, {});
        },
        minigameDoubleAward: function (price, code, addClass, callback) {
            $('.popup-wrapper, #popupMinigameDoubleAward').show();
            $('#lblMinigameDblAwPrice').html(price);
            $('#lblMinigameDblAwCode').html(code);
            if (addClass) {
                if (Array.isArray(addClass)) {
                    for (var idx = 0; idx < addClass.length; idx++) {
                        $('#popupMinigameDoubleAward').addClass(addClass[i]);
                    }
                } else {
                    $('#popupMinigameDoubleAward').addClass(addClass);
                }
            }
            Utils.response(callback, {});
        },
        endGameRewards: function (awardID, addClass, callback) {
            var version = localStorage.getItem('thp_ver') || '1.0.0';
            var width = parseInt(screen.availWidth || 0);
            $('.popup-wrapper, #popupEndGameRewards').show();

            console.log(width);
            var content = '';
            var advertisingMessageImages = '';
            if (awardID == 1) {
                if (width < 1400) {
                    content = 'Chúc mừng bạn đã được nạp 500.000 VND từ chương trình Xé Ngay Trúng Liền';
                } else {
                    content = 'Chúc mừng bạn đã được nạp 500.000 VND từ chương trình<br/>Xé Ngay Trúng Liền';
                }

                advertisingMessageImages = '<img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-none d-xl-block" loading="lazy" style="width: 60%;"> <img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-xl-none" loading="lazy" style="width: 60%;">';
            } else if (awardID == 2) {
                if (width < 1400) {
                    content = 'Chúc mừng bạn đã được nạp 50.000 VND từ chương trình Xé Ngay Trúng Liền';
                } else {
                    content = 'Chúc mừng bạn đã được nạp 50.000 VND từ chương trình<br/>Xé Ngay Trúng Liền';
                }

                advertisingMessageImages = '<img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-none d-xl-block" loading="lazy" style="width: 60%;"> <img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-xl-none" loading="lazy" style="width: 60%;">';
            } else if (awardID == 3) {
                if (width < 1400) {
                    content = 'Chúc mừng bạn đã được nạp 20.000 VND từ chương trình Xé Ngay Trúng Liền';
                } else {
                    content = 'Chúc mừng bạn đã được nạp 20.000 VND từ chương trình<br/>Xé Ngay Trúng Liền';
                }

                advertisingMessageImages = '<img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-none d-xl-block" loading="lazy" style="width: 60%;"> <img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-xl-none" loading="lazy" style="width: 60%;">';
            } else if (awardID == 4) {
                if (width < 1400) {
                    content = 'Chúc mừng bạn đã được nạp 10.000 VND từ chương trình Xé Ngay Trúng Liền';
                } else {
                    content = 'Chúc mừng bạn đã được nạp 10.000 VND từ chương trình<br/>Xé Ngay Trúng Liền';
                }

                advertisingMessageImages = '<img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-none d-xl-block" loading="lazy" style="width: 60%;"> <img src="/assets/minigame/ty-phu/img/trung-roi-muon-trung-nua-tiep-tuc-xe-nhan-con-rat-nhieu-tien.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-xl-none" loading="lazy" style="width: 60%;">';
            } else {
                content = 'Lần này bạn chưa may mắn rồi. Nhưng vẫn còn rất nhiều giải thưởng hấp dẫn đang chờ bạn';
                advertisingMessageImages = '<img src="/assets/minigame/ty-phu/img/con-1.2-ty,-con-100-trieu-va-rat-nhieu-tien-tiep-tuc-xe-nhan.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-none d-xl-block" loading="lazy" style="width: 60%;"> <img src="/assets/minigame/ty-phu/img/con-1.2-ty,-con-100-trieu-va-rat-nhieu-tien-tiep-tuc-xe-nhan.png?v=' + version + '" alt="Xé ngay trúng liền" class="col-sm-6 d-xl-none" loading="lazy" style="width: 60%;">';
            }

            $('#txtMinigameAward').html(content);
            $('#divAdvertisingMessageImages').html(advertisingMessageImages);
            if (addClass) {
                if (Array.isArray(addClass)) {
                    for (var idx = 0; idx < addClass.length; idx++) {
                        $('#popupEndGameRewards').addClass(addClass[i]);
                    }
                } else {
                    $('#popupEndGameRewards').addClass(addClass);
                }
            }
            Utils.response(callback, {});
        },
    }

    //$(function () {
    //    console.log("ready!");
    //    window.eSMSSDK.Util.init(function (s) { console.log(s); })
    //});
})(window);
