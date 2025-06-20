var CodeMirror = (function () {
    function t(aK, aH) {
        var bX = {}, bh = t.defaults;
        for (var ax in bh) {
            if (bh.hasOwnProperty(ax)) {
                bX[ax] = (aH && aH.hasOwnProperty(ax) ? aH : bh)[ax]
            }
        }
        var aB = document.createElement("div");
        aB.className = "CodeMirror" + (bX.lineWrapping ? " CodeMirror-wrap" : "");
        aB.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
        if (aK.appendChild) {
            aK.appendChild(aB)
        } else {
            aK(aB)
        }
        var bT = aB.firstChild,
            bk = bT.firstChild,
            bi = aB.lastChild,
            bJ = bi.firstChild,
            cc = bJ.firstChild,
            aF = cc.firstChild,
            aW = aF.firstChild,
            bs = aF.nextSibling.firstChild,
            at = bs.firstChild,
            ba = at.nextSibling,
            be = ba.nextSibling,
            ao = be.nextSibling;
        cz();
        if (r) {
            bk.style.width = "0px"
        }
        if (!f) {
            bs.draggable = true
        }
        bs.style.outline = "none";
        if (bX.tabindex != null) {
            bk.tabIndex = bX.tabindex
        }
        if (bX.autofocus) {
            bx()
        }
        if (!bX.gutter && !bX.lineNumbers) {
            aF.style.display = "none"
        }
        if (l) {
            bT.style.height = "1px", bT.style.position = "absolute"
        }
        try {
            cp("x")
        } catch (b4) {
            if (b4.message.match(/runtime/i)) {
                b4 = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")
            }
            throw b4
        }
        var b3 = new y(),
            au = new y(),
            cL;
        var b7, cu = new h([new af([new e("")])]),
            cd, cf;
        bP();
        var cS = {
            from: {
                line: 0,
                ch: 0
            },
            to: {
                line: 0,
                ch: 0
            },
            inverted: false
        };
        var ce, bo, aX, bC = 0,
            a9, cj = false,
            co = false;
        var cl, b2, az, cJ, aN, bd, aQ, cw;
        var bb = 0,
            cM = 0,
            bI = 0,
            bK = 0;
        var b0;
        var bA = "",
            aD;
        var an = {};
        ap(function () {
            aU(bX.value || "");
            cl = false
        })();
        var a6 = new j();
        q(bi, "mousedown", ap(cg));
        q(bi, "dblclick", ap(bS));
        q(bs, "dragstart", aG);
        q(bs, "selectstart", R);
        if (!L) {
            q(bi, "contextmenu", aZ)
        }
        q(bi, "scroll", function () {
            bC = bi.scrollTop;
            b9([]);
            if (bX.fixedGutter) {
                aF.style.left = bi.scrollLeft + "px"
            }
            if (bX.onScroll) {
                bX.onScroll(b5)
            }
        });
        q(window, "resize", function () {
            b9(true)
        });
        q(bk, "keyup", ap(ch));
        q(bk, "input", aO);
        q(bk, "keydown", ap(b8));
        q(bk, "keypress", ap(bl));
        q(bk, "focus", cQ);
        q(bk, "blur", aC);
        q(bi, "dragenter", v);
        q(bi, "dragover", v);
        q(bi, "drop", ap(al));
        q(bi, "paste", function () {
            bx();
            aO()
        });
        q(bk, "paste", aO);
        q(bk, "cut", ap(function () {
            if (!bX.readOnly) {
                bq("")
            }
        }));
        if (l) {
            q(bJ, "mouseup", function () {
                if (document.activeElement == bk) {
                    bk.blur()
                }
                bx()
            })
        }
        var cs;
        try {
            cs = (document.activeElement == bk)
        } catch (b4) {}
        if (cs || bX.autofocus) {
            setTimeout(cQ, 20)
        } else {
            aC()
        }

        function bp(cV) {
            return cV >= 0 && cV < cu.size
        }
        var b5 = aB.CodeMirror = {
            getValue: bY,
            setValue: ap(aU),
            getSelection: bZ,
            replaceSelection: ap(bq),
            focus: function () {
                window.focus();
                bx();
                cQ();
                aO()
            },
            setOption: function (cW, cX) {
                var cV = bX[cW];
                bX[cW] = cX;
                if (cW == "mode" || cW == "indentUnit") {
                    bP()
                } else {
                    if (cW == "readOnly" && cX == "nocursor") {
                        aC();
                        bk.blur()
                    } else {
                        if (cW == "readOnly" && !cX) {
                            cy(true)
                        } else {
                            if (cW == "theme") {
                                cz()
                            } else {
                                if (cW == "lineWrapping" && cV != cX) {
                                    ap(cC)()
                                } else {
                                    if (cW == "tabSize") {
                                        b9(true)
                                    }
                                }
                            }
                        }
                    }
                } if (cW == "lineNumbers" || cW == "gutter" || cW == "firstLineNumber" || cW == "theme") {
                    bc();
                    b9(true)
                }
            },
            getOption: function (cV) {
                return bX[cV]
            },
            undo: ap(cP),
            redo: ap(cF),
            indentLine: ap(function (cW, cV) {
                if (typeof cV != "string") {
                    if (cV == null) {
                        cV = bX.smartIndent ? "smart" : "prev"
                    } else {
                        cV = cV ? "add" : "subtract"
                    }
                }
                if (bp(cW)) {
                    bw(cW, cV)
                }
            }),
            indentSelection: ap(cx),
            historySize: function () {
                return {
                    undo: a6.done.length,
                    redo: a6.undone.length
                }
            },
            clearHistory: function () {
                a6 = new j()
            },
            matchBrackets: ap(function () {
                ca(true)
            }),
            getTokenAt: ap(function (cV) {
                cV = aR(cV);
                return cB(cV.line).getTokenAt(b7, cq(cV.line), cV.ch)
            }),
            getStateAfter: function (cV) {
                cV = bV(cV == null ? cu.size - 1 : cV);
                return cq(cV + 1)
            },
            cursorCoords: function (cW, cV) {
                if (cW == null) {
                    cW = cS.inverted
                }
                return this.charCoords(cW ? cS.from : cS.to, cV)
            },
            charCoords: function (cW, cV) {
                cW = aR(cW);
                if (cV == "local") {
                    return cN(cW, false)
                }
                if (cV == "div") {
                    return cN(cW, true)
                }
                return am(cW)
            },
            coordsChar: function (cV) {
                var cW = ai(bs);
                return bE(cV.x - cW.left, cV.y - cW.top)
            },
            markText: ap(bB),
            setBookmark: aS,
            findMarksAt: bm,
            setMarker: ap(bR),
            clearMarker: ap(ar),
            setLineClass: ap(bj),
            hideLine: ap(function (cV) {
                return cG(cV, true)
            }),
            showLine: ap(function (cV) {
                return cG(cV, false)
            }),
            onDeleteLine: function (cV, cW) {
                if (typeof cV == "number") {
                    if (!bp(cV)) {
                        return null
                    }
                    cV = cB(cV)
                }(cV.handlers || (cV.handlers = [])).push(cW);
                return cV
            },
            lineInfo: aT,
            addWidget: function (cZ, cX, c1, cY, c3) {
                cZ = cN(aR(cZ));
                var c0 = cZ.yBot,
                    cW = cZ.x;
                cX.style.position = "absolute";
                bJ.appendChild(cX);
                if (cY == "over") {
                    c0 = cZ.y
                } else {
                    if (cY == "near") {
                        var cV = Math.max(bi.offsetHeight, cu.height * bL()),
                            c2 = Math.max(bJ.clientWidth, bs.clientWidth) - a3();
                        if (cZ.yBot + cX.offsetHeight > cV && cZ.y > cX.offsetHeight) {
                            c0 = cZ.y - cX.offsetHeight
                        }
                        if (cW + cX.offsetWidth > c2) {
                            cW = c2 - cX.offsetWidth
                        }
                    }
                }
                cX.style.top = (c0 + cn()) + "px";
                cX.style.left = cX.style.right = "";
                if (c3 == "right") {
                    cW = bJ.clientWidth - cX.offsetWidth;
                    cX.style.right = "0px"
                } else {
                    if (c3 == "left") {
                        cW = 0
                    } else {
                        if (c3 == "middle") {
                            cW = (bJ.clientWidth - cX.offsetWidth) / 2
                        }
                    }
                    cX.style.left = (cW + a3()) + "px"
                } if (c1) {
                    ay(cW, c0, cW + cX.offsetWidth, c0 + cX.offsetHeight)
                }
            },
            lineCount: function () {
                return cu.size
            },
            clipPos: aR,
            getCursor: function (cV) {
                if (cV == null) {
                    cV = cS.inverted
                }
                return Y(cV ? cS.from : cS.to)
            },
            somethingSelected: function () {
                return !ab(cS.from, cS.to)
            },
            setCursor: ap(function (cV, cX, cW) {
                if (cX == null && typeof cV.line == "number") {
                    a4(cV.line, cV.ch, cW)
                } else {
                    a4(cV, cX, cW)
                }
            }),
            setSelection: ap(function (cX, cW, cV) {
                (cV ? bv : bu)(aR(cX), aR(cW || cX))
            }),
            getLine: function (cV) {
                if (bp(cV)) {
                    return cB(cV).text
                }
            },
            getLineHandle: function (cV) {
                if (bp(cV)) {
                    return cB(cV)
                }
            },
            setLine: ap(function (cV, cW) {
                if (bp(cV)) {
                    bM(cW, {
                        line: cV,
                        ch: 0
                    }, {
                        line: cV,
                        ch: cB(cV).text.length
                    })
                }
            }),
            removeLine: ap(function (cV) {
                if (bp(cV)) {
                    bM("", {
                        line: cV,
                        ch: 0
                    }, aR({
                        line: cV + 1,
                        ch: 0
                    }))
                }
            }),
            replaceRange: ap(bM),
            getRange: function (cW, cV) {
                return cK(aR(cW), aR(cV))
            },
            triggerOnKeyDown: ap(b8),
            execCommand: function (cV) {
                return J[cV](b5)
            },
            moveH: ap(cA),
            deleteH: ap(ci),
            moveV: ap(ct),
            toggleOverwrite: function () {
                if (cj) {
                    cj = false;
                    ba.className = ba.className.replace(" CodeMirror-overwrite", "")
                } else {
                    cj = true;
                    ba.className += " CodeMirror-overwrite"
                }
            },
            posFromIndex: function (cW) {
                var cX = 0,
                    cV;
                cu.iter(0, cu.size, function (cY) {
                    var cZ = cY.text.length + 1;
                    if (cZ > cW) {
                        cV = cW;
                        return true
                    }
                    cW -= cZ;
                    ++cX
                });
                return aR({
                    line: cX,
                    ch: cV
                })
            },
            indexFromPos: function (cW) {
                if (cW.line < 0 || cW.ch < 0) {
                    return 0
                }
                var cV = cW.ch;
                cu.iter(0, cW.line, function (cX) {
                    cV += cX.text.length + 1
                });
                return cV
            },
            scrollTo: function (cV, cW) {
                if (cV != null) {
                    bi.scrollLeft = cV
                }
                if (cW != null) {
                    bi.scrollTop = cW
                }
                b9([])
            },
            operation: function (cV) {
                return ap(cV)()
            },
            refresh: function () {
                b9(true);
                if (bi.scrollHeight > bC) {
                    bi.scrollTop = bC
                }
            },
            getInputField: function () {
                return bk
            },
            getWrapperElement: function () {
                return aB
            },
            getScrollerElement: function () {
                return bi
            },
            getGutterElement: function () {
                return aF
            }
        };

        function cB(cV) {
            return B(cu, cV)
        }

        function a1(cW, cV) {
            aQ = true;
            var cX = cV - cW.height;
            for (var cY = cW; cY; cY = cY.parent) {
                cY.height += cX
            }
        }

        function aU(cV) {
            var cW = {
                line: 0,
                ch: 0
            };
            aM(cW, {
                line: cu.size - 1,
                ch: cB(cu.size - 1).text.length
            }, z(cV), cW, cW);
            cl = true
        }

        function bY(cV) {
            var cW = [];
            cu.iter(0, cu.size, function (cX) {
                cW.push(cX.text)
            });
            return cW.join("\n")
        }

        function cg(c2) {
            a2(x(c2, "shiftKey"));
            for (var cY = i(c2); cY != aB; cY = cY.parentNode) {
                if (cY.parentNode == bJ && cY != cc) {
                    return
                }
            }
            for (var cY = i(c2); cY != aB; cY = cY.parentNode) {
                if (cY.parentNode == aW) {
                    if (bX.onGutterClick) {
                        bX.onGutterClick(b5, p(aW.childNodes, cY) + cM, c2)
                    }
                    return R(c2)
                }
            }
            var cV = a0(c2);
            switch (w(c2)) {
            case 3:
                if (L && !K) {
                    aZ(c2)
                }
                return;
            case 2:
                if (cV) {
                    a4(cV.line, cV.ch, true)
                }
                return
            }
            if (!cV) {
                if (i(c2) == bi) {
                    R(c2)
                }
                return
            }
            if (!cf) {
                cQ()
            }
            var cW = +new Date;
            if (aX && aX.time > cW - 400 && ab(aX.pos, cV)) {
                R(c2);
                setTimeout(bx, 20);
                return aI(cV.line)
            } else {
                if (bo && bo.time > cW - 400 && ab(bo.pos, cV)) {
                    aX = {
                        time: cW,
                        pos: cV
                    };
                    R(c2);
                    return bF(cV)
                } else {
                    bo = {
                        time: cW,
                        pos: cV
                    }
                }
            }
            var c4 = cV,
                cX;
            if (D && !bX.readOnly && !ab(cS.from, cS.to) && !X(cV, cS.from) && !X(cS.to, cV)) {
                if (f) {
                    bs.draggable = true
                }
                var c1 = q(document, "mouseup", ap(function (c5) {
                    if (f) {
                        bs.draggable = false
                    }
                    a9 = false;
                    c1();
                    if (Math.abs(c2.clientX - c5.clientX) + Math.abs(c2.clientY - c5.clientY) < 10) {
                        R(c5);
                        a4(cV.line, cV.ch, true);
                        bx()
                    }
                }), true);
                a9 = true;
                if (bs.dragDrop) {
                    bs.dragDrop()
                }
                return
            }
            R(c2);
            a4(cV.line, cV.ch, true);

            function c3(c5) {
                var c7 = a0(c5, true);
                if (c7 && !ab(c7, c4)) {
                    if (!cf) {
                        cQ()
                    }
                    c4 = c7;
                    bv(cV, c7);
                    cl = false;
                    var c6 = by();
                    if (c7.line >= c6.to || c7.line < c6.from) {
                        cX = setTimeout(ap(function () {
                            c3(c5)
                        }), 150)
                    }
                }
            }

            function c0(c5) {
                clearTimeout(cX);
                var c6 = a0(c5);
                if (c6) {
                    bv(cV, c6)
                }
                R(c5);
                bx();
                cl = true;
                cZ();
                c1()
            }
            var cZ = q(document, "mousemove", ap(function (c5) {
                clearTimeout(cX);
                R(c5);
                if (!G && !w(c5)) {
                    c0(c5)
                } else {
                    c3(c5)
                }
            }), true);
            var c1 = q(document, "mouseup", ap(c0), true)
        }

        function bS(cV) {
            for (var cX = i(cV); cX != aB; cX = cX.parentNode) {
                if (cX.parentNode == aW) {
                    return R(cV)
                }
            }
            var cW = a0(cV);
            if (!cW) {
                return
            }
            aX = {
                time: +new Date,
                pos: cW
            };
            R(cV);
            bF(cW)
        }

        function al(c1) {
            c1.preventDefault();
            var c2 = a0(c1, true),
                cV = c1.dataTransfer.files;
            if (!c2 || bX.readOnly) {
                return
            }
            if (cV && cV.length && window.FileReader && window.File) {
                function cY(c7, c6) {
                    var c5 = new FileReader;
                    c5.onload = function () {
                        c4[c6] = c5.result;
                        if (++cW == cX) {
                            c2 = aR(c2);
                            ap(function () {
                                var c8 = bM(c4.join(""), c2, c2);
                                bv(c2, c8)
                            })()
                        }
                    };
                    c5.readAsText(c7)
                }
                var cX = cV.length,
                    c4 = Array(cX),
                    cW = 0;
                for (var cZ = 0; cZ < cX; ++cZ) {
                    cY(cV[cZ], cZ)
                }
            } else {
                try {
                    var c4 = c1.dataTransfer.getData("Text");
                    if (c4) {
                        var c3 = cS.from,
                            c0 = cS.to;
                        bv(c2, c2);
                        if (a9) {
                            bM("", c3, c0)
                        }
                        bq(c4);
                        bx()
                    }
                } catch (c1) {}
            }
        }

        function aG(cX) {
            var cV = bZ();
            cX.dataTransfer.setData("Text", cV);
            if (L || ad) {
                var cW = document.createElement("img");
                cW.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
                cX.dataTransfer.setDragImage(cW, 0, 0)
            }
        }

        function bg(cX, cV) {
            if (typeof cX == "string") {
                cX = J[cX];
                if (!cX) {
                    return false
                }
            }
            var cW = ce;
            try {
                if (bX.readOnly) {
                    co = true
                }
                if (cV) {
                    ce = null
                }
                cX(b5)
            } catch (cY) {
                if (cY != Z) {
                    throw cY
                }
                return false
            } finally {
                ce = cW;
                co = false
            }
            return true
        }

        function cH(cZ) {
            var cV = c(bX.keyMap),
                cX = cV.auto;
            clearTimeout(bz);
            if (cX && !O(cZ)) {
                bz = setTimeout(function () {
                    if (c(bX.keyMap) == cV) {
                        bX.keyMap = (cX.call ? cX.call(null, b5) : cX)
                    }
                }, 50)
            }
            var cW = P[x(cZ, "keyCode")],
                cY = false;
            if (cW == null || cZ.altGraphKey) {
                return false
            }
            if (x(cZ, "altKey")) {
                cW = "Alt-" + cW
            }
            if (x(cZ, "ctrlKey")) {
                cW = "Ctrl-" + cW
            }
            if (x(cZ, "metaKey")) {
                cW = "Cmd-" + cW
            }
            if (x(cZ, "shiftKey")) {
                cY = k("Shift-" + cW, bX.extraKeys, bX.keyMap, function (c0) {
                    return bg(c0, true)
                }) || k(cW, bX.extraKeys, bX.keyMap, function (c0) {
                    if (typeof c0 == "string" && /^go[A-Z]/.test(c0)) {
                        return bg(c0)
                    }
                })
            } else {
                cY = k(cW, bX.extraKeys, bX.keyMap, bg)
            } if (cY) {
                R(cZ);
                if (G) {
                    cZ.oldKeyCode = cZ.keyCode;
                    cZ.keyCode = 0
                }
            }
            return cY
        }

        function bU(cX, cV) {
            var cW = k("'" + cV + "'", bX.extraKeys, bX.keyMap, bg);
            if (cW) {
                R(cX)
            }
            return cW
        }
        var cE = null,
            bz;

        function b8(cX) {
            if (!cf) {
                cQ()
            }
            if (G && cX.keyCode == 27) {
                cX.returnValue = false
            }
            if (br) {
                if (bH()) {
                    br = false
                }
            }
            if (bX.onKeyEvent && bX.onKeyEvent(b5, M(cX))) {
                return
            }
            var cV = x(cX, "keyCode");
            a2(cV == 16 || x(cX, "shiftKey"));
            var cW = cH(cX);
            if (window.opera) {
                cE = cW ? cV : null;
                if (!cW && cV == 88 && x(cX, K ? "metaKey" : "ctrlKey")) {
                    bq("")
                }
            }
        }

        function bl(cY) {
            if (br) {
                bH()
            }
            if (bX.onKeyEvent && bX.onKeyEvent(b5, M(cY))) {
                return
            }
            var cX = x(cY, "keyCode"),
                cV = x(cY, "charCode");
            if (window.opera && cX == cE) {
                cE = null;
                R(cY);
                return
            }
            if (((window.opera && !cY.which) || l) && cH(cY)) {
                return
            }
            var cW = String.fromCharCode(cV == null ? cX : cV);
            if (bX.electricChars && b7.electricChars && bX.smartIndent && !bX.readOnly) {
                if (b7.electricChars.indexOf(cW) > -1) {
                    setTimeout(ap(function () {
                        bw(cS.to.line, "smart")
                    }), 75)
                }
            }
            if (bU(cY, cW)) {
                return
            }
            aO()
        }

        function ch(cV) {
            if (bX.onKeyEvent && bX.onKeyEvent(b5, M(cV))) {
                return
            }
            if (x(cV, "keyCode") == 16) {
                ce = null
            }
        }

        function cQ() {
            if (bX.readOnly == "nocursor") {
                return
            }
            if (!cf) {
                if (bX.onFocus) {
                    bX.onFocus(b5)
                }
                cf = true;
                if (aB.className.search(/\bCodeMirror-focused\b/) == -1) {
                    aB.className += " CodeMirror-focused"
                }
                if (!bd) {
                    cy(true)
                }
            }
            ak();
            cI()
        }

        function aC() {
            if (cf) {
                if (bX.onBlur) {
                    bX.onBlur(b5)
                }
                cf = false;
                if (b0) {
                    ap(function () {
                        if (b0) {
                            b0();
                            b0 = null
                        }
                    })()
                }
                aB.className = aB.className.replace(" CodeMirror-focused", "")
            }
            clearInterval(cL);
            setTimeout(function () {
                if (!cf) {
                    ce = null
                }
            }, 150)
        }

        function aM(c0, cZ, cY, cW, cV) {
            if (co) {
                return
            }
            if (a6) {
                var cX = [];
                cu.iter(c0.line, cZ.line + 1, function (c1) {
                    cX.push(c1.text)
                });
                a6.addChange(c0.line, cY.length, cX);
                while (a6.done.length > bX.undoDepth) {
                    a6.done.shift()
                }
            }
            aq(c0, cZ, cY, cW, cV)
        }

        function b6(c0, c1) {
            if (!c0.length) {
                return
            }
            var c2 = c0.pop(),
                cW = [];
            for (var cX = c2.length - 1; cX >= 0; cX -= 1) {
                var cZ = c2[cX];
                var c3 = [],
                    cV = cZ.start + cZ.added;
                cu.iter(cZ.start, cV, function (c4) {
                    c3.push(c4.text)
                });
                cW.push({
                    start: cZ.start,
                    added: cZ.old.length,
                    old: c3
                });
                var cY = aR({
                    line: cZ.start + cZ.old.length - 1,
                    ch: U(c3[c3.length - 1], cZ.old[cZ.old.length - 1])
                });
                aq({
                    line: cZ.start,
                    ch: 0
                }, {
                    line: cV - 1,
                    ch: cB(cV - 1).text.length
                }, cZ.old, cY, cY)
            }
            cl = true;
            c1.push(cW)
        }

        function cP() {
            b6(a6.done, a6.undone)
        }

        function cF() {
            b6(a6.undone, a6.done)
        }

        function aq(da, cZ, dg, cV, dh) {
            if (co) {
                return
            }
            var df = false,
                cY = bA.length;
            if (!bX.lineWrapping) {
                cu.iter(da.line, cZ.line, function (di) {
                    if (di.text.length == cY) {
                        df = true;
                        return true
                    }
                })
            }
            if (da.line != cZ.line || dg.length > 1) {
                aQ = true
            }
            var c7 = cZ.line - da.line,
                c6 = cB(da.line),
                cW = cB(cZ.line);
            if (da.ch == 0 && cZ.ch == 0 && dg[dg.length - 1] == "") {
                var c4 = [],
                    c5 = null;
                if (da.line) {
                    c5 = cB(da.line - 1);
                    c5.fixMarkEnds(cW)
                } else {
                    cW.fixMarkStarts()
                }
                for (var dc = 0, de = dg.length - 1; dc < de; ++dc) {
                    c4.push(e.inheritMarks(dg[dc], c5))
                }
                if (c7) {
                    cu.remove(da.line, c7, cw)
                }
                if (c4.length) {
                    cu.insert(da.line, c4)
                }
            } else {
                if (c6 == cW) {
                    if (dg.length == 1) {
                        c6.replace(da.ch, cZ.ch, dg[0])
                    } else {
                        cW = c6.split(cZ.ch, dg[dg.length - 1]);
                        c6.replace(da.ch, null, dg[0]);
                        c6.fixMarkEnds(cW);
                        var c4 = [];
                        for (var dc = 1, de = dg.length - 1; dc < de; ++dc) {
                            c4.push(e.inheritMarks(dg[dc], c6))
                        }
                        c4.push(cW);
                        cu.insert(da.line + 1, c4)
                    }
                } else {
                    if (dg.length == 1) {
                        c6.replace(da.ch, null, dg[0]);
                        cW.replace(null, cZ.ch, "");
                        c6.append(cW);
                        cu.remove(da.line + 1, c7, cw)
                    } else {
                        var c4 = [];
                        c6.replace(da.ch, null, dg[0]);
                        cW.replace(null, cZ.ch, dg[dg.length - 1]);
                        c6.fixMarkEnds(cW);
                        for (var dc = 1, de = dg.length - 1; dc < de; ++dc) {
                            c4.push(e.inheritMarks(dg[dc], c6))
                        }
                        if (c7 > 1) {
                            cu.remove(da.line + 1, c7 - 1, cw)
                        }
                        cu.insert(da.line + 1, c4)
                    }
                }
            } if (bX.lineWrapping) {
                var c1 = bi.clientWidth / bf() - 3;
                cu.iter(da.line, da.line + dg.length, function (di) {
                    if (di.hidden) {
                        return
                    }
                    var dj = Math.ceil(di.text.length / c1) || 1;
                    if (dj != di.height) {
                        a1(di, dj)
                    }
                })
            } else {
                cu.iter(da.line, dc + dg.length, function (dj) {
                    var di = dj.text;
                    if (di.length > cY) {
                        bA = di;
                        cY = di.length;
                        aD = null;
                        df = false
                    }
                });
                if (df) {
                    cY = 0;
                    bA = "";
                    aD = null;
                    cu.iter(0, cu.size, function (dj) {
                        var di = dj.text;
                        if (di.length > cY) {
                            cY = di.length;
                            bA = di
                        }
                    })
                }
            }
            var cX = [],
                c3 = dg.length - c7 - 1;
            for (var dc = 0, c9 = cd.length; dc < c9; ++dc) {
                var dd = cd[dc];
                if (dd < da.line) {
                    cX.push(dd)
                } else {
                    if (dd > cZ.line) {
                        cX.push(dd + c3)
                    }
                }
            }
            var db = da.line + Math.min(dg.length, 500);
            cD(da.line, db);
            cX.push(db);
            cd = cX;
            bD(100);
            az.push({
                from: da.line,
                to: cZ.line + 1,
                diff: c3
            });
            var c2 = {
                from: da,
                to: cZ,
                text: dg
            };
            if (cJ) {
                for (var c0 = cJ; c0.next; c0 = c0.next) {}
                c0.next = c2
            } else {
                cJ = c2
            }

            function c8(di) {
                return di <= Math.min(cZ.line, cZ.line + c3) ? di : di + c3
            }
            bu(cV, dh, c8(cS.from.line), c8(cS.to.line));
            if (bi.clientHeight) {
                bJ.style.height = (cu.height * bL() + 2 * cn()) + "px"
            }
        }

        function bM(cW, cZ, cY) {
            cZ = aR(cZ);
            if (!cY) {
                cY = cZ
            } else {
                cY = aR(cY)
            }
            cW = z(cW);

            function cX(c2) {
                if (X(c2, cZ)) {
                    return c2
                }
                if (!X(cY, c2)) {
                    return cV
                }
                var c0 = c2.line + cW.length - (cY.line - cZ.line) - 1;
                var c1 = c2.ch;
                if (c2.line == cY.line) {
                    c1 += cW[cW.length - 1].length - (cY.ch - (cY.line == cZ.line ? cZ.ch : 0))
                }
                return {
                    line: c0,
                    ch: c1
                }
            }
            var cV;
            aA(cW, cZ, cY, function (c0) {
                cV = c0;
                return {
                    from: cX(cS.from),
                    to: cX(cS.to)
                }
            });
            return cV
        }

        function bq(cV, cW) {
            aA(z(cV), cS.from, cS.to, function (cX) {
                if (cW == "end") {
                    return {
                        from: cX,
                        to: cX
                    }
                } else {
                    if (cW == "start") {
                        return {
                            from: cS.from,
                            to: cS.from
                        }
                    } else {
                        return {
                            from: cS.from,
                            to: cX
                        }
                    }
                }
            })
        }

        function aA(cY, c0, cZ, cV) {
            var cX = cY.length == 1 ? cY[0].length + c0.ch : cY[cY.length - 1].length;
            var cW = cV({
                line: c0.line + cY.length - 1,
                ch: cX
            });
            aM(c0, cZ, cY, cW.from, cW.to)
        }

        function cK(cZ, cY) {
            var cW = cZ.line,
                cV = cY.line;
            if (cW == cV) {
                return cB(cW).text.slice(cZ.ch, cY.ch)
            }
            var cX = [cB(cW).text.slice(cZ.ch)];
            cu.iter(cW + 1, cV, function (c0) {
                cX.push(c0.text)
            });
            cX.push(cB(cV).text.slice(0, cY.ch));
            return cX.join("\n")
        }

        function bZ() {
            return cK(cS.from, cS.to)
        }
        var br = false;

        function ak() {
            if (br) {
                return
            }
            b3.set(bX.pollInterval, function () {
                aL();
                bH();
                if (cf) {
                    ak()
                }
                aw()
            })
        }

        function aO() {
            var cV = false;
            br = true;

            function cW() {
                aL();
                var cX = bH();
                if (!cX && !cV) {
                    cV = true;
                    b3.set(60, cW)
                } else {
                    br = false;
                    ak()
                }
                aw()
            }
            b3.set(20, cW)
        }
        var a8 = "";

        function bH() {
            if (bd || !cf || ac(bk) || bX.readOnly) {
                return false
            }
            var cW = bk.value;
            if (cW == a8) {
                return false
            }
            ce = null;
            var cX = 0,
                cV = Math.min(a8.length, cW.length);
            while (cX < cV && a8[cX] == cW[cX]) {
                ++cX
            }
            if (cX < a8.length) {
                cS.from = {
                    line: cS.from.line,
                    ch: cS.from.ch - (a8.length - cX)
                }
            } else {
                if (cj && ab(cS.from, cS.to)) {
                    cS.to = {
                        line: cS.to.line,
                        ch: Math.min(cB(cS.to.line).text.length, cS.to.ch + (cW.length - cX))
                    }
                }
            }
            bq(cW.slice(cX), "end");
            a8 = cW;
            return true
        }

        function cy(cV) {
            if (!ab(cS.from, cS.to)) {
                a8 = "";
                bk.value = bZ();
                a(bk)
            } else {
                if (cV) {
                    a8 = bk.value = ""
                }
            }
        }

        function bx() {
            if (bX.readOnly != "nocursor") {
                bk.focus()
            }
        }

        function cU() {
            if (!ba.getBoundingClientRect) {
                return
            }
            var cV = ba.getBoundingClientRect();
            if (G && cV.top == cV.bottom) {
                return
            }
            var cW = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
            if (cV.top < 0 || cV.bottom > cW) {
                ba.scrollIntoView()
            }
        }

        function cb() {
            var cW = cN(cS.inverted ? cS.from : cS.to);
            var cV = bX.lineWrapping ? Math.min(cW.x, bs.offsetWidth) : cW.x;
            return ay(cV, cW.y, cV, cW.yBot)
        }

        function ay(cX, c2, cV, c1) {
            var cZ = a3(),
                c7 = cn();
            c2 += c7;
            c1 += c7;
            cX += cZ;
            cV += cZ;
            var c4 = bi.clientHeight,
                cY = bi.scrollTop,
                cW = false,
                c6 = true;
            if (c2 < cY) {
                bi.scrollTop = Math.max(0, c2);
                cW = true
            } else {
                if (c1 > cY + c4) {
                    bi.scrollTop = c1 - c4;
                    cW = true
                }
            }
            var c3 = bi.clientWidth,
                c5 = bi.scrollLeft;
            var c0 = bX.fixedGutter ? aF.clientWidth : 0;
            if (cX < c5 + c0) {
                if (cX < 50) {
                    cX = 0
                }
                bi.scrollLeft = Math.max(0, cX - 10 - c0);
                cW = true
            } else {
                if (cV > c3 + c5 - 3) {
                    bi.scrollLeft = cV + 10 - c3;
                    cW = true;
                    if (cV > bJ.clientWidth) {
                        c6 = false
                    }
                }
            } if (cW && bX.onScroll) {
                bX.onScroll(b5)
            }
            return c6
        }

        function by() {
            var cW = bL(),
                cY = bi.scrollTop - cn();
            var cV = Math.max(0, Math.floor(cY / cW));
            var cX = Math.ceil((cY + bi.clientHeight) / cW);
            return {
                from: V(cu, cV),
                to: V(cu, cX)
            }
        }

        function b9(c3, cZ) {
            if (!bi.clientWidth) {
                cM = bI = bb = 0;
                return
            }
            var cY = by();
            if (c3 !== true && c3.length == 0 && cY.from > cM && cY.to < bI) {
                return
            }
            var c4 = Math.max(cY.from - 100, 0),
                c5 = Math.min(cu.size, cY.to + 100);
            if (cM < c4 && c4 - cM < 20) {
                c4 = cM
            }
            if (bI > c5 && bI - c5 < 20) {
                c5 = Math.min(cu.size, bI)
            }
            var c7 = c3 === true ? [] : bW([{
                from: cM,
                to: bI,
                domStart: 0
            }], c3);
            var c2 = 0;
            for (var c0 = 0; c0 < c7.length; ++c0) {
                var c1 = c7[c0];
                if (c1.from < c4) {
                    c1.domStart += (c4 - c1.from);
                    c1.from = c4
                }
                if (c1.to > c5) {
                    c1.to = c5
                }
                if (c1.from >= c1.to) {
                    c7.splice(c0--, 1)
                } else {
                    c2 += c1.to - c1.from
                }
            }
            if (c2 == c5 - c4) {
                return
            }
            c7.sort(function (c9, c8) {
                return c9.domStart - c8.domStart
            });
            var cX = bL(),
                cV = aF.style.display;
            ao.style.display = "none";
            aP(c4, c5, c7);
            ao.style.display = aF.style.display = "";
            var cW = c4 != cM || c5 != bI || bK != bi.clientHeight + cX;
            if (cW) {
                bK = bi.clientHeight + cX
            }
            cM = c4;
            bI = c5;
            bb = g(cu, c4);
            cc.style.top = (bb * cX) + "px";
            if (bi.clientHeight) {
                bJ.style.height = (cu.height * cX + 2 * cn()) + "px"
            }
            if (ao.childNodes.length != bI - cM) {
                throw new Error("BAD PATCH! " + JSON.stringify(c7) + " size=" + (bI - cM) + " nodes=" + ao.childNodes.length)
            }

            function c6() {
                aD = bi.clientWidth;
                var c9 = ao.firstChild,
                    c8 = false;
                cu.iter(cM, bI, function (db) {
                    if (!db.hidden) {
                        var da = Math.round(c9.offsetHeight / cX) || 1;
                        if (db.height != da) {
                            a1(db, da);
                            aQ = c8 = true
                        }
                    }
                    c9 = c9.nextSibling
                });
                if (c8) {
                    bJ.style.height = (cu.height * cX + 2 * cn()) + "px"
                }
                return c8
            }
            if (bX.lineWrapping) {
                c6()
            } else {
                if (aD == null) {
                    aD = cp(bA)
                }
                if (aD > bi.clientWidth) {
                    bs.style.width = aD + "px";
                    bJ.style.width = "";
                    bJ.style.width = bi.scrollWidth + "px"
                } else {
                    bs.style.width = bJ.style.width = ""
                }
            }
            aF.style.display = cV;
            if (cW || aQ) {
                aJ() && bX.lineWrapping && c6() && aJ()
            }
            cR();
            if (!cZ && bX.onUpdate) {
                bX.onUpdate(b5)
            }
            return true
        }

        function bW(c4, c2) {
            for (var cZ = 0, cX = c2.length || 0; cZ < cX; ++cZ) {
                var c1 = c2[cZ],
                    cV = [],
                    c3 = c1.diff || 0;
                for (var cY = 0, cW = c4.length; cY < cW; ++cY) {
                    var c0 = c4[cY];
                    if (c1.to <= c0.from && c1.diff) {
                        cV.push({
                            from: c0.from + c3,
                            to: c0.to + c3,
                            domStart: c0.domStart
                        })
                    } else {
                        if (c1.to <= c0.from || c1.from >= c0.to) {
                            cV.push(c0)
                        } else {
                            if (c1.from > c0.from) {
                                cV.push({
                                    from: c0.from,
                                    to: c1.from,
                                    domStart: c0.domStart
                                })
                            }
                            if (c1.to < c0.to) {
                                cV.push({
                                    from: c1.to + c3,
                                    to: c0.to + c3,
                                    domStart: c0.domStart + (c1.to - c0.from)
                                })
                            }
                        }
                    }
                }
                c4 = cV
            }
            return c4
        }

        function aP(c4, c5, c7) {
            if (!c7.length) {
                ao.innerHTML = ""
            } else {
                function cV(c9) {
                    var c8 = c9.nextSibling;
                    c9.parentNode.removeChild(c9);
                    return c8
                }
                var cZ = 0,
                    cX = ao.firstChild,
                    cW;
                for (var c0 = 0; c0 < c7.length; ++c0) {
                    var c6 = c7[c0];
                    while (c6.domStart > cZ) {
                        cX = cV(cX);
                        cZ++
                    }
                    for (var cY = 0, c2 = c6.to - c6.from; cY < c2; ++cY) {
                        cX = cX.nextSibling;
                        cZ++
                    }
                }
                while (cX) {
                    cX = cV(cX)
                }
            }
            var c1 = c7.shift(),
                cX = ao.firstChild,
                cY = c4;
            var c3 = document.createElement("div");
            cu.iter(c4, c5, function (c8) {
                if (c1 && c1.to == cY) {
                    c1 = c7.shift()
                }
                if (!c1 || c1.from > cY) {
                    if (c8.hidden) {
                        var c9 = c3.innerHTML = "<pre></pre>"
                    } else {
                        var c9 = "<pre" + (c8.className ? ' class="' + c8.className + '"' : "") + ">" + c8.getHTML(a7) + "</pre>";
                        if (c8.bgClassName) {
                            c9 = '<div style="position: relative"><pre class="' + c8.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + c9 + "</div>"
                        }
                    }
                    c3.innerHTML = c9;
                    ao.insertBefore(c3.firstChild, cX)
                } else {
                    cX = cX.nextSibling
                }++cY
            })
        }

        function aJ() {
            if (!bX.gutter && !bX.lineNumbers) {
                return
            }
            var cW = cc.offsetHeight,
                c4 = bi.clientHeight;
            aF.style.height = (cW - c4 < 2 ? c4 : cW) + "px";
            var c2 = [],
                c0 = cM,
                c3;
            cu.iter(cM, Math.max(bI, cM + 1), function (c6) {
                if (c6.hidden) {
                    c2.push("<pre></pre>")
                } else {
                    var c5 = c6.gutterMarker;
                    var c8 = bX.lineNumbers ? c0 + bX.firstLineNumber : null;
                    if (c5 && c5.text) {
                        c8 = c5.text.replace("%N%", c8 != null ? c8 : "")
                    } else {
                        if (c8 == null) {
                            c8 = "\u00a0"
                        }
                    }
                    c2.push((c5 && c5.style ? '<pre class="' + c5.style + '">' : "<pre>"), c8);
                    for (var c7 = 1; c7 < c6.height; ++c7) {
                        c2.push("<br/>&#160;")
                    }
                    c2.push("</pre>");
                    if (!c5) {
                        c3 = c0
                    }
                }++c0
            });
            aF.style.display = "none";
            aW.innerHTML = c2.join("");
            if (c3 != null) {
                var cY = aW.childNodes[c3 - cM];
                var cZ = String(cu.size).length,
                    cV = F(cY),
                    cX = "";
                while (cV.length + cX.length < cZ) {
                    cX += "\u00a0"
                }
                if (cX) {
                    cY.insertBefore(document.createTextNode(cX), cY.firstChild)
                }
            }
            aF.style.display = "";
            var c1 = Math.abs((parseInt(bs.style.marginLeft) || 0) - aF.offsetWidth) > 2;
            bs.style.marginLeft = aF.offsetWidth + "px";
            aQ = false;
            return c1
        }

        function cR() {
            var cY = ab(cS.from, cS.to);
            var c9 = cN(cS.from, true);
            var c4 = cY ? c9 : cN(cS.to, true);
            var c2 = cS.inverted ? c9 : c4,
                cW = bL();
            var cV = ai(aB),
                cX = ai(ao);
            bT.style.top = Math.max(0, Math.min(bi.offsetHeight, c2.y + cX.top - cV.top)) + "px";
            bT.style.left = Math.max(0, Math.min(bi.offsetWidth, c2.x + cX.left - cV.left)) + "px";
            if (cY) {
                ba.style.top = c2.y + "px";
                ba.style.left = (bX.lineWrapping ? Math.min(c2.x, bs.offsetWidth) : c2.x) + "px";
                ba.style.display = "";
                be.style.display = "none"
            } else {
                var c7 = c9.y == c4.y,
                    c0 = "";

                function c8(dd, dc, db, da) {
                    c0 += '<div class="CodeMirror-selected" style="position: absolute; left: ' + dd + "px; top: " + dc + "px; right: " + db + "px; height: " + da + 'px"></div>'
                }
                var c5 = bs.clientWidth || bs.offsetWidth;
                var c1 = bs.clientHeight || bs.offsetHeight;
                if (cS.from.ch && c9.y >= 0) {
                    var c6 = c7 ? c5 - c4.x : 0;
                    c8(c9.x, c9.y, c6, cW)
                }
                var cZ = Math.max(0, c9.y + (cS.from.ch ? cW : 0));
                var c3 = Math.min(c4.y, c1) - cZ;
                if (c3 > 0.2 * cW) {
                    c8(0, cZ, 0, c3)
                }
                if ((!c7 || !cS.from.ch) && c4.y < c1 - 0.5 * cW) {
                    c8(0, c4.y, c5 - c4.x, cW)
                }
                be.innerHTML = c0;
                ba.style.display = "none";
                be.style.display = ""
            }
        }

        function a2(cV) {
            if (cV) {
                ce = ce || (cS.inverted ? cS.to : cS.from)
            } else {
                ce = null
            }
        }

        function bv(cX, cW) {
            var cV = ce && aR(ce);
            if (cV) {
                if (X(cV, cX)) {
                    cX = cV
                } else {
                    if (X(cW, cV)) {
                        cW = cV
                    }
                }
            }
            bu(cX, cW);
            b2 = true
        }

        function bu(c2, c1, cV, c0) {
            cr = null;
            if (cV == null) {
                cV = cS.from.line;
                c0 = cS.to.line
            }
            if (ab(cS.from, c2) && ab(cS.to, c1)) {
                return
            }
            if (X(c1, c2)) {
                var cY = c1;
                c1 = c2;
                c2 = cY
            }
            if (c2.line != cV) {
                var cZ = bN(c2, cV, cS.from.ch);
                if (!cZ) {
                    cG(c2.line, false)
                } else {
                    c2 = cZ
                }
            }
            if (c1.line != c0) {
                c1 = bN(c1, c0, cS.to.ch)
            }
            if (ab(c2, c1)) {
                cS.inverted = false
            } else {
                if (ab(c2, cS.to)) {
                    cS.inverted = false
                } else {
                    if (ab(c1, cS.from)) {
                        cS.inverted = true
                    }
                }
            } if (bX.autoClearEmptyLines && ab(cS.from, cS.to)) {
                var cX = cS.inverted ? c2 : c1;
                if (cX.line != cS.from.line && cS.from.line < cu.size) {
                    var cW = cB(cS.from.line);
                    if (/^\s+$/.test(cW.text)) {
                        setTimeout(ap(function () {
                            if (cW.parent && /^\s+$/.test(cW.text)) {
                                var c3 = W(cW);
                                bM("", {
                                    line: c3,
                                    ch: 0
                                }, {
                                    line: c3,
                                    ch: cW.text.length
                                })
                            }
                        }, 10))
                    }
                }
            }
            cS.from = c2;
            cS.to = c1;
            aN = true
        }

        function bN(cZ, cW, cX) {
            function cY(c2) {
                var c4 = cZ.line + c2,
                    c1 = c2 == 1 ? cu.size : -1;
                while (c4 != c1) {
                    var c0 = cB(c4);
                    if (!c0.hidden) {
                        var c3 = cZ.ch;
                        if (c3 > cX || c3 > c0.text.length) {
                            c3 = c0.text.length
                        }
                        return {
                            line: c4,
                            ch: c3
                        }
                    }
                    c4 += c2
                }
            }
            var cV = cB(cZ.line);
            if (!cV.hidden) {
                return cZ
            }
            if (cZ.line >= cW) {
                return cY(1) || cY(-1)
            } else {
                return cY(-1) || cY(1)
            }
        }

        function a4(cV, cX, cW) {
            var cY = aR({
                line: cV,
                ch: cX || 0
            });
            (cW ? bv : bu)(cY, cY)
        }

        function bV(cV) {
            return Math.max(0, Math.min(cV, cu.size - 1))
        }

        function aR(cX) {
            if (cX.line < 0) {
                return {
                    line: 0,
                    ch: 0
                }
            }

            if (cX.line >= cu.size) {
                return {
                    line: cu.size - 1,
                    ch: cB(cu.size - 1).text.length
                }
            }
            var cV = cX.ch,
                cW = cB(cX.line).text.length;
            if (cV == null || cV > cW) {
                return {
                    line: cX.line,
                    ch: cW
                }
            } else {
                if (cV < 0) {
                    return {
                        line: cX.line,
                        ch: 0
                    }
                } else {
                    return cX
                }
            }
        }

        function ck(cY, c2) {
            var cZ = cS.inverted ? cS.from : cS.to,
                c3 = cZ.line,
                cV = cZ.ch;
            var c1 = cB(c3);

            function cW() {
                for (var c4 = c3 + cY, c6 = cY < 0 ? -1 : cu.size; c4 != c6; c4 += cY) {
                    var c5 = cB(c4);
                    if (!c5.hidden) {
                        c3 = c4;
                        c1 = c5;
                        return true
                    }
                }
            }

            function c0(c4) {
                if (cV == (cY < 0 ? 0 : c1.text.length)) {
                    if (!c4 && cW()) {
                        cV = cY < 0 ? c1.text.length : 0
                    } else {
                        return false
                    }
                } else {
                    cV += cY
                }
                return true
            }
            if (c2 == "char") {
                c0()
            } else {
                if (c2 == "column") {
                    c0(true)
                } else {
                    if (c2 == "word") {
                        var cX = false;
                        for (;;) {
                            if (cY < 0) {
                                if (!c0()) {
                                    break
                                }
                            }
                            if (ae(c1.text.charAt(cV))) {
                                cX = true
                            } else {
                                if (cX) {
                                    if (cY < 0) {
                                        cY = 1;
                                        c0()
                                    }
                                    break
                                }
                            } if (cY > 0) {
                                if (!c0()) {
                                    break
                                }
                            }
                        }
                    }
                }
            }
            return {
                line: c3,
                ch: cV
            }
        }

        function cA(cV, cW) {
            var cX = cV < 0 ? cS.from : cS.to;
            if (ce || ab(cS.from, cS.to)) {
                cX = ck(cV, cW)
            }
            a4(cX.line, cX.ch, true)
        }

        function ci(cV, cW) {
            if (!ab(cS.from, cS.to)) {
                bM("", cS.from, cS.to)
            } else {
                if (cV < 0) {
                    bM("", ck(cV, cW), cS.to)
                } else {
                    bM("", cS.from, ck(cV, cW))
                }
            }
            b2 = true
        }
        var cr = null;

        function ct(cV, cW) {
            var cY = 0,
                cZ = cN(cS.inverted ? cS.from : cS.to, true);
            if (cr != null) {
                cZ.x = cr
            }
            if (cW == "page") {
                cY = Math.min(bi.clientHeight, window.innerHeight || document.documentElement.clientHeight)
            } else {
                if (cW == "line") {
                    cY = bL()
                }
            }
            var cX = bE(cZ.x, cZ.y + cY * cV + 2);
            if (cW == "page") {
                bi.scrollTop += cN(cX, true).y - cZ.y
            }
            a4(cX.line, cX.ch, true);
            cr = cZ.x
        }

        function bF(cY) {
            var cW = cB(cY.line).text;
            var cX = cY.ch,
                cV = cY.ch;
            while (cX > 0 && ae(cW.charAt(cX - 1))) {
                --cX
            }
            while (cV < cW.length && ae(cW.charAt(cV))) {
                ++cV
            }
            bv({
                line: cY.line,
                ch: cX
            }, {
                line: cY.line,
                ch: cV
            })
        }

        function aI(cV) {
            bv({
                line: cV,
                ch: 0
            }, aR({
                line: cV + 1,
                ch: 0
            }))
        }

        function cx(cX) {
            if (ab(cS.from, cS.to)) {
                return bw(cS.from.line, cX)
            }
            var cW = cS.to.line - (cS.to.ch ? 0 : 1);
            for (var cV = cS.from.line; cV <= cW; ++cV) {
                bw(cV, cX)
            }
        }

        function bw(cX, c4) {
            if (!c4) {
                c4 = "add"
            }
            if (c4 == "smart") {
                if (!b7.indent) {
                    c4 = "prev"
                } else {
                    var cV = cq(cX)
                }
            }
            var c5 = cB(cX),
                cZ = c5.indentation(bX.tabSize),
                cW = c5.text.match(/^\s*/)[0],
                c1;
            if (c4 == "prev") {
                if (cX) {
                    c1 = cB(cX - 1).indentation(bX.tabSize)
                } else {
                    c1 = 0
                }
            } else {
                if (c4 == "smart") {
                    c1 = b7.indent(cV, c5.text.slice(cW.length), c5.text)
                } else {
                    if (c4 == "add") {
                        c1 = cZ + bX.indentUnit
                    } else {
                        if (c4 == "subtract") {
                            c1 = cZ - bX.indentUnit
                        }
                    }
                }
            }
            c1 = Math.max(0, c1);
            var c3 = c1 - cZ;
            if (!c3) {
                if (cS.from.line != cX && cS.to.line != cX) {
                    return
                }
                var c2 = cW
            } else {
                var c2 = "",
                    c0 = 0;
                if (bX.indentWithTabs) {
                    for (var cY = Math.floor(c1 / bX.tabSize); cY; --cY) {
                        c0 += bX.tabSize;
                        c2 += "\t"
                    }
                }
                while (c0 < c1) {
                    ++c0;
                    c2 += " "
                }
            }
            bM(c2, {
                line: cX,
                ch: 0
            }, {
                line: cX,
                ch: cW.length
            })
        }

        function bP() {
            b7 = t.getMode(bX, bX.mode);
            cu.iter(0, cu.size, function (cV) {
                cV.stateAfter = null
            });
            cd = [0];
            bD()
        }

        function bc() {
            var cV = bX.gutter || bX.lineNumbers;
            aF.style.display = cV ? "" : "none";
            if (cV) {
                aQ = true
            } else {
                ao.parentNode.style.marginLeft = 0
            }
        }

        function cC(cX, cW) {
            if (bX.lineWrapping) {
                aB.className += " CodeMirror-wrap";
                var cV = bi.clientWidth / bf() - 3;
                cu.iter(0, cu.size, function (cY) {
                    if (cY.hidden) {
                        return
                    }
                    var cZ = Math.ceil(cY.text.length / cV) || 1;
                    if (cZ != 1) {
                        a1(cY, cZ)
                    }
                });
                bs.style.width = bJ.style.width = ""
            } else {
                aB.className = aB.className.replace(" CodeMirror-wrap", "");
                aD = null;
                bA = "";
                cu.iter(0, cu.size, function (cY) {
                    if (cY.height != 1 && !cY.hidden) {
                        a1(cY, 1)
                    }
                    if (cY.text.length > bA.length) {
                        bA = cY.text
                    }
                })
            }
            az.push({
                from: 0,
                to: cu.size
            })
        }

        function a7(cW) {
            var cV = bX.tabSize - cW % bX.tabSize,
                cY = an[cV];
            if (cY) {
                return cY
            }
            for (var cZ = '<span class="cm-tab">', cX = 0; cX < cV; ++cX) {
                cZ += " "
            }
            return (an[cV] = {
                html: cZ + "</span>",
                width: cV
            })
        }

        function cz() {
            bi.className = bi.className.replace(/\s*cm-s-\w+/g, "") + bX.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }

        function cT() {
            this.set = []
        }
        cT.prototype.clear = ap(function () {
            var c0 = Infinity,
                cW = -Infinity;
            for (var cZ = 0, c2 = this.set.length; cZ < c2; ++cZ) {
                var cX = this.set[cZ],
                    cV = cX.marked;
                if (!cV || !cX.parent) {
                    continue
                }
                var c1 = W(cX);
                c0 = Math.min(c0, c1);
                cW = Math.max(cW, c1);
                for (var cY = 0; cY < cV.length; ++cY) {
                    if (cV[cY].marker == this) {
                        cV.splice(cY--, 1)
                    }
                }
            }
            if (c0 != Infinity) {
                az.push({
                    from: c0,
                    to: cW + 1
                })
            }
        });
        cT.prototype.find = function () {
            var c0, c1;
            for (var cX = 0, cZ = this.set.length; cX < cZ; ++cX) {
                var c3 = this.set[cX],
                    cY = c3.marked;
                for (var cW = 0; cW < cY.length; ++cW) {
                    var cV = cY[cW];
                    if (cV.marker == this) {
                        if (cV.from != null || cV.to != null) {
                            var c2 = W(c3);
                            if (c2 != null) {
                                if (cV.from != null) {
                                    c0 = {
                                        line: c2,
                                        ch: cV.from
                                    }
                                }
                                if (cV.to != null) {
                                    c1 = {
                                        line: c2,
                                        ch: cV.to
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                from: c0,
                to: c1
            }
        };

        function bB(c1, c0, cX) {
            c1 = aR(c1);
            c0 = aR(c0);
            var cV = new cT();
            if (!X(c1, c0)) {
                return cV
            }

            function cZ(c2, c5, c4, c3) {
                cB(c2).addMark(new I(c5, c4, c3, cV))
            }
            if (c1.line == c0.line) {
                cZ(c1.line, c1.ch, c0.ch, cX)
            } else {
                cZ(c1.line, c1.ch, null, cX);
                for (var cW = c1.line + 1, cY = c0.line; cW < cY; ++cW) {
                    cZ(cW, null, null, cX)
                }
                cZ(c0.line, null, c0.ch, cX)
            }
            az.push({
                from: c1.line,
                to: c0.line + 1
            });
            return cV
        }

        function aS(cW) {
            cW = aR(cW);
            var cV = new E(cW.ch);
            cB(cW.line).addMark(cV);
            return cV
        }

        function bm(c0) {
            c0 = aR(c0);
            var cZ = [],
                cX = cB(c0.line).marked;
            if (!cX) {
                return cZ
            }
            for (var cW = 0, cY = cX.length; cW < cY; ++cW) {
                var cV = cX[cW];
                if ((cV.from == null || cV.from <= c0.ch) && (cV.to == null || cV.to >= c0.ch)) {
                    cZ.push(cV.marker || cV)
                }
            }
            return cZ
        }

        function bR(cV, cX, cW) {
            if (typeof cV == "number") {
                cV = cB(bV(cV))
            }
            cV.gutterMarker = {
                text: cX,
                style: cW
            };
            aQ = true;
            return cV
        }

        function ar(cV) {
            if (typeof cV == "number") {
                cV = cB(bV(cV))
            }
            cV.gutterMarker = null;
            aQ = true
        }

        function aV(cW, cY) {
            var cX = cW,
                cV = cW;
            if (typeof cW == "number") {
                cV = cB(bV(cW))
            } else {
                cX = W(cW)
            } if (cX == null) {
                return null
            }
            if (cY(cV, cX)) {
                az.push({
                    from: cX,
                    to: cX + 1
                })
            } else {
                return null
            }
            return cV
        }

        function bj(cW, cV, cX) {
            return aV(cW, function (cY) {
                if (cY.className != cV || cY.bgClassName != cX) {
                    cY.className = cV;
                    cY.bgClassName = cX;
                    return true
                }
            })
        }

        function cG(cW, cV) {
            return aV(cW, function (cX, c0) {
                if (cX.hidden != cV) {
                    cX.hidden = cV;
                    a1(cX, cV ? 0 : 1);
                    var cZ = cS.from.line,
                        cY = cS.to.line;
                    if (cV && (cZ == c0 || cY == c0)) {
                        var c2 = cZ == c0 ? bN({
                            line: cZ,
                            ch: 0
                        }, cZ, 0) : cS.from;
                        var c1 = cY == c0 ? bN({
                            line: cY,
                            ch: 0
                        }, cY, 0) : cS.to;
                        if (!c1) {
                            return
                        }
                        bu(c2, c1)
                    }
                    return (aQ = true)
                }
            })
        }

        function aT(cW) {
            if (typeof cW == "number") {
                if (!bp(cW)) {
                    return null
                }
                var cX = cW;
                cW = cB(cW);
                if (!cW) {
                    return null
                }
            } else {
                var cX = W(cW);
                if (cX == null) {
                    return null
                }
            }
            var cV = cW.gutterMarker;
            return {
                line: cX,
                handle: cW,
                text: cW.text,
                markerText: cV && cV.text,
                markerClass: cV && cV.style,
                lineClass: cW.className,
                bgClass: cW.bgClassName
            }
        }

        function cp(cV) {
            at.innerHTML = "<pre><span>x</span></pre>";
            at.firstChild.firstChild.firstChild.nodeValue = cV;
            return at.firstChild.firstChild.offsetWidth || 10
        }

        function aE(c7, c1) {
            if (c1 <= 0) {
                return 0
            }
            var cY = cB(c7),
                c4 = cY.text;

            function c5(c8) {
                at.innerHTML = "<pre><span>" + cY.getHTML(a7, c8) + "</span></pre>";
                return at.firstChild.firstChild.offsetWidth
            }
            var c2 = 0,
                c0 = 0,
                c3 = c4.length,
                cZ;
            var cW = Math.min(c3, Math.ceil(c1 / bf()));
            for (;;) {
                var cX = c5(cW);
                if (cX <= c1 && cW < c3) {
                    cW = Math.min(c3, Math.ceil(cW * 1.2))
                } else {
                    cZ = cX;
                    c3 = cW;
                    break
                }
            }
            if (c1 > cZ) {
                return c3
            }
            cW = Math.floor(c3 * 0.8);
            cX = c5(cW);
            if (cX < c1) {
                c2 = cW;
                c0 = cX
            }
            for (;;) {
                if (c3 - c2 <= 1) {
                    return (cZ - c1 > c1 - c0) ? c2 : c3
                }
                var c6 = Math.ceil((c2 + c3) / 2),
                    cV = c5(c6);
                if (cV > c1) {
                    c3 = c6;
                    cZ = cV
                } else {
                    c2 = c6;
                    c0 = cV
                }
            }
        }
        var cv = Math.floor(Math.random() * 16777215).toString(16);

        function b1(cX, c0) {
            if (c0 == 0) {
                return {
                    top: 0,
                    left: 0
                }
            }
            var cV = "";
            if (bX.lineWrapping) {
                var cW = cX.text.indexOf(" ", c0 + 6);
                cV = N(cX.text.slice(c0 + 1, cW < 0 ? cX.text.length : cW + (G ? 5 : 0)))
            }
            at.innerHTML = "<pre>" + cX.getHTML(a7, c0) + '<span id="CodeMirror-temp-' + cv + '">' + N(cX.text.charAt(c0) || " ") + "</span>" + cV + "</pre>";
            var cZ = document.getElementById("CodeMirror-temp-" + cv);
            var c2 = cZ.offsetTop,
                c1 = cZ.offsetLeft;
            if (G && c2 == 0 && c1 == 0) {
                var cY = document.createElement("span");
                cY.innerHTML = "x";
                cZ.parentNode.insertBefore(cY, cZ.nextSibling);
                c2 = cY.offsetTop
            }
            return {
                top: c2,
                left: c1
            }
        }

        function cN(c0, cY) {
            var cV, cW = bL(),
                cZ = cW * (g(cu, c0.line) - (cY ? bb : 0));
            if (c0.ch == 0) {
                cV = 0
            } else {
                var cX = b1(cB(c0.line), c0.ch);
                cV = cX.left;
                if (bX.lineWrapping) {
                    cZ += Math.max(0, cX.top)
                }
            }
            return {
                x: cV,
                y: cZ,
                yBot: cZ + cW
            }
        }

        function bE(c4, c3) {
            if (c3 < 0) {
                c3 = 0
            }
            var c1 = bL(),
                cZ = bf(),
                da = bb + Math.floor(c3 / c1);
            var c5 = V(cu, da);
            if (c5 >= cu.size) {
                return {
                    line: cu.size - 1,
                    ch: cB(cu.size - 1).text.length
                }
            }
            var cW = cB(c5),
                c7 = cW.text;
            var dc = bX.lineWrapping,
                c2 = dc ? da - g(cu, c5) : 0;
            if (c4 <= 0 && c2 == 0) {
                return {
                    line: c5,
                    ch: 0
                }
            }

            function db(de) {
                var df = b1(cW, de);
                if (dc) {
                    var dg = Math.round(df.top / c1);
                    return Math.max(0, df.left + (dg - c2) * bi.clientWidth)
                }
                return df.left
            }
            var c9 = 0,
                c8 = 0,
                cX = c7.length,
                cV;
            var c6 = Math.min(cX, Math.ceil((c4 + c2 * bi.clientWidth * 0.9) / cZ));
            for (;;) {
                var c0 = db(c6);
                if (c0 <= c4 && c6 < cX) {
                    c6 = Math.min(cX, Math.ceil(c6 * 1.2))
                } else {
                    cV = c0;
                    cX = c6;
                    break
                }
            }
            if (c4 > cV) {
                return {
                    line: c5,
                    ch: cX
                }
            }
            c6 = Math.floor(cX * 0.8);
            c0 = db(c6);
            if (c0 < c4) {
                c9 = c6;
                c8 = c0
            }
            for (;;) {
                if (cX - c9 <= 1) {
                    return {
                        line: c5,
                        ch: (cV - c4 > c4 - c8) ? c9 : cX
                    }
                }
                var dd = Math.ceil((c9 + cX) / 2),
                    cY = db(dd);
                if (cY > c4) {
                    cX = dd;
                    cV = cY
                } else {
                    c9 = dd;
                    c8 = cY
                }
            }
        }

        function am(cX) {
            var cV = cN(cX, true),
                cW = ai(bs);
            return {
                x: cW.left + cV.x,
                y: cW.top + cV.y,
                yBot: cW.top + cV.yBot
            }
        }
        var aY, av, bQ;

        function bL() {
            if (bQ == null) {
                bQ = "<pre>";
                for (var cW = 0; cW < 49; ++cW) {
                    bQ += "x<br/>"
                }
                bQ += "x</pre>"
            }
            var cV = ao.clientHeight;
            if (cV == av) {
                return aY
            }
            av = cV;
            at.innerHTML = bQ;
            aY = at.firstChild.offsetHeight / 50 || 1;
            at.innerHTML = "";
            return aY
        }
        var cO, bt = 0;

        function bf() {
            if (bi.clientWidth == bt) {
                return cO
            }
            bt = bi.clientWidth;
            return (cO = cp("x"))
        }

        function cn() {
            return bs.offsetTop
        }

        function a3() {
            return bs.offsetLeft
        }

        function a0(cZ, cY) {
            var cX = ai(bi, true),
                cV, c0;
            try {
                cV = cZ.clientX;
                c0 = cZ.clientY
            } catch (cZ) {
                return null
            }
            if (!cY && (cV - cX.left > bi.clientWidth || c0 - cX.top > bi.clientHeight)) {
                return null
            }
            var cW = ai(bs, true);
            return bE(cV - cW.left, c0 - cW.top)
        }

        function aZ(cW) {
            var c1 = a0(cW),
                c0 = bi.scrollTop;
            if (!c1 || window.opera) {
                return
            }
            if (ab(cS.from, cS.to) || X(c1, cS.from) || !X(c1, cS.to)) {
                ap(a4)(c1.line, c1.ch)
            }
            var cZ = bk.style.cssText;
            bT.style.position = "absolute";
            bk.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (cW.clientY - 5) + "px; left: " + (cW.clientX - 5) + "px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
            bd = true;
            var cY = bk.value = bZ();
            bx();
            a(bk);

            function cV() {
                var c2 = z(bk.value).join("\n");
                if (c2 != cY) {
                    ap(bq)(c2, "end")
                }
                bT.style.position = "relative";
                bk.style.cssText = cZ;
                if (A) {
                    bi.scrollTop = c0
                }
                bd = false;
                cy(true);
                ak()
            }
            if (L) {
                v(cW);
                var cX = q(window, "mouseup", function () {
                    cX();
                    setTimeout(cV, 20)
                }, true)
            } else {
                setTimeout(cV, 50)
            }
        }

        function cI() {
            clearInterval(cL);
            var cV = true;
            ba.style.visibility = "";
            cL = setInterval(function () {
                ba.style.visibility = (cV = !cV) ? "" : "hidden"
            }, 650)
        }
        var bn = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        };

        function ca(c1) {
            var cV = cS.inverted ? cS.from : cS.to,
                c3 = cB(cV.line),
                cW = cV.ch - 1;
            var c0 = (cW >= 0 && bn[c3.text.charAt(cW)]) || bn[c3.text.charAt(++cW)];
            if (!c0) {
                return
            }
            var c4 = c0.charAt(0),
                c2 = c0.charAt(1) == ">",
                de = c2 ? 1 : -1,
                c9 = c3.styles;
            for (var df = cW + 1, db = 0, dd = c9.length; db < dd; db += 2) {
                if ((df -= c9[db].length) <= 0) {
                    var dc = c9[db + 1];
                    break
                }
            }
            var cY = [c3.text.charAt(cW)],
                c8 = /[(){}[\]]/;

            function c6(ds, dm, dn) {
                if (!ds.text) {
                    return
                }
                var dr = ds.styles,
                    dl = c2 ? 0 : ds.text.length - 1,
                    dp;
                for (var di = c2 ? 0 : dr.length - 2, dk = c2 ? dr.length : -2; di != dk; di += 2 * de) {
                    var dq = dr[di];
                    if (dr[di + 1] != null && dr[di + 1] != dc) {
                        dl += de * dq.length;
                        continue
                    }
                    for (var dh = c2 ? 0 : dq.length - 1, dg = c2 ? dq.length : -1; dh != dg; dh += de, dl += de) {
                        if (dl >= dm && dl < dn && c8.test(dp = dq.charAt(dh))) {
                            var dj = bn[dp];
                            if (dj.charAt(1) == ">" == c2) {
                                cY.push(dp)
                            } else {
                                if (cY.pop() != dj.charAt(0)) {
                                    return {
                                        pos: dl,
                                        match: false
                                    }
                                } else {
                                    if (!cY.length) {
                                        return {
                                            pos: dl,
                                            match: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (var db = cV.line, dd = c2 ? Math.min(db + 100, cu.size) : Math.max(-1, db - 100); db != dd; db += de) {
                var c3 = cB(db),
                    cZ = db == cV.line;
                var c5 = c6(c3, cZ && c2 ? cW + 1 : 0, cZ && !c2 ? cW : c3.text.length);
                if (c5) {
                    break
                }
            }
            if (!c5) {
                c5 = {
                    pos: null,
                    match: false
                }
            }
            var dc = c5.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
            var da = bB({
                line: cV.line,
                ch: cW
            }, {
                line: cV.line,
                ch: cW + 1
            }, dc),
                cX = c5.pos != null && bB({
                    line: db,
                    ch: c5.pos
                }, {
                    line: db,
                    ch: c5.pos + 1
                }, dc);
            var c7 = ap(function () {
                da.clear();
                cX && cX.clear()
            });
            if (c1) {
                setTimeout(c7, 800)
            } else {
                b0 = c7
            }
        }

        function a5(c1) {
            var c0, cX;
            for (var cW = c1, cY = c1 - 40; cW > cY; --cW) {
                if (cW == 0) {
                    return 0
                }
                var cV = cB(cW - 1);
                if (cV.stateAfter) {
                    return cW
                }
                var cZ = cV.indentation(bX.tabSize);
                if (cX == null || c0 > cZ) {
                    cX = cW - 1;
                    c0 = cZ
                }
            }
            return cX
        }

        function cq(cX) {
            var cW = a5(cX),
                cV = cW && cB(cW - 1).stateAfter;
            if (!cV) {
                cV = T(b7)
            } else {
                cV = o(b7, cV)
            }
            cu.iter(cW, cX, function (cY) {
                cY.highlight(b7, cV, bX.tabSize);
                cY.stateAfter = o(b7, cV)
            });
            if (cW < cX) {
                az.push({
                    from: cW,
                    to: cX
                })
            }
            if (cX < cu.size && !cB(cX).stateAfter) {
                cd.push(cX)
            }
            return cV
        }

        function cD(cX, cV) {
            var cW = cq(cX);
            cu.iter(cX, cV, function (cY) {
                cY.highlight(b7, cW, bX.tabSize);
                cY.stateAfter = o(b7, cW)
            })
        }

        function bO() {
            var c1 = +new Date + bX.workTime;
            var c4 = cd.length;
            while (cd.length) {
                if (!cB(cM).stateAfter) {
                    var cY = cM
                } else {
                    var cY = cd.pop()
                } if (cY >= cu.size) {
                    continue
                }
                var cW = a5(cY),
                    cV = cW && cB(cW - 1).stateAfter;
                if (cV) {
                    cV = o(b7, cV)
                } else {
                    cV = T(b7)
                }
                var c0 = 0,
                    cX = b7.compareStates,
                    c3 = false,
                    c2 = cW,
                    cZ = false;
                cu.iter(c2, cu.size, function (c5) {
                    var c6 = c5.stateAfter;
                    if (+new Date > c1) {
                        cd.push(c2);
                        bD(bX.workDelay);
                        if (c3) {
                            az.push({
                                from: cY,
                                to: c2 + 1
                            })
                        }
                        return (cZ = true)
                    }
                    var c7 = c5.highlight(b7, cV, bX.tabSize);
                    if (c7) {
                        c3 = true
                    }
                    c5.stateAfter = o(b7, cV);
                    if (cX) {
                        if (c6 && cX(c6, cV)) {
                            return true
                        }
                    } else {
                        if (c7 !== false || !c6) {
                            c0 = 0
                        } else {
                            if (++c0 > 3 && (!b7.indent || b7.indent(c6, "") == b7.indent(cV, ""))) {
                                return true
                            }
                        }
                    }++c2
                });
                if (cZ) {
                    return
                }
                if (c3) {
                    az.push({
                        from: cY,
                        to: c2 + 1
                    })
                }
            }
            if (c4 && bX.onHighlightComplete) {
                bX.onHighlightComplete(b5)
            }
        }

        function bD(cV) {
            if (!cd.length) {
                return
            }
            au.set(cV, ap(bO))
        }

        function aL() {
            cl = b2 = cJ = null;
            az = [];
            aN = false;
            cw = []
        }

        function aw() {
            var cZ = false,
                cW;
            if (aN) {
                cZ = !cb()
            }
            if (az.length) {
                cW = b9(az, true)
            } else {
                if (aN) {
                    cR()
                }
                if (aQ) {
                    aJ()
                }
            } if (cZ) {
                cb()
            }
            if (aN) {
                cU();
                cI()
            }
            if (cf && !bd && (cl === true || (cl !== false && aN))) {
                cy(b2)
            }
            if (aN && bX.matchBrackets) {
                setTimeout(ap(function () {
                    if (b0) {
                        b0();
                        b0 = null
                    }
                    if (ab(cS.from, cS.to)) {
                        ca(false)
                    }
                }), 20)
            }
            var cV = cJ,
                cX = cw;
            if (aN && bX.onCursorActivity) {
                bX.onCursorActivity(b5)
            }
            if (cV && bX.onChange && b5) {
                bX.onChange(b5, cV)
            }
            for (var cY = 0; cY < cX.length; ++cY) {
                cX[cY](b5)
            }
            if (cW && bX.onUpdate) {
                bX.onUpdate(b5)
            }
        }
        var cm = 0;

        function ap(cV) {
            return function () {
                if (!cm++) {
                    aL()
                }
                try {
                    var cW = cV.apply(this, arguments)
                } finally {
                    if (!--cm) {
                        aw()
                    }
                }
                return cW
            }
        }
        for (var bG in aa) {
            if (aa.propertyIsEnumerable(bG) && !b5.propertyIsEnumerable(bG)) {
                b5[bG] = aa[bG]
            }
        }
        return b5
    }
    t.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: false,
        smartIndent: true,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: true,
        autoClearEmptyLines: false,
        onKeyEvent: null,
        lineWrapping: false,
        lineNumbers: false,
        gutter: false,
        fixedGutter: false,
        firstLineNumber: 1,
        readOnly: false,
        onChange: null,
        onCursorActivity: null,
        onGutterClick: null,
        onHighlightComplete: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: false,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null
    };
    var r = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var K = r || /Mac/.test(navigator.platform);
    var S = /Win/.test(navigator.platform);
    var ah = t.modes = {}, Q = t.mimeModes = {};
    t.defineMode = function (ak, al) {
        if (!t.defaults.mode && ak != "null") {
            t.defaults.mode = ak
        }
        ah[ak] = al
    };
    t.defineMIME = function (al, ak) {
        Q[al] = ak
    };
    t.resolveMode = function (ak) {
        if (typeof ak == "string" && Q.hasOwnProperty(ak)) {
            ak = Q[ak]
        } else {
            if (typeof ak == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(ak)) {
                return t.resolveMode("application/xml")
            }
        } if (typeof ak == "string") {
            return {
                name: ak
            }
        } else {
            return ak || {
                name: "null"
            }
        }
    };
    t.getMode = function (al, ak) {
        var ak = t.resolveMode(ak);
        var am = ah[ak.name];
        if (!am) {
            if (window.console) {
                console.warn("No mode " + ak.name + " found, falling back to plain text.")
            }
            return t.getMode(al, "text/plain")
        }
        return am(al, ak)
    };
    t.listModes = function () {
        var al = [];
        for (var ak in ah) {
            if (ah.propertyIsEnumerable(ak)) {
                al.push(ak)
            }
        }
        return al
    };
    t.listMIMEs = function () {
        var al = [];
        for (var ak in Q) {
            if (Q.propertyIsEnumerable(ak)) {
                al.push({
                    mime: ak,
                    mode: Q[ak]
                })
            }
        }
        return al
    };
    var aa = t.extensions = {};
    t.defineExtension = function (ak, al) {
        aa[ak] = al
    };
    var J = t.commands = {
        selectAll: function (ak) {
            ak.setSelection({
                line: 0,
                ch: 0
            }, {
                line: ak.lineCount() - 1
            })
        },
        killLine: function (ak) {
            var an = ak.getCursor(true),
                am = ak.getCursor(false),
                al = !ab(an, am);
            if (!al && ak.getLine(an.line).length == an.ch) {
                ak.replaceRange("", an, {
                    line: an.line + 1,
                    ch: 0
                })
            } else {
                ak.replaceRange("", an, al ? am : {
                    line: an.line
                })
            }
        },
        deleteLine: function (ak) {
            var al = ak.getCursor().line;
            ak.replaceRange("", {
                line: al,
                ch: 0
            }, {
                line: al
            })
        },
        undo: function (ak) {
            ak.undo()
        },
        redo: function (ak) {
            ak.redo()
        },
        goDocStart: function (ak) {
            ak.setCursor(0, 0, true)
        },
        goDocEnd: function (ak) {
            ak.setSelection({
                line: ak.lineCount() - 1
            }, null, true)
        },
        goLineStart: function (ak) {
            ak.setCursor(ak.getCursor().line, 0, true)
        },
        goLineStartSmart: function (ak) {
            var an = ak.getCursor();
            var am = ak.getLine(an.line),
                al = Math.max(0, am.search(/\S/));
            ak.setCursor(an.line, an.ch <= al && an.ch ? 0 : al, true)
        },
        goLineEnd: function (ak) {
            ak.setSelection({
                line: ak.getCursor().line
            }, null, true)
        },
        goLineUp: function (ak) {
            ak.moveV(-1, "line")
        },
        goLineDown: function (ak) {
            ak.moveV(1, "line")
        },
        goPageUp: function (ak) {
            ak.moveV(-1, "page")
        },
        goPageDown: function (ak) {
            ak.moveV(1, "page")
        },
        goCharLeft: function (ak) {
            ak.moveH(-1, "char")
        },
        goCharRight: function (ak) {
            ak.moveH(1, "char")
        },
        goColumnLeft: function (ak) {
            ak.moveH(-1, "column")
        },
        goColumnRight: function (ak) {
            ak.moveH(1, "column")
        },
        goWordLeft: function (ak) {
            ak.moveH(-1, "word")
        },
        goWordRight: function (ak) {
            ak.moveH(1, "word")
        },
        delCharLeft: function (ak) {
            ak.deleteH(-1, "char")
        },
        delCharRight: function (ak) {
            ak.deleteH(1, "char")
        },
        delWordLeft: function (ak) {
            ak.deleteH(-1, "word")
        },
        delWordRight: function (ak) {
            ak.deleteH(1, "word")
        },
        indentAuto: function (ak) {
            ak.indentSelection("smart")
        },
        indentMore: function (ak) {
            ak.indentSelection("add")
        },
        indentLess: function (ak) {
            ak.indentSelection("subtract")
        },
        insertTab: function (ak) {
            ak.replaceSelection("\t", "end")
        },
        transposeChars: function (ak) {
            var am = ak.getCursor(),
                al = ak.getLine(am.line);
            if (am.ch > 0 && am.ch < al.length - 1) {
                ak.replaceRange(al.charAt(am.ch) + al.charAt(am.ch - 1), {
                    line: am.line,
                    ch: am.ch - 1
                }, {
                    line: am.line,
                    ch: am.ch + 1
                })
            }
        },
        newlineAndIndent: function (ak) {
            ak.replaceSelection("\n", "end");
            ak.indentLine(ak.getCursor().line)
        },
        toggleOverwrite: function (ak) {
            ak.toggleOverwrite()
        }
    };
    var u = t.keyMap = {};
    u.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharRight",
        Backspace: "delCharLeft",
        Tab: "insertTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    };
    u.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordLeft",
        "Ctrl-Delete": "delWordRight",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    };
    u.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-Alt-Backspace": "delWordRight",
        "Alt-Delete": "delWordRight",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    };
    u["default"] = K ? u.macDefault : u.pcDefault;
    u.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageUp",
        "Shift-Ctrl-V": "goPageDown",
        "Ctrl-D": "delCharRight",
        "Ctrl-H": "delCharLeft",
        "Alt-D": "delWordRight",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };

    function c(ak) {
        if (typeof ak == "string") {
            return u[ak]
        } else {
            return ak
        }
    }

    function k(al, ak, ao, am) {
        function an(au) {
            au = c(au);
            var ar = au[al];
            if (ar != null && am(ar)) {
                return true
            }
            if (au.catchall) {
                return am(au.catchall)
            }
            var aq = au.fallthrough;
            if (aq == null) {
                return false
            }
            if (Object.prototype.toString.call(aq) != "[object Array]") {
                return an(aq)
            }
            for (var ap = 0, at = aq.length; ap < at; ++ap) {
                if (an(aq[ap])) {
                    return true
                }
            }
            return false
        }
        if (ak && an(ak)) {
            return true
        }
        return an(ao)
    }

    function O(al) {
        var ak = P[x(al, "keyCode")];
        return ak == "Ctrl" || ak == "Alt" || ak == "Shift" || ak == "Mod"
    }
    t.fromTextArea = function (al, an) {
        if (!an) {
            an = {}
        }
        an.value = al.value;
        if (!an.tabindex && al.tabindex) {
            an.tabindex = al.tabindex
        }
        if (an.autofocus == null && al.getAttribute("autofocus") != null) {
            an.autofocus = true
        }

        function ap() {
            al.value = ak.getValue()
        }
        if (al.form) {
            var ao = q(al.form, "submit", ap, true);
            if (typeof al.form.submit == "function") {
                var am = al.form.submit;

                function aq() {
                    ap();
                    al.form.submit = am;
                    al.form.submit();
                    al.form.submit = aq
                }
                al.form.submit = aq
            }
        }
        al.style.display = "none";
        var ak = t(function (ar) {
            al.parentNode.insertBefore(ar, al.nextSibling)
        }, an);
        ak.save = ap;
        ak.getTextArea = function () {
            return al
        };
        ak.toTextArea = function () {
            ap();
            al.parentNode.removeChild(ak.getWrapperElement());
            al.style.display = "";
            if (al.form) {
                ao();
                if (typeof al.form.submit == "function") {
                    al.form.submit = am
                }
            }
        };
        return ak
    };

    function o(an, ak) {
        if (ak === true) {
            return ak
        }
        if (an.copyState) {
            return an.copyState(ak)
        }
        var am = {};
        for (var ao in ak) {
            var al = ak[ao];
            if (al instanceof Array) {
                al = al.concat([])
            }
            am[ao] = al
        }
        return am
    }
    t.copyState = o;

    function T(am, al, ak) {
        return am.startState ? am.startState(al, ak) : true
    }
    t.startState = T;

    function b(ak, al) {
        this.pos = this.start = 0;
        this.string = ak;
        this.tabSize = al || 8
    }
    b.prototype = {
        eol: function () {
            return this.pos >= this.string.length
        },
        sol: function () {
            return this.pos == 0
        },
        peek: function () {
            return this.string.charAt(this.pos)
        },
        next: function () {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },
        eat: function (ak) {
            var am = this.string.charAt(this.pos);
            if (typeof ak == "string") {
                var al = am == ak
            } else {
                var al = am && (ak.test ? ak.test(am) : ak(am))
            } if (al) {
                ++this.pos;
                return am
            }
        },
        eatWhile: function (ak) {
            var al = this.pos;
            while (this.eat(ak)) {}
            return this.pos > al
        },
        eatSpace: function () {
            var ak = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
                ++this.pos
            }
            return this.pos > ak
        },
        skipToEnd: function () {
            this.pos = this.string.length
        },
        skipTo: function (ak) {
            var al = this.string.indexOf(ak, this.pos);
            if (al > -1) {
                this.pos = al;
                return true
            }
        },
        backUp: function (ak) {
            this.pos -= ak
        },
        column: function () {
            return m(this.string, this.start, this.tabSize)
        },
        indentation: function () {
            return m(this.string, null, this.tabSize)
        },
        match: function (an, al, ak) {
            if (typeof an == "string") {
                function ao(ap) {
                    return ak ? ap.toLowerCase() : ap
                }
                if (ao(this.string).indexOf(ao(an), this.pos) == this.pos) {
                    if (al !== false) {
                        this.pos += an.length
                    }
                    return true
                }
            } else {
                var am = this.string.slice(this.pos).match(an);
                if (am && al !== false) {
                    this.pos += am[0].length
                }
                return am
            }
        },
        current: function () {
            return this.string.slice(this.start, this.pos)
        }
    };
    t.StringStream = b;

    function I(an, am, al, ak) {
        this.from = an;
        this.to = am;
        this.style = al;
        this.marker = ak
    }
    I.prototype = {
        attach: function (ak) {
            this.marker.set.push(ak)
        },
        detach: function (al) {
            var ak = p(this.marker.set, al);
            if (ak > -1) {
                this.marker.set.splice(ak, 1)
            }
        },
        split: function (an, ak) {
            if (this.to <= an && this.to != null) {
                return null
            }
            var am = this.from < an || this.from == null ? null : this.from - an + ak;
            var al = this.to == null ? null : this.to - an + ak;
            return new I(am, al, this.style, this.marker)
        },
        dup: function () {
            return new I(null, null, this.style, this.marker)
        },
        clipTo: function (al, ao, ak, an, am) {
            if (al && an > this.from && (an < this.to || this.to == null)) {
                this.from = null
            } else {
                if (this.from != null && this.from >= ao) {
                    this.from = Math.max(an, this.from) + am
                }
            } if (ak && (ao < this.to || this.to == null) && (ao > this.from || this.from == null)) {
                this.to = null
            } else {
                if (this.to != null && this.to > ao) {
                    this.to = an < this.to ? this.to + am : ao
                }
            }
        },
        isDead: function () {
            return this.from != null && this.to != null && this.from >= this.to
        },
        sameSet: function (ak) {
            return this.marker == ak.marker
        }
    };

    function E(ak) {
        this.from = ak;
        this.to = ak;
        this.line = null
    }
    E.prototype = {
        attach: function (ak) {
            this.line = ak
        },
        detach: function (ak) {
            if (this.line == ak) {
                this.line = null
            }
        },
        split: function (al, ak) {
            if (al < this.from) {
                this.from = this.to = (this.from - al) + ak;
                return this
            }
        },
        isDead: function () {
            return this.from > this.to
        },
        clipTo: function (al, ao, ak, an, am) {
            if ((al || ao < this.from) && (ak || an > this.to)) {
                this.from = 0;
                this.to = -1
            } else {
                if (this.from > ao) {
                    this.from = this.to = Math.max(an, this.from) + am
                }
            }
        },
        sameSet: function (ak) {
            return false
        },
        find: function () {
            if (!this.line || !this.line.parent) {
                return null
            }
            return {
                line: W(this.line),
                ch: this.from
            }
        },
        clear: function () {
            if (this.line) {
                var ak = p(this.line.marked, this);
                if (ak != -1) {
                    this.line.marked.splice(ak, 1)
                }
                this.line = null
            }
        }
    };

    function e(al, ak) {
        this.styles = ak || [al, null];
        this.text = al;
        this.height = 1;
        this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
        this.stateAfter = this.parent = this.hidden = null
    }
    e.inheritMarks = function (ao, ar) {
        var an = new e(ao),
            ak = ar && ar.marked;
        if (ak) {
            for (var am = 0; am < ak.length; ++am) {
                if (ak[am].to == null && ak[am].style) {
                    var al = an.marked || (an.marked = []),
                        aq = ak[am];
                    var ap = aq.dup();
                    al.push(ap);
                    ap.attach(an)
                }
            }
        }
        return an
    };
    e.prototype = {
        replace: function (ao, an, ar) {
            var at = [],
                am = this.marked,
                ap = an == null ? this.text.length : an;
            aj(0, ao, this.styles, at);
            if (ar) {
                at.push(ar, null)
            }
            aj(ap, this.text.length, this.styles, at);
            this.styles = at;
            this.text = this.text.slice(0, ao) + ar + this.text.slice(ap);
            this.stateAfter = null;
            if (am) {
                var aq = ar.length - (ap - ao);
                for (var al = 0; al < am.length; ++al) {
                    var ak = am[al];
                    ak.clipTo(ao == null, ao || 0, an == null, ap, aq);
                    if (ak.isDead()) {
                        ak.detach(this);
                        am.splice(al--, 1)
                    }
                }
            }
        },
        split: function (ar, ap) {
            var an = [ap, null],
                al = this.marked;
            aj(ar, this.text.length, this.styles, an);
            var am = new e(ap + this.text.slice(ar), an);
            if (al) {
                for (var ao = 0; ao < al.length; ++ao) {
                    var aq = al[ao];
                    var ak = aq.split(ar, ap.length);
                    if (ak) {
                        if (!am.marked) {
                            am.marked = []
                        }
                        am.marked.push(ak);
                        ak.attach(am);
                        if (ak == aq) {
                            al.splice(ao--, 1)
                        }
                    }
                }
            }
            return am
        },
        append: function (al) {
            var aq = this.text.length,
                ak = al.marked,
                ao = this.marked;
            this.text += al.text;
            aj(0, al.text.length, al.styles, this.styles);
            if (ao) {
                for (var ap = 0; ap < ao.length; ++ap) {
                    if (ao[ap].to == null) {
                        ao[ap].to = aq
                    }
                }
            }
            if (ak && ak.length) {
                if (!ao) {
                    this.marked = ao = []
                }
                outer: for (var ap = 0; ap < ak.length; ++ap) {
                    var ar = ak[ap];
                    if (!ar.from) {
                        for (var an = 0; an < ao.length; ++an) {
                            var am = ao[an];
                            if (am.to == aq && am.sameSet(ar)) {
                                am.to = ar.to == null ? null : ar.to + aq;
                                if (am.isDead()) {
                                    am.detach(this);
                                    ak.splice(ap--, 1)
                                }
                                continue outer
                            }
                        }
                    }
                    ao.push(ar);
                    ar.attach(this);
                    ar.from += aq;
                    if (ar.to != null) {
                        ar.to += aq
                    }
                }
            }
        },
        fixMarkEnds: function (al) {
            var ak = this.marked,
                ao = al.marked;
            if (!ak) {
                return
            }
            for (var an = 0; an < ak.length; ++an) {
                var aq = ak[an],
                    ap = aq.to == null;
                if (ap && ao) {
                    for (var am = 0; am < ao.length; ++am) {
                        if (ao[am].sameSet(aq)) {
                            ap = false;
                            break
                        }
                    }
                }
                if (ap) {
                    aq.to = this.text.length
                }
            }
        },
        fixMarkStarts: function () {
            var ak = this.marked;
            if (!ak) {
                return
            }
            for (var al = 0; al < ak.length; ++al) {
                if (ak[al].from == null) {
                    ak[al].from = 0
                }
            }
        },
        addMark: function (ak) {
            ak.attach(this);
            if (this.marked == null) {
                this.marked = []
            }
            this.marked.push(ak);
            this.marked.sort(function (am, al) {
                return (am.from || 0) - (al.from || 0)
            })
        },
        highlight: function (ap, al, aq) {
            var au = new b(this.text, aq),
                av = this.styles,
                ar = 0;
            var ao = false,
                am = av[0],
                at;
            if (this.text == "" && ap.blankLine) {
                ap.blankLine(al)
            }
            while (!au.eol()) {
                var ak = ap.token(au, al);
                var an = this.text.slice(au.start, au.pos);
                au.start = au.pos;
                if (ar && av[ar - 1] == ak) {
                    av[ar - 2] += an
                } else {
                    if (an) {
                        if (!ao && (av[ar + 1] != ak || (ar && av[ar - 2] != at))) {
                            ao = true
                        }
                        av[ar++] = an;
                        av[ar++] = ak;
                        at = am;
                        am = av[ar]
                    }
                } if (au.pos > 5000) {
                    av[ar++] = this.text.slice(au.pos);
                    av[ar++] = null;
                    break
                }
            }
            if (av.length != ar) {
                av.length = ar;
                ao = true
            }
            if (ar && av[ar - 2] != at) {
                ao = true
            }
            return ao || (av.length < 5 && this.text.length < 10 ? null : false)
        },
        getTokenAt: function (ap, an, am) {
            var ak = this.text,
                ao = new b(ak);
            while (ao.pos < am && !ao.eol()) {
                ao.start = ao.pos;
                var al = ap.token(ao, an)

            }
            return {
                start: ao.start,
                end: ao.pos,
                string: ao.current(),
                className: al || null,
                state: an
            }
        },
        indentation: function (ak) {
            return m(this.text, null, ak)
        },
        getHTML: function (aF, aA) {
            var ar = [],
                ap = true,
                an = 0;

            function aE(aR, aP) {
                if (!aR) {
                    return
                }
                if (ap && G && aR.charAt(0) == " ") {
                    aR = "\u00a0" + aR.slice(1)
                }
                ap = false;
                if (aR.indexOf("\t") == -1) {
                    an += aR.length;
                    var aQ = N(aR)
                } else {
                    var aQ = "";
                    for (var aS = 0;;) {
                        var aN = aR.indexOf("\t", aS);
                        if (aN == -1) {
                            aQ += N(aR.slice(aS));
                            an += aR.length - aS;
                            break
                        } else {
                            an += aN - aS;
                            var aO = aF(an);
                            aQ += N(aR.slice(aS, aN)) + aO.html;
                            an += aO.width;
                            aS = aN + 1
                        }
                    }
                } if (aP) {
                    ar.push('<span class="', aP, '">', aQ, "</span>")
                } else {
                    ar.push(aQ)
                }
            }
            var ay = this.styles,
                aq = this.text,
                aw = this.marked;
            var aI = aq.length;
            if (aA != null) {
                aI = Math.min(aA, aI)
            }

            function am(aN) {
                if (!aN) {
                    return null
                }
                return "cm-" + aN.replace(/ +/g, " cm-")
            }
            if (!aq && aA == null) {
                aE(" ")
            } else {
                if (!aw || !aw.length) {
                    for (var aG = 0, at = 0; at < aI; aG += 2) {
                        var az = ay[aG],
                            aJ = ay[aG + 1],
                            aB = az.length;
                        if (at + aB > aI) {
                            az = az.slice(0, aI - at)
                        }
                        at += aB;
                        aE(az, am(aJ))
                    }
                } else {
                    var ao = 0,
                        aG = 0,
                        av = "",
                        aJ, aM = 0;
                    var aL = aw[0].from || 0,
                        aD = [],
                        aK = 0;

                    function aH() {
                        var aN;
                        while (aK < aw.length && ((aN = aw[aK]).from == ao || aN.from == null)) {
                            if (aN.style != null) {
                                aD.push(aN)
                            }++aK
                        }
                        aL = aK < aw.length ? aw[aK].from : Infinity;
                        for (var aO = 0; aO < aD.length; ++aO) {
                            var aP = aD[aO].to || Infinity;
                            if (aP == ao) {
                                aD.splice(aO--, 1)
                            } else {
                                aL = Math.min(aP, aL)
                            }
                        }
                    }
                    var ax = 0;
                    while (ao < aI) {
                        if (aL == ao) {
                            aH()
                        }
                        var au = Math.min(aI, aL);
                        while (true) {
                            if (av) {
                                var al = ao + av.length;
                                var ak = aJ;
                                for (var aC = 0; aC < aD.length; ++aC) {
                                    ak = (ak ? ak + " " : "") + aD[aC].style
                                }
                                aE(al > au ? av.slice(0, au - ao) : av, ak);
                                if (al >= au) {
                                    av = av.slice(au - ao);
                                    ao = au;
                                    break
                                }
                                ao = al
                            }
                            av = ay[aG++];
                            aJ = am(ay[aG++])
                        }
                    }
                }
            }
            return ar.join("")
        },
        cleanUp: function () {
            this.parent = null;
            if (this.marked) {
                for (var ak = 0, al = this.marked.length; ak < al; ++ak) {
                    this.marked[ak].detach(this)
                }
            }
        }
    };

    function aj(aq, ar, ak, at) {
        for (var ao = 0, ap = 0, al = 0; ap < ar; ao += 2) {
            var am = ak[ao],
                an = ap + am.length;
            if (al == 0) {
                if (an > aq) {
                    at.push(am.slice(aq - ap, Math.min(am.length, ar - ap)), ak[ao + 1])
                }
                if (an >= aq) {
                    al = 1
                }
            } else {
                if (al == 1) {
                    if (an > ar) {
                        at.push(am.slice(0, ar - ap), ak[ao + 1])
                    } else {
                        at.push(am, ak[ao + 1])
                    }
                }
            }
            ap = an
        }
    }

    function af(al) {
        this.lines = al;
        this.parent = null;
        for (var am = 0, an = al.length, ak = 0; am < an; ++am) {
            al[am].parent = this;
            ak += al[am].height
        }
        this.height = ak
    }
    af.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        remove: function (ak, aq, ao) {
            for (var an = ak, ap = ak + aq; an < ap; ++an) {
                var al = this.lines[an];
                this.height -= al.height;
                al.cleanUp();
                if (al.handlers) {
                    for (var am = 0; am < al.handlers.length; ++am) {
                        ao.push(al.handlers[am])
                    }
                }
            }
            this.lines.splice(ak, aq)
        },
        collapse: function (ak) {
            ak.splice.apply(ak, [ak.length, 0].concat(this.lines))
        },
        insertHeight: function (al, am, ak) {
            this.height += ak;
            this.lines.splice.apply(this.lines, [al, 0].concat(am));
            for (var an = 0, ao = am.length; an < ao; ++an) {
                am[an].parent = this
            }
        },
        iterN: function (ak, an, am) {
            for (var al = ak + an; ak < al; ++ak) {
                if (am(this.lines[ak])) {
                    return true
                }
            }
        }
    };

    function h(an) {
        this.children = an;
        var am = 0,
            ak = 0;
        for (var al = 0, ap = an.length; al < ap; ++al) {
            var ao = an[al];
            am += ao.chunkSize();
            ak += ao.height;
            ao.parent = this
        }
        this.size = am;
        this.height = ak;
        this.parent = null
    }
    h.prototype = {
        chunkSize: function () {
            return this.size
        },
        remove: function (am, al, ap) {
            this.size -= al;
            for (var an = 0; an < this.children.length; ++an) {
                var ak = this.children[an],
                    aq = ak.chunkSize();
                if (am < aq) {
                    var ao = Math.min(al, aq - am),
                        ar = ak.height;
                    ak.remove(am, ao, ap);
                    this.height -= ar - ak.height;
                    if (aq == ao) {
                        this.children.splice(an--, 1);
                        ak.parent = null
                    }
                    if ((al -= ao) == 0) {
                        break
                    }
                    am = 0
                } else {
                    am -= aq
                }
            }
            if (this.size - al < 25) {
                var au = [];
                this.collapse(au);
                this.children = [new af(au)];
                this.children[0].parent = this
            }
        },
        collapse: function (ak) {
            for (var al = 0, am = this.children.length; al < am; ++al) {
                this.children[al].collapse(ak)
            }
        },
        insert: function (al, am) {
            var ak = 0;
            for (var an = 0, ao = am.length; an < ao; ++an) {
                ak += am[an].height
            }
            this.insertHeight(al, am, ak)
        },
        insertHeight: function (al, au, ar) {
            this.size += au.length;
            this.height += ar;
            for (var am = 0, ao = this.children.length; am < ao; ++am) {
                var ak = this.children[am],
                    ap = ak.chunkSize();
                if (al <= ap) {
                    ak.insertHeight(al, au, ar);
                    if (ak.lines && ak.lines.length > 50) {
                        while (ak.lines.length > 50) {
                            var an = ak.lines.splice(ak.lines.length - 25, 25);
                            var aq = new af(an);
                            ak.height -= aq.height;
                            this.children.splice(am + 1, 0, aq);
                            aq.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                al -= ap
            }
        },
        maybeSpill: function () {
            if (this.children.length <= 10) {
                return
            }
            var an = this;
            do {
                var al = an.children.splice(an.children.length - 5, 5);
                var am = new h(al);
                if (!an.parent) {
                    var ao = new h(an.children);
                    ao.parent = an;
                    an.children = [ao, am];
                    an = ao
                } else {
                    an.size -= am.size;
                    an.height -= am.height;
                    var ak = p(an.parent.children, an);
                    an.parent.children.splice(ak + 1, 0, am)
                }
                am.parent = an.parent
            } while (an.children.length > 10);
            an.parent.maybeSpill()
        },
        iter: function (am, al, ak) {
            this.iterN(am, al - am, ak)
        },
        iterN: function (ak, ar, aq) {
            for (var al = 0, ao = this.children.length; al < ao; ++al) {
                var ap = this.children[al],
                    an = ap.chunkSize();
                if (ak < an) {
                    var am = Math.min(ar, an - ak);
                    if (ap.iterN(ak, am, aq)) {
                        return true
                    }
                    if ((ar -= am) == 0) {
                        break
                    }
                    ak = 0
                } else {
                    ak -= an
                }
            }
        }
    };

    function B(ak, ao) {
        while (!ak.lines) {
            for (var al = 0;; ++al) {
                var an = ak.children[al],
                    am = an.chunkSize();
                if (ao < am) {
                    ak = an;
                    break
                }
                ao -= am
            }
        }
        return ak.lines[ao]
    }

    function W(ak) {
        if (ak.parent == null) {
            return null
        }
        var ap = ak.parent,
            ao = p(ap.lines, ak);
        for (var al = ap.parent; al; ap = al, al = al.parent) {
            for (var am = 0, an = al.children.length;; ++am) {
                if (al.children[am] == ap) {
                    break
                }
                ao += al.children[am].chunkSize()
            }
        }
        return ao
    }

    function V(aq, ao) {
        var am = 0;
        outer: do {
            for (var an = 0, ap = aq.children.length; an < ap; ++an) {
                var al = aq.children[an],
                    ak = al.height;
                if (ao < ak) {
                    aq = al;
                    continue outer
                }
                ao -= ak;
                am += al.chunkSize()
            }
            return am
        } while (!aq.lines);
        for (var an = 0, ap = aq.lines.length; an < ap; ++an) {
            var at = aq.lines[an],
                ar = at.height;
            if (ao < ar) {
                break
            }
            ao -= ar
        }
        return am + an
    }

    function g(ak, aq) {
        var am = 0;
        outer: do {
            for (var al = 0, ao = ak.children.length; al < ao; ++al) {
                var ap = ak.children[al],
                    an = ap.chunkSize();
                if (aq < an) {
                    ak = ap;
                    continue outer
                }
                aq -= an;
                am += ap.height
            }
            return am
        } while (!ak.lines);
        for (var al = 0; al < aq; ++al) {
            am += ak.lines[al].height
        }
        return am
    }

    function j() {
        this.time = 0;
        this.done = [];
        this.undone = []
    }
    j.prototype = {
        addChange: function (ak, aq, al) {
            this.undone.length = 0;
            var am = +new Date,
                at = this.done[this.done.length - 1],
                au = at && at[at.length - 1];
            var ao = am - this.time;
            if (ao > 400 || !au) {
                this.done.push([{
                    start: ak,
                    added: aq,
                    old: al
                }])
            } else {
                if (au.start > ak + al.length || au.start + au.added < ak - au.added + au.old.length) {
                    at.push({
                        start: ak,
                        added: aq,
                        old: al
                    })
                } else {
                    var ar = 0;
                    if (ak < au.start) {
                        for (var an = au.start - ak - 1; an >= 0; --an) {
                            au.old.unshift(al[an])
                        }
                        ar = Math.min(0, aq - al.length);
                        au.added += au.start - ak + ar;
                        au.start = ak
                    } else {
                        if (au.start < ak) {
                            ar = ak - au.start;
                            aq += ar
                        }
                    }
                    for (var an = au.added - ar, ap = al.length; an < ap; ++an) {
                        au.old.push(al[an])
                    }
                    if (au.added < aq) {
                        au.added = aq
                    }
                }
            }
            this.time = am
        }
    };

    function H() {
        v(this)
    }

    function M(ak) {
        if (!ak.stop) {
            ak.stop = H
        }
        return ak
    }

    function R(ak) {
        if (ak.preventDefault) {
            ak.preventDefault()
        } else {
            ak.returnValue = false
        }
    }

    function C(ak) {
        if (ak.stopPropagation) {
            ak.stopPropagation()
        } else {
            ak.cancelBubble = true
        }
    }

    function v(ak) {
        R(ak);
        C(ak)
    }
    t.e_stop = v;
    t.e_preventDefault = R;
    t.e_stopPropagation = C;

    function i(ak) {
        return ak.target || ak.srcElement
    }

    function w(ak) {
        if (ak.which) {
            return ak.which
        } else {
            if (ak.button & 1) {
                return 1
            } else {
                if (ak.button & 2) {
                    return 3
                } else {
                    if (ak.button & 4) {
                        return 2
                    }
                }
            }
        }
    }

    function x(al, am) {
        var ak = al.override && al.override.hasOwnProperty(am);
        return ak ? al.override[am] : al[am]
    }

    function q(an, am, al, ak) {
        if (typeof an.addEventListener == "function") {
            an.addEventListener(am, al, false);
            if (ak) {
                return function () {
                    an.removeEventListener(am, al, false)
                }
            }
        } else {
            var ao = function (ap) {
                al(ap || window.event)
            };
            an.attachEvent("on" + am, ao);
            if (ak) {
                return function () {
                    an.detachEvent("on" + am, ao)
                }
            }
        }
    }
    t.connect = q;

    function y() {
        this.id = null
    }
    y.prototype = {
        set: function (ak, al) {
            clearTimeout(this.id);
            this.id = setTimeout(al, ak)
        }
    };
    var Z = t.Pass = {
        toString: function () {
            return "CodeMirror.Pass"
        }
    };
    var L = /gecko\/\d{7}/i.test(navigator.userAgent);
    var G = /MSIE \d/.test(navigator.userAgent);
    var A = /MSIE [1-8]\b/.test(navigator.userAgent);
    var f = /WebKit\//.test(navigator.userAgent);
    var ad = /Chrome\//.test(navigator.userAgent);
    var l = /KHTML\//.test(navigator.userAgent);
    var D = function () {
        if (A) {
            return false
        }
        var ak = document.createElement("div");
        return "draggable" in ak || "dragDrop" in ak
    }();
    var d = "\n";
    (function () {
        var ak = document.createElement("textarea");
        ak.value = "foo\nbar";
        if (ak.value.indexOf("\r") > -1) {
            d = "\r\n"
        }
    }());

    function m(al, ak, an) {
        if (ak == null) {
            ak = al.search(/[^\s\u00a0]/);
            if (ak == -1) {
                ak = al.length
            }
        }
        for (var am = 0, ao = 0; am < ak; ++am) {
            if (al.charAt(am) == "\t") {
                ao += an - (ao % an)
            } else {
                ++ao
            }
        }
        return ao
    }

    function s(ak) {
        if (ak.currentStyle) {
            return ak.currentStyle
        }
        return window.getComputedStyle(ak, null)
    }

    function ai(al, au) {
        var an = al.ownerDocument.body;
        var at = 0,
            ar = 0,
            ap = false;
        for (var ak = al; ak; ak = ak.offsetParent) {
            var aq = ak.offsetLeft,
                am = ak.offsetTop;
            if (ak == an) {
                at += Math.abs(aq);
                ar += Math.abs(am)
            } else {
                at += aq, ar += am
            } if (au && s(ak).position == "fixed") {
                ap = true
            }
        }
        var ao = au && !ap ? null : an;
        for (var ak = al.parentNode; ak != ao; ak = ak.parentNode) {
            if (ak.scrollLeft != null) {
                at -= ak.scrollLeft;
                ar -= ak.scrollTop
            }
        }
        return {
            left: at,
            top: ar
        }
    }
    if (document.documentElement.getBoundingClientRect != null) {
        ai = function (an, ak) {
            try {
                var am = an.getBoundingClientRect();
                am = {
                    top: am.top,
                    left: am.left
                }
            } catch (ao) {
                am = {
                    top: 0,
                    left: 0
                }
            }
            if (!ak) {
                if (window.pageYOffset == null) {
                    var al = document.documentElement || document.body.parentNode;
                    if (al.scrollTop == null) {
                        al = document.body
                    }
                    am.top += al.scrollTop;
                    am.left += al.scrollLeft
                } else {
                    am.top += window.pageYOffset;
                    am.left += window.pageXOffset
                }
            }
            return am
        }
    }

    function F(ak) {
        return ak.textContent || ak.innerText || ak.nodeValue || ""
    }

    function a(ak) {
        if (r) {
            ak.selectionStart = 0;
            ak.selectionEnd = ak.value.length
        } else {
            ak.select()
        }
    }

    function ab(al, ak) {
        return al.line == ak.line && al.ch == ak.ch
    }

    function X(al, ak) {
        return al.line < ak.line || (al.line == ak.line && al.ch < ak.ch)
    }

    function Y(ak) {
        return {
            line: ak.line,
            ch: ak.ch
        }
    }
    var ag = document.createElement("pre");

    function N(ak) {
        ag.textContent = ak;
        return ag.innerHTML
    }
    if (N("a") == "\na") {
        N = function (ak) {
            ag.textContent = ak;
            return ag.innerHTML.slice(1)
        }
    } else {
        if (N("\t") != "\t") {
            N = function (ak) {
                ag.innerHTML = "";
                ag.appendChild(document.createTextNode(ak));
                return ag.innerHTML
            }
        }
    }
    t.htmlEscape = N;

    function U(an, am) {
        if (!am) {
            return 0
        }
        if (!an) {
            return am.length
        }
        for (var al = an.length, ak = am.length; al >= 0 && ak >= 0; --al, --ak) {
            if (an.charAt(al) != am.charAt(ak)) {
                break
            }
        }
        return ak + 1
    }

    function p(an, ak) {
        if (an.indexOf) {
            return an.indexOf(ak)
        }
        for (var al = 0, am = an.length; al < am; ++al) {
            if (an[al] == ak) {
                return al
            }
        }
        return -1
    }

    function ae(ak) {
        return /\w/.test(ak) || ak.toUpperCase() != ak.toLowerCase()
    }
    var z = "\n\nb".split(/\n/).length != 3 ? function (am) {
            var an = 0,
                al, ak = [];
            while ((al = am.indexOf("\n", an)) > -1) {
                ak.push(am.slice(an, am.charAt(al - 1) == "\r" ? al - 1 : al));
                an = al + 1
            }
            ak.push(am.slice(an));
            return ak
        } : function (ak) {
            return ak.split(/\r?\n/)
        };
    t.splitLines = z;
    var ac = window.getSelection ? function (al) {
            try {
                return al.selectionStart != al.selectionEnd
            } catch (ak) {
                return false
            }
        } : function (am) {
            try {
                var ak = am.ownerDocument.selection.createRange()
            } catch (al) {}
            if (!ak || ak.parentElement() != am) {
                return false
            }
            return ak.compareEndPoints("StartToEnd", ak) != 0
        };
    t.defineMode("null", function () {
        return {
            token: function (ak) {
                ak.skipToEnd()
            }
        }
    });
    t.defineMIME("text/plain", "null");
    var P = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        127: "Delete",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63276: "PageUp",
        63277: "PageDown",
        63275: "End",
        63273: "Home",
        63234: "Left",
        63232: "Up",
        63235: "Right",
        63233: "Down",
        63302: "Insert",
        63272: "Delete"
    };
    t.keyNames = P;
    (function () {
        for (var ak = 0; ak < 10; ak++) {
            P[ak + 48] = String(ak)
        }
        for (var ak = 65; ak <= 90; ak++) {
            P[ak] = String.fromCharCode(ak)
        }
        for (var ak = 1; ak <= 12; ak++) {
            P[ak + 111] = P[ak + 63235] = "F" + ak
        }
    })();
    return t
})();
CodeMirror.defineMode("xml", function (y, k) {
    var r = y.indentUnit;
    var x = k.htmlMode ? {
        autoSelfClosers: {
            br: true,
            img: true,
            hr: true,
            link: true,
            input: true,
            meta: true,
            col: true,
            frame: true,
            base: true,
            area: true
        },
        doNotIndent: {
            pre: true
        },
        allowUnquoted: true,
        allowMissing: false
    } : {
        autoSelfClosers: {},
        doNotIndent: {},
        allowUnquoted: false,
        allowMissing: false
    };
    var a = k.alignCDATA;
    var f, g;

    function p(E, D) {
        function B(G) {
            D.tokenize = G;
            return G(E, D)
        }
        var C = E.next();
        if (C == "<") {
            if (E.eat("!")) {
                if (E.eat("[")) {
                    if (E.match("CDATA[")) {
                        return B(w("atom", "]]>"))
                    } else {
                        return null
                    }
                } else {
                    if (E.match("--")) {
                        return B(w("comment", "-->"))
                    } else {
                        if (E.match("DOCTYPE", true, true)) {
                            E.eatWhile(/[\w\._\-]/);
                            return B(z(1))
                        } else {
                            return null
                        }
                    }
                }
            } else {
                if (E.eat("?")) {
                    E.eatWhile(/[\w\._\-]/);
                    D.tokenize = w("meta", "?>");
                    return "meta"
                } else {
                    g = E.eat("/") ? "closeTag" : "openTag";
                    E.eatSpace();
                    f = "";
                    var F;
                    while ((F = E.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
                        f += F
                    }
                    D.tokenize = o;
                    return "tag"
                }
            }
        } else {
            if (C == "&") {
                var A;
                if (E.eat("#")) {
                    if (E.eat("x")) {
                        A = E.eatWhile(/[a-fA-F\d]/) && E.eat(";")
                    } else {
                        A = E.eatWhile(/[\d]/) && E.eat(";")
                    }
                } else {
                    A = E.eatWhile(/[\w\.\-:]/) && E.eat(";")
                }
                return A ? "atom" : "error"
            } else {
                E.eatWhile(/[^&<]/);
                return null
            }
        }
    }

    function o(C, B) {
        var A = C.next();
        if (A == ">" || (A == "/" && C.eat(">"))) {
            B.tokenize = p;
            g = A == ">" ? "endTag" : "selfcloseTag";
            return "tag"
        } else {
            if (A == "=") {
                g = "equals";
                return null
            } else {
                if (/[\'\"]/.test(A)) {
                    B.tokenize = j(A);
                    return B.tokenize(C, B)
                } else {
                    C.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
                    return "word"
                }
            }
        }
    }

    function j(A) {
        return function (C, B) {
            while (!C.eol()) {
                if (C.next() == A) {
                    B.tokenize = o;
                    break
                }
            }
            return "string"
        }
    }

    function w(B, A) {
        return function (D, C) {
            while (!D.eol()) {
                if (D.match(A)) {
                    C.tokenize = p;
                    break
                }
                D.next()
            }
            return B
        }
    }

    function z(A) {
        return function (D, C) {
            var B;
            while ((B = D.next()) != null) {
                if (B == "<") {
                    C.tokenize = z(A + 1);
                    return C.tokenize(D, C)
                } else {
                    if (B == ">") {
                        if (A == 1) {
                            C.tokenize = p;
                            break
                        } else {
                            C.tokenize = z(A - 1);
                            return C.tokenize(D, C)
                        }
                    }
                }
            }
            return "meta"
        }
    }
    var l, h;

    function b() {
        for (var A = arguments.length - 1; A >= 0; A--) {
            l.cc.push(arguments[A])
        }
    }

    function e() {
        b.apply(null, arguments);
        return true
    }

    function i(A, C) {
        var B = x.doNotIndent.hasOwnProperty(A) || (l.context && l.context.noIndent);
        l.context = {
            prev: l.context,
            tagName: A,
            indent: l.indented,
            startOfLine: C,
            noIndent: B
        }
    }

    function u() {
        if (l.context) {
            l.context = l.context.prev
        }
    }

    function d(A) {
        if (A == "openTag") {
            l.tagName = f;
            return e(m, c(l.startOfLine))
        } else {
            if (A == "closeTag") {
                var B = false;
                if (l.context) {
                    B = l.context.tagName != f
                } else {
                    B = true
                } if (B) {
                    h = "error"
                }
                return e(s(B))
            }
        }
        return e()
    }

    function c(A) {
        return function (B) {
            if (B == "selfcloseTag" || (B == "endTag" && x.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase()))) {
                return e()
            }
            if (B == "endTag") {
                i(l.tagName, A);
                return e()
            }
            return e()
        }
    }

    function s(A) {
        return function (B) {
            if (A) {
                h = "error"
            }
            if (B == "endTag") {
                u();
                return e()
            }
            h = "error";
            return e(arguments.callee)
        }
    }

    function m(A) {
        if (A == "word") {
            h = "attribute";
            return e(q, m)
        }
        if (A == "endTag" || A == "selfcloseTag") {
            return b()
        }
        h = "error";
        return e(m)
    }

    function q(A) {
        if (A == "equals") {
            return e(v, m)
        }
        if (!x.allowMissing) {
            h = "error"
        }
        return (A == "endTag" || A == "selfcloseTag") ? b() : e()
    }

    function v(A) {
        if (A == "string") {
            return e(t)
        }
        if (A == "word" && x.allowUnquoted) {
            h = "string";
            return e()
        }
        h = "error";
        return (A == "endTag" || A == "selfCloseTag") ? b() : e()
    }

    function t(A) {
        if (A == "string") {
            return e(t)
        } else {
            return b()
        }
    }
    return {
        startState: function () {
            return {
                tokenize: p,
                cc: [],
                indented: 0,
                startOfLine: true,
                tagName: null,
                context: null
            }
        },
        token: function (D, C) {
            if (D.sol()) {
                C.startOfLine = true;
                C.indented = D.indentation()
            }
            if (D.eatSpace()) {
                return null
            }
            h = g = f = null;
            var B = C.tokenize(D, C);
            C.type = g;
            if ((B || g) && B != "comment") {
                l = C;
                while (true) {
                    var A = C.cc.pop() || d;
                    if (A(g || B)) {
                        break
                    }
                }
            }
            C.startOfLine = false;
            return h || B
        },
        indent: function (D, A, C) {
            var B = D.context;
            if ((D.tokenize != o && D.tokenize != p) || B && B.noIndent) {
                return C ? C.match(/^(\s*)/)[0].length : 0
            }
            if (a && /<!\[CDATA\[/.test(A)) {
                return 0
            }
            if (B && /^<\//.test(A)) {
                B = B.prev
            }
            while (B && !B.startOfLine) {
                B = B.prev
            }
            if (B) {
                return B.indent + r
            } else {
                return 0
            }
        },
        compareStates: function (D, B) {
            if (D.indented != B.indented || D.tokenize != B.tokenize) {
                return false
            }
            for (var C = D.context, A = B.context;; C = C.prev, A = A.prev) {
                if (!C || !A) {
                    return C == A
                }
                if (C.tagName != A.tagName) {
                    return false
                }
            }
        },
        electricChars: "/"
    }
});
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) {
    CodeMirror.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    })
}
CodeMirror.defineMode("javascript", function (J, N) {
    var w = J.indentUnit;
    var R = N.json;
    var b = function () {
        function X(aa) {
            return {
                type: aa,
                style: "keyword"
            }
        }
        var U = X("keyword a"),
            Z = X("keyword b"),
            Y = X("keyword c");
        var V = X("operator"),
            W = {
                type: "atom",
                style: "atom"
            };
        return {
            "if": U,
            "while": U,
            "with": U,
            "else": Z,
            "do": Z,
            "try": Z,
            "finally": Z,
            "return": Y,
            "break": Y,
            "continue": Y,
            "new": Y,
            "delete": Y,
            "throw": Y,
            "var": X("var"),
            "const": X("var"),
            let: X("var"),
            "function": X("function"),
            "catch": X("catch"),
            "for": X("for"),
            "switch": X("switch"),
            "case": X("case"),
            "default": X("default"),
            "in": V,
            "typeof": V,
            "instanceof": V,
            "true": W,
            "false": W,
            "null": W,
            "undefined": W,
            "NaN": W,
            "Infinity": W
        }
    }();
    var O = /[+\-*&%=<>!?|]/;

    function S(W, V, U) {
        V.tokenize = U;
        return U(W, V)
    }

    function h(X, U) {
        var W = false,
            V;
        while ((V = X.next()) != null) {
            if (V == U && !W) {
                return false
            }
            W = !W && V == "\\"
        }
        return W
    }
    var T, q;

    function C(W, V, U) {
        T = W;
        q = U;
        return V
    }

    function l(Y, W) {
        var U = Y.next();
        if (U == '"' || U == "'") {
            return S(Y, W, A(U))
        } else {
            if (/[\[\]{}\(\),;\:\.]/.test(U)) {
                return C(U)
            } else {
                if (U == "0" && Y.eat(/x/i)) {
                    Y.eatWhile(/[\da-f]/i);
                    return C("number", "number")
                } else {
                    if (/\d/.test(U)) {
                        Y.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                        return C("number", "number")
                    } else {
                        if (U == "/") {
                            if (Y.eat("*")) {
                                return S(Y, W, f)
                            } else {
                                if (Y.eat("/")) {
                                    Y.skipToEnd();
                                    return C("comment", "comment")
                                } else {
                                    if (W.reAllowed) {
                                        h(Y, "/");
                                        Y.eatWhile(/[gimy]/);
                                        return C("regexp", "string-2")
                                    } else {
                                        Y.eatWhile(O);
                                        return C("operator", null, Y.current())
                                    }
                                }
                            }
                        } else {
                            if (U == "#") {
                                Y.skipToEnd();
                                return C("error", "error")
                            } else {
                                if (O.test(U)) {
                                    Y.eatWhile(O);
                                    return C("operator", null, Y.current())
                                } else {
                                    Y.eatWhile(/[\w\$_]/);
                                    var X = Y.current(),
                                        V = b.propertyIsEnumerable(X) && b[X];
                                    return (V && W.kwAllowed) ? C(V.type, V.style, X) : C("variable", "variable", X)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function A(U) {
        return function (W, V) {
            if (!h(W, U)) {
                V.tokenize = l
            }
            return C("string", "string")
        }
    }

    function f(X, W) {
        var U = false,
            V;
        while (V = X.next()) {
            if (V == "/" && U) {
                W.tokenize = l;
                break
            }
            U = (V == "*")
        }
        return C("comment", "comment")
    }
    var k = {
        atom: true,
        number: true,
        variable: true,
        string: true,
        regexp: true
    };

    function u(Z, V, U, Y, W, X) {
        this.indented = Z;
        this.column = V;
        this.type = U;
        this.prev = W;
        this.info = X;
        if (Y != null) {
            this.align = Y
        }
    }

    function x(W, V) {
        for (var U = W.localVars; U; U = U.next) {
            if (U.name == V) {
                return true
            }
        }
    }

    function F(Y, V, U, X, Z) {
        var aa = Y.cc;
        v.state = Y;
        v.stream = Z;
        v.marked = null, v.cc = aa;
        if (!Y.lexical.hasOwnProperty("align")) {
            Y.lexical.align = true
        }
        while (true) {
            var W = aa.length ? aa.pop() : R ? y : z;
            if (W(U, X)) {
                while (aa.length && aa[aa.length - 1].lex) {
                    aa.pop()()
                }
                if (v.marked) {
                    return v.marked
                }
                if (U == "variable" && x(Y, X)) {
                    return "variable-2"
                }
                return V
            }
        }
    }
    var v = {
        state: null,
        column: null,
        marked: null,
        cc: null
    };

    function a() {
        for (var U = arguments.length - 1; U >= 0; U--) {
            v.cc.push(arguments[U])
        }
    }

    function H() {
        a.apply(null, arguments);
        return true
    }

    function m(V) {
        var W = v.state;
        if (W.context) {
            v.marked = "def";
            for (var U = W.localVars; U; U = U.next) {
                if (U.name == V) {
                    return
                }
            }
            W.localVars = {
                name: V,
                next: W.localVars
            }
        }
    }
    var E = {
        name: "this",
        next: {
            name: "arguments"
        }
    };

    function t() {
        if (!v.state.context) {
            v.state.localVars = E
        }
        v.state.context = {
            prev: v.state.context,
            vars: v.state.localVars
        }
    }

    function s() {
        v.state.localVars = v.state.context.vars;
        v.state.context = v.state.context.prev
    }

    function j(V, W) {
        var U = function () {
            var X = v.state;
            X.lexical = new u(X.indented, v.stream.column(), V, null, X.lexical, W)
        };
        U.lex = true;
        return U
    }

    function G() {
        var U = v.state;
        if (U.lexical.prev) {
            if (U.lexical.type == ")") {
                U.indented = U.lexical.indented
            }
            U.lexical = U.lexical.prev
        }
    }
    G.lex = true;

    function c(V) {
        return function U(W) {
            if (W == V) {
                return H()
            } else {
                if (V == ";") {
                    return a()
                } else {
                    return H(arguments.callee)
                }
            }
        }
    }

    function z(U) {
        if (U == "var") {
            return H(j("vardef"), K, c(";"), G)
        }
        if (U == "keyword a") {
            return H(j("form"), y, z, G)
        }
        if (U == "keyword b") {
            return H(j("form"), z, G)
        }
        if (U == "{") {
            return H(j("}"), o, G)
        }
        if (U == ";") {
            return H()
        }
        if (U == "function") {
            return H(i)
        }
        if (U == "for") {
            return H(j("form"), c("("), j(")"), g, c(")"), G, z, G)
        }
        if (U == "variable") {
            return H(j("stat"), D)
        }
        if (U == "switch") {
            return H(j("form"), y, j("}", "switch"), c("{"), o, G, G)
        }
        if (U == "case") {
            return H(y, c(":"))
        }
        if (U == "default") {
            return H(c(":"))
        }
        if (U == "catch") {
            return H(j("form"), t, c("("), r, c(")"), z, G, s)
        }
        return a(j("stat"), y, c(";"), G)
    }

    function y(U) {
        if (k.hasOwnProperty(U)) {
            return H(M)
        }
        if (U == "function") {
            return H(i)
        }
        if (U == "keyword c") {
            return H(B)
        }
        if (U == "(") {
            return H(j(")"), B, c(")"), G, M)
        }
        if (U == "operator") {
            return H(y)
        }
        if (U == "[") {
            return H(j("]"), P(y, "]"), G, M)
        }
        if (U == "{") {
            return H(j("}"), P(p, "}"), G, M)
        }
        return H()
    }

    function B(U) {
        if (U.match(/[;\}\)\],]/)) {
            return a()
        }
        return a(y)
    }

    function M(U, V) {
        if (U == "operator" && /\+\+|--/.test(V)) {
            return H(M)
        }
        if (U == "operator") {
            return H(y)
        }
        if (U == ";") {
            return
        }
        if (U == "(") {
            return H(j(")"), P(y, ")"), G, M)
        }
        if (U == ".") {
            return H(Q, M)
        }
        if (U == "[") {
            return H(j("]"), y, c("]"), G, M)
        }
    }

    function D(U) {
        if (U == ":") {
            return H(G, z)
        }
        return a(M, c(";"), G)
    }

    function Q(U) {
        if (U == "variable") {
            v.marked = "property";
            return H()
        }
    }

    function p(U) {
        if (U == "variable") {
            v.marked = "property"
        }
        if (k.hasOwnProperty(U)) {
            return H(c(":"), y)
        }
    }

    function P(W, U) {
        function V(Y) {
            if (Y == ",") {
                return H(W, V)
            }
            if (Y == U) {
                return H()
            }
            return H(c(U))
        }
        return function X(Y) {
            if (Y == U) {
                return H()
            } else {
                return a(W, V)
            }
        }
    }

    function o(U) {
        if (U == "}") {
            return H()
        }
        return a(z, o)
    }

    function K(U, V) {
        if (U == "variable") {
            m(V);
            return H(I)
        }
        return H()
    }

    function I(U, V) {
        if (V == "=") {
            return H(y, I)
        }
        if (U == ",") {
            return H(K)
        }
    }

    function g(U) {
        if (U == "var") {
            return H(K, e)
        }
        if (U == ";") {
            return a(e)
        }
        if (U == "variable") {
            return H(L)
        }
        return a(e)
    }

    function L(U, V) {
        if (V == "in") {
            return H(y)
        }
        return H(M, e)
    }

    function e(U, V) {
        if (U == ";") {
            return H(d)
        }
        if (V == "in") {
            return H(y)
        }
        return H(y, c(";"), d)
    }

    function d(U) {
        if (U != ")") {
            H(y)
        }
    }

    function i(U, V) {
        if (U == "variable") {
            m(V);
            return H(i)
        }
        if (U == "(") {
            return H(j(")"), t, P(r, ")"), G, z, s)
        }
    }

    function r(U, V) {
        if (U == "variable") {
            m(V);
            return H()
        }
    }
    return {
        startState: function (U) {
            return {
                tokenize: l,
                reAllowed: true,
                kwAllowed: true,
                cc: [],
                lexical: new u((U || 0) - w, 0, "block", false),
                localVars: N.localVars,
                context: N.localVars && {
                    vars: N.localVars
                },
                indented: 0
            }
        },
        token: function (W, V) {
            if (W.sol()) {
                if (!V.lexical.hasOwnProperty("align")) {
                    V.lexical.align = false
                }
                V.indented = W.indentation()
            }
            if (W.eatSpace()) {
                return null
            }
            var U = V.tokenize(W, V);
            if (T == "comment") {
                return U
            }
            V.reAllowed = !! (T == "operator" || T == "keyword c" || T.match(/^[\[{}\(,;:]$/));
            V.kwAllowed = T != ".";
            return F(V, U, T, q, W)
        },
        indent: function (Z, U) {
            if (Z.tokenize != l) {
                return 0
            }
            var Y = U && U.charAt(0),
                W = Z.lexical,
                X = W.type,
                V = Y == X;
            if (X == "vardef") {
                return W.indented + 4
            } else {
                if (X == "form" && Y == "{") {
                    return W.indented
                } else {
                    if (X == "stat" || X == "form") {
                        return W.indented + w
                    } else {
                        if (W.info == "switch" && !V) {
                            return W.indented + (/^(?:case|default)\b/.test(U) ? w : 2 * w)
                        } else {
                            if (W.align) {
                                return W.column + (V ? 0 : 1)
                            } else {
                                return W.indented + (V ? 0 : w)
                            }
                        }
                    }
                }
            }
        },
        electricChars: ":{}"
    }
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: true
});
CodeMirror.defineMode("css", function (e) {
    var d = e.indentUnit,
        f;

    function c(i, j) {
        f = j;
        return i
    }

    function h(k, j) {
        var i = k.next();
        if (i == "@") {
            k.eatWhile(/[\w\\\-]/);
            return c("meta", k.current())
        } else {
            if (i == "/" && k.eat("*")) {
                j.tokenize = a;
                return a(k, j)
            } else {
                if (i == "<" && k.eat("!")) {
                    j.tokenize = b;
                    return b(k, j)
                } else {
                    if (i == "=") {
                        c(null, "compare")
                    } else {
                        if ((i == "~" || i == "|") && k.eat("=")) {
                            return c(null, "compare")
                        } else {
                            if (i == '"' || i == "'") {
                                j.tokenize = g(i);
                                return j.tokenize(k, j)
                            } else {
                                if (i == "#") {
                                    k.eatWhile(/[\w\\\-]/);
                                    return c("atom", "hash")
                                } else {
                                    if (i == "!") {
                                        k.match(/^\s*\w*/);
                                        return c("keyword", "important")
                                    } else {
                                        if (/\d/.test(i)) {
                                            k.eatWhile(/[\w.%]/);
                                            return c("number", "unit")
                                        } else {
                                            if (/[,.+>*\/]/.test(i)) {
                                                return c(null, "select-op")
                                            } else {
                                                if (/[;{}:\[\]]/.test(i)) {
                                                    return c(null, i)
                                                } else {
                                                    k.eatWhile(/[\w\\\-]/);
                                                    return c("variable", "variable")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function a(l, k) {
        var i = false,
            j;
        while ((j = l.next()) != null) {
            if (i && j == "/") {
                k.tokenize = h;
                break
            }
            i = (j == "*")
        }
        return c("comment", "comment")
    }

    function b(l, k) {
        var j = 0,
            i;
        while ((i = l.next()) != null) {
            if (j >= 2 && i == ">") {
                k.tokenize = h;
                break
            }
            j = (i == "-") ? j + 1 : 0
        }
        return c("comment", "comment")
    }

    function g(i) {
        return function (m, k) {
            var l = false,
                j;
            while ((j = m.next()) != null) {
                if (j == i && !l) {
                    break
                }
                l = !l && j == "\\"
            }
            if (!l) {
                k.tokenize = h
            }
            return c("string", "string")
        }
    }
    return {
        startState: function (i) {
            return {
                tokenize: h,
                baseIndent: i || 0,
                stack: []
            }
        },
        token: function (l, k) {
            if (l.eatSpace()) {
                return null
            }
            var j = k.tokenize(l, k);
            var i = k.stack[k.stack.length - 1];
            if (f == "hash" && i != "rule") {
                j = "string-2"
            } else {
                if (j == "variable") {
                    if (i == "rule") {
                        j = "number"
                    } else {
                        if (!i || i == "@media{") {
                            j = "tag"
                        }
                    }
                }
            } if (i == "rule" && /^[\{\};]$/.test(f)) {
                k.stack.pop()
            }
            if (f == "{") {
                if (i == "@media") {
                    k.stack[k.stack.length - 1] = "@media{"
                } else {
                    k.stack.push("{")
                }
            } else {
                if (f == "}") {
                    k.stack.pop()
                } else {
                    if (f == "@media") {
                        k.stack.push("@media")
                    } else {
                        if (i == "{" && f != "comment") {
                            k.stack.push("rule")
                        }
                    }
                }
            }
            return j
        },
        indent: function (j, i) {
            var k = j.stack.length;
            if (/^\}/.test(i)) {
                k -= j.stack[j.stack.length - 1] == "rule" ? 2 : 1
            }
            return j.baseIndent + k * d
        },
        electricChars: "}"
    }
});
CodeMirror.defineMIME("text/css", "css");
CodeMirror.defineMode("htmlmixed", function (b, d) {
    var a = CodeMirror.getMode(b, {
        name: "xml",
        htmlMode: true
    });
    var c = CodeMirror.getMode(b, "javascript");
    var i = CodeMirror.getMode(b, "css");

    function e(l, k) {
        var j = a.token(l, k.htmlState);
        if (j == "tag" && l.current() == ">" && k.htmlState.context) {
            if (/^script$/i.test(k.htmlState.context.tagName)) {
                k.token = h;
                k.localState = c.startState(a.indent(k.htmlState, ""));
                k.mode = "javascript"
            } else {
                if (/^style$/i.test(k.htmlState.context.tagName)) {
                    k.token = f;
                    k.localState = i.startState(a.indent(k.htmlState, ""));
                    k.mode = "css"
                }
            }
        }
        return j
    }

    function g(o, j, k) {
        var m = o.current();
        var l = m.search(j);
        if (l > -1) {
            o.backUp(m.length - l)
        }
        return k
    }

    function h(k, j) {
        if (k.match(/^<\/\s*script\s*>/i, false)) {
            j.token = e;
            j.localState = null;
            j.mode = "html";
            return e(k, j)
        }
        return g(k, /<\/\s*script\s*>/, c.token(k, j.localState))
    }

    function f(k, j) {
        if (k.match(/^<\/\s*style\s*>/i, false)) {
            j.token = e;
            j.localState = null;
            j.mode = "html";
            return e(k, j)
        }
        return g(k, /<\/\s*style\s*>/, i.token(k, j.localState))
    }
    return {
        startState: function () {
            var j = a.startState();
            return {
                token: e,
                localState: null,
                mode: "html",
                htmlState: j
            }
        },
        copyState: function (k) {
            if (k.localState) {
                var j = CodeMirror.copyState(k.token == f ? i : c, k.localState)
            }
            return {
                token: k.token,
                localState: j,
                mode: k.mode,
                htmlState: CodeMirror.copyState(a, k.htmlState)
            }
        },
        token: function (k, j) {
            return j.token(k, j)
        },
        indent: function (k, j) {
            if (k.token == e || /^\s*<\//.test(j)) {
                return a.indent(k.htmlState, j)
            } else {
                if (k.token == h) {
                    return c.indent(k.localState, j)
                } else {
                    return i.indent(k.localState, j)
                }
            }
        },
        compareStates: function (k, j) {
            return a.compareStates(k.htmlState, j.htmlState)
        },
        electricChars: "/{}:"
    }
});
CodeMirror.defineMIME("text/html", "htmlmixed");
var textareas = ["code", "code2"];
var iframes = ["preview", "preview2"];
var editors = [];

function updatePreview() {
    for (var c = 0; c < iframes.length; c++) {
        var b = document.getElementById(iframes[c]);
        if (b) {
			ResizeIframe('preview');
            var a = b.contentDocument || b.contentWindow.document;
            a.open();
            a.write(editors[c].getValue());
            a.close()
        }
    }
}
for (var n = 0; n < textareas.length; n++) {
    var textarea = document.getElementById(textareas[n]);
    if (textarea) {
        var delay;
        editors.push(CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            mode: "text/html",
            tabMode: "indent",
            onChange: function () {
                clearTimeout(delay);
                delay = setTimeout(updatePreview, 300)
            }
        }))
    }
}
setTimeout(updatePreview, 300);
var node = document.getElementById("codeBasics");
if (node) {
    var basics = CodeMirror.fromTextArea(node, {
        lineNumbers: true,
        mode: "text/html",
        tabMode: "indent"
    })
};