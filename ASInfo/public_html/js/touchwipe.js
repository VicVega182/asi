!function(t){"use strict";t.jCarousel.plugin("jcarouselSwipe",{_options:{perSwipe:1,draggable:!0,method:"scroll"},_init:function(){var t=this;this.carousel().on("jcarousel:reloadend",function(){t._reload()})},_create:function(){this._instance=this.carousel().data("jcarousel"),this._instance._element.css("touch-action",this._instance.vertical?"pan-x":"pan-y"),this._carouselOffset=this.carousel().offset()[this._instance.lt]+parseInt(this.carousel().css(this._instance.vertical?"border-top-width":"border-left-width"))+parseInt(this.carousel().css(this._instance.vertical?"padding-top":"padding-left")),this._slidesCount=this._instance.items().length,this.carousel().find("img, a").attr("draggable",!1).css("user-select","none").on("dragstart",function(t){t.preventDefault()}),this._destroy(),this._instance.items().length>this._instance.fullyvisible().length&&this._initGestures()},_initGestures:function(){function e(e){e=e.originalEvent||e||window.event,l=n(e),c=e.target||e.srcElement,r._options.draggable&&t(document).on("touchmove.jcarouselSwipe mousemove.jcarouselSwipe",i),t(document).on("touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe",s)}function i(e){var i,s,c;return e=e.originalEvent||e||window.event,u=n(e),h&&e.preventDefault(),Math.abs(l[f]-u[f])>10&&!h?void t(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe"):void(!p&&Math.abs(l[_]-u[_])>10&&(i=l[_]-u[_],h||(h=!0,r._addClones(),r._currentLT=r._getListPosition(),c=r._instance.options("items"),a=(t.isFunction(c)?c.call(r._instance):r._instance.list().find(c)).last(),o=-1*(a.position()[r._instance.lt]+r._instance.dimension(a)-r._instance.clipping())),s="circular"===r._instance._options.wrap?r._currentLT-i:Math.min(0,Math.max(r._currentLT-i,o)),r._setListPosition(s+"px")))}function s(e){if(e=e.originalEvent||e||window.event,u=n(e),h||!r._options.draggable&&Math.abs(l[_]-u[_])>10){var i=r._getNewTarget(l[_]-u[_]>0);i="circular"===r._instance._options.wrap?i.relative:i["static"],c===e.target&&t(e.target).on("click.disable",function(e){e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),t(e.target).off("click.disable")}),"circular"===r._instance._options.wrap&&(r._removeClones(),r._instance._items=null),p=!0,r._instance[r._options.method](i,function(){h=!1,p=!1,"circular"!==r._instance._options.wrap&&(r._removeClones(),r._instance._items=null)})}t(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe"),t(document).off("touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe")}function n(t){return void 0!==t.touches&&t.touches.length>0?{x:t.touches[0].pageX,y:t.touches[0].pageY}:void 0!==t.changedTouches&&t.changedTouches.length>0?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:void 0!==t.pageX?{x:t.pageX,y:t.pageY}:{x:t.clientX,y:t.clientY}}var o,a,c,r=this,l={},u={},h=!1,p=!1,_=this._instance.vertical?"y":"x",f=this._instance.vertical?"x":"y";this._element.on("touchstart.jcarouselSwipe mousedown.jcarouselSwipe",e)},_getNewTarget:function(t){var e=this._instance.target(),i=this._instance.index(e),s=0;if(this._options.draggable)for(;;){if(!e.length||t&&e.offset()[this._instance.lt]-this._carouselOffset>=0||!t&&e.offset()[this._instance.lt]-this._carouselOffset<=0)break;if(t){if(e=e.next(),!e.length)break;i+=1}else{if(e=e.prev(),!e.length)break;i-=1}s++}else i=t?i+1:i-1,s=1;return t?i+=Math.abs(s-this._options.perSwipe*Math.ceil(s/this._options.perSwipe)):i-=Math.abs(s-this._options.perSwipe*Math.ceil(s/this._options.perSwipe)),"first"===this._instance._options.wrap?i=Math.min(this._slidesCount-1,i):"last"===this._instance._options.wrap?i=Math.max(0,i):this._instance._options.wrap||(i=Math.max(0,Math.min(this._slidesCount-1,i))),i%=this._slidesCount,s=this._options.perSwipe*Math.ceil(s/this._options.perSwipe),{"static":i,relative:(t?"+":"-")+"="+s}},_getListPosition:function(){return this._instance.list().position()[this._instance.lt]},_setListPosition:function(t){var e=this._instance.options("transitions"),i=!!e.transforms,s=!!e.transforms3d,n={},o="left"===this._instance.lt;t=t||0,s?n.transform="translate3d("+(o?t:0)+","+(o?0:t)+",0)":i?n.transform="translate("+(o?t:0)+","+(o?0:t)+")":n[this._instance.lt]=t,this._instance.list().css(n)},_addClones:function(){var e,i,s,n=this,o=this._instance,a=o.items(),c=o.first(),r=o.last(),l=o.dimension(t(window)),u=[],h=[],p=n._getListPosition(),_={};if(!o._options.wrap)return!1;if("last"!==o._options.wrap){for(i=0,s=0,e=c;l>i;)e=e.prev(),0===e.length?(s=--s<-a.length?-1:s,i+=o.dimension(a.eq(s)),u.push(a.eq(s).clone().attr("data-jcarousel-clone",!0))):i+=o.dimension(e);p=Math.min(p,-i)+"px",o._items.first().before(u.reverse()),_[o.lt]=p,o.move(_)}if("first"!==o._options.wrap){for(i=0,s=-1,e=r;l>i;)e=e.next(),0===e.length?(s=++s>a.length-1?0:s,i+=o.dimension(a.eq(s)),h.push(a.eq(s).clone().attr("data-jcarousel-clone",!0))):i+=o.dimension(e);o._items.last().after(h)}},_removeClones:function(){var t,e=this._instance.first().position()[this._instance.lt],i={};this._instance.list().find("[data-jcarousel-clone]").remove(),t=Math.abs(this._instance.first().position()[this._instance.lt]-e),t&&(i[this._instance.lt]=this._getListPosition()+t+"px",this._instance.move(i))},_destroy:function(){this._element.off("touchstart.jcarouselSwipe mousedown.jcarouselSwipe"),t(document).off("touchmove.jcarouselSwipe mousemove.jcarouselSwipe touchend.jcarouselSwipe touchcancel.jcarouselSwipe mouseup.jcarouselSwipe")},_reload:function(){this._create()}})}(jQuery);