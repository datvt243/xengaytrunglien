$(window).resize(function () {
    //if (window.outerWidth > 1040) {
    //    var snowEffectInterval = jQuery.fn.snow({
    //        // min size of element (default: 20)
    //        minSize: 1,

    //        // max size of element (default: 50)
    //        maxSize: 5,

    //        // flake fall time multiplier (default: 20)
    //        fallTimeMultiplier: 20,

    //        // flake fall time difference (default: 10000)
    //        fallTimeDifference: 5000,

    //        // interval (miliseconds) between new element spawns (default: 500)
    //        spawnInterval: 2000,

    //        // jQuery element to apply snow effect on (should work on any block element) (default: body)
    //        target: jQuery("html"),

    //        //elements to use in generating snow effect
    //        elements: [

    //            // Element #1
    //            {
    //                // html element to be spawned for this element
    //                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor1.png?v=1.0.1" alt="dollor">'
    //            },

    //            // Element #2
    //            {
    //                // html element to be spawned for this element
    //                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor2.png?v=1.0.1" alt="dollor">'
    //            },

    //            // Element #3
    //            {
    //                // html element to be spawned for this element
    //                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor3.png?v=1.0.1" alt="dollor">'
    //            },

    //            // Element #4
    //            {
    //                // html element to be spawned for this element
    //                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor4.png?v=1.0.1" alt="dollor">'
    //            },

    //            // Element #5
    //            {
    //                // html element to be spawned for this element
    //                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor5.png?v=1.0.1" alt="dollor">'
    //            },
    //        ]
    //    });
    //}
    if (window.outerWidth <= 1040) {
        $('.jcarousel-wrapper3').css("height", $('.herorightsection').height());
    }
    var jcawrapper3Width = $('.jcarousel-wrapper3').width();
    var jcawrapper3Height = $('.jcarousel-wrapper3').height();
    $(".jcarousel-wrapper3 .jcarousel li").css("width", jcawrapper3Width);
    $(".jcarousel-wrapper3 .jcarousel li").css("height", jcawrapper3Height);
    //$('#jcarousel3')
    //    .jcarousel({
    //        wrap: 'circular'
    //    })
    //    .jcarouselAutoscroll({
    //        interval: 3000,
    //        target: '+=1',
    //        autostart: true
    //    });
});

function enterCode() {
    try {
        if (grecaptcha) {
            $('.g-recaptcha').on('click', function (e) {
                try {
                    $('.g-recaptcha-bubble-arrow').parent().addClass('custom-gcaptcha')
                } catch (e) {
                }
            })
        }
    } catch (e) {
        Utils.loaderScript("https://www.google.com/recaptcha/api.js?hl=vi")
            .then(() => {
                console.log("loaded");
            })
            .catch(() => {
                console.log("error");
            });
    }

    //if (isSpinWheel) {
    //    console.log('spin wheel is running')
    //} else {
    $('.popup-wrapper, #popupSpinWheelReward').show();
    $('html').css("overflow-y", "visible !important");
    //}

    setTimeout(() => {
        if (isSpinWheel) {

        } else {
            spinWheel(setting.defaultWheel);
            console.log('run defaultWheel');
        }
    }, 100);
}

