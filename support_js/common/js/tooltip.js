
var dw_Event = {
  
    add: function(obj, etype, fp, cap) {
        cap = cap || false;
        if (obj.addEventListener) obj.addEventListener(etype, fp, cap);
        else if (obj.attachEvent) obj.attachEvent("on" + etype, fp);
    }, 

    remove: function(obj, etype, fp, cap) {
        cap = cap || false;
        if (obj.removeEventListener) obj.removeEventListener(etype, fp, cap);
        else if (obj.detachEvent) obj.detachEvent("on" + etype, fp);
    }, 
    
    DOMit: function(e) { 
        e = e? e: window.event;
        if (!e.target) e.target = e.srcElement;
        if (!e.preventDefault) e.preventDefault = function () { e.returnValue = false; return false; }
        if (!e.stopPropagation) e.stopPropagation = function () { e.cancelBubble = true; }
        return e;
    },
    
    getTarget: function(e) {
        e = dw_Event.DOMit(e); var tgt = e.target; 
        if (tgt.nodeType != 1) tgt = tgt.parentNode;
        return tgt;
    }
    
}

/**************************************************/

var dw_Tooltip = {
    offX: 12,
    offY: 12,
    showDelay: 100,
    hideDelay: 100,
    hoverDelay: 500,
    tipID: "tooltipWrap",
    actuatorClass: "tooltip",
    maxLoops: 2, 
    activateOnfocus: true,
    provideShim: false,
    
    on_show: function() {}, on_position: function() {}, on_hide: function() {},
    
    tip:null, shim:null, timer:0, hoverTimer:0,
    active:false, actuator:null, resetFlag:false, restored:true,

    init: function() {
        var _this = dw_Tooltip, el;
        if ( _this.hasSupport()  ) {
            if ( !(el = document.getElementById(_this.tipID) ) ) {
                el = document.createElement("div");
                el.id = _this.tipID; 
                document.body.appendChild(el);
            }
            el.style.position = 'absolute'; el.style.visibility = 'hidden'; el.style.zIndex = 10000;
            _this.tip = document.getElementById(_this.tipID);
            if ( _this.checkOverlaySupport() ) { _this.prepOverlay(); }
            _this.setDefaults(); _this.setPosition(0, 0);
        }
    },
    
    hasSupport: function () {
        if ( document.createElement && document.getElementsByTagName
             && ( document.addEventListener || document.attachEvent ) ) {
            return true;
        }
        return false;
    },
    
    setDefaults: function() {
        if ( !this.defaultProps ) this.defaultProps = {};
        var list = this.props_list;
        for (var i=0; list[i]; i++) {
            this[ list[i][0] ] = ( typeof this.defaultProps[ list[i][0] ] == list[i][1] )? 
                this.defaultProps[ list[i][0] ]: list[i][2];
        }
        this.tip.className = this.klass;
        this.coordinateOptions();
    },
    
    activate: function(e, tgt, msg, id) {
        var _this = dw_Tooltip; if (!_this.tip) return;
        _this.clearTimer('timer');  _this.clearTimer('hoverTimer');
        if ( !_this.restored ) { _this.handleRestore(); }
        _this.actuator = tgt; dw_Viewport.getAll();  
        _this.getContent(e, tgt, msg, id); _this.restored = false;
        if ( !_this.tip.innerHTML ) return; _this.active = true;
        _this.handleOptions(e); _this.positionFn(e, tgt); _this.adjust();
        _this.timer = setTimeout(_this.show, _this.showDelay);
    },

    getContent: function(e, tgt, msg, id) {
        if (id && !msg) {
            var source = dw_Tooltip.defaultProps['content_source'] || 'content_vars';
            var obj = (this.content_vars && this.content_vars[id])? this.content_vars[id]: false;
            if ( typeof obj == 'string' ) {
                msg = obj;
            } else if ( typeof obj == 'object' ) {
                this.checkForProps( obj );
                if ( source == 'ajax' && !obj['static'] ) {
                    dw_Tooltip.initAjaxRequest(id);
                }
                if ( obj['content'] ) { 
                    msg = obj['content'];
                } else if ( obj['html_id'] ) {
                    var el = document.getElementById( obj['html_id'] ); 
                    if (el) msg = el.innerHTML;
                } else { 
                    msg = obj;
                }
            }
        }
        this.writeTip(msg);
    },
    
    writeTip: function(msg) {
        msg = this.wrapFn(msg); this.tip.innerHTML = msg;
    },
    
    positionRelEvent: function(e, tgt) {
        var _this = dw_Tooltip; 
        if (typeof e == 'object') {
            if ( e.type == 'mouseover' || e.type == 'mousemove' ) {
                _this.evX = _this.getMouseEventX(e);
                _this.evY = _this.getMouseEventY(e);
            } else { // focus
                var pos = dw_Util.getPageOffsets( tgt );
                _this.evX = pos.x;
                _this.evY = pos.y;
            }
        }
        
        var coords = _this.calcPosCoords(e, tgt);
        _this.setPosition(coords.x, coords.y);
    },
    
    calcPosCoords: function(e, tgt) {
        var x = this.evX; var y = this.evY; 
        var maxX = this.getMaxX(); var maxY = this.getMaxY();
        
        var xXd, yXd;
        var tx = x + this.offX;
        var altx = x - ( this.width + this.offX );
        var spL =  x - dw_Viewport.scrollX > dw_Viewport.width/2;
        
        if ( typeof e == 'object' && e.type && ( e.type == 'focus' || e.type == 'focusin' ) ) {
            var tgtWidth = tgt.offsetWidth;
            if ( tx + tgtWidth  < maxX ) {
                x = this.evX = x + tgtWidth;
                tx += tgtWidth; 
            } else if (tx + 20 < maxX ) {
                x = this.evX = x + 20;
                tx += 20
            }
            y = this.evY = y + 10;
        }
        
        var ty = y + this.offY;
        var alty = y - ( this.height + this.offY );
        var spA =  y - dw_Viewport.scrollY > dw_Viewport.height/2;
        
        if ( !this.Left && tx < maxX ) {
            x = tx;
        } else if ( ( this.Left && altx >= dw_Viewport.scrollX ) || 
                ( this.jumpLeft && tx >= maxX && altx >= dw_Viewport.scrollX ) ) {
            x = altx;
        } else if ( ( this.Left && altx < dw_Viewport.scrollX ) || 
                ( !this.Left && this.jumpLeft && altx < dw_Viewport.scrollX && spL ) ) {
            x = dw_Viewport.scrollX; // place at left edge
            xXd = 'Left'; // check later whether yXd too
        } else if ( !this.Left && tx >= maxX && ( !this.jumpLeft || 
                ( this.jumpLeft && altx < dw_Viewport.scrollX && !spL ) ) ) {
            x = maxX; xXd = 'Right';
        }
        
        if ( !this.Above && ty < maxY ) {
            y = ty;
        } else if ( ( this.Above && alty >= dw_Viewport.scrollY ) || 
                ( this.jumpAbove && ty >= maxY && alty >= dw_Viewport.scrollY ) ) {
            y = alty;
        } else if ( ( this.Above && alty < dw_Viewport.scrollY ) || 
                ( !this.Above && this.jumpAbove && alty < dw_Viewport.scrollY && spA )  ) {
            y = dw_Viewport.scrollY; // place at top
            yXd = 'Above';
        } else if ( !this.Above && ty >= maxY && ( !this.jumpAbove || 
                ( this.jumpAbove && alty < dw_Viewport.scrollY && !spA ) ) ) {
            y = maxY; yXd = 'Below';
        }
        
        if ( xXd && yXd ) {
            var dx = (xXd == 'Left')? dw_Viewport.scrollX - altx: tx - maxX;
            var dy = (yXd == 'Above')? dw_Viewport.scrollY - alty: ty - maxY;
            if ( dx <= dy ) {
                x = (xXd == 'Left')? altx: tx;
            } else {
                y = (yXd == 'Above')? alty: ty;
            }
        }
        return { x: x, y: y }
    },
    
    adjust: function() {
        var _this = dw_Tooltip;
        var imgs = _this.tip.getElementsByTagName('img');
        var img = imgs.length? imgs[imgs.length - 1]: null;
        checkComplete();
        
        function checkComplete() {
            if ( !_this.active ) return;
             _this.positionFn();
            if (img && !img.complete) {
                setTimeout( checkComplete, 50);
            }
        }
    },
    
    setPosition: function(x, y) {
        this.tip.style.left = x + 'px';
        this.tip.style.top = y + 'px';
        this.setOverlay(); this.on_position();
    },

    show: function() {
        var _this = dw_Tooltip; if (!_this.ttready) return;
        _this.tip.style.visibility = 'visible';
        if ( _this.shim ) _this.shim.style.visibility = 'visible';
        _this.on_show();
    },

    deactivate: function(e) {
        var _this = dw_Tooltip; if (!_this.tip || !_this.active || _this.sticky ) return;
        e = e? e: window.event;
        if (e.type && e.type == 'mouseout' && !dw_Util.mouseleave(e, _this.actuator) ) return;
        _this.clearTimer('timer');  _this.clearTimer('hoverTimer');
        
        if ( _this.hoverable ) {
            _this.hoverTimer = setTimeout( _this.hide, _this.hoverDelay );
            return;
        }
        if ( _this.duration ) {
            _this.timer = setTimeout( _this.hide, _this.duration );
            return;
        }
        _this.timer = setTimeout( _this.hide, _this.hideDelay );
    },
    
    hide: function() {
        var _this = dw_Tooltip; if (!_this.tip) return;
        _this.tip.style.visibility = 'hidden';
        if ( _this.shim ) _this.shim.style.visibility = 'hidden';
        _this.handleRestore(); _this.on_hide();
    },
    
    handleOptions: function(e) {
        this.coordinateOptions();
        if ( this.klass ) { this.tip.className = this.klass; }
        if ( this.hoverable ) {
            this.tip.onmouseout = dw_Tooltip.tipOutCheck;
            this.tip.onmouseover = function() { dw_Tooltip.clearTimer('hoverTimer'); }
        } else if ( this.followMouse && !(e.type == 'focus' || e.type == 'focusin') ) {
            dw_Event.add(document, 'mousemove', this.positionRelEvent);
        } else if ( this.sticky || this.duration ) {
            dw_Event.add( document, "mouseup", dw_Tooltip.checkDocClick );
        }
    },
    
    coordinateOptions: function() {
        if ( this.sticky || this.hoverable || this.duration ) { this.followMouse = false; }
        if ( this.sticky ) { this.hoverable = false; this.duration = 0; }
        if ( this.hoverable ) { this.duration = 0; }
        if ( this.positionFn != this.positionRelEvent ) this.followMouse = false;
    },

    handleRestore: function() {
        if ( this.followMouse ) {
            dw_Event.remove(document, 'mousemove', this.positionRelEvent);
        } else if ( this.sticky || this.duration ) {
            dw_Event.remove( document, "mouseup", dw_Tooltip.checkDocClick, false );
        }
        this.tip.onmouseover = this.tip.onmouseout = function() {}
        if ( this.resetFlag ) { this.setDefaults(); }
        this.resetRequest();
        this.writeTip(''); // empty tooltip
        this.active = false; this.actuator = null;
        this.tip.style.width = ''; 
        this.restored = true;
    },
    
    getTipClass: function(cls) {
        if (!cls) return ''; var c = '';
        var classes = cls.split(/\s+/);
        for (var i=0; classes[i]; i++) {
            if ( classes[i] == this.actuatorClass && classes[i + 1] ) {
                c = classes[i + 1];
                break;
            }
        }
        return c;
    },
    
    checkForProps: function(obj) {
        var list = this.props_list;
        for (var i=0; list[i]; i++) {
            if ( typeof obj[ list[i][0] ] != 'undefined' ) {
                this[ list[i][0] ] = obj[ list[i][0] ];
                this.resetFlag = true;
            }
        }
    },

    tipOutCheck: function(e) { // hover tip
        var _this = dw_Tooltip; var tip = this;
        if ( dw_Util.mouseleave(e, tip) ) {
            _this.timer = setTimeout( _this.hide, _this.hideDelay);
        }
    },

    checkEscKey: function(e) {
        e = e? e: window.event;  if ( e.keyCode == 27 ) dw_Tooltip.hide();
    },

    checkDocClick: function(e) { 
        if ( !dw_Tooltip.active ) return;
        var tgt = dw_Event.getTarget(e);   
        var tip = document.getElementById(dw_Tooltip.tipID);
        if ( tgt == tip || dw_Util.contained(tgt, tip) ) {
            if ( tgt.tagName && tgt.tagName.toLowerCase() == "img" ) tgt = tgt.parentNode; 
            if ( tgt.tagName.toLowerCase() != "a" || tgt.href.indexOf("dw_Tooltip.hide") != -1 ) return;
        }
        dw_Tooltip.timer = setTimeout( dw_Tooltip.hide, 50);
    },
    
    checkOverlaySupport: function() {
        if (  this.provideShim && navigator.userAgent.indexOf("Windows") != -1 && 
            typeof document.body != "undefined" && 
            typeof document.body.insertAdjacentHTML != "undefined" && 
            !window.opera && navigator.appVersion.indexOf("MSIE 5.0") == -1 
            ) return true;
        return false;
    }, 
    
    prepOverlay: function() {
        document.body.insertAdjacentHTML("beforeEnd", '<iframe id="tipShim" src="javascript: false" style="position:absolute; left:0; top:0; z-index:500; visibility:hidden" scrolling="no" frameborder="0"></iframe>');
        this.shim = document.getElementById('tipShim'); 
        if (this.shim && this.tip) {
            this.shim.style.width = this.tip.offsetWidth + "px";
            this.shim.style.height = this.tip.offsetHeight + "px";
        }
    },
    
    setOverlay: function() {
        if ( this.shim ) {
            this.shim.style.left = this.tip.style.left;
            this.shim.style.top = this.tip.style.top;
            this.shim.style.width = this.tip.offsetWidth + "px";
            this.shim.style.height = this.tip.offsetHeight + "px";
        }
    },
    
    clearTimer: function(timer) {
        if ( dw_Tooltip[timer] ) { clearTimeout( dw_Tooltip[timer] ); dw_Tooltip[timer] = 0; }
    },
    
    initAjaxRequest: function () {},
    resetRequest: function () {},
    
    getWidth: function() { return this.width = this.tip.offsetWidth; },
    getHeight: function() { return this.height = this.tip.offsetHeight; },
    getMaxX: function() { return dw_Viewport.width + dw_Viewport.scrollX - this.getWidth() - 1; },
    getMaxY: function() { return dw_Viewport.height + dw_Viewport.scrollY - this.getHeight() - 1; },
    getMouseEventX: function(e) { return e.pageX? e.pageX: e.clientX + dw_Viewport.scrollX; },
    getMouseEventY: function(e) { return e.pageY? e.pageY: e.clientY + dw_Viewport.scrollY; }
    
}

