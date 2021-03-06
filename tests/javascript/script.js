console.log("script");
// css helper
browser = function ($) {
        'use strict';
        var data = [
                { str: navigator.userAgent, sub: 'Chrome', ver: 'Chrome', name: 'chrome' },
                { str: navigator.vendor, sub: 'Apple', ver: 'Version', name: 'safari' },
                { prop: window.opera, ver: 'Opera', name: 'opera' },
                { str: navigator.userAgent, sub: 'Firefox', ver: 'Firefox', name: 'firefox' },
                { str: navigator.userAgent, sub: 'MSIE', ver: 'MSIE', name: 'ie' }
        ];
        var v = function (s, n) {
                var i = s.indexOf(data[n].ver);
                return (i !== -1) ? parseFloat(s.substring(i + data[n].ver.length + 1)) : 0;
        };
        var html = $('html');
        var result = { name: 'unknown', version: 0 };
        for (var n = 0; n < data.length; n++) {
                result[data[n].name] = false;
                if ((data[n].str && (data[n].str.indexOf(data[n].sub) !== -1)) || data[n].prop) {
                        result.name = data[n].name;
                        result[result.name] = true;
                        result.version = v(navigator.userAgent, n) || v(navigator.appVersion, n);
                        // 'desktop' class is used as responsive design initial value
                        html.addClass(result.name + ' ' + result.name + parseInt(result.version, 10) + ' desktop');
                }
        }
        return result;
} (jQuery);

jQuery(function ($) {
        'use strict';
        var i, j, k, l, m;
        if (!browser.ie || browser.version !== 9) {
                return;
        }
        var splitByTokens = function (str, startToken, endToken, last) {
                if (!last) {
                        last = false;
                }
                var startPos = str.indexOf(startToken);
                if (startPos !== -1) {
                        startPos += startToken.length;
                        var endPos = last ? str.lastIndexOf(endToken) : str.indexOf(endToken, startPos);

                        if (endPos !== -1 && endPos > startPos) {
                                return str.substr(startPos, endPos - startPos);
                        }
                }
                return '';
        };

        var splitWithBrackets = function (str, token, brackets) {
                /*jshint nonstandard:true */
                if (!token) {
                        token = ',';
                }
                if (!brackets) {
                        brackets = '()';
                }
                var bracket = 0;
                var startPos = 0;
                var result = [];
                if (brackets.lenght < 2) {
                        return result;
                }
                var pos = 0;
                while (pos < str.length) {
                        var ch = str[pos];
                        if (ch === brackets[0]) {
                                bracket++;
                        }
                        if (ch === brackets[1]) {
                                bracket--;
                        }
                        if (ch === token && bracket < 1) {
                                result.push(str.substr(startPos, pos - startPos));
                                startPos = pos + token.length;
                        }
                        pos++;
                }
                result.push(str.substr(startPos, pos - startPos));
                return result;
        };

        var byteToHex = function (d) {
                var hex = Number(d).toString(16);
                while (hex.length < 2) {
                        hex = "0" + hex;
                }
                return hex;
        };

        for (i = 0; i < document.styleSheets.length; i++) {
                var s = document.styleSheets[i];
                var r = [s];
                for (j = 0; j < s.imports.length; j++) {
                        r.push(s.imports[j]);
                }
                for (j = 0; j < r.length; j++) {
                        s = r[j];
                        var n = [];
                        for (k = 0; k < s.rules.length; k++) {
                                var css = s.rules[k].cssText || s.rules[k].style.cssText;
                                if (!css) {
                                        continue;
                                }
                                var value = splitByTokens(css, '-svg-background:', ';');
                                if (value === '') {
                                        continue;
                                }
                                var values = splitWithBrackets(value);
                                for (l = 0; l < values.length; l++) {
                                        var g = splitByTokens(values[l], 'linear-gradient(', ')', true);
                                        if (g === '') {
                                                continue;
                                        }
                                        var args = splitWithBrackets(g);
                                        if (args.length < 3) {
                                                continue;
                                        }
                                        var maxOffset = 0;
                                        var stops = [];
                                        for (m = 1; m < args.length; m++) {
                                                var stopValues = splitWithBrackets($.trim(args[m]), ' ');
                                                if (stopValues.length < 2) {
                                                        continue;
                                                }
                                                var stopColor = $.trim(stopValues[0]);
                                                var stopOpacity = 1;
                                                if (stopColor == 'transparent') {
                                                        stopColor = '#000000';
                                                        stopOpacity = 0;
                                                }
                                                var colorRgba = splitByTokens(stopColor, 'rgba(', ')', true);
                                                var stopOffset = $.trim(stopValues[1]);
                                                if (colorRgba !== "") {
                                                        var rgba = colorRgba.split(',');
                                                        if (rgba.length < 4) {
                                                                continue;
                                                        }
                                                        stopColor = '#' + byteToHex(rgba[0]) + byteToHex(rgba[1]) + byteToHex(rgba[2]);
                                                        stopOpacity = rgba[3];
                                                }
                                                var isPx = stopOffset.indexOf('px') !== -1;
                                                if (isPx) {
                                                        maxOffset = Math.max(maxOffset, parseInt(stopOffset, 10) || 0);
                                                }
                                                stops.push({ offset: stopOffset, color: stopColor, opacity: stopOpacity, isPx: isPx });
                                        }
                                        var stopsXML = '';
                                        var lastStop = null;
                                        for (m = 0; m < stops.length; m++) {
                                                if (stops[m].isPx) {
                                                        stops[m].offset = ((parseInt(stops[m].offset, 10) || 0) / (maxOffset / 100)) + '%';
                                                }
                                                stopsXML += '<stop offset="' + stops[m].offset + '" stop-color="' + stops[m].color + '" stop-opacity="' + stops[m].opacity + '"/>';
                                                if (m === stops.length - 1) {
                                                        lastStop = stops[m];
                                                }
                                        }
                                        var isLeft = $.trim(args[0]) === 'left';
                                        var direction = 'x1="0%" y1="0%" ' + (isLeft ? 'x2="100%" y2="0%"' : 'x2="0%" y2="100%"');
                                        var gradientLength = '100%';
                                        if (maxOffset > 0) {
                                                gradientLength = maxOffset + 'px';
                                        }
                                        var size = (isLeft ? 'width="' + gradientLength + '" height="100%"' : 'width="100%" height="' + gradientLength + '"');
                                        var last = "";
                                        if (lastStop !== null && maxOffset > 0) {
                                                last = '<rect ' +
                                                        (isLeft ?
                                                                'x="' + maxOffset + '" y="0"' :
                                                                'x="0" y="' + maxOffset + '"') +
                                                        ' width="100%" height="100%" style="fill:' + lastStop.color + ';opacity:' + lastStop.opacity + ';"/>';

                                        }
                                        var svgGradient = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><linearGradient id="g" gradientUnits="objectBoundingBox" ' + direction + '>' + stopsXML + '</linearGradient><rect x="0" y="0" ' + size + ' fill="url(#g)" />' + last + '</svg>';
                                        values[l] = values[l].replace('linear-gradient(' + g + ')', 'url(data:image/svg+xml,' + escape(svgGradient) + ')');
                                }
                                n.push({ s: s.rules[k].selectorText, v: 'background: ' + values.join(",") });
                        }
                        for (k = 0; k < n.length; k++) {
                                s.addRule(n[k].s, n[k].v);
                        }
                }
        }



});

