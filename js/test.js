$(function() {
    function e(e) {
        var t = new RegExp("^\\s+|\\s+$")
          , n = $("#kw").val().replace(t, "");
        ns_c({
            fm: "behs",
            tab: e,
            query: encodeURIComponent(n),
            un: encodeURIComponent(bds.comm.user || "")
        })
    }

    function t(e, t) {
        var n, s = j;
        e.mouseover(function() {
            t.show(),
            m && m.hide(),
            i(_),
            n && (clearTimeout(n),
            n = !1)
        }),
        e.mouseout(function() {
            n && (clearTimeout(n),
            n = !1),
            n = setTimeout(function() {
                t.hide()
            }, s)
        }),
        t.mouseover(function() {
            m && m.hide(),
            i(_),
            n && (clearTimeout(n),
            n = !1)
        }),
        t.mouseout(function() {
            n && (clearTimeout(n),
            n = !1),
            n = setTimeout(function() {
                t.hide()
            }, s)
        })
    }
    function n() {
        return bds.comm && bds.comm.ishome && bds.comm.sIndex
    }
    function i() {
        _ && clearTimeout(_),
        k && clearTimeout(k),
        C && clearTimeout(C)
    }
    function s(e, t) {
        var n = $(document).width() - t.offset().left - e.width() / 2 - t.width() / 2;
        e.css({
            display: "block",
            right: n
        }),
        $("#s-user-name-menu").hide(),
        i()
    }
    function o(e) {
        C = setTimeout(function() {
            e.hide()
        }, j)
    }
    function a() {
        var e = l.offset()
          , t = l.height()
          , n = 48;
        n += bds.comm.username ? $(".username").width() : $(".lb[name=tj_login]").width();
        var s = n - (m.width() - l.width()) / 2;
        bds.comm.ishome ? m && m.css({
            left: e.left - 20,
            top: e.top + t + 5
        }) : m && m.css({
            right: s,
            top: 48
        }),
        m && m.show(),
        u && u.hide(),
        b && b.hide(),
        l.addClass("pfhover"),
        i(_)
    }
    function r() {
        _ = setTimeout(function() {
            m && m.hide(),
            l && l.removeClass("pfhover")
        }, j)
    }
    function c() {
        b && b.hide(),
        m && m.hide(),
        u && u.hide()
    }
    function d() {
        var t, i, s, o, s, a = $("<a class='setpref' href='javascript:;'>搜索设置</a>"), r = navigator.userAgent.toLowerCase().match(/msie\s+(\d*)/), c = (r && 6 == r[1],
        []);
        if (!n()) {
            m = $(".bdpfmenu");
            var d = '<div class="bdnuarrow"><em></em><i></i></div>';
            m.append(d)
        }
        if (a.on("mousedown", function() {
            return e("tj_setting"),
            !1
        }),
        a.on("click", function(e) {
            e.preventDefault(),
            I({
                callback: function() {
                    bds.event.trigger("bd.se.showpanel", {
                        tab: "general"
                    })
                }
            })
        }),
        t = $("<a href='//www.baidu.com/gaoji/advanced.html' target='_blank'>高级搜索</a>"),
        t.on("mousedown", function() {
            return e("tj_advsearch"),
            !1
        }),
        t.on("click", function(e) {
            e.preventDefault(),
            I({
                callback: function() {
                    bds.event.trigger("bd.se.showpanel", {
                        tab: "advanced"
                    })
                }
            })
        }),
        bds && bds.comm && bds.comm.ishome && bds.comm.skin && (!window.s_domain || !window.s_domain.base || "home" != window.s_domain.base)) {
            o = $("<a href='javascript:' target='_blank'>换肤设置</a>");
            var l = Cookie.get("H_PS_SKIN_GI") || "0";
            (!l || parseInt(l) < 4) && o.append('<span class="c-icon c-icon-reddot"></span>'),
            o.on("click", function(e) {
                $_this = this,
                e.preventDefault(),
                I({
                    callback: function() {
                        bds.event.trigger("bd.se.showpanel", {
                            tab: "skin"
                        }),
                        $(".c-icon-reddot", $_this).hide()
                    }
                })
            })
        }
        if (bds.comm.ishome && window.s_domain && window.s_domain.base && "home" == window.s_domain.base ? i = $("<a href='https://www.baidu.com/duty/privacysettings.html' target='_blank'>隐私设置</a>").on("mousedown", function() {
            return e("tj_history"),
            !1
        }) : (i = $("<a href='javascript:;'>隐私设置</a>").on("mousedown", function() {
            return e("tj_history"),
            !1
        }),
        i.on("click", function() {
            return bds.comm.username ? (location.href = "https://www.baidu.com/duty/privacysettings.html",
            !1) : void (bds.se.login && bds.se.login.open && bds.se.login.open(function(e) {
                return 1 == e ? (location.href = "https://www.baidu.com/duty/privacysettings.html",
                !1) : void 0
            }, !0))
        })),
        (bds.comm.supportis || 2 == Cookie.get("ORIGIN")) && (s = 0 == UPS.get("isSwitch") ? $("<a href='javascript:;'>开启预测</a>").click(function() {
            return UPS.set("isSwitch", 1),
            UPS.save(function() {
                location.reload()
            }),
            !1
        }) : $("<a href='javascript:;'>关闭预测</a>").click(function() {
            return UPS.set("isSwitch", 0),
            UPS.save(function() {
                location.reload()
            }),
            !1
        })),
        bds && bds.comm && bds.comm.ishome && bds.comm.skin ? (c = [a, t, o, s, i],
        $(window).on("index_off", function() {
            o.hide(),
            $("[data-tabid='skin']").hide()
        })) : c = [a, t, s, i],
        n()) {
            var u = $("#s-user-setting-menu .s-user-setting-pfmenu");
            u.html()
        }
        for (var b = 0, p = c.length; p > b; b++) {
            var h = c[b];
            h && (n() ? u.append(h) : m.append(h))
        }
    }
    !function(e, t, n, i) {
        e && t && (e.on("mouseover", function() {
            e.addClass("ipthover")
        }).on("mouseout", function() {
            e.removeClass("ipthover")
        }),
        t.on("focus", function() {
            e.addClass("iptfocus")
        }).on("blur", function() {
            e.removeClass("iptfocus")
        }).on("render", function() {
            var t = e.parent().find(".bdsug")
              , n = t.find("li").length;
            n >= 5 ? t.addClass("bdsugbg") : t.removeClass("bdsugbg")
        })),
        n && i && n.on("mouseover", function() {
            i.addClass("btnhover")
        }).on("mouseout", function() {
            i.removeClass("btnhover"),
            i.removeClass("s_btn_h")
        }).on("mousedown", function() {
            i.removeClass("btnhover"),
            i.addClass("s_btn_h")
        }).on("mouseup", function() {
            i.addClass("btnhover"),
            i.removeClass("s_btn_h")
        })
    }($(".s_ipt_wr"), $(".s_ipt"), $(".s_btn_wr"), $(".s_btn"));
    var l, m, u, b, p = ($("#wrapper"),
    $("#u")), h = $("#u .pf,#u1 .pf,#u_sp .pf"), f = 0, v = $("<input type='hidden' name='rsv_enter' value='1'>");
    $("#form").append(v),
    $("#su").on("mousedown", function() {
        v.val(0)
    }),
    $(document).on("click", function() {
        c()
    }),
    p.delegate(".username", "mouseover", function() {
        if (0 == $(this).nextAll(".usermenu").length) {
            var n = '<a href="http://i.baidu.com/msg/messages/list/" class="new-pmd" target="_blank" onmousedown="return user_c({\'fm\':\'set\',\'tab\':\'msg\'})"><span>消息</span><span class="s-msg-count c-capsule-tip"></span></a>';
            u = $('<div class="usermenu"><div class="bdnuarrow"><em></em><i></i></div>' + "<a href=\"http://i.baidu.com\" onmousedown=\"return user_c({'fm':'set','tab':'uc_center'})\">个人中心</a>" + n + '<a href="http://passport.baidu.com" name="tj_user">帐号设置</a><a class="set-feedback" href="javascript:;">意见反馈</a><a href="http://passport.baidu.com/?logout&tpl=mn&u=" onmousedown="return user_c({\'fm\':\'set\',\'tab\':\'logout\'})" class="logout" name="tj_logout">退出</a></div>').insertAfter(this),
            u.delegate(".set-feedback", "click", function() {
                return $(".fb-feedback-right-dialog").length > 0 ? !1 : (e("tj_feedback"),
                void require(["plugins/feedback_suggest"], function(e) {
                    e.init(),
                    $(".feedback").on("click", function() {
                        e.destroy()
                    })
                }))
            }),
            u.delegate(".logout", "click", function() {
                return window.isNeedContentExitCover ? $.getScript("https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/plugins/resultLogout_0c7201d.js", function() {
                    var e = new ResultPageExit;
                    e.show()
                }) : (bds.se && bds.se.store && bds.se.store.set && bds.se.store.set("wwwPassLogout", 1),
                location.href = this.href + encodeURIComponent(location.href)),
                !1
            }),
            b = $('<div class="bdnuarrow arrowusermenu"></div>').insertAfter(this),
            u.click(function(e) {
                e.stopPropagation()
            }),
            b.click(function(e) {
                e.stopPropagation()
            }),
            t($(this), u.add(b))
        }
        var i = $(this).offset()
          , s = i.left
          , o = ($(this).width() - u.width()) / 2 + 24;
        u.css({
            top: 48,
            right: o
        }),
        b.offset({
            top: i.top + 18,
            left: s
        })
    }),
    h.on("click", function() {
        return !1
    });
    var g = $("#s-user-setting-menu");
    if (n()) {
        var w = 0;
        $("#s-usersetting-top").on("mouseenter", function(e) {
            var t = $(this);
            e.stopPropagation(),
            e.preventDefault(),
            w || (d(),
            w = 1),
            s(g, t)
        }).on("mouseleave", function() {
            o(g)
        }),
        g.on("mouseenter", function() {
            i()
        }).on("mouseleave", function() {
            o(g)
        })
    }
    h.on("mouseenter", function(e) {
        if (f = !!m,
        l = $(this),
        p = $(this).parent(),
        e.stopPropagation(),
        e.preventDefault(),
        f || (d(),
        f = 1,
        m.show().hover(function() {
            a()
        }, function() {
            r()
        })),
        $(".usermenu") && $(".usermenu").hide(),
        a(),
        bds && bds.comm && bds.comm.ishome && bds.comm.skin) {
            var t = Cookie.get("H_PS_SKIN_GO") || "0";
            Cookie.set("H_PS_SKIN_GO", parseInt(t) + 4, document.domain, "/", new Date((new Date).getTime() + 5184e6)),
            $(".frontpage-rt-guide").hide();
            var n = Cookie.get("H_PS_SKIN_GI") || "0";
            n && parseInt(n) > 3 ? $(".bdpfmenu .c-icon-reddot").hide() : Cookie.set("H_PS_SKIN_GI", parseInt(n) + 1, document.domain, "/", new Date((new Date).getTime() + 5184e6))
        }
    }).on("mouseleave", function() {
        r()
    });
    var _, k, C, j = 200, I = function(e) {
        var t = e.callback
          , n = I.status;
        if ($.isFunction(t) && I.callbacklist.push(t),
        "pendding" !== n)
            if ("loaded" !== n)
                I.status = "pendding",
                $.ajax({
                    dataType: "script",
                    cache: !0,
                    url: "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/js/instant_44e9ff8.js",
                    success: function() {
                        if (I.callbacklist.length > 0) {
                            for (var e = 0, t = I.callbacklist.length; t > e; e++)
                                I.callbacklist[e]();
                            I.callbacklist = []
                        }
                        if (I.status = "loaded",
                        bds && bds.comm && bds.comm.ishome && bds.comm.skin) {
                            var n = Cookie.get("H_PS_SKIN_GI") || "0";
                            Cookie.set("H_PS_SKIN_GI", parseInt(n) + 4, document.domain, "/", new Date((new Date).getTime() + 5184e6))
                        }
                    }
                });
            else if (I.callbacklist.length > 0) {
                for (var i = 0, s = I.callbacklist.length; s > i; i++)
                    I.callbacklist[i]();
                I.callbacklist = []
            }
    };
    I.callbacklist = [],
    I.status = "ready",
    bds.event && bds.event.on("bd.se.loadpanel", function(e) {
        var t = e.data;
        I({
            callback: function() {
                bds.event.trigger("bd.se.showpanel", t)
            }
        })
    });
    var m
}),
$(function() {
    function e(e) {
        var t = new RegExp("^\\s+|\\s+$")
          , n = $("#kw").get(0).value.replace(t, "");
        ns_c({
            fm: "behs",
            tab: e,
            query: encodeURIComponent(n),
            un: encodeURIComponent(bds.comm.user || "")
        })
    }
    function t() {
        h && clearTimeout(h),
        f && clearTimeout(f)
    }
    function n() {
        var e = $(".briguide");
        e && e.hide(),
        d && (d.css({
            display: "block",
            opacity: "0",
            "min-height": m
        }),
        "undefined" == typeof document.body.style.maxHeight && d.css({
            height: m
        }),
        d.find(".briscrollwrapper").scrollTop(0),
        d.css({
            display: "none",
            opacity: "1"
        }).fadeIn(v)),
        c && c.show(),
        r && r.render($(window).height() - b.offset().top - 34 - 20),
        t(f)
    }
    function i() {
        f = setTimeout(function() {
            d && d.fadeOut(v),
            c && c.hide()
        }, v)
    }
    function s() {
        c && c.hide(),
        d && d.hide()
    }
    function o() {
        p || (c = $("<div>", {
            "class": "bdnuarrow bdbriarrow"
        }),
        c.appendTo(u))
    }
    function a() {
        function t(e) {
            function t(e, t, n) {
                return n && (e = e > n ? n : e),
                e >= t ? e : t
            }
            function n() {
                z.call(window, {
                    value: M,
                    scale: S
                })
            }
            function i() {
                b && clearInterval(b),
                o(),
                b = setInterval(function() {
                    X ? o() : clearInterval(b)
                }, 100)
            }
            function s() {
                p && clearInterval(p),
                a(),
                p = setInterval(function() {
                    Z ? a() : clearInterval(p)
                }, 100)
            }
            function o() {
                var e = M - T;
                e = 0 > e ? 0 : e,
                l(e)
            }
            function a() {
                var e = M + T;
                e = e > 1 ? 1 : e,
                l(e)
            }
            function r(e) {
                e = window.event || e;
                var n = t(e.clientY - F, q, B);
                return M = (n - q) / (B - q),
                $(O).css({
                    top: n + "px"
                }),
                !1
            }
            function c() {
                return $(f).removeClass("bdbriscroll-ctrl-scroll-hover"),
                $(f).removeClass("bdbriscroll-ctrl-scroll-touch"),
                $(O).removeClass("bdbriscroll-slider-hover"),
                $(O).removeClass("bdbriscroll-slider-touch"),
                $(g).css({
                    "-moz-user-select": ""
                }),
                $(g).css({
                    "-webkit-user-select": ""
                }),
                Q && window.clearInterval(Q),
                document.onselectstart = J ? J : function() {
                    return !0
                }
                ,
                $(document).unbind("mousemove", r),
                $(document).unbind("mouseup", c),
                $(O).addClass("bdbriscroll-slider OP_LOG_BTN"),
                W = 0,
                !1
            }
            function d(e) {
                l((e.offsetY || e.layerY) / E)
            }
            function l(e, t) {
                e = 0 > e ? 0 : e,
                e = e > 1 ? 1 : e,
                M = e;
                var i = (B - q) * M + q;
                $(O).css({
                    top: i + "px"
                }),
                t || n()
            }
            function m(e) {
                if (e.preventDefault(),
                e = e.originalEvent) {
                    this.onwheel = 1;
                    var t = (-e.wheelDelta || e.detail && 40 * e.detail || 0) / j
                      , n = t
                      , i = n > 0 ? v.scrollTop + 2 : v.scrollTop - 2;
                    $(g).css({
                        zoom: "1"
                    }),
                    i > 0 && i < g.offsetHeight - v.offsetHeight ? (v.scrollTop += n,
                    M = v.scrollTop / (v.scrollHeight - v.offsetHeight)) : C && "none" != $(f).css("display") || (document.documentElement.scrollTop += n,
                    document.body.scrollTop += n)
                }
            }
            function u(e) {
                if (S = e > 10 ? 10 : e,
                1 >= S)
                    return void $(O).css({
                        display: "none"
                    });
                $(O).css({
                    display: "block"
                });
                var t = E - 2 * L;
                Y = parseInt(t / S),
                Y = 15 > Y ? 15 : Y,
                B = E - L - Y,
                $(O).css({
                    height: Y + "px"
                })
            }
            this.options = e;
            var b, p, h, f = e.scrollbar || $("<div>").get(0), v = e.content, g = $(e.content).children().get(0), w = e.initPos || 0, _ = e.initDom || null, k = e.mousewheel || !0, C = e.mousewheellock || !1, j = e.wheeldelta || 1, I = e.ctrlblock || 0, T = e.step || .1, y = e.length, S = e.scale || 0, P = (e.theme || "",
            e.refresh || !1), H = 0, D = 0, x = 0, z = function(e) {
                var t = parseInt(H - D);
                if (t > 0) {
                    var e = e.value;
                    v.scrollTop = t * e
                }
            }, N = $("<div>", {
                "class": "bdbriscroll-up"
            }).get(0), G = $("<div>", {
                "class": "bdbriscroll-down"
            }).get(0), K = $("<div>", {
                "class": "bdbriscroll-axis"
            }).get(0), O = $("<div>", {
                "class": "bdbriscroll-slider OP_LOG_BTN"
            }).get(0), U = $("<div>", {
                "class": "bdbriscroll-s-top"
            }).get(0), R = $("<div>", {
                "class": "bdbriscroll-s-bottom"
            }).get(0), A = $("<div>", {
                "class": "bdbriscroll-s-block"
            }).get(0), E = 0, L = I || 0, Y = 0, q = L, B = 0, M = 0, F = 0, W = 0, J = null, Q = null, V = function() {
                X = !1,
                Z = !1
            };
            if (e.scrollbar || $(v).after($(f)),
            $(v).addClass("bdbriscroll-ctrl-content"),
            $(f).addClass("bdbriscroll-ctrl-scroll"),
            $(f).attr("data-click", '{fm:"beha"}'),
            this.render = function(e) {
                P || clearInterval(h);
                try {
                    D = v.offsetHeight,
                    x = f.offsetHeight,
                    H = g.offsetHeight
                } catch (n) {}
                if (E = e || y || D - 22,
                $(f).css({
                    height: E + "px"
                }),
                $(K).css({
                    height: E + "px"
                }),
                E >= 0 && H >= 0) {
                    E + 22 >= H ? $(f).hide() : $(f).show(),
                    S != H / E && (S = H / E,
                    u(S),
                    l(0));
                    var i = 0;
                    if (_) {
                        i = _.offsetTop + _.scrollHeight >= H ? 1 : _.offsetTop + _.scrollHeight <= D ? 0 : _.offsetTop / H,
                        l(i);
                        var s = t(x * i, q);
                        s > E - Y && (s = E - Y)
                    }
                    if (w) {
                        l(w);
                        var s = t(x * w, q);
                        s > E - Y && (s = E - Y)
                    }
                }
            }
            ,
            h = setInterval(this.render, 50),
            $(f).empty(),
            I && N.offsetHeight == G.offsetHeight) {
                var X = !1
                  , Z = !1;
                f.appendChild(N),
                f.appendChild(G),
                $(N).on("mousedown", function() {
                    i(),
                    X = !0
                }),
                $(G).on("mousedown", function() {
                    s(),
                    Z = !0
                }),
                $(N).on("mouseup", function() {
                    $(f).removeClass("bdbriscroll-ctrl-scroll-touch"),
                    X = !1
                }),
                $(G).on("mouseup", function() {
                    $(f).removeClass("bdbriscroll-ctrl-scroll-touch"),
                    Z = !1
                }),
                $(document).on("mouseup", V)
            }
            f.appendChild(K),
            f.appendChild(O),
            O.appendChild(U),
            O.appendChild(R),
            O.appendChild(A),
            O.onDragstart = function() {
                return !1
            }
            ,
            $(O).on("mouseover", function() {
                $(O).addClass("bdbriscroll-slider-hover"),
                $(f).addClass("bdbriscroll-ctrl-scroll-hover")
            }),
            $(O).on("mousedown", function() {
                $(O).addClass("bdbriscroll-slider-touch"),
                $(f).addClass("bdbriscroll-ctrl-scroll-touch")
            }),
            $(O).on("mouseout", function() {
                $(O).removeClass("bdbriscroll-slider-hover")
            }),
            $(O).on("mouseup", function() {
                $(O).removeClass("bdbriscroll-slider-touch")
            }),
            $(f).on("mouseover", function() {
                $(f).addClass("bdbriscroll-ctrl-scroll-hover")
            }),
            $(f).on("mousedown", function() {
                $(f).addClass("bdbriscroll-ctrl-scroll-touch")
            }),
            $(f).on("mouseout", function() {
                $(f).removeClass("bdbriscroll-ctrl-scroll-hover")
            }),
            $(f).on("mouseup", function() {
                $(f).removeClass("bdbriscroll-ctrl-scroll-touch")
            }),
            $(K).on("click", d),
            k && !this.onwheel && ($(v).hasClass("bdbriscroll-onwheel") || ($(v).on("DOMMouseScroll", m),
            $(v).on("mousewheel", m),
            $(v).addClass("bdbriscroll-onwheel"))),
            v && $(v).on("scroll", function() {
                W || l(v.scrollTop / (v.scrollHeight - v.offsetHeight), 1)
            }),
            $(O).on("mousedown", function(e) {
                return J = document.onselectstart,
                document.onselectstart = function() {
                    return !1
                }
                ,
                Q = window.setInterval(n, 40),
                $(g).css({
                    "-moz-user-select": "none"
                }),
                $(g).css({
                    "-webkit-user-select": "none"
                }),
                F = e.clientY - O.offsetTop,
                $(document).on("mousemove", r),
                $(document).on("mouseup", c),
                W = 1,
                e.preventDefault(),
                !1
            }),
            S > 1 && u(S),
            this.dispose = function() {
                document.onselectstart = J ? J : function() {
                    return !0
                }
                ,
                $(document).unbind("mousemove", r),
                $(document).unbind("mouseup", c),
                $(document).unbind("mouseup", V),
                Q && clearInterval(Q),
                b && clearInterval(b),
                p && clearInterval(p),
                h && clearInterval(h)
            }
        }
        if (d = $("<div>", {
            "class": "bdbri"
        }).appendTo($(".head_wrapper")),
        d.on("click", function(e) {
            e.stopPropagation()
        }),
        u.hasClass("bdbrilink"))
            ;
        else {
            d.addClass("bdbriimg").html($(".mnav_nuomi").length ? "<div class='bdmainlink'><div class='bdbriimgtitle'>更多产品</div><div class='briscrollwrapperContainer'><div class='briscrollwrapper'><div class='bdbriwrapper'><a href='http://zhidao.baidu.com' name='tj_zhidao'><span class='bdbriimgitem_2'></span>知道</a><a href='http://music.taihe.com' name='tj_mp3'><span class='bdbriimgitem_3'></span>音乐</a><a href='http://image.baidu.com' name='tj_img'><span class='bdbriimgitem_4'></span>图片</a><a href='http://wenku.baidu.com' name='tj_wenku'><span class='bdbriimgitem_5'></span>文库</a><a href='http://top.baidu.com' name='tj_bang'><span class='bdbriimgitem_6'></span>风云榜</a><a href='http://e.baidu.com/?refer=888' name='tj_tuiguang'><span class='bdbriimgitem_7'></span>百度推广</a><div class='bdbrievenmore'><a href='//www.baidu.com/more/' name='tj_more'>全部产品&gt;&gt;</a></div></div></div></div></div>" : 1 == window._sam_ns_nuomi ? "<div class='bdmainlink'><div class='bdbriimgtitle'>更多产品</div><div class='briscrollwrapperContainer'><div class='briscrollwrapper'><div class='bdbriwrapper'><a href='https://www.hao123.com' name='tj_hao123'><span class='bdbriimgitem_hao123'></span>hao123</a><a href='http://music.taihe.com' name='tj_mp3'><span class='bdbriimgitem_3'></span>音乐</a><a href='http://image.baidu.com' name='tj_img'><span class='bdbriimgitem_4'></span>图片</a><a href='http://zhidao.baidu.com' name='tj_zhidao'><span class='bdbriimgitem_2'></span>知道</a><a href='http://wenku.baidu.com' name='tj_wenku'><span class='bdbriimgitem_5'></span>文库</a><a href='http://top.baidu.com' name='tj_bang'><span class='bdbriimgitem_6'></span>风云榜</a><a href='http://e.baidu.com/?refer=888' name='tj_tuiguang'><span class='bdbriimgitem_7'></span>百度推广</a><div class='bdbrievenmore'><a href='//www.baidu.com/more/' name='tj_more'>全部产品&gt;&gt;</a></div></div></div></div></div>" : 2 == window._sam_ns_nuomi ? "<div class='bdmainlink'><div class='bdbriimgtitle'>更多产品</div><div class='briscrollwrapperContainer'><div class='briscrollwrapper'><div class='bdbriwrapper'><a href='http://v.baidu.com' name='tj_video'><span class='bdbriimgitem_video'></span>视频</a><a href='http://music.taihe.com' name='tj_mp3'><span class='bdbriimgitem_3'></span>音乐</a><a href='http://image.baidu.com' name='tj_img'><span class='bdbriimgitem_4'></span>图片</a><a href='http://zhidao.baidu.com' name='tj_zhidao'><span class='bdbriimgitem_2'></span>知道</a><a href='http://wenku.baidu.com' name='tj_wenku'><span class='bdbriimgitem_5'></span>文库</a><a href='http://top.baidu.com' name='tj_bang'><span class='bdbriimgitem_6'></span>风云榜</a><a href='http://e.baidu.com/?refer=888' name='tj_tuiguang'><span class='bdbriimgitem_7'></span>百度推广</a><div class='bdbrievenmore'><a href='//www.baidu.com/more/' name='tj_more'>全部产品&gt;&gt;</a></div></div></div></div></div>" : 3 == window._sam_ns_nuomi ? "<div class='bdmainlink'><div class='bdbriimgtitle'>更多产品</div><div class='briscrollwrapperContainer'><div class='briscrollwrapper'><div class='bdbriwrapper'><a href='http://e.baidu.com?refer=889' name='tj_yingxiao'><span class='bdbriimgitem_1'></span>百度营销</a><a href='http://zhidao.baidu.com' name='tj_zhidao'><span class='bdbriimgitem_2'></span>知道</a><a href='http://music.taihe.com' name='tj_mp3'><span class='bdbriimgitem_3'></span>音乐</a><a href='http://image.baidu.com' name='tj_img'><span class='bdbriimgitem_4'></span>图片</a><a href='http://wenku.baidu.com' name='tj_wenku'><span class='bdbriimgitem_5'></span>文库</a><a href='http://top.baidu.com' name='tj_bang'><span class='bdbriimgitem_6'></span>风云榜</a><div class='bdbrievenmore'><a href='//www.baidu.com/more/' name='tj_more'>全部产品&gt;&gt;</a></div></div></div></div></div>" : "<div class='bdmainlink'><div class='bdbriimgtitle'>更多产品</div><div class='briscrollwrapperContainer'><div class='briscrollwrapper'><div class='bdbriwrapper'><a href='http://e.baidu.com?refer=889' name='tj_yingxiao'><span class='bdbriimgitem_1'></span>百度营销</a><a href='http://music.taihe.com' name='tj_mp3'><span class='bdbriimgitem_3'></span>音乐</a><a href='http://image.baidu.com' name='tj_img'><span class='bdbriimgitem_4'></span>图片</a><a href='http://zhidao.baidu.com' name='tj_zhidao'><span class='bdbriimgitem_2'></span>知道</a><a href='http://wenku.baidu.com' name='tj_wenku'><span class='bdbriimgitem_5'></span>文库</a><a href='http://top.baidu.com' name='tj_bang'><span class='bdbriimgitem_6'></span>风云榜</a><div class='bdbrievenmore'><a href='//www.baidu.com/more/' name='tj_more'>全部产品&gt;&gt;</a></div></div></div></div></div>");
            var n = (d.find(".bdothlink"),
            d.find(".bdbrievenmore"),
            d.find(".briscrollwrapper"))
              , i = $(window).height() - b.offset().top - 34;
            n.height(i),
            r = new t({
                content: n.get(0),
                length: i - 20,
                mousewheellock: !0,
                wheeldelta: 5
            }),
            $(window).on("resize", function() {
                var e = $(window).height() - b.offset().top - 34;
                n.height(e),
                r && r.render(e - 20)
            })
        }
        l = 600,
        m = $(window).height() < l ? l : $(window).height(),
        $(window).on("resize", function() {
            m = $(window).height() < l ? l : $(window).height(),
            d && d.css({
                "min-height": m
            }),
            $.support.leadingWhitespace || d && d.css({
                height: m
            })
        }),
        $.each(d.find("a"), function(t, n) {
            $(n).on("mousedown", function() {
                $(n).attr("name") && e($(n).attr("name"))
            })
        })
    }
    var r, c, d, l, m, u = ($("#wrapper"),
    $("#u1")), b = $("#u1 .bri"), p = 0;
    !function() {
        if (bds && bds.comm && bds.comm.ishome && bds.comm.skin) {
            if (!window.s_domain || !window.s_domain.base || "home" != window.s_domain.base) {
                var e = Cookie.get("H_PS_SKIN") ? Cookie.get("H_PS_SKIN") : "0"
                  , t = Cookie.get("H_PS_SKIN_GO") || "0";
                if ((!t || parseInt(t) < 4) && ($skinGuide = $("<div>", {
                    "class": "frontpage-rt-guide"
                }),
                ns_c({
                    tj_skinChangeTip: "skin_tip_show"
                }),
                $skinGuide.appendTo("#wrapper"),
                Cookie.set("H_PS_SKIN_GO", parseInt(t) + 1, document.domain, "/", new Date((new Date).getTime() + 5184e6))),
                e && "0" != e) {
                    var n = $(".s-skin-container")
                      , i = "http://" + ((parseInt(e) + 1) % 8 + 1) + ".su.bdimg.com/skin/" + e + ".jpg?2";
                    i = bds.util.domain && bds.util.domain.get ? bds.util.domain.get(i) : i;
                    var s = navigator && navigator.userAgent ? navigator.userAgent : "";
                    s.match(/(msie [2-8])/i) ? n.find("img")[0] ? $(n[0]).attr("style", "background-color:#aaa;").find("img").attr("src", i) : $(n[0]).attr("style", "background-color:#aaa;").html('<div class="topbanner"></div><img style="top:0;left:0;width:100%;position:fixed" src="' + i + '">') : ($(n[0]).attr("style", 'background-color:#aaa;background-image:url("' + i + '");'),
                    $(n[0]).find("img").remove())
                }
            }
            $(window).on("index_off", function() {
                $("#head").removeClass("s-skin-hasbg").addClass("skin-no-bg"),
                $("#ftCon").removeClass("s-skin-hasbg").addClass("skin-no-bg"),
                $(".s-skin-container").hide();
                var e = $("#lg img").val(0);
                e.attr("src", "//www.baidu.com/img/bd_logo1.png")
            })
        }
    }(),
    $(document).on("click", function() {
        s()
    }),
    $("#kw").on("click", function() {
        s()
    }),
    b.on("click", function(e) {
        return e.stopPropagation(),
        e.preventDefault(),
        !1
    });
    var h, f, v = 100;
    b.on("mouseover", function(e) {
        e.stopPropagation(),
        e.preventDefault(),
        o(),
        p || (a(),
        p = 1,
        d.hover(function() {
            t(f)
        }, function() {
            i()
        }),
        c.hover(function() {}, function() {
            i()
        })),
        n()
    }).on("mouseout", function() {}),
    $(window).on("index_off", function() {
        d && d.hide(),
        c && c.hide()
    }),
    $.each($(".bri-btlinks").find("a"), function(t, n) {
        $(n).on("mousedown", function() {
            $(n).attr("name") && e($(n).attr("name"))
        })
    })
});