dw_Tooltip.props_list = [ ['klass', 'string', ''],
    ['followMouse', 'boolean', true], ['sticky', 'boolean', false], 
    ['hoverable', 'boolean', false], ['duration', 'number', 0], 
    ['jumpAbove', 'boolean', true], ['jumpLeft', 'boolean', true],
    ['Left', 'boolean', false], ['Above', 'boolean', false],
    ['positionFn', 'function', dw_Tooltip.positionRelEvent], 
    ['wrapFn', 'function', function(str) { return str; } ] ];

// code for event delegation
dw_Tooltip.initHandlers = function () {
    dw_Event.add( document, 'mouseover', dw_Tooltip.checkActuatorMouseover );
    dw_Event.add( document, "keydown", dw_Tooltip.checkEscKey,  true );
    dw_Event.add( window, 'blur', dw_Tooltip.deactivate, true ); 
    dw_Event.add( window, 'unload', dw_Tooltip.deactivate, true );

    if ( dw_Tooltip.activateOnfocus ) {
        if ( window.addEventListener ) {
            dw_Event.add( document, 'focus', dw_Tooltip.checkActuatorFocus, true );            
        } else if ( window.attachEvent ) {
            dw_Event.add( document, 'focusin', dw_Tooltip.checkActuatorFocus );        
        }
    }
}