$(document).ready(function () {
    try {
        window.SpinAudio = new Audio('/assets/audio/NhacCacVongQuayCuaChiecNonKyDieu-VA-6226417.mp3?v=' + localStorage.getItem('thp_ver'));
        window.SpinAudio.volume = 0.2;
        window.SpinAudio.load();
    } catch (e) {
    }

    //if (window.outerWidth > 1040) {
    try {
        setTimeout(function () {
            Utils.loaderScript("/assets/theme/js/jquery.snow.js?v=" + localStorage.getItem('thp_ver'))
                .then(() => {
                    console.log("jquery.snow");
                    var snowEffectInterval = jQuery.fn.snow({
                        // min size of element (default: 20)
                        minSize: 1,

                        // max size of element (default: 50)
                        maxSize: 5,

                        // flake fall time multiplier (default: 20)
                        fallTimeMultiplier: 20,

                        // flake fall time difference (default: 10000)
                        fallTimeDifference: 5000,

                        // interval (miliseconds) between new element spawns (default: 500)
                        spawnInterval: 2000,

                        // jQuery element to apply snow effect on (should work on any block element) (default: body)
                        //target: jQuery("html"),
                        target: jQuery("div.dollarfallsection"),

                        //elements to use in generating snow effect
                        elements: [

                            // Element #1
                            {
                                // html element to be spawned for this element
                                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor1.png?v=1.0.1" alt="dollor">'
                            },

                            // Element #2
                            {
                                // html element to be spawned for this element
                                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor2.png?v=1.0.1" alt="dollor">'
                            },

                            // Element #3
                            {
                                // html element to be spawned for this element
                                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor3.png?v=1.0.1" alt="dollor">'
                            },

                            // Element #4
                            {
                                // html element to be spawned for this element
                                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor4.png?v=1.0.1" alt="dollor">'
                            },

                            // Element #5
                            {
                                // html element to be spawned for this element
                                html: '<img loading="lazy" src="/assets/theme/images/icon-dollor5.png?v=1.0.1" alt="dollor">'
                            },
                        ]
                    });
                })
                .catch(() => {
                    console.log("error");
                });
        }, 2000);
    } catch (e) {
        console.log(e)
    }
    //}

    $("a.top").click(function (event) {
        //event.preventDefault();
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
    });

    //  Setup variables
    var wheel = $("#wheel"),
        active = $("#active"),
        currentRotation,
        lastRotation = 0,
        tolerance,
        deg,

        $btnPlay = $(".btnAgree"),
        $btnSlowMo = $("#btnSlowMo");

    ////  Random degree
    //function getRandomInt(min, max) {
    //    return Math.floor(Math.random() * (max - min + 1)) + min;
    //}
    //var deg = getRandomInt(360, 1080);
    //console.log(deg);

    ////  Creating the Timeline
    //var indicator = new TimelineMax();
    //var spinWheel = new TimelineMax();
    //indicator.to(active, .13, { rotation: -10, transformOrigin: "65% 36%", ease: Power1.easeOut })
    //    .to(active, .13, { rotation: 3, ease: Power4.easeOut })
    //    .add("end");

    ////  Luckywheel animation
    //spinWheel.to(wheel, 5, {
    //    rotation: deg, transformOrigin: "50% 50%", ease: Power4.easeOut, onUpdate: (
    //        function () {
    //            currentRotation = Math.round(this.target[0]._gsTransform.rotation);    //_gsTransform: current position of the wheel
    //            tolerance = currentRotation - lastRotation;

    //            console.log("lastRot: " + lastRotation);
    //            console.log("currentRot: " + currentRotation);
    //            console.log("tol: " + tolerance);
    //            console.log(indicator.progress());
    //            console.log("spinwheelprogress: " + spinWheel.progress());

    //            if (Math.round(currentRotation) % (360 / 12) <= tolerance) {
    //                if (indicator.progress() > .2 || indicator.progress() === 0) {
    //                    indicator.play(0);
    //                }
    //            }
    //            lastRotation = currentRotation;
    //        }
    //    )
    //});
    //spinWheel.add("end");
    ////   Buttons
    //$btnPlay.click(
    //    function () {
    //        $('.popup-wrapper, .popup').hide();
    //        indicator.timeScale(1).seek(0);
    //        spinWheel.timeScale(1).seek(0);
    //    }
    //);

    $btnSlowMo.click(
        function () {
            indicator.timeScale(.2).seek(.5);
            spinWheel.timeScale(.2).seek(.5);
        }
    );

    if (window.outerWidth <= 1040) {
        $('.jcarousel-wrapper3').css("height", $('.herorightsection').height());
    }

    //var jcawrapper3Width = $('.jcarousel-wrapper3').width();
    //var jcawrapper3Height = $('.jcarousel-wrapper3').height();
    //$(".jcarousel-wrapper3 .jcarousel li").css("width", jcawrapper3Width);
    //$(".jcarousel-wrapper3 .jcarousel li").css("height", jcawrapper3Height);
    //$('#jcarousel1, #jcarousel2,#jcarousel3')
    //    .jcarousel({
    //        wrap: 'circular'
    //    })
    //    .jcarouselautoscroll({
    //        interval: 3000,
    //        target: '+=1',
    //        autostart: true
    //    });

    //$('.jcarousel-control-prev1, .jcarousel-control-prev2')
    //    .jcarouselControl({
    //        target: '-=1'
    //    })
    //    .on('click', function (e) {
    //        e.preventDefault();
    //    });

    //$('.jcarousel-control-next1, .jcarousel-control-next2')
    //    .jcarouselControl({
    //        target: '+=1'
    //    })
    //    .on('click', function (e) {
    //        e.preventDefault();
    //    });

    $(".btnClose").click(function (event) {
        event.preventDefault();
        $('.popup-wrapper, .popup').hide();
        //$('html').css("overflow-y", "hidden");
    });

    $("#btnNotificationOK").click(function (event) {
        event.preventDefault();
        $('.popup-wrapper, .popup, #popupNotification').hide();
        $('#popupNotification').attr('class', 'popup px-5 px-xxl-0');
        $('#popupNotificationTitle').removeClass('hidden');
        //$('html').css("overflow-y", "hidden");
    });

    $("#btnCode").click(function (event) {
        event.preventDefault();
        enterCode();
    });

});

//// Helper function which returns a promise which resolves once the service worker registration
//// is past the "installing" state.
//function waitUntilInstalled(registration) {
//    return new Promise(function (resolve, reject) {
//        if (registration.installing) {
//            // If the current registration represents the "installing" service worker, then wait
//            // until the installation step (during which the resources are pre-fetched) completes
//            // to display the file list.
//            registration.installing.addEventListener('statechange', function (e) {
//                if (e.target.state === 'installed') {
//                    resolve();
//                } else if (e.target.state === 'redundant') {
//                    reject();
//                }
//            });
//        } else {
//            // Otherwise, if this isn't the "installing" service worker, then installation must have been
//            // completed during a previous visit to this page, and the resources are already pre-fetched.
//            // So we can show the list of files right away.
//            resolve();
//        }
//    });
//}

//if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('./sw?v=1.0.2', {
//        scope: './'
//    })
//        .then(waitUntilInstalled)
//        // .then(showFilesList)
//        .catch(function (error) {
//            // Something went wrong during registration. The service-worker.js file
//            // might be unavailable or contain a syntax error.
//            console.log(error)
//        });
//} else {
//    // The current browser doesn't support service workers.
//    console.log('Service workers are not supported in the current browser.');
//}
