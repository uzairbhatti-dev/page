(function($){var _PLUGIN_='mmenu',_VERSION_='4.1.4';if($[_PLUGIN_])
{return;}
var glbl={$wndw:null,$html:null,$body:null,$page:null,$blck:null,$allMenus:null,$scrollTopNode:null};var _c={},_e={},_d={},_serialnr=0;$[_PLUGIN_]=function($menu,opts,conf)
{glbl.$allMenus=glbl.$allMenus.add($menu);this.$menu=$menu;this.opts=opts
this.conf=conf;this.serialnr=_serialnr++;this._init();return this;};$[_PLUGIN_].prototype={open:function()
{this._openSetup();this._openFinish();return 'open';},_openSetup:function()
{var _scrollTop=findScrollTop();this.$menu.addClass(_c.current);glbl.$allMenus.not(this.$menu).trigger(_e.close);glbl.$page.data(_d.style,glbl.$page.attr('style')||'').data(_d.scrollTop,_scrollTop).data(_d.offetLeft,glbl.$page.offset().left);var _w=0;glbl.$wndw.off(_e.resize).on(_e.resize,function(e,force)
{if(force||glbl.$html.hasClass(_c.opened))
{var nw=glbl.$wndw.width();if(nw!=_w)
{_w=nw;glbl.$page.width(nw-glbl.$page.data(_d.offetLeft));}}}).trigger(_e.resize,[true]);if(this.conf.preventTabbing)
{glbl.$wndw.off(_e.keydown).on(_e.keydown,function(e)
{if(e.keyCode==9)
{e.preventDefault();return false;}});}
if(this.opts.modal)
{glbl.$html.addClass(_c.modal);}
if(this.opts.moveBackground)
{glbl.$html.addClass(_c.background);}
if(this.opts.position!='left')
{glbl.$html.addClass(_c.mm(this.opts.position));}
if(this.opts.zposition!='back')
{glbl.$html.addClass(_c.mm(this.opts.zposition));}
if(this.opts.classes)
{glbl.$html.addClass(this.opts.classes);}
glbl.$html.addClass(_c.opened);this.$menu.addClass(_c.opened);glbl.$page.scrollTop(_scrollTop);this.$menu.scrollTop(0);},_openFinish:function()
{var that=this;transitionend(glbl.$page,function()
{that.$menu.trigger(_e.opened);},this.conf.transitionDuration);glbl.$html.addClass(_c.opening);this.$menu.trigger(_e.opening);window.scrollTo(0,1);},close:function()
{var that=this;transitionend(glbl.$page,function()
{that.$menu.removeClass(_c.current).removeClass(_c.opened);glbl.$html.removeClass(_c.opened).removeClass(_c.modal).removeClass(_c.background).removeClass(_c.mm(that.opts.position)).removeClass(_c.mm(that.opts.zposition));if(that.opts.classes)
{glbl.$html.removeClass(that.opts.classes);}
glbl.$wndw.off(_e.resize).off(_e.keydown);glbl.$page.attr('style',glbl.$page.data(_d.style));if(glbl.$scrollTopNode)
{glbl.$scrollTopNode.scrollTop(glbl.$page.data(_d.scrollTop));}
that.$menu.trigger(_e.closed);},this.conf.transitionDuration);glbl.$html.removeClass(_c.opening);this.$menu.trigger(_e.closing);return 'close';},_init:function()
{this.opts=extendOptions(this.opts,this.conf,this.$menu);this.direction=(this.opts.slidingSubmenus)?'horizontal':'vertical';this._initPage(glbl.$page);this._initMenu();this._initBlocker();this._initPanles();this._initLinks();this._initOpenClose();this._bindCustomEvents();if($[_PLUGIN_].addons)
{for(var a=0;a<$[_PLUGIN_].addons.length;a++)
{if(typeof this['_addon_'+$[_PLUGIN_].addons[a]]=='function')
{this['_addon_'+$[_PLUGIN_].addons[a]]();}}}},_bindCustomEvents:function()
{var that=this;this.$menu.off(_e.open+' '+_e.close+' '+_e.setPage+' '+_e.update).on(_e.open+' '+_e.close+' '+_e.setPage+' '+_e.update,function(e)
{e.stopPropagation();});this.$menu.on(_e.open,function(e)
{if($(this).hasClass(_c.current))
{e.stopImmediatePropagation();return false;}
return that.open();}).on(_e.close,function(e)
{if(!$(this).hasClass(_c.current))
{e.stopImmediatePropagation();return false;}
return that.close();}).on(_e.setPage,function(e,$p)
{that._initPage($p);that._initOpenClose();});var $panels=this.$menu.find(this.opts.isMenu&&this.direction!='horizontal'?'ul, ol':'.'+_c.panel);$panels.off(_e.toggle+' '+_e.open+' '+_e.close).on(_e.toggle+' '+_e.open+' '+_e.close,function(e)
{e.stopPropagation();});if(this.direction=='horizontal')
{$panels.on(_e.open,function(e)
{return openSubmenuHorizontal($(this),that.$menu);});}
else
{$panels.on(_e.toggle,function(e)
{var $t=$(this);return $t.triggerHandler($t.parent().hasClass(_c.opened)?_e.close:_e.open);}).on(_e.open,function(e)
{$(this).parent().addClass(_c.opened);return 'open';}).on(_e.close,function(e)
{$(this).parent().removeClass(_c.opened);return 'close';});}},_initBlocker:function()
{var that=this;if(!glbl.$blck)
{glbl.$blck=$('<div id="'+_c.blocker+'" />').css('opacity',0).appendTo(glbl.$body);}
glbl.$blck.off(_e.touchstart).on(_e.touchstart,function(e)
{e.preventDefault();e.stopPropagation();glbl.$blck.trigger(_e.mousedown);}).on(_e.mousedown,function(e)
{e.preventDefault();if(!glbl.$html.hasClass(_c.modal))
{that.$menu.trigger(_e.close);}});},_initPage:function($p)
{if(!$p)
{$p=$(this.conf.pageSelector,glbl.$body);if($p.length>1)
{$[_PLUGIN_].debug('Multiple nodes found for the page-node, all nodes are wrapped in one <'+this.conf.pageNodetype+'>.');$p=$p.wrapAll('<'+this.conf.pageNodetype+' />').parent();}}
$p.addClass(_c.page);glbl.$page=$p;},_initMenu:function()
{var that=this;if(this.conf.clone)
{this.$menu=this.$menu.clone(true);this.$menu.add(this.$menu.find('*')).filter('[id]').each(function()
{$(this).attr('id',_c.mm($(this).attr('id')));});}
this.$menu.contents().each(function()
{if($(this)[0].nodeType==3)
{$(this).remove();}});this.$menu.prependTo('body').addClass(_c.menu);this.$menu.addClass(_c.mm(this.direction));if(this.opts.classes)
{this.$menu.addClass(this.opts.classes);}
if(this.opts.isMenu)
{this.$menu.addClass(_c.ismenu);}
if(this.opts.position!='left')
{this.$menu.addClass(_c.mm(this.opts.position));}
if(this.opts.zposition!='back')
{this.$menu.addClass(_c.mm(this.opts.zposition));}},_initPanles:function()
{var that=this;this.__refactorClass($('.'+this.conf.listClass,this.$menu),'list');if(this.opts.isMenu)
{$('ul, ol',this.$menu).not('.mm-nolist').addClass(_c.list);}
var $lis=$('.'+_c.list+' > li',this.$menu);this.__refactorClass($lis.filter('.'+this.conf.selectedClass),'selected');this.__refactorClass($lis.filter('.'+this.conf.labelClass),'label');this.__refactorClass($lis.filter('.'+this.conf.spacerClass),'spacer');$lis.off(_e.setSelected).on(_e.setSelected,function(e,selected)
{e.stopPropagation();$lis.removeClass(_c.selected);if(typeof selected!='boolean')
{selected=true;}
if(selected)
{$(this).addClass(_c.selected);}});this.__refactorClass($('.'+this.conf.panelClass,this.$menu),'panel');this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find('.'+_c.list).children().children().filter(this.conf.panelNodetype)).addClass(_c.panel);var $panels=$('.'+_c.panel,this.$menu);$panels.each(function(i)
{var $t=$(this),id=$t.attr('id')||_c.mm('m'+that.serialnr+'-p'+i);$t.attr('id',id);});$panels.find('.'+_c.panel).each(function(i)
{var $t=$(this),$u=$t.is('ul, ol')?$t:$t.find('ul ,ol').first(),$l=$t.parent(),$a=$l.find('> a, > span'),$p=$l.closest('.'+_c.panel);$t.data(_d.parent,$l);if($l.parent().is('.'+_c.list))
{var $btn=$('<a class="'+_c.subopen+'" href="#'+$t.attr('id')+'" />').insertBefore($a);if(!$a.is('a'))
{$btn.addClass(_c.fullsubopen);}
if(that.direction=='horizontal')
{$u.prepend('<li class="'+_c.subtitle+'"><a class="'+_c.subclose+'" href="#'+$p.attr('id')+'">'+$a.text()+'</a></li>');}}});var evt=this.direction=='horizontal'?_e.open:_e.toggle;$panels.each(function(i)
{var $opening=$(this),id=$opening.attr('id');$('a[href="#'+id+'"]',that.$menu).off(_e.click).on(_e.click,function(e)
{e.preventDefault();$opening.trigger(evt);});});if(this.direction=='horizontal')
{var $selected=$('.'+_c.list+' > li.'+_c.selected,this.$menu);$selected.add($selected.parents('li')).parents('li').removeClass(_c.selected).end().each(function()
{var $t=$(this),$u=$t.find('> .'+_c.panel);if($u.length)
{$t.parents('.'+_c.panel).addClass(_c.subopened);$u.addClass(_c.opened);}}).closest('.'+_c.panel).addClass(_c.opened).parents('.'+_c.panel).addClass(_c.subopened);}
else
{$('li.'+_c.selected,this.$menu).addClass(_c.opened).parents('.'+_c.selected).removeClass(_c.selected);}
var $current=$panels.filter('.'+_c.opened);if(!$current.length)
{$current=$panels.first();}
$current.addClass(_c.opened).last().addClass(_c.current);if(this.direction=='horizontal')
{$panels.find('.'+_c.panel).appendTo(this.$menu);}},_initLinks:function()
{var that=this;$('.'+_c.list+' > li > a',this.$menu).not('.'+_c.subopen).not('.'+_c.subclose).not('[rel="external"]').not('[target="_blank"]').off(_e.click).on(_e.click,function(e)
{var $t=$(this),href=$t.attr('href');if(that.__valueOrFn(that.opts.onClick.setSelected,$t))
{$t.parent().trigger(_e.setSelected);}
var preventDefault=that.__valueOrFn(that.opts.onClick.preventDefault,$t,href.slice(0,1)=='#');if(preventDefault)
{e.preventDefault();}
if(that.__valueOrFn(that.opts.onClick.blockUI,$t,!preventDefault))
{glbl.$html.addClass(_c.blocking);}
if(that.__valueOrFn(that.opts.onClick.close,$t,preventDefault))
{that.$menu.triggerHandler(_e.close);}});},_initOpenClose:function()
{var that=this;var id=this.$menu.attr('id');if(id&&id.length)
{if(this.conf.clone)
{id=_c.umm(id);}
$('a[href="#'+id+'"]').off(_e.click).on(_e.click,function(e)
{e.preventDefault();that.$menu.trigger(_e.open);});}
var id=glbl.$page.attr('id');if(id&&id.length)
{$('a[href="#'+id+'"]').off(_e.click).on(_e.click,function(e)
{e.preventDefault();that.$menu.trigger(_e.close);});}},__valueOrFn:function(o,$e,d)
{if(typeof o=='function')
{return o.call($e[0]);}
if(typeof o=='undefined'&&typeof d!='undefined')
{return d;}
return o;},__refactorClass:function($e,c)
{$e.removeClass(this.conf[c+'Class']).addClass(_c[c]);}};$.fn[_PLUGIN_]=function(opts,conf)
{if(!glbl.$wndw)
{_initPlugin();}
opts=extendOptions(opts,conf);conf=extendConfiguration(conf);return this.each(function()
{var $menu=$(this);if($menu.data(_PLUGIN_))
{return;}
$menu.data(_PLUGIN_,new $[_PLUGIN_]($menu,opts,conf));});};$[_PLUGIN_].version=_VERSION_;$[_PLUGIN_].defaults={position:'left',zposition:'back',moveBackground:true,slidingSubmenus:true,modal:false,classes:'',onClick:{setSelected:true}};$[_PLUGIN_].configuration={preventTabbing:true,panelClass:'Panel',listClass:'List',selectedClass:'Selected',labelClass:'Label',spacerClass:'Spacer',pageNodetype:'div',panelNodetype:'ul, ol, div',transitionDuration:400};(function(){var wd=window.document,ua=window.navigator.userAgent;var _touch='ontouchstart'in wd,_overflowscrolling='WebkitOverflowScrolling'in wd.documentElement.style,_transition=(function(){var s=document.createElement('div').style;if('webkitTransition'in s)
{return 'webkitTransition';}
return 'transition'in s;})(),_oldAndroidBrowser=(function(){if(ua.indexOf('Android')>=0)
{return 2.4>parseFloat(ua.slice(ua.indexOf('Android')+8));}
return false;})();$[_PLUGIN_].support={touch:_touch,transition:_transition,oldAndroidBrowser:_oldAndroidBrowser,overflowscrolling:(function(){if(!_touch)
{return true;}
if(_overflowscrolling)
{return true;}
if(_oldAndroidBrowser)
{return false;}
return true;})()};})();$[_PLUGIN_].useOverflowScrollingFallback=function(use)
{if(glbl.$html)
{if(typeof use=='boolean')
{glbl.$html[use?'addClass':'removeClass'](_c.nooverflowscrolling);}
return glbl.$html.hasClass(_c.nooverflowscrolling);}
else
{_useOverflowScrollingFallback=use;return use;}};$[_PLUGIN_].debug=function(msg){};$[_PLUGIN_].deprecated=function(depr,repl)
{if(typeof console!='undefined'&&typeof console.warn!='undefined')
{console.warn('MMENU: '+depr+' is deprecated, use '+repl+' instead.');}};var _useOverflowScrollingFallback=!$[_PLUGIN_].support.overflowscrolling;function extendOptions(o,c,$m)
{if(typeof o!='object')
{o={};}
if($m)
{if(typeof o.isMenu!='boolean')
{var $c=$m.children();o.isMenu=($c.length==1&&$c.is(c.panelNodetype));}
return o;}
if(typeof o.onClick!='object')
{o.onClick={};}
if(typeof o.onClick.setLocationHref!='undefined')
{$[_PLUGIN_].deprecated('onClick.setLocationHref option','!onClick.preventDefault');if(typeof o.onClick.setLocationHref=='boolean')
{o.onClick.preventDefault=!o.onClick.setLocationHref;}}
o=$.extend(true,{},$[_PLUGIN_].defaults,o);if($[_PLUGIN_].useOverflowScrollingFallback())
{switch(o.position)
{case 'top':case 'right':case 'bottom':$[_PLUGIN_].debug('position: "'+o.position+'" not supported when using the overflowScrolling-fallback.');o.position='left';break;}
switch(o.zposition)
{case 'front':case 'next':$[_PLUGIN_].debug('z-position: "'+o.zposition+'" not supported when using the overflowScrolling-fallback.');o.zposition='back';break;}}
return o;}
function extendConfiguration(c)
{if(typeof c!='object')
{c={};}
if(typeof c.panelNodeType!='undefined')
{$[_PLUGIN_].deprecated('panelNodeType configuration option','panelNodetype');c.panelNodetype=c.panelNodeType;}
c=$.extend(true,{},$[_PLUGIN_].configuration,c)
if(typeof c.pageSelector!='string')
{c.pageSelector='> '+c.pageNodetype;}
return c;}
function _initPlugin()
{glbl.$wndw=$(window);glbl.$html=$('html');glbl.$body=$('body');glbl.$allMenus=$();$.each([_c,_d,_e],function(i,o)
{o.add=function(c)
{c=c.split(' ');for(var d in c)
{o[c[d]]=o.mm(c[d]);}};});_c.mm=function(c){return 'mm-'+c;};_c.add('menu ismenu panel list subtitle selected label spacer current highest hidden page blocker modal background opened opening subopened subopen fullsubopen subclose nooverflowscrolling');_c.umm=function(c)
{if(c.slice(0,3)=='mm-')
{c=c.slice(3);}
return c;};_d.mm=function(d){return 'mm-'+d;};_d.add('parent style scrollTop offetLeft');_e.mm=function(e){return e+'.mm';};_e.add('toggle open opening opened close closing closed update setPage setSelected transitionend touchstart touchend mousedown mouseup click keydown keyup resize');$[_PLUGIN_]._c=_c;$[_PLUGIN_]._d=_d;$[_PLUGIN_]._e=_e;$[_PLUGIN_].glbl=glbl;$[_PLUGIN_].useOverflowScrollingFallback(_useOverflowScrollingFallback);}
function openSubmenuHorizontal($opening,$m)
{if($opening.hasClass(_c.current))
{return false;}
var $panels=$('.'+_c.panel,$m),$current=$panels.filter('.'+_c.current);$panels.removeClass(_c.highest).removeClass(_c.current).not($opening).not($current).addClass(_c.hidden);if($opening.hasClass(_c.opened))
{$current.addClass(_c.highest).removeClass(_c.opened).removeClass(_c.subopened);}
else
{$opening.addClass(_c.highest);$current.addClass(_c.subopened);}
$opening.removeClass(_c.hidden).removeClass(_c.subopened).addClass(_c.current).addClass(_c.opened);return 'open';}
function findScrollTop()
{if(!glbl.$scrollTopNode)
{if(glbl.$html.scrollTop()!=0)
{glbl.$scrollTopNode=glbl.$html;}
else if(glbl.$body.scrollTop()!=0)
{glbl.$scrollTopNode=glbl.$body;}}
return(glbl.$scrollTopNode)?glbl.$scrollTopNode.scrollTop():0;}
function transitionend($e,fn,duration)
{var s=$[_PLUGIN_].support.transition;if(s=='webkitTransition')
{$e.one('webkitTransitionEnd',fn);}
else if(s)
{$e.one(_e.transitionend,fn);}
else
{setTimeout(fn,duration);}}})(jQuery);