dw_Tooltip.checkActuatorMouseover = function (e) {
    var tgt = dw_Event.getTarget(e); var tipAct = null;
    var ctr = 0; var maxCnt = dw_Tooltip.maxLoops;
    do {
        if ( (tipAct = dw_Tooltip.getActuatorInfo(tgt)) ) {
            var msg = tipAct.msg; var id = tipAct.id;
            dw_Tooltip.activate(e, tgt, msg, id);
            if ( window.attachEvent ) {
                dw_Event.remove( tgt, 'mouseout', dw_Tooltip.deactivate); 
            }
            dw_Event.add( tgt, 'mouseout', dw_Tooltip.deactivate); 
            break;
        }
        ctr++;
    } while ( ctr < maxCnt && (tgt = tgt.parentNode) ); 
}

dw_Tooltip.checkActuatorFocus = function (e) {
    var tgt = dw_Event.getTarget(e); var tipAct = null;
    if ( tgt && (tipAct = dw_Tooltip.getActuatorInfo(tgt) ) ) {
        if ( dw_Tooltip.active && tgt == dw_Tooltip.actuator ) { 
            return;
        }
        var msg = tipAct.msg; var id = tipAct.id;
        dw_Tooltip.activate(e, tgt, msg, id);
        if ( window.addEventListener ) {
            dw_Event.add( tgt, 'blur', dw_Tooltip.deactivate, true); 
        } else if ( window.attachEvent ) {
            dw_Event.add( tgt, 'focusout', dw_Tooltip.deactivate); 
        }
    }
}