jQuery(function ($) {
        'use strict';
        // ie < 9 slider multiple background fix
        if (!browser.ie || browser.version > 8) return;

        function split(str) {
                str = str.replace(/"/g, '').replace(/%20/g, '');
                return  str.split(/\s*,\s*/);
        }

        $('.slider .slide-item').each(function () {
                var bgs = split($(this).css('background-image'));
                // needs to use the last image
                if (bgs.length > 1) {
                        $(this).css("background-image", bgs[bgs.length - 1]);
                }
        });



});

jQuery(function ($) {
        "use strict";
        // ie8
        if (!browser.ie || browser.version > 8) return;
        $('.shapes').css('z-index', 1);

        // ie7
        if (!browser.ie || browser.version > 7) return;
        var textblockTexts = $('.textblock > div');
        textblockTexts.each(function () {
                var tbText = $(this);
                var valign = tbText.css('vertical-align') ? tbText.css('vertical-align') : 'top';
                if (valign === 'middle') {
                        var wrapper = tbText.wrap('<div/>').parent();
                        tbText.css({
                                'position': 'relative',
                                'top': '-50%',
                                'height': 'auto'
                        });
                        wrapper.css({
                                'position': 'absolute',
                                'top': '50%'
                        });
                } else if (valign === 'bottom') {
                        tbText.css({
                                'position': 'absolute',
                                'height': 'auto',
                                'bottom': 0
                        });
                }
        });



});

/* Set wmode=transparent for youtube and other video hostings to show it under the menus, lightboxes etc. */
jQuery(function ($) {
        "use strict";
        var video = ["youtube"];

        $("iframe[src]").each(function () {
                var iframe = $(this),
                        src = iframe.attr("src"),
                        isVideo = false,
                        i;

                for (i = 0; i < video.length; i++) {
                        if (src.toLowerCase().indexOf(video[i].toLowerCase()) !== -1) {
                                isVideo = true;
                                break;
                        }
                }

                if (!isVideo) {
                        return;
                }

                if (src.lastIndexOf("?") !== -1) {
                        src += "&amp;wmode=transparent";
                } else {
                        src += "?wmode=transparent";
                }
                iframe.attr("src", src);
        });
});

jQuery(function ($) {
        "use strict";
        $(window).bind("resize", function () { navigatorResizeHandler($("html").hasClass("responsive")); });
});

var navigatorResizeHandler = (function ($) {
        "use strict";
        return function (responsiveDesign) {
                if (responsiveDesign) return;
                $(".slider").each(function () {
                        var slider = $(this);
                        var sliderWidth = slider.width();
                        var nav = slider.siblings(".slidenavigator");
                        if (nav.length) {
                                // left offset
                                var left = nav.attr("data-left");
                                // (margin = containerWidth - (objectPosition + objectWidth)) < 0
                                var margin = sliderWidth - sliderWidth * parseFloat(left) / 100 - nav.outerWidth(false);
                                if (margin < 0) {
                                        nav.css("margin-left", margin);
                                }
                        }
                });
        };
})(jQuery);
jQuery(function($) {
        "use strict";
        $(window).bind("resize", function () {
                /*global responsiveDesign */
                "use strict";
                if (typeof responsiveDesign !== "undefined" && responsiveDesign.isResponsive)
                        return;
                var sheetLeft = $(".sheet").offset().left;
                $("header.header #flash-area").each(function () {
                        var object = $(this);
                        object.css("left", sheetLeft + "px");
                });
        });
});

jQuery(function($) {
        "use strict";
        $('nav.nav').addClass("desktop-nav");

        $('#horisontal_top_menu_mobile').click(function(){
                $('#navigation_top').toggleClass("mobile-nav");
        });

});


jQuery(function ($) {
        "use strict";
        if (!browser.ie || browser.version > 7) {
                return;
        }
        $('ul.hmenu>li:not(:first-child)').each(function () { $(this).prepend('<span class="hmenu-separator"> </span>'); });
});

jQuery(function ($) {
        "use strict";
        $("ul.hmenu a:not([href])").attr('href', '#').click(function (e) { e.preventDefault(); });
});


jQuery(function ($) {
        "use strict";
        if (!browser.ie || browser.version > 7) {
                return;
        }

        /* Fix width of submenu items.
        * The width of submenu item calculated incorrectly in IE6-7. IE6 has wider items, IE7 display items like stairs.
        */
        $.each($("ul.hmenu ul"), function () {
                var maxSubitemWidth = 0;
                var submenu = $(this);
                var subitem = null;
                $.each(submenu.children("li").children("a"), function () {
                        subitem = $(this);
                        var subitemWidth = subitem.outerWidth(false);
                        if (maxSubitemWidth < subitemWidth) {
                                maxSubitemWidth = subitemWidth;
                        }
                });
                if (subitem !== null) {
                        var subitemBorderLeft = parseInt(subitem.css("border-left-width"), 10) || 0;
                        var subitemBorderRight = parseInt(subitem.css("border-right-width"), 10) || 0;
                        var subitemPaddingLeft = parseInt(subitem.css("padding-left"), 10) || 0;
                        var subitemPaddingRight = parseInt(subitem.css("padding-right"), 10) || 0;
                        maxSubitemWidth -= subitemBorderLeft + subitemBorderRight + subitemPaddingLeft + subitemPaddingRight;
                        submenu.children("li").children("a").css("width", maxSubitemWidth + "px");
                }
        });
});
jQuery(function () {
        "use strict";
        setHMenuOpenDirection({
                container: "div.sheet",
                defaultContainer: "#main",
                menuClass: "hmenu",
                leftToRightClass: "hmenu-left-to-right",
                rightToLeftClass: "hmenu-right-to-left"
        });
});

var setHMenuOpenDirection = (function ($) {
        "use strict";
        return (function(menuInfo) {
                var defaultContainer = $(menuInfo.defaultContainer);
                defaultContainer = defaultContainer.length > 0 ? defaultContainer = $(defaultContainer[0]) : null;

                $("ul." + menuInfo.menuClass + ">li>ul").each(function () {
                        var submenu = $(this);

                        var submenuWidth = submenu.outerWidth(false);
                        var submenuLeft = submenu.offset().left;

                        var mainContainer = submenu.parents(menuInfo.container);
                        mainContainer = mainContainer.length > 0 ? mainContainer = $(mainContainer[0]) : null;

                        var container = mainContainer || defaultContainer;
                        if (container !== null) {
                                var containerLeft = container.offset().left;
                                var containerWidth = container.outerWidth(false);

                                if (submenuLeft + submenuWidth >= containerLeft + containerWidth) {
                                        /* right to left */
                                        submenu.addClass(menuInfo.rightToLeftClass).find("ul").addClass(menuInfo.rightToLeftClass);
                                } else if (submenuLeft <= containerLeft) {
                                        /* left to right */
                                        submenu.addClass(menuInfo.leftToRightClass).find("ul").addClass(menuInfo.leftToRightClass);
                                }
                        }
                });
        });
})(jQuery);


jQuery(function ($) {
        'use strict';
        $(window).bind('resize', function () {
                var bh = $('body').height();
                var mh = 0;
                var c = $('div.content');
                c.removeAttr('style');

                $('#main').children().each(function() {
                        if ($(this).css('position') !== 'absolute') {
                                mh += $(this).outerHeight(true);
                        }
                });

                if (mh < bh) {
                        var r = bh - mh;
                        c.css('height', (c.outerHeight(true) + r) + 'px');
                }
        });

        if (browser.ie && browser.version < 8) {
                $(window).bind('resize', function() {
                        var c = $('div.content');
                        var s = c.parent().children('.layout-cell:not(.content)');
                        var w = 0;
                        c.hide();
                        s.each(function() { w += $(this).outerWidth(true); });
                        c.w = c.parent().width(); c.css('width', c.w - w + 'px');
                        c.show();
                });
        }

        $(window).trigger('resize');
});

jQuery(function($) {
        "use strict";
        if (!$('html').hasClass('ie7')) {
                return;
        }
        $('ul.vmenu li:not(:first-child),ul.vmenu li li li:first-child,ul.vmenu>li>ul').each(function () { $(this).append('<div class="vmenu-separator"> </div><div class="vmenu-separator-bg"> </div>'); });
});



var artButtonSetup = (function ($) {
        'use strict';
        return (function (className) {
                $.each($("a." + className + ", button." + className + ", input." + className), function (i, val) {
                        var b = $(val);
                        if (!b.hasClass('button')) {
                                b.addClass('button');
                        }
                        if (b.is('input')) {
                                b.val(b.val().replace(/^\s*/, '')).css('zoom', '1');
                        }
                        b.mousedown(function () {
                                var b = $(this);
                                b.addClass("active");
                        });
                        b.mouseup(function () {
                                var b = $(this);
                                if (b.hasClass('active')) {
                                        b.removeClass('active');
                                }
                        });
                        b.mouseleave(function () {
                                var b = $(this);
                                if (b.hasClass('active')) {
                                        b.removeClass('active');
                                }
                        });
                });
        });
})(jQuery);
jQuery(function () {
        'use strict';
        artButtonSetup("button");
});

jQuery(function($) {
        'use strict';
        $('input.search-button, form.search input[type="submit"]').attr('value', '');
});

var Control = (function ($) {
        'use strict';
        return (function () {
                this.init = function(label, type, callback) {
                        var chAttr = label.find('input[type="' +type + '"]').attr('checked');
                        if (chAttr === 'checked') {
                                label.addClass('checked');
                        }

                        label.mouseleave(function () {
                                $(this).removeClass('hovered').removeClass('active');
                        });
                        label.mouseover(function () {
                                $(this).addClass('hovered').removeClass('active');
                        });
                        label.mousedown(function (event) {
                                if (event.which !== 1) {
                                        return;
                                }
                                $(this).addClass('active').removeClass('hovered');
                        });
                        label.mouseup(function (event) {
                                if (event.which !== 1) {
                                        return;
                                }
                                callback.apply(this);
                                $(this).removeClass('active').addClass('hovered');
                        });
                };
        });
})(jQuery);


jQuery(function ($) {
        'use strict';
        $('.pager').contents().filter(
                function () {
                        return this.nodeType === this.TEXT_NODE;
                }
        ).remove();
});
var fixRssIconLineHeight = (function ($) {
        "use strict";
        return function (className) {
                $("." + className).css("line-height", $("." + className).height() + "px");
        };
})(jQuery);

jQuery(function ($) {
        "use strict";
        var rssIcons = $(".rss-tag-icon");
        if (rssIcons.length){
                fixRssIconLineHeight("rss-tag-icon");
                if (browser.ie && browser.version < 9) {
                        rssIcons.each(function () {
                                if ($.trim($(this).html()) === "") {
                                        $(this).css("vertical-align", "middle");
                                }
                        });
                }
        }
});
var ThemeLightbox = (function ($) {
        'use strict';
        return (function () {
                var images = $(".lightbox");
                var current;
                this.init = function (ctrl) {
                        $(".lightbox").mouseup({ _ctrl: ctrl }, function (e) {
                                if ((e.data._ctrl === true && !e.ctrlKey) || (e.which && e.which !== 1)) {
                                        return;
                                }

                                images = $(".lightbox");

                                current = images.index(this);

                                var imgContainer = $('.lightbox-wrapper');
                                if (imgContainer.length === 0) {
                                        imgContainer = $('<div class="lightbox-wrapper">').css('line-height', $(window).height() + "px")
                                                .appendTo($("body"));

                                        var closeBtn = $('<div class="close"><div class="cw"> </div><div class="ccw"> </div><div class="close-alt">&#10007;</div></div>')
                                                .click(close);
                                        closeBtn.appendTo(imgContainer);
                                        showArrows();
                                }

                                move(current);
                        });
                };

                function move(index) {
                        if (index < 0 || index >= images.length) {
                                return;
                        }

                        showError(false);

                        current = index;

                        $(".lightbox-wrapper .lightbox-image:not(.active)").remove();

                        var active = $(".lightbox-wrapper .active");
                        var target = $('<img class="lightbox-image" alt="" src="' + getFullImgSrc($(images[current]).attr("src")) + '" />').click(function () {
                                if ($(this).hasClass("active")) {
                                        move(current + 1);
                                }
                        });

                        if (active.length > 0) {
                                active.after(target);
                        } else {
                                $(".lightbox-wrapper").append(target);
                        }

                        showArrows();
                        showLoader(true);

                        bindMouse($(".lightbox-wrapper").add(target));

                        target.load(function () {
                                showLoader(false);

                                active.removeClass("active");
                                target.addClass("active");
                        });

                        target.error(function () {
                                showLoader(false);
                                active.removeClass("active");
                                target.addClass("active");
                                target.attr("src", $(images[current]).attr("src"));
                        });
                }

                function showArrows() {
                        if ($(".lightbox-wrapper .arrow").length === 0) {
                                $(".lightbox-wrapper").append(
                                        $('<div class="arrow left"><div class="arrow-t ccw"> </div><div class="arrow-b cw"> </div><div class="arrow-left-alt">&#8592;</div></div>')
                                                .css("top", $(window).height() / 2 - 40)
                                                .click(function () {
                                                        if (!$(this).hasClass("disabled")) {
                                                                move(current - 1);
                                                        }
                                                })
                                );
                                $(".lightbox-wrapper").append(
                                        $('<div class="arrow right"><div class="arrow-t cw"> </div><div class="arrow-b ccw"> </div><div class="arrow-right-alt">&#8594;</div></div>')
                                                .css("top", $(window).height() / 2 - 40)
                                                .click(function () {
                                                        if (!$(this).hasClass("disabled")) {
                                                                move(current + 1);
                                                        }
                                                })
                                );
                        }

                        if (current === 0) {
                                $(".lightbox-wrapper .arrow.left").addClass("disabled");
                        } else {
                                $(".lightbox-wrapper .arrow.left").removeClass("disabled");
                        }

                        if (current === images.length - 1) {
                                $(".lightbox-wrapper .arrow.right").addClass("disabled");
                        } else {
                                $(".lightbox-wrapper .arrow.right").removeClass("disabled");
                        }
                }

                function showError(enable) {
                        if (enable) {
                                $(".lightbox-wrapper").append($('<div class="lightbox-error">The requested content cannot be loaded.<br/>Please try again later.</div>')
                                        .css({ "top": $(window).height() / 2 - 60, "left": $(window).width() / 2 - 170 }));
                        } else {
                                $(".lightbox-wrapper .lightbox-error").remove();
                        }
                }

                function showLoader(enable) {
                        if (!enable) {
                                $(".lightbox-wrapper .loading").remove();
                        }
                        else {
                                $('<div class="loading"> </div>').css({ "top": $(window).height() / 2 - 16, "left": $(window).width() / 2 - 16 }).appendTo($(".lightbox-wrapper"));
                        }
                }

                var close = function () {
                        $(".lightbox-wrapper").remove();
                };

                function bindMouse(img) {
                        img.bind('mousewheel DOMMouseScroll', function (e) {
                                var orgEvent = window.event || e.originalEvent;
                                var delta = (orgEvent.wheelDelta ? orgEvent.wheelDelta : orgEvent.detail * -1) > 0 ? 1 : -1;
                                move(current + delta);
                                e.preventDefault();
                        }).mousedown(function (e) {
                                // close on middle button click
                                if (e.which === 2) {
                                        close();
                                }
                                e.preventDefault();
                        });
                }

                function getFullImgSrc(src) {
                        var fileName = src.substring(0, src.lastIndexOf('.'));
                        var ext = src.substring(src.lastIndexOf('.'));
                        return fileName + "-large" + ext;
                }

        });
})(jQuery);

jQuery(function () {
        'use strict';
        new ThemeLightbox().init();
});

(function($) {
        'use strict';
        // transition && transitionEnd && browser prefix
        $.support.transition = (function() {
                var thisBody = document.body || document.documentElement,
                        thisStyle = thisBody.style,
                        support = thisStyle.transition !== undefined ||
                                thisStyle.WebkitTransition !== undefined ||
                                thisStyle.MozTransition !== undefined ||
                                thisStyle.MsTransition !== undefined ||
                                thisStyle.OTransition !== undefined;
                return support && {
                        event: (function() {
                                var e = "transitionend";
                                if (browser.opera) {
                                        var version = browser.version;
                                        e = version >= 12 ? (version < 12.50 ? "otransitionend" : "transitionend") : "oTransitionEnd";
                                } else if (browser.chrome || browser.safari) {
                                        e = "webkitTransitionEnd";
                                }
                                return e;
                        })(),
                        prefix: (function() {
                                return ({
                                        opera: "-o-",
                                        firefox: "-moz-",
                                        chrome: "-webkit-",
                                        safari: "-webkit-",
                                        ie: "-ms-"
                                }[browser.name]);
                        })()
                };
        })();

        window.BackgroundHelper = function () {
                var slides = [];
                var direction = "next";
                var motion = "horizontal";
                var width = 0;
                var height = 0;
                var multiplier = 1;
                var transitionDuration = "";

                this.init = function(motionType, dir, duration) {
                        direction = dir;
                        motion = motionType;
                        slides = [];
                        width = 0;
                        height = 0;
                        multiplier = 1;
                        transitionDuration = duration;
                };

                this.processSlide = function(element, modify) {
                        this.updateSize(element, null);
                        var pos = [];

                        var bgPosition = element.css("background-position");
                        var positions = bgPosition.split(",");
                        $.each(positions, function (i) {
                                var position = $.trim(this);
                                var point = position.split(" ");
                                if (point.length > 1) {
                                        var x = parseInt(point[0], 10);
                                        var y = parseInt(point[1], 10);
                                        pos.push({ x: x, y: y });
                                }
                        });

                        slides.push({
                                "images": element.css("background-image"),
                                "sizes": element.css("background-size"),
                                "positions": pos
                        });

                        if (modify)
                                element.css("background-image", "none");
                };

                this.updateSize = function (element, initialSize) {
                        width = element.outerWidth(false);
                        height = element.outerHeight();
                        if (initialSize && parseInt(initialSize.width, 10) !== 0) {
                                multiplier = width / initialSize.width;
                                if (motion === "fade") {
                                        $.each(element.children(), function (i) {
                                                $(this).css("background-position", getCssPositions(slides[i].positions, { x: 0, y: 0 }));
                                        });
                                }
                        }
                };

                this.setBackground = function(element, items) {
                        var bg = [];
                        var sizes = [];
                        $.each(items, function (i, o) {
                                bg.push(o.images);
                                sizes.push(o.sizes);
                        });
                        element.css({
                                "background-image": bg.join(", "),
                                "background-size": sizes.join(", "),
                                "background-repeat": "no-repeat"
                        });
                };

                this.setPosition = function(element, items) {
                        var pos = [];
                        $.each(items, function(i, o) {
                                pos.push(o.positions);
                        });
                        element.css({
                                "background-position": pos.join(", ")
                        });
                };

                this.current = function(index) {
                        return slides[index] || null;
                };

                this.next = function(index) {
                        var next;
                        if (direction === "next") {
                                next = (index + 1) % slides.length;
                        } else {
                                next = index - 1;
                                if (next < 0) {
                                        next = slides.length - 1;
                                }
                        }
                        return slides[next];
                };

                this.items = function(prev, next, move) {
                        var prevItem = { x: 0, y: 0 };
                        var nextItem = { x: 0, y: 0 };
                        var isDirectionNext = direction === "next";
                        if (motion === "horizontal") {
                                nextItem.x = isDirectionNext ? width : -width;
                                nextItem.y = 0;
                                if (move) {
                                        prevItem.x += isDirectionNext ? -width : width;
                                        nextItem.x += isDirectionNext ? -width : width;
                                }
                        } else if (motion === "vertical") {
                                nextItem.x = 0;
                                nextItem.y = isDirectionNext ? height : -height;
                                if (move) {
                                        prevItem.y += isDirectionNext ? -height : height;
                                        nextItem.y += isDirectionNext ? -height : height;
                                }
                        }
                        var result = [ ];
                        if (!!prev) {
                                result.push({ images: prev.images, positions: getCssPositions(prev.positions, prevItem), sizes: prev.sizes });
                        }
                        if (!!next) {
                                result.push({ images: next.images, positions: getCssPositions(next.positions, nextItem), sizes: next.sizes });
                        }

                        if (direction === "next") {
                                result.reverse();
                        }

                        return result;
                };

                this.transition = function(container, on) {
                        container.css($.support.transition.prefix + "transition", on ? transitionDuration + " ease-in-out background-position" : "");
                };

                function getCssPositions(positions, offset) {
                        var result = [];
                        if (positions === undefined) {
                                return "";
                        }
                        offset.x = offset.x || 0;
                        offset.y = offset.y || 0;
                        for (var i = 0; i < positions.length; i++) {
                                result.push((positions[i].x * multiplier + offset.x) + "px " + (positions[i].y * multiplier + offset.y) + "px");
                        }
                        return result.join(", ");
                }
        };


        var Slider = function (element, settings) {

                var interval = null;
                var active = false;
                var children = element.find(".active").parent().children();
                var last = false;
                var running = false;

                this.settings = $.extend({ }, {
                        "animation": "horizontal",
                        "direction": "next",
                        "speed": 600,
                        "pause": 2500,
                        "auto": true,
                        "repeat": true,
                        "navigator": null,
                        "clickevents": true,
                        "hover": true,
                        "helper": null
                }, settings);

                this.move = function (direction, next) {
                        var activeItem = element.find(".active"),
                                nextItem = next || activeItem[direction](),
                                innerDirection = this.settings.direction === "next" ? "forward" : "back",
                                reset = direction === "next" ? "first" : "last",
                                moving = interval,
                                slider = this, tmp;

                        active = true;

                        if (moving) { this.stop(true); }

                        if (!nextItem.length) {
                                nextItem = element.find(".slide-item")[reset]();
                                if (!this.settings.repeat) { last = true; active = false; return; }
                        }

                        if ($.support.transition) {
                                nextItem.addClass(this.settings.direction);
                                tmp = nextItem.get(0).offsetHeight;

                                activeItem.addClass(innerDirection);
                                nextItem.addClass(innerDirection);

                                element.trigger("beforeSlide", children.length);

                                element.one($.support.transition.event, function () {
                                        nextItem.removeClass(slider.settings.direction)
                                                .removeClass(innerDirection)
                                                .addClass("active");
                                        activeItem.removeClass("active")
                                                .removeClass(innerDirection);
                                        active = false;
                                        setTimeout(function () {
                                                element.trigger("afterSlide", children.length);
                                        }, 0);
                                });
                        } else {
                                element.trigger("beforeSlide", children.length);

                                activeItem.removeClass("active");
                                nextItem.addClass("active");
                                active = false;

                                element.trigger("afterSlide", children.length);
                        }

                        this.navigate(nextItem);

                        if (moving) { this.start(); }
                };

                this.navigate = function (position) {
                        var index = children.index(position);
                        $(this.settings.navigator).children().removeClass("active").eq(index).addClass("active");
                };

                this.to = function (index) {
                        var activeItem = element.find(".active"),
                                children = activeItem.parent().children(),
                                activeIndex = children.index(activeItem),
                                slider = this;

                        if (index > (children.length - 1) || index < 0) {
                                return;
                        }

                        if (active) {
                                return element.one("afterSlide", function () {
                                        slider.to(index);
                                });
                        }

                        if (activeIndex === index) {
                                return;
                        }

                        this.move(index > activeIndex ? "next" : "prev", $(children[index]));
                };

                this.next = function () {
                        if (!active) {
                                if (last) { this.stop(); return;  }
                                this.move("next");
                        }
                };

                this.prev = function () {
                        if (!active) {
                                if (last) { this.stop(); return; }
                                this.move("prev");
                        }
                };

                this.start = function (force) {
                        if (!!force) {
                                setTimeout($.proxy(this.next, this), 10);
                        }
                        interval = setInterval($.proxy(this.next, this), this.settings.pause);
                        running = true;
                };

                this.stop = function (pause) {
                        clearInterval(interval);
                        interval = null;
                        running = !!pause;
                        active = false;
                };

                this.active = function () {
                        return running;
                };

                this.moving = function () {
                        return active;
                };

                this.navigate(children.filter(".active"));

                if (this.settings.clickevents) {
                        $(this.settings.navigator).on("click", "a", { slider: this }, function (event) {
                                var activeIndex = children.index(children.filter(".active"));
                                var index = $(this).parent().children().index($(this));
                                if (activeIndex !== index) {
                                        event.data.slider.to(index);
                                }
                                event.preventDefault();
                        });
                }

                if (this.settings.hover) {
                        var slider = this;
                        element.add(this.settings.navigator)
                                .add(element.siblings(".shapes")).hover(function () {
                                if (element.is(":visible") && !last) { slider.stop(true); }
                        }, function () {
                                if (element.is(":visible") && !last) { slider.start(); }
                        });
                }
        };

        $.fn.slider = function (arg) {
                return this.each(function () {
                        var element = $(this),
                                data = element.data("slider"),
                                options = typeof arg === "object" && arg;

                        if (!data) {
                                data = new Slider(element, options);
                                element.data("slider", data);
                        }

                        if (typeof arg === "string" && data[arg]) {
                                data[arg]();
                        } else if (data.settings.auto && element.is(":visible")) {
                                data.start();
                        }
                });
        };

})(jQuery);




jQuery(window).bind("resize", (function ($) {
        /*global responsiveDesign */
        "use strict";
        return function () {
                if (typeof responsiveDesign !== "undefined" && responsiveDesign.isResponsive) {
                        $("header.header .shapes").children().css("left", "");
                        return;
                }
                var sheetWidth = $(".sheet").width();
                var sheetLeft = $(".sheet").offset().left;
                $("header.header .shapes>*, header.header>.textblock, header.header>.headline, header.header>.slogan, header.header>.positioncontrol").each(function () {
                        var object = $(this);
                        var objectLeft = sheetWidth * parseFloat(object.attr("data-left") || "0") / 100 + sheetLeft;
                        object.css("left", objectLeft + "px");
                });
        };
})(jQuery));

jQuery(function ($) {
        "use strict";
        $(window).trigger("resize");
});
jQuery(function ($) {
        "use strict";
        if (!browser.ie || browser.version > 8)
                return;
        var path = "";
        var scripts = $("script[src*='script.js']");
        if (scripts.length > 0) {
                var src = scripts.last().attr('src');
                path = src.substr(0, src.indexOf("script.js"));
        }
        processHeaderMultipleBg(path);
});

var processHeaderMultipleBg = (function ($) {
        "use strict";
        return (function (path) {
                var header = $(".header");
                var bgimages = "".split(",");
                var bgpositions = "".split(",");
                for (var i = bgimages.length - 1; i >= 0; i--) {
                        var bgimage = $.trim(bgimages[i]);
                        if (bgimage === "")
                                continue;
                        if (path !== "") {
                                bgimage = bgimage.replace(/(url\(['"]?)/i, "$1" + path);
                        }
                        header.append("<div style=\"position:absolute;top:0;left:0;width:100%;height:100%;background:" + bgimage + " " + bgpositions[i] + " no-repeat\">");
                }
                header.css('background-image', "url('images/header.png')".replace(/(url\(['"]?)/i, "$1" + path));
                header.css('background-position', "center top");
        });
})(jQuery);

(function ($) {
        'use strict';

        /*global jQuery, artButtonSetup */

        $(function () {
                artButtonSetup("btn-primary");
                artButtonSetup("button");
                artButtonSetup("readon");
                artButtonSetup("readmore");
        });

        $(function ($) {
                var links = $('a.rss-tag-icon[href="#"], a.rss-tag-icon[href=""]'),
                        href = $('head link[type="application/rss+xml"]').attr('href');
                if (href) {
                        links.attr('href', href);
                } else {
                        links.hide();
                }
        });

        $(function ($) {
                $('.messages').each(function () {
                        $(this).css('display', $(this).find('dl, .alert').length ? '' : 'none');
                });
        });

        $(function ($) {
                $('.search-button').each(function (i, val) {
                        var element = $(val),
                                background = element.css('background-image');

                        if (-1 !== background.indexOf('url')) {
                                element.val('');
                        }
                        if (element.hasClass('button')) {
                                element.removeClass('button');
                        }
                });
        });

        $(function ($) {
                // ie < 9 slider multiple background joomla fix
                if (!browser.ie || browser.version > 8) {
                        return;
                }

                var scriptSrc = jQuery('script[src*="script.js"]').last().attr('src'),
                        pathToImages = scriptSrc.substr(0, scriptSrc.lastIndexOf('/') + 1) + 'data/images/';

                $('.slider .slide-item').each(function () {
                        var bg = $(this).css('background-image');
                        if (bg) {
                                bg = bg.replace(/url\(["'](.+)["']\)/, function (match, path) {
                                        var imageName = path.substr(path.lastIndexOf('/') + 1);
                                        return 'url(\'' + pathToImages + imageName + '\')';
                                });
                                $(this).css('background-image', bg);
                        }
                });
        });

}(jQuery));

jQuery(document).ready(function(){

        jQuery('input[name=phone],input#phone').mask('+7 (999) 999-99-99');

        jQuery("input, textarea").focus(function(){
                if (jQuery(this).attr("placeholder") == jQuery(this).attr("title"))
                        jQuery(this).attr("placeholder", "")
        });

        jQuery("input, textarea").blur(function(){
                if (jQuery(this).attr("placeholder") == "")
                        jQuery(this).attr("placeholder", jQuery(this).attr("title"))
        });

        jQuery(".clients-slider").jcarousel({
                wrap: 'circular',
        }).jcarouselAutoscroll({
                interval: 5000,
                autostart: true
        });

        jQuery('.cl-arr-l')
                .on('jcarouselcontrol:active', function() {
                        jQuery(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                        jQuery(this).addClass('inactive');
                })
                .jcarouselControl({
                        target: '-=1'
                });

        jQuery('.cl-arr-r')
                .on('jcarouselcontrol:active', function() {
                        jQuery(this).removeClass('inactive');
                })
                .on('jcarouselcontrol:inactive', function() {
                        jQuery(this).addClass('inactive');
                })
                .jcarouselControl({
                        target: '+=1'
                });

        jQuery('.show_comment_all').click(function(e){
                e.preventDefault();
                if(jQuery(this).hasClass('active')) {
                        jQuery(this).removeClass('active');
                        jQuery(this).text("РїРѕРєР°Р·Р°С‚СЊ РїСЂРѕР»РЅРѕСЃС‚СЊСЋ");
                        jQuery(this).parent().find('.all_comment').addClass('unvisible');
                        jQuery(this).parent().find('.intro_comment').removeClass('unvisible');
                }
                else {
                        jQuery(this).addClass('active');
                        jQuery(this).text("СЃРєСЂС‹С‚СЊ");
                        jQuery(this).parent().find('.all_comment').removeClass('unvisible');
                        jQuery(this).parent().find('.intro_comment').addClass('unvisible');
                }
        });



        let data = new Date();
        jQuery('.year').text(data.getFullYear())



        jQuery('.spoiler_item .spoiler_title').click(function(){
                let parent = jQuery(this).parent('.spoiler_item');

                if(parent.hasClass('spoiler_show')){

                        parent.removeClass('spoiler_show')
                }else{

                        jQuery('.spoiler_item.spoiler_show').removeClass('spoiler_show')

                        parent.addClass('spoiler_show')
                        setTimeout(()=>{
                                jQuery('html, body').animate({
                                        scrollTop: parent.offset().top-(parent.children('.spoiler_title').height())
                                }, 300);
                        },300)
                }

        })


//cards

        Vue.config.devtools = true;

        Vue.component('card', {
                template: `
    <a class="card-wrap"
    :href="cardLink"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="card">
    <div class="card"
    :style="cardStyle">
    <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
    <div class="card-info" :style="[heightInfo]" ref="box">
    <slot name="header"></slot>
    <slot name="content" ></slot>
    </div>
    </div>
    </a>`,
                mounted() {
                        this.width = this.$refs.card.offsetWidth;
                        this.height = this.$refs.card.offsetHeight;
                        this.p_height = this.$refs.box.lastElementChild.offsetHeight;
                        this.box = this.$refs.box;

                },
                props: ['dataImage','dataHref'],
                data: () => ({
                        width: 0,
                        height: 0,
                        mouseX: 0,
                        mouseY: 0,
                        mouseLeaveDelay: null
                }),
                computed: {
                        mousePX() {
                                console.log('mousePX', this.mouseX, this.width)
                                return this.mouseX / this.width;

                        },
                        mousePY() {
                                console.log('mousePY', this.mouseY, this.height)
                                return this.mouseY / this.height;
                        },
                        cardStyle() {
                                const rX = this.mousePX * 30;
                                const rY = this.mousePY * -30;

                                return {
                                        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
                                };
                        },
                        cardBgTransform() {
                                const tX = this.mousePX * -40;
                                const tY = this.mousePY * -40;
                                return {
                                        transform: `translateX(${tX}px) translateY(${tY}px)`
                                };
                        },
                        cardBgImage() {
                                return {
                                        backgroundImage: `url(${this.dataImage})`
                                };
                        },
                        cardLink() {
                                return(
                                        this.dataHref
                                )

                        },
                        heightInfo() {
                                this.height
                                return {
                                        transform: ` translateY(${this.p_height}px)`
                                };
                        }

                },
                methods: {
                        handleMouseMove(e) {

                                this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
                                this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
                        },
                        handleMouseEnter() {
                                this.box.style.transform=`translateY(0px)`
                                clearTimeout(this.mouseLeaveDelay);
                        },
                        handleMouseLeave() {
                                this.box.style.transform='translateY('+this.p_height+'px)'

                                this.mouseLeaveDelay = setTimeout(() => {
                                        this.mouseX = 0;
                                        this.mouseY = 0;
                                }, 1000);
                        }
                }
        });



        const app = new Vue({
                el: '.card_init' });






});




jQuery(function ($) {
        var getElementsByClassName = function (className, tag, elm){
                if (document.getElementsByClassName) {
                        getElementsByClassName = function (className, tag, elm) {
                                elm = elm || document;
                                var elements = elm.getElementsByClassName(className),
                                        nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                                        returnElements = [],
                                        current;
                                for(var i=0, il=elements.length; i<il; i+=1){
                                        current = elements[i];
                                        if(!nodeName || nodeName.test(current.nodeName)) {
                                                returnElements.push(current);
                                        }
                                }
                                return returnElements;
                        };
                }
                else if (document.evaluate) {
                        getElementsByClassName = function (className, tag, elm) {
                                tag = tag || "*";
                                elm = elm || document;
                                var classes = className.split(" "),
                                        classesToCheck = "",
                                        xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                                        namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                                        returnElements = [],
                                        elements,
                                        node;
                                for(var j=0, jl=classes.length; j<jl; j+=1){
                                        classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                                }
                                try	{
                                        elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                                }
                                catch (e) {
                                        elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                                }
                                while ((node = elements.iterateNext())) {
                                        returnElements.push(node);
                                }
                                return returnElements;
                        };
                }
                else {
                        getElementsByClassName = function (className, tag, elm) {
                                tag = tag || "*";
                                elm = elm || document;
                                var classes = className.split(" "),
                                        classesToCheck = [],
                                        elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                                        current,
                                        returnElements = [],
                                        match;
                                for(var k=0, kl=classes.length; k<kl; k+=1){
                                        classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                                }
                                for(var l=0, ll=elements.length; l<ll; l+=1){
                                        current = elements[l];
                                        match = false;
                                        for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                                                match = classesToCheck[m].test(current.className);
                                                if (!match) {
                                                        break;
                                                }
                                        }
                                        if (match) {
                                                returnElements.push(current);
                                        }
                                }
                                return returnElements;
                        };
                }
                return getElementsByClassName(className, tag, elm);
        };


        function reload_table(){

                var headertext = [],
                        headers = document.querySelectorAll(".table-mobile tr:first-child td" ),
                        tablerows = document.querySelectorAll(".table-mobile th"),
                        tablebody = document.querySelectorAll(".table-mobile tbody");
                console.log(tablebody[0].rows);
                for(var i = 0; i < headers.length; i++) {
                        var current = headers[i];
                        headertext.push(current.textContent.replace(/\r?\n|\r/," "));

                }
                for(var h = 0; h < tablebody.length; h++) {
                        for (var i = 0, row; row = tablebody[h].rows[i]; i++) {
                                for (var j = 0, col; col = row.cells[j]; j++) {
                                        // console.log(col);
                                        col.setAttribute("data-th", headertext[j]);
                                }
                        }
                }
        }

        reload_table();

});




