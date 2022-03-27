$(document).ready(function () {
    var phone = Utils.LocalStorage.get('_phone');
    try {
        $('#txtPhone').val(phone);
    } catch (e) {
    }
    try {
        $('#txtPhoneWinner').val(phone);
    } catch (e) {
    }
    try {
        $('#txtPopupPhoneWinner').val(phone);
    } catch (e) {
    }

    //try {
    //    //set default spin
    //    wheel(1);
    //} catch (e) { }

    if (window.location.hash) {
        // Fragment exists
        if (window.location.hash === '#du-thuong') {
            setTimeout(function () {
                try {
                    //$("#btnCode").click();
                    enterCode();
                } catch (e) {
                }
            }, 500);
        }
    }
});

var isValidReCaptcha = false;
var isSpinWheel = false;
var setting = {
    award: {
        'G0K': [[1362, 1395]],
        'G10K': [[1084, 1118], [1243, 1278]],
        'G20K': [[1162, 1197], [1322, 1358]],
        'G50K': [[1123, 1159], [1282, 1318]],
        'G500K': [[1202, 1238], [1403, 1438]],
    },
    current: {
        award: {}
    },
    defaultWheel: 1375,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wheel(deg, callback) {
    console.log(deg)
    var wheel = $("#wheel"),
        active = $("#active"),
        myAudio = document.getElementById("myAudio"),
        currentRotation,
        lastRotation = 0,
        tolerance;

    //var myAudio = SpinAudio;

    var indicator = new TimelineMax();
    var spinWheel = new TimelineMax();
    indicator.to(active, .13, {rotation: -10, transformOrigin: "65% 36%", ease: Power1.easeOut})
        .to(active, .13, {rotation: 3, ease: Power4.easeOut})
        .add("end");

    if (!myAudio) {
        myAudio = document.getElementById("myAudio");
    }

    if (deg > 1) {
        try {
            myAudio.volume = 0.7;
            myAudio.play();
        } catch (e) {
            console.log(e);
        }
    }

    //  Luckywheel animation
    spinWheel.to(wheel, 5, {
        rotation: deg, transformOrigin: "50% 50%", ease: Power4.easeOut, onUpdate: (
            function () {
                currentRotation = Math.round(this.target[0]._gsTransform.rotation);    //_gsTransform: current position of the wheel
                tolerance = currentRotation - lastRotation;

                /*console.log("lastRot: " + lastRotation);
                console.log("currentRot: " + currentRotation);
                console.log("tol: " + tolerance);
                console.log(indicator.progress());
                console.log("spinwheelprogress: " + spinWheel.progress());*/

                if (Math.round(currentRotation) % (360 / 12) <= tolerance) {
                    if (indicator.progress() > .2 || indicator.progress() === 0) {
                        indicator.play(0);
                    }
                }
                lastRotation = currentRotation;
                if (currentRotation == deg) {
                    // toa do tuong doi chinh xac
                    if (deg > 1) {
                        try {
                            myAudio.pause();
                            myAudio.currentTime = 0;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                if (this.target[0]._gsTransform.rotation == deg) {
                    // toa do chinh xac
                    Utils.response(callback, {
                        deg: deg,
                        currentRotation: this.target[0]._gsTransform.rotation
                    });
                }
            }
        )
    });
    spinWheel.add("end");

    indicator.timeScale(1).seek(0);
    spinWheel.timeScale(1).seek(0);

    //indicator.timeScale(.2).seek(.5);
    //spinWheel.timeScale(.2).seek(.5);
}

function spinWheel(deg, callback) {
    isSpinWheel = true;
    try {
        if (TimelineMax) {
            wheel(1);
            setTimeout(function () {
                wheel(deg, function (respData) {
                    isSpinWheel = false;
                    Utils.response(callback, respData)
                });
            }, 300);
        } else {
            throw '';
        }
    } catch (e) {
        Utils.loaderScript("/cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js?v=1.0.1")
            .then(() => {
                console.log('TweenMax');
                wheel(1);
                setTimeout(function () {
                    wheel(deg, function (respData) {
                        isSpinWheel = false;
                        Utils.response(callback, respData)
                    });
                }, 300);
            })
            .catch(() => {
                console.log("error");
            });
    }
}

//var award = setting.award.G500K[getRandomInt(1, setting.award.G0K.length) - 1];
//console.log(award)
//wheel(getRandomInt(award[0], award[1]));

//wheel(1, (wheelResp) => {
//    console.log(wheelResp)
//    var award = setting.award.G500K[getRandomInt(1, setting.award.G0K.length) - 1];
//    console.log(award)
//    wheel(getRandomInt(award[0], award[1]), console.log);
//});

$('#btnShowSMSGuild').on('click', function (event) {
    event.preventDefault();
    Utils.Notify.customTHP('<h2>NHẬP M&#195; &lt;CODE&gt; GỬI VỀ 6020</h2>', 'notify-2');
    $('#popupNotificationTitle').addClass('hidden');
    //Swal.fire({
    //    //icon: 'info',
    //    //width: '50%',
    //    title: 'Xé Ngay Trúng Liền',
    //    html: '<span class="SFUFuturaHeavy">cách 1:</span> nhắn tin với cú pháp &lt;code&gt; gửi 6020',
    //    footer: ''
    //})
});

$('#btnAgree').on('click', function (event) {
    event.preventDefault();
    var btn = $(event.currentTarget)
    var btnHtml = btn.html()

    if (btn.attr('disabled') === 'disabled') {
        Utils.Notify.showJGrowl('Đang xử lý yêu cầu của bạn.<br />Vui lòng đợi trong giây lát!', '', 3000, '', '')
    } else {
        if (Utils.Phone.validate($('#txtPhone').val().trim())) {
            if (!grecaptcha.getResponse()) {
                // chua xac thuc
                grecaptcha.execute().then((r) => {
                    console.log(r);
                    btnAgreehandle((r1) => {
                        //btn.html(`<i class="fas fa-spinner fa-spin"></i> Đang xử lý`);
                        //btn.attr('disabled', true);
                        btn.html(btnHtml);
                        btn.attr('disabled', false);
                    });
                }).catch((r) => {
                    console.log(r);
                    //btn.html(`<i class="fas fa-spinner fa-spin"></i> Đang xử lý`);
                    //btn.attr('disabled', true);
                    btn.html(btnHtml);
                    btn.attr('disabled', false);
                })
            } else {
                // da xac thuc
                btnAgreehandle((r1) => {
                    //btn.html(`<i class="fas fa-spinner fa-spin"></i> Đang xử lý`);
                    //btn.attr('disabled', true);
                    btn.html(btnHtml);
                    btn.attr('disabled', false);
                });
            }
        } else {
            Utils.Notify.swalFire({
                icon: 'error',
                html: 'Số điện thoại bạn nhập không đúng định dạng.<br />Vui lòng kiểm tra và nhập lại đúng đinh dạng để dự thưởng',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
            }, function (cb) {
                btn.html(btnHtml);
                btn.attr('disabled', false);
            })
        }
    }
});

function btnAgreehandle(callback) {
    if (!isValidReCaptcha) {
        //Utils.Notify.showJGrowl('Vui lòng xác thực bạn không phải Robot và thử lại.', '', 3000, '', '')
        Utils.Notify.swalFire({
            icon: 'error',
            html: 'Vui lòng xác thực bạn không phải Robot và thử lại.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        });
    } else if ($('#txtPhone').val().trim() == null || $('#txtPhone').val().trim() == '') {
        //Utils.Notify.showJGrowl('Vui lòng nhập số điện thoại của bạn', '', 3000, '', '')
        Utils.Notify.swalFire({
            icon: 'error',
            html: 'Vui lòng nhập số điện thoại của bạn',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        });
    } else if ($('#txtCode').val().trim() == null || $('#txtCode').val().trim() == '') {
        //Utils.Notify.showJGrowl('Vui lòng nhập mã dự thưởng', '', 3000, '', '')
        Utils.Notify.swalFire({
            icon: 'error',
            html: 'Vui lòng nhập mã dự thưởng',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        });
    } else {
        //Utils.Notify.showJGrowl('Chương trình đang kiểm tra Mã dự thưởng của bạn.<br />Vui lòng một chút', '', 3000, '', '', function (beforeOpen) {
        //Utils.response(callback, {});
        //}, function (open) { }, function (afterOpen) {
        spinWheelWithCode(function (dataCallback) {
            //btn.html(btnHtml)
            //btn.attr('disabled', false)
            Utils.response(callback, {});
            var message = '';
            if (dataCallback.status == 1) {
                $('.popup-wrapper, .popup').hide();
                var code = $('#txtCode').val();
                $('#txtCode').val('');

                setting.current.award = dataCallback.award;
                spinWheel(getDegReward(dataCallback.award.AwardID), function (wheel) {
                    console.log(wheel)

                    if (Utils.isMobile()) {
                        Utils.Notify.swalFire({
                            html: dataCallback.message,
                            showConfirmButton: false, //dataCallback.award.AwardID > 0,
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: `<i class="fas fa-share"></i> SHARE`,
                            denyButtonText: `OK`,
                            confirmButtonColor: '#d14529',
                            denyButtonColor: '#2778c4',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                        }, function (result) {
                        });
                    } else {
                        if (dataCallback.award.AwardID == 1) {
                            Utils.Notify.endGameRewards(1)
                            //Utils.Notify.minigameDoubleAward('500.000', code)
                        } else if (dataCallback.award.AwardID == 2) {
                            Utils.Notify.endGameRewards(2)
                            //Utils.Notify.minigameDoubleAward('50.000', code)
                        } else if (dataCallback.award.AwardID == 3) {
                            Utils.Notify.endGameRewards(3)
                            //Utils.Notify.minigameDoubleAward('20.000', code)
                        } else if (dataCallback.award.AwardID == 4) {
                            Utils.Notify.endGameRewards(4)
                            //Utils.Notify.minigameDoubleAward('10.000', code)
                        } else {
                            Utils.Notify.endGameRewards(0)
                            //Utils.Notify.swalFire({
                            //    html: dataCallback.message,
                            //    showConfirmButton: false, //dataCallback.award.AwardID > 0,
                            //    showDenyButton: true,
                            //    showCancelButton: false,
                            //    confirmButtonText: `<i class="fas fa-share"></i> SHARE`,
                            //    denyButtonText: `OK`,
                            //    confirmButtonColor: '#d14529',
                            //    denyButtonColor: '#2778c4',
                            //    showClass: {
                            //        popup: 'animate__animated animate__fadeInDown'
                            //    },
                            //    hideClass: {
                            //        popup: 'animate__animated animate__fadeOutUp'
                            //    },
                            //}, function (result) {
                            //    console.log(result);
                            //    //if (result.isConfirmed) {
                            //    //    // share
                            //    //    Utils.Notify.swalFire({
                            //    //        icon: 'success',
                            //    //        html: 'share success',
                            //    //        showClass: {
                            //    //            popup: 'animate__animated animate__fadeInDown'
                            //    //        },
                            //    //        hideClass: {
                            //    //            popup: 'animate__animated animate__fadeOutUp'
                            //    //        },
                            //    //    });
                            //    //}
                            //});
                        }
                    }
                });
            } else if (dataCallback.status == 7) {
                $('.popup-wrapper, .popup').hide();
                $('#txtCode').val('');
                message = dataCallback.message
            } else if (dataCallback.status == -2) {
                message = 'Vui lòng xác thực bạn không phải Robot và thử lại.';
            } else if (dataCallback.status == -3) {
                message = 'Vui lòng nhập mã dự thưởng';
            } else if (dataCallback.status == -4) {
                message = 'Vui lòng nhập số điện thoại của bạn';
            } else {
                message = dataCallback.message;
            }

            if (dataCallback.status != 1) {
                Utils.Notify.swalFire({
                    icon: 'error',
                    html: message,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                });
            }
        });
        //});
    }
}

$("#btnSearchWinner").click(function (event) {
    event.preventDefault();
    Utils.Notify.showJGrowl('Chương trình đang tải dữ liệu. <br />Vui lòng đợi trong giây lát', '', 3000, '', '', function (beforeOpen) {
    }, function (open) {
    }, function (afterOpen) {
        //setting.GridListAwards.search("").draw();
        setting.GridListAwards.clear().draw();
    });
    //$('#txtPopupPhoneWinner').val($('#txtPhoneWinner').val());
    //$('.popup-wrapper, .popup').show();
    //$('html').css("overflow-y", "auto");
    //$('#btnPopupSearchWinner').click();
});

$("#btnPopupSearchWinner").click(function (event) {
    event.preventDefault();
    var btn = $(event.currentTarget)
    var btnHtml = btn.html()

    if (btn.attr('disabled') === 'disabled') {
        //Utils.Notify.showJGrowl('Đang xử lý yêu cầu của bạn.<br />Vui lòng một chút', '', 3000, '', '')
        Utils.Notify.swalFire({
            icon: 'error',
            html: 'Đang xử lý yêu cầu của bạn.<br />Vui lòng một chút',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        });
    } else {
        if (!grecaptcha.getResponse()) {
            //Utils.Notify.showJGrowl('Vui lòng xác thực bạn không phải Robot và thử lại.', '', 3000, '', '')
            Utils.Notify.swalFire({
                icon: 'error',
                html: 'Vui lòng xác thực bạn không phải Robot và thử lại.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
            }).then(() => {
                grecaptcha.execute();
            })
        } else if ($('#txtPopupPhoneWinner').val().trim() == null || $('#txtPopupPhoneWinner').val().trim() == '') {
            //Utils.Notify.showJGrowl('Vui lòng nhập số điện thoại của bạn', '', 3000, '', '')
            Utils.Notify.swalFire({
                icon: 'error',
                html: 'Vui lòng nhập số điện thoại của bạn',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
            });
        } else {
            //Utils.Notify.showJGrowl('Chương trình đang tra cứu kết quả quay số của bạn.<br />Vui lòng một chút', '', 3000, '', '', function (beforeOpen) {
            btn.html(`<i class="fas fa-spinner fa-spin"></i> Đang xử lý`)
            btn.attr('disabled', true)
            //}, function (open) { }, function (afterOpen) {
            btn.html(btnHtml);
            btn.attr('disabled', false);
            setting.GridAwards.search("").draw();
            //searchWinner(function (dataCallback) {
            //    btn.html(btnHtml);
            //    btn.attr('disabled', false);

            //    var message = '';
            //    if (dataCallback.status == 1) {
            //        $('#tbodyGridAwards').html('');
            //        var tbodyHtml = renderGridReward(dataCallback.awards || []);
            //        $('#tbodyGridAwards').html(tbodyHtml);
            //    } else if (dataCallback.status == -2) {
            //        message = 'Vui lòng xác thực bạn không phải Robot và thử lại.';
            //    } else if (dataCallback.status == -3) {
            //        message = 'Vui lòng nhập mã dự thưởng';
            //    } else if (dataCallback.status == -4) {
            //        message = 'Vui lòng nhập số điện thoại của bạn';
            //    } else {
            //        message = dataCallback.message;
            //    }

            //    if (dataCallback.status != 1) {
            //        Swal.fire({
            //            icon: 'error',
            //            width: '60%',
            //            title: 'Xé Ngay Trúng Liền',
            //            text: message,
            //            footer: ''
            //        })
            //    }
            //});
            //});
        }
    }
});

$('#btnScrollSpinTOP').click(function (event) {
    setTimeout(function () {
        try {
            if ($("#btnCode").length) {
                $("#btnCode").click();
            } else {
                window.location.href = '/#du-thuong';
            }
        } catch (e) {
        }
    }, 200);
});

$('#btnXeNgay').click(function (event) {
    setTimeout(function () {
        try {
            $("#btnCode").click()
        } catch (e) {
        }
    }, 300);
});

function spinWheelWithCode(callback) {
    var data = {
        phone: $('#txtPhone').val().trim(),
        code: $('#txtCode').val().trim(),
        token: grecaptcha.getResponse(),
    };

    $.ajax({
        type: "POST",
        url: "/Home/SpinWheelWithCode",
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "JSON",
        success: function (result) {
            console.log(result)
            try {
                Utils.LocalStorage.set('_phone', data.phone)
                Utils.LocalStorage.set('_latest_award', data.code)
                onResetReCaptcha();
            } catch (e) {
            }
            if (result.status == 1) {

            } else if (result.status == 7) {

            } else {

            }

            Utils.response(callback, result);
        },
        error: function (error) {
            Utils.response(callback, error);
        },
    });
}

function searchWinner(callback) {
    setting.GridAwards.search("").draw();
    var data = {
        phone: $('#txtPopupPhoneWinner').val().trim(),
        rangeTime: $('#ddlRangeTime').val() || 1,
        token: grecaptcha.getResponse(),
    };

    $.ajax({
        type: "POST",
        url: "/Home/SearchWinner",
        async: false,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "JSON",
        success: function (result) {
            console.log(result)
            grecaptcha.reset();
            Utils.response(callback, result);
        },
        error: function (error) {
            grecaptcha.reset();
            Utils.response(callback, error);
        },
    });
}

function getDegReward(rewardId) {
    try {
        if (rewardId == 1) {
            //Giải Nhất
            var award = setting.award.G500K[getRandomInt(1, setting.award.G500K.length) - 1];
            return getRandomInt((award[0] + 5), (award[1] - 5));
        } else if (rewardId == 2) {
            //Giải Nhì
            var award = setting.award.G50K[getRandomInt(1, setting.award.G50K.length) - 1];
            return getRandomInt((award[0] + 5), (award[1] - 5));
        } else if (rewardId == 3) {
            //Giải Ba
            var award = setting.award.G20K[getRandomInt(1, setting.award.G20K.length) - 1];
            return getRandomInt((award[0] + 5), (award[1] - 5));
        } else if (rewardId == 4) {
            //Giải Tư
            var award = setting.award.G10K[getRandomInt(1, setting.award.G10K.length) - 1];
            return getRandomInt((award[0] + 5), (award[1] - 5));
        } else {
            //Chúc may mắn lần sau
            var award = setting.award.G0K[getRandomInt(1, setting.award.G0K.length) - 1];
            return getRandomInt((award[0] + 5), (award[1] - 5));
        }
    } catch (e) {
        return 1;
    }
}

function renderGridReward(awards) {
    var html = '';

    for (var idx = 0; idx < awards.length; idx++) {
        var award = awards[idx];
        var tr = '';

        tr = tr + '<tr>';
        //tr = tr + '<td>' + award['platform']+'</td>';
        tr = tr + '<td>' + award['code'] + '</td>';
        tr = tr + '<td>' + award['award_name'] + '</td>';
        tr = tr + '</tr>';

        html = html + tr;
    }

    return html;
}

function infoDevice(callback) {
    $.ajax({
        type: "GET",
        url: "https://api.ipify.org/?format=json",
        async: false,
        data: '',
        contentType: "application/json",
        dataType: "JSON",
        success: function (result) {
            $.ajax({
                type: "POST",
                url: "/Home/InfoDevice",
                async: false,
                data: JSON.stringify({
                    screen: JSON.stringify({
                        availHeight: screen.availHeight,
                        availLeft: screen.availLeft,
                        availTop: screen.availTop,
                        availWidth: screen.availWidth,
                        colorDepth: screen.colorDepth,
                        height: screen.height,
                        width: screen.width,
                        devicePixelRatio: devicePixelRatio,
                        localStorage: JSON.stringify(localStorage),
                    }),
                    ipinfo: JSON.stringify(result),
                }),
                contentType: "application/json",
                dataType: "JSON",
                success: function (result) {
                    Utils.response(callback, result);
                },
            });
        },
    });
}

$('#popupSpinWheelReward').on('click', function (e) {
    $('.g-recaptcha-bubble-arrow').parent().addClass('custom-gcaptcha')
})