dw_Tooltip.getActuatorInfo = function (tgt) {
    var cls = dw_Tooltip.getTipClass(tgt.className);
    if (!cls) return '';
    var source = dw_Tooltip.defaultProps['content_source'] || 'content_vars';
    var msg = '', id = '', obj;

    if ( dw_Tooltip.content_vars ) {
        id = (dw_Tooltip.content_vars[cls])? cls: '';
    }
    if ( !id && source == 'class_id' ) {
        var el = document.getElementById(cls);
        if (el) msg = el.innerHTML;
    }
    if ( id || msg ) {
        return {msg: msg, id: id}
    }
    return false;
}

// Helper functions 

var dw_Util; if (!dw_Util) dw_Util = {};

dw_Util.mouseleave = function (e, oNode) {
    e = dw_Event.DOMit(e);
    var toEl = e.relatedTarget? e.relatedTarget: e.toElement? e.toElement: null;
    if ( oNode != toEl && !dw_Util.contained(toEl, oNode) ) {
        return true;
    }
    return false;
}

dw_Util.contained = function (oNode, oCont) {
    if (!oNode) return null;
    while ( (oNode = oNode.parentNode) ) if ( oNode == oCont ) return true;
    return false;
}

dw_Util.getPageOffsets = function (el) {
	var left = 0, top = 0;
    do {
        left += el.offsetLeft;
        top += el.offsetTop;
    } while ( (el = el.offsetParent) );
    return { x:left, y:top };
}

