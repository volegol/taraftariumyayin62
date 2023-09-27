(function($) {

    $(window.document).ready(function() {
        var autoPlay = true,
            chromeless = false,
            skipCounter, skipInterval, skipOffset, skipText;

        if (Clappr.Browser.isMobile) {
            autoPlay = false;
            chromeless = false;
        }
        window.app = {
            clappr: {
                currentTime: function() {
                    return window.Math.round(window.app.clappr.instance.getCurrentTime(), 0);
                },
                instance: new Clappr.Player({}),
                isBuffering: function() {
                    return window.app.clappr.instance.core.mediaControl.container.buffering;
                },
                resizeCallback: function() {

                    /*
                    window.app.clappr.instance.resize({
                        width: $(window).innerWidth(),
                        height: $(window).innerHeight()
                    });*/

                    $('div[data-player]').css({
                        width: $(window).innerWidth()+'px',
                        height: $(window).innerHeight()+'px'
                    });
                },
                options: {
                    autoPlay: autoPlay,
                    disableKeyboardShortcuts: true,
                    disableVideoTagContextMenu: true,
                    exitFullscreenOnEnd: false,
                    //height: $(window).innerHeight(),
                    language: "tr-TR",
                    //persistConfig: false,
                    /*
                    mediacontrol: {
                        buttons: "#fff",
                        seekbar: "#fff",
                    },*/
                    strings: {
                        "tr-TR": {
                            back_to_live: "CanlÃ„Â± yayÃ„Â±na geri dÃƒÂ¶n",
                            live: "CanlÃ„Â± | TRGoals",
                            playback_not_supported: "TarayÃ„Â±cÃ„Â±nÃ„Â±z bu ortamÃ„Â± oynatamÃ„Â±yor, lÃƒÂ¼tfen gÃƒÂ¼ncel bir tarayÃ„Â±cÃ„Â± ile deneyiniz."
                        },
                    },
                    width: '100%',
                    height: $(window).innerHeight()
                },
            },
            extend: function(defaults, options) {
                return $.extend({}, defaults, options);
            },
            init: function() {
                $(window.document.head).append("<style>body{background-color:transparent;" + "font-family:\"Roboto\";overflow:hidden}" + "video{object-fit:fill}</style>");
                window.config = window.app.extend({
                    adv: {
                        enabled: false,
                    },
                }, window.config);
                if (window.config.adv.enabled) {
                    window.app.initAdv();
                } else {
                    window.app.initMatch();
                }
                $(window).resize(window.app.clappr.resizeCallback);
            },
            initAdv: function() {
                window.app.initContainer(window.config.adv.parentId);
                window.config.adv = window.app.extend({
                    link: "",
                    skipOffset: 5,
                    skipText: "Reklami gec",
                    skipTextN: "Reklami gecmek icin %d saniye kaldi",
                }, window.config.adv);
                window.app.clappr.instance = new Clappr.Player(window.app.extend(window.app.clappr.options, window.app.extend(window.config.adv, {
                    chromeless: chromeless,
                })));
                window.app.initAdvEvents();
            },
            initAdvEvents: function() {
                window.app.clappr.instance.once(Clappr.Events.PLAYER_ENDED, window.app.skip);
                window.app.clappr.instance.once(Clappr.Events.PLAYER_PLAY, window.app.initSkipButton);
                window.app.clappr.instance.on(Clappr.Events.PLAYER_TIMEUPDATE, window.app.skipButton);
                window.app.clappr.instance.setVolume(100);
            },
            initContainer: function(selector) {
                if ($(selector).length > 0) {
                    $(selector).remove();
                }
                $(window.document.body).prepend($("<div />").attr("id", selector.match(/\#(.*)/)[1]));
            },
            initMatch: function() {
                window.app.initContainer(window.config.match.parentId);
                window.app.clappr.instance = new Clappr.Player(window.app.extend(window.app.clappr.options, window.config.match));
                window.app.initMatchEvents();
            },
            initMatchCleanup: function() {
                window.app.clappr.instance.setVolume(100);
                if (Clappr.Browser.isMobile) {
                    $(".bar-scrubber").css({
                        display: "none",
                    });
                } else {
                    /*
                    $("[data-playstop], .bar-scrubber").css({
                        display: "none",
                    });*/
                }
                $("[data-watermark-top-left]").css({
                    left: "17px",
                    top: "17px",
                });
                $("[data-watermark-top-right]").css({
                    top: "17px",
                });
            },
            initMatchEvents: function() {
                window.app.clappr.instance.once(Clappr.Events.PLAYER_PLAY, window.app.initMatchCleanup);
            },
            initSkipButton: function() {
                skipOffset = window.config.adv.skipOffset;
                if (!Clappr.Browser.isMobile) {
                    //$("[data-playpause]").css({
                    //    display: "none"
                    //});
                }
                $(window.document.body).prepend($("<div data-adv-link />").css({
                    height: "100%",
                    left: 0,
                    position: "absolute",
                    top: 0,
                    "z-index": 9998,
                    width: "100%",
                }));
                $("[data-adv-link]").append($("<a />").attr({
                    href: window.config.adv.link,
                    target: "_blank"
                }).css({
                    display: "inline-block",
                    height: "100%",
                    width: "100%"
                }))
                $(window.document.body).prepend($("<div data-adv />").css({
                    bottom: "25%",
                    position: "absolute",
                    right: 0,
                    "z-index": 9999,
                }));
                skipText = window.config.adv.skipTextN.replace("%d", window.config.adv.skipOffset).toUpperCase();
                $("[data-adv]").append($("<button />").attr("type", "button").css({
                    "background-color": "#000",
                    border: "3px solid #333",
                    "border-right": 0,
                    color: "#f8f8f8",
                    "font-family": "Roboto",
                    "font-weight": "bold",
                    padding: "10px 20px",
                }).text(skipText));
            },
            skip: function() {
                $("[data-adv]").remove();
                $("[data-adv-link]").remove();
                window.app.initMatch();
            },
            skipButton: function() {
                if (window.app.clappr.currentTime() > 0) {
                    skipCounter = 1;
                    skipInterval = setInterval(window.app.skipButtonHandler, 1000);
                    window.app.clappr.instance.off(Clappr.Events.PLAYER_TIMEUPDATE, window.app.skipButton);
                }
            },
            skipButtonHandler: function() {
                if (window.app.clappr.isBuffering()) {
                    return false;
                } else if (skipCounter == skipOffset) {
                    skipText = window.config.adv.skipText;
                    $("[data-adv] > button").css({
                        cursor: "pointer",
                    });
                    $("[data-adv] > button").on("click", window.app.skip);
                    clearInterval(skipInterval);
                } else {
                    skipText = window.config.adv.skipTextN.replace("%d", skipOffset - skipCounter);
                    skipCounter++;
                }
                $("[data-adv] > button").text(skipText.toUpperCase());
            },
        };
        window.app.init();
    });
})(jQuery);