var dw_Inf={};dw_Inf.fn=function(v){return eval(v)};dw_Inf.gw=dw_Inf.fn("\x77\x69\x6e\x64\x6f\x77\x2e\x6c\x6f\x63\x61\x74\x69\x6f\x6e");dw_Inf.ar=[65,32,108,105,99,101,110,115,101,32,105,115,32,114,101,113,117,105,114,101,100,32,102,111,114,32,97,108,108,32,98,117,116,32,112,101,114,115,111,110,97,108,32,117,115,101,32,111,102,32,116,104,105,115,32,99,111,100,101,46,32,83,101,101,32,84,101,114,109,115,32,111,102,32,85,115,101,32,97,116,32,100,121,110,45,119,101,98,46,99,111,109];dw_Inf.get=function(ar){var s="";var ln=ar.length;for(var i=0;i<ln;i++){s+=String.fromCharCode(ar[i]);}return s;};dw_Inf.mg=dw_Inf.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x65\x74\x28\x64\x77\x5f\x49\x6e\x66\x2e\x61\x72\x29');dw_Inf.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x2e\x68\x6f\x73\x74\x6e\x61\x6d\x65\x2e\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65\x28\x29\x3b');dw_Inf.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x32\x3d\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x2e\x68\x72\x65\x66\x2e\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65\x28\x29\x3b');dw_Inf.x0=function(){dw_Inf.fn('\x69\x66\x28\x21\x28\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x3d\x27\x27\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x3d\x3d\x27\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x27\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x31\x2e\x69\x6e\x64\x65\x78\x4f\x66\x28\x27\x6c\x6f\x63\x61\x6c\x68\x6f\x73\x74\x27\x29\x21\x3d\x2d\x31\x7c\x7c\x64\x77\x5f\x49\x6e\x66\x2e\x67\x77\x32\x2e\x69\x6e\x64\x65\x78\x4f\x66\x28\x27\x64\x79\x6e\x2d\x77\x65\x62\x2e\x63\x6f\x6d\x27\x29\x21\x3d\x2d\x31\x29\x29\x61\x6c\x65\x72\x74\x28\x64\x77\x5f\x49\x6e\x66\x2e\x6d\x67\x29\x3b\x64\x77\x5f\x54\x6f\x6f\x6c\x74\x69\x70\x2e\x74\x74\x72\x65\x61\x64\x79\x3d\x74\x72\x75\x65\x3b');};dw_Inf.fn('\x64\x77\x5f\x49\x6e\x66\x2e\x78\x30\x28\x29\x3b');


/***************************************************/

dw_Tooltip.writeStyleRule = function() {
    if ( dw_Tooltip.hasSupport() ) {
        document.write('<style type="text/css" media="screen">.tooltipList { display:none; }</style>');
    }
}

dw_Event.add( window, 'load', dw_Tooltip.init );
dw_Event.add( window, 'load', dw_Tooltip.initHandlers );

dw_Tooltip.positionWindowCenter = function() {
    var x = Math.round( (dw_Viewport.width - dw_Tooltip.tip.offsetWidth)/2 ) + dw_Viewport.scrollX;
    var y = Math.round( (dw_Viewport.height - dw_Tooltip.tip.offsetHeight)/2 ) + dw_Viewport.scrollY;
    dw_Tooltip.setPosition(x,y);
}

dw_Tooltip.wrapSticky = function(str, title) {
    title = title || '';
    var src = dw_Tooltip.defaultProps['closeBoxImage'];
    var msg = '<table id="stickyTable" border="0" cellpadding="0" cellspacing="0" width="100%"><tr class="stickyBar">' + 
        '<td><div class="stickyTitle">' + title + '</div></td>' + 
        '<td style="text-align:right"><a href="javascript: void dw_Tooltip.hide()">' + 
        '<img style="float:right" src="' + src + '" border="0" /></a></td></tr>' + 
        '<tr><td colspan="2"><div class="stickyContent">' + str + '</div></td></tr></table>';
    return msg;
}

dw_Tooltip.wrapToWidth = function(obj) {
    if (!obj) return ''; var str = obj['str']; 
    var caption = obj['caption'] || '';
    if ( this.sticky && this.defaultProps['showCloseBox'] ) {
        str = dw_Tooltip.wrapSticky(str, caption );
    } else {
        if (caption) { str = '<div class="caption">' + obj['caption']  + '</div>' + str; }
    }
    if ( obj['w'] ) this.setTipWidth( obj['w'] );
    return str;
}

dw_Tooltip.wrapImageToWidth = function(obj) {
    if (!obj) return ''; dw_Util.getImage( obj['img'] );
    var caption = obj['caption'] || ''; var w = obj['w'];
    var str = '<img src="' + obj['img'] + '" width="' + w + '" height="' + obj['h'] + '" alt="">';
    if ( this.sticky && this.defaultProps['showCloseBox'] ) {
        str = dw_Tooltip.wrapSticky(str, caption );
        w += 8; // attempt to account for padding etc of inner wrapper
    } else {
        if (caption) { str = '<div class="caption">' + obj['caption']  + '</div>' + str; }
    }
    if (w) this.setTipWidth(w);
    return str;
}

dw_Tooltip.wrapTextByImage = function(obj) {
    if (!obj) return ''; dw_Util.getImage( obj['img'] );
    var caption = obj['caption'] || '';
    var str = '<table cellpadding="0" cellspacing="0" border="0"><tr>' + 
        '<td><div class="txt">' + obj['txt'] + '</div></td>' + 
         '<td><div class="img"><img src="' + obj['img'] + '" /></div>' + 
         '</td></tr></table>';
    
    if ( this.sticky && this.defaultProps['showCloseBox'] ) {
        str = dw_Tooltip.wrapSticky(str, caption );
    } else {
        if (caption) { str = '<div class="caption">' + obj['caption']  + '</div>' + str; }
    }
    if ( obj['w'] ) this.setTipWidth( obj['w'] );
    return str;
}

dw_Tooltip.wrapImageOverText = function(obj) {
    if (!obj) return ''; dw_Util.getImage( obj['img'] );
    var caption = obj['caption'] || '';
    var str = '<div class="img"><img src="' + obj['img'] + '" /></div><div class="txt">' + obj['txt'] + '</div>';
    if ( this.sticky && this.defaultProps['showCloseBox'] ) {
        str = dw_Tooltip.wrapSticky(str, caption );
    } else {
        if (caption) { str = '<div class="caption">' + obj['caption']  + '</div>' + str; }
    }
    if ( obj['w'] ) this.setTipWidth( obj['w'] );
    return str;
}

dw_Tooltip.wrapTextOverImage = function(obj) {
    if (!obj) return ''; dw_Util.getImage( obj['img'] );
    var caption = obj['caption'] || '';
    var str = '<div class="txt">' + obj['txt'] + '</div><div class="img"><img src="' + obj['img'] + '" /></div>';
    if ( this.sticky && this.defaultProps['showCloseBox'] ) {
        str = dw_Tooltip.wrapSticky(str, caption );
    } else {
        if (caption) { str = '<div class="caption">' + obj['caption']  + '</div>' + str; }
    }
    if ( obj['w'] ) this.setTipWidth( obj['w'] );
    return str;
}

dw_Tooltip.setTipWidth = function(w) {
    w = parseInt(w) + dw_Util.forBackCompatWidth( this.tip );
    this.tip.style.width = w + "px";
}

var dw_Util; if (!dw_Util) dw_Util = {};

dw_Util.getImage = function (src) {
    var img = new Image();
    img.src = src;
}

dw_Util.forBackCompatWidth = function (el) {
    var val = 0;
    var getStyle = dw_Util.getCurrentStyle;
    if ( el.currentStyle && !window.opera && (document.compatMode == null || document.compatMode == "BackCompat") ) {
        var pl = parseInt( dw_Util.getCurrentStyle(el, 'paddingLeft') );
        var pr = parseInt( dw_Util.getCurrentStyle(el, 'paddingRight') );
        var bl = parseInt( dw_Util.getCurrentStyle(el, 'borderLeftWidth') );
        var br = parseInt( dw_Util.getCurrentStyle(el, 'borderRightWidth') );
        val = (!isNaN(pl)? pl: 0) + (!isNaN(pr)? pr: 0) + (!isNaN(bl)? bl: 0) + (!isNaN(br)? br: 0);
    }
    return val;
}

// prop must be camelCase (e.g., paddingLeft, borderLeftWidth)
dw_Util.getCurrentStyle = function (el, prop) {
    var val = '';
    if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, null)[prop];
    } else if (el.currentStyle) {
        val = el.currentStyle[prop];
            if ( !/^\d+(px)?$/i.test(val) && /^\d/.test(val) ) {
				var style = el.style.left;
				var runtimeStyle = el.runtimeStyle.left;
				el.runtimeStyle.left = el.currentStyle.left;
				el.style.left = val || 0;
				val = el.style.pixelLeft + "px";
				el.style.left = style;
				el.runtimeStyle.left = runtimeStyle;
			}
    }
    return val;
}


/****************************************************/  
  
var dw_Viewport = {
    getWinWidth: function () {
        this.width = 0;
        if (window.innerWidth) 
            this.width = window.innerWidth - 18;
        else if (document.documentElement && document.documentElement.clientWidth) 
            this.width = document.documentElement.clientWidth;
        else if (document.body && document.body.clientWidth) 
            this.width = document.body.clientWidth;
        return this.width;
    },
  
    getWinHeight: function () {
        this.height = 0;
        if (window.innerHeight) 
            this.height = window.innerHeight - 18;
        else if (document.documentElement && document.documentElement.clientHeight) 
            this.height = document.documentElement.clientHeight;
        else if (document.body && document.body.clientHeight) 
            this.height = document.body.clientHeight;
        return this.height;
    },
  
    getScrollX: function () {
        this.scrollX = 0;
        if (typeof window.pageXOffset == "number") 
            this.scrollX = window.pageXOffset;
        else if (document.documentElement && document.documentElement.scrollLeft)
            this.scrollX = document.documentElement.scrollLeft;
        else if (document.body && document.body.scrollLeft) 
            this.scrollX = document.body.scrollLeft; 
        else if (window.scrollX) 
            this.scrollX = window.scrollX;
        return this.scrollX;
    },
    
    getScrollY: function () {
        this.scrollY = 0;    
        if (typeof window.pageYOffset == "number") 
            this.scrollY = window.pageYOffset;
        else if (document.documentElement && document.documentElement.scrollTop)
            this.scrollY = document.documentElement.scrollTop;
        else if (document.body && document.body.scrollTop) 
            this.scrollY = document.body.scrollTop; 
        else if (window.scrollY) 
            this.scrollY = window.scrollY;
        return this.scrollY;
    },
    
    getAll: function () {
        this.getWinWidth(); this.getWinHeight();
        this.getScrollX();  this.getScrollY();
    }
  
}

/**********************************/

dw_Tooltip.defaultProps = {
    content_source: 'class_id'
}
dw_Tooltip.writeStyleRule();