
// <![CDATA[
var kunena_toggler_close = "Collapse";
var kunena_toggler_open = "Expand";
// ]]>
jQuery(function($) {
			 $('.hasTip').each(function() {
				var title = $(this).attr('title');
				if (title) {
					var parts = title.split('::', 2);
					$(this).data('tip:title', parts[0]);
					$(this).data('tip:text', parts[1]);
				}
			});
			var JTooltips = new Tips($('.hasTip').get(), {"maxTitleChars": 50,"fixed": false});
		});
window.setInterval(function(){var r;try{r=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}if(r){r.open("GET","./",true);r.send(null)}},3540000);
config_attachment_limit = 8
// <![CDATA[
window.addEvent('domready', function() {
	kbbcode = new kbbcode('kbbcode-message', 'kbbcode-toolbar', {
		dispatchChangeEvent: true,
		changeEventDelay: 1000,
		interceptTab: true
});

kbbcode.addFunction('bold', function() {
	this.focus().wrapSelection('[b]', '[/b]', true);
}, {
	'title': 'Bold',
	'alt': 'Bold text: [b]text[/b]',
	'id': 'kbbcode-bold-button'
});

kbbcode.addFunction('italic', function() {
	this.focus().wrapSelection('[i]', '[/i]', true);
}, {
	'title': 'Italic',
	'alt': 'Italic text: [i]text[/i]',
	'id': 'kbbcode-italic-button'
});

kbbcode.addFunction('underline', function() {
	this.focus().wrapSelection('[u]', '[/u]', true);
}, {
	'title': 'Underline',
	'alt': 'Underline text: [u]text[/u]',
	'id': 'kbbcode-underline-button'
});

kbbcode.addFunction('strike', function() {
	this.focus().wrapSelection('[strike]', '[/strike]', true);
}, {
	'title': 'Strikethrough',
	'alt': 'Strikethrough Text: [strike]Text[/strike]',
	'id': 'kbbcode-strike-button'
});

kbbcode.addFunction('sub', function() {
	this.focus().wrapSelection('[sub]', '[/sub]', true);
}, {
	'title': 'Subscript',
	'alt': 'Subscript Text: [sub]Text[/sub]',
	'id': 'kbbcode-sub-button'
});

kbbcode.addFunction('sup', function() {
	this.focus().wrapSelection('[sup]', '[/sup]', true);
}, {
	'title': 'Superscript',
	'alt': 'Superscript Text: [sup]Text[/sup]',
	'id': 'kbbcode-sup-button'
});

kbbcode.addFunction('size', function() {
	kToggleOrSwap('kbbcode-size-options');
}, {
	'title': 'Font size',
	'alt': 'Fontsize: Select Fontsize and Apply to current selection',
	'id': 'kbbcode-size-button'
});

kbbcode.addFunction('color', function() {
	kToggleOrSwap('kbbcode-color-options');
}, {
	'title': 'Color',
	'alt': 'Color: [color=#FF6600]text[/color]',
	'id': 'kbbcode-color-button'
});

kbbcode.addFunction('#', function() {
}, {
	'class': 'kbbcode-separator'});

kbbcode.addFunction('ulist', function() {
selection = this.focus().getSelection();
	if (selection) {
		this.processEachLine(function(line) {
			return '  [li]' + line + '[/li]';
		}, false);
		this.wrapSelection('[ul]\n', '\n[/ul]', false);
	} else {
		this.wrapSelection('[ul]\n  [li]', '[/li]\n  [li][/li]\n[/ul]', false);
	}
}, {
	'title': 'Unordered List',
	'alt': 'Unordered List: [ul] [li]text[/li] [/ul] - Tip: a list must contain List Items',
	'id': 'kbbcode-ulist-button'
});

kbbcode.addFunction('olist', function() {
selection = this.focus().getSelection();
	if (selection) {
		this.processEachLine(function(line) {
			return '  [li]' + line + '[/li]';
		}, false);
		this.wrapSelection('[ol]\n', '\n[/ol]', false);
	} else {
		this.wrapSelection('[ol]\n  [li]', '[/li]\n  [li][/li]\n[/ol]', false);
	}
}, {
	'title': 'Ordered List',
	'alt': 'Ordered List: [ol] [li]text[/li] [/ol] - Tip: a list must contain List Items',
	'id': 'kbbcode-olist-button'
});

kbbcode.addFunction('list', function() {
	this.focus().wrapSelection('[li]', '[/li]', true);
}, {
	'title': 'List Item',
	'alt': 'List Item: [li] list item [/li]',
	'id': 'kbbcode-list-button'
});

kbbcode.addFunction('left', function() {
	this.focus().wrapSelection('[left]', '[/left]', true);
}, {
	'title': 'Align left',
	'alt': 'Align left: [left]Text[/left]',
	'id': 'kbbcode-left-button'
});

kbbcode.addFunction('center', function() {
	this.focus().wrapSelection('[center]', '[/center]', true);
}, {
	'title': 'Align center',
	'alt': 'Align center: [center]Text[/center]',
	'id': 'kbbcode-center-button'
});

kbbcode.addFunction('right', function() {
	this.focus().wrapSelection('[right]', '[/right]', true);
}, {
	'title': 'Align right',
	'alt': 'Align right: [right]Text[/right]',
	'id': 'kbbcode-right-button'
});

kbbcode.addFunction('#', function() {
}, {
	'class': 'kbbcode-separator'});

kbbcode.addFunction('quote', function() {
	this.focus().wrapSelection('[quote]', '[/quote]', true);
}, {
	'title': 'Quote',
	'alt': 'Quote text: [quote]text[/quote]',
	'id': 'kbbcode-quote-button'
});

kbbcode.addFunction('code', function() {
	kToggleOrSwap('kbbcode-code-options');
}, {
	'title': 'Code',
	'alt': 'Code display: [code]code[/code]',
	'id': 'kbbcode-code-button'
});

kbbcode.addFunction('table', function() {
selection = this.focus().getSelection();
	if (selection) {
		this.processEachLine(function(line) {
			return '  [tr]\n    [td]' + line + '[/td]\n  [/tr]';
		}, false);
		this.wrapSelection('\n[table]\n', '\n[/table]\n', false);
	} else {
		this.wrapSelection('[table]\n  [tr]\n    [td]', '[/td]\n    [td][/td]\n  [/tr]\n  [tr]\n    [td][/td]\n    [td][/td]\n  [/tr]\n[/table]', false);
	}
}, {
	'title': 'Table',
	'alt': 'Create an embedded table: [table][tr][td]line1[/td][/tr][tr][td]lines[/td][/tr][/table]',
	'id': 'kbbcode-table-button'
});

kbbcode.addFunction('spoiler', function() {
	this.focus().wrapSelection('[spoiler]', '[/spoiler]', true);
}, {
	'title': 'Spoiler',
	'alt': 'Spoiler: Text is only shown after you click the spoiler',
	'id': 'kbbcode-spoiler-button'
});

kbbcode.addFunction('hide', function() {
	this.focus().wrapSelection('[hide]', '[/hide]', true);
}, {
	'title': 'Hide text from Guests',
	'alt': 'Hidden text: [hide]any hidden text[/hide] - hide part of message from Guests',
	'id': 'kbbcode-hide-button'
});

kbbcode.addFunction('#', function() {
}, {
	'class': 'kbbcode-separator'});

kbbcode.addFunction('image', function() {
	kToggleOrSwap('kbbcode-image-options');
}, {
	'title': 'Image link',
	'alt': 'Image link: [img size=400]http://www.google.com/images/web_logo_left.gif[/img]',
	'id': 'kbbcode-image-button'
});

kbbcode.addFunction('link', function() {
	sel = this.focus().getSelection(); if (sel) { document.id('kbbcode-link_text').set('value', sel); }
	kToggleOrSwap('kbbcode-link-options');
}, {
	'title': 'Link',
	'alt': 'Link: [url=http://www.zzz.com/]This is a link[/url]',
	'id': 'kbbcode-link-button'
});

kbbcode.addFunction('#', function() {
}, {
	'class': 'kbbcode-separator'});

kbbcode.addFunction('ebay', function() {
	this.focus().wrapSelection('[ebay]', '[/ebay]', true);
}, {
	'title': 'eBay Item',
	'alt': 'eBay: [ebay]ItemID[/ebay]',
	'id': 'kbbcode-ebay-button'
});

kbbcode.addFunction('video', function() {
	kToggleOrSwap('kbbcode-video-options');
}, {
	'title': 'Video',
	'alt': 'Video: Select Provider or URL - modus',
	'id': 'kbbcode-video-button'
});

kbbcode.addFunction('map', function() {
	this.focus().wrapSelection('[map]', '[/map]', true);
}, {
	'title': 'Map',
	'alt': 'Insert a Map into the message: [map]Address[/map]',
	'id': 'kbbcode-map-button'
});

kbbcode.addFunction('#', function() {
}, {
	'class': 'kbbcode-separator'});

kbbcode.addFunction('help', function() {
	window.open('http://docs.kunena.org/index.php/bbcode');
}, {
	'title': 'BBCode Help',
	'alt': 'Get Help on how to use the bbcode editor',
	'id': 'kbbcode-help-button'
});
});

// ]]>
// <![CDATA[
function kPreviewHelper()
{
	if (_previewActive == true){
		previewRequest = new Request.JSON({secure: false, url: "\/jchoptimize\/index.php?option=com_kunena&view=topic&layout=edit&format=raw&Itemid=663",
				onSuccess: function(response){
			var __message = document.id("kbbcode-preview");
			if (__message) {
				__message.set("html", response.preview);
				__message.fireEvent('updated');
			}
			}}).post({body: document.id("kbbcode-message").get("value")
		});
	}
}

window.addEvent('domready', function() {


kEditorInitialize();
});

// ]]>
// <![CDATA[
var kunena_anonymous_name = "Anonymous";

window.addEvent('domready', function(){

	function kunenaSelectUsername(obj, kuser) {
		if (obj.get('checked')) {
			document.id('kauthorname').set('value',kunena_anonymous_name).removeProperty('disabled');
			document.id('kanynomous-check-name').setStyle('display');
		} else {
			document.id('kanynomous-check-name').setStyle('display','none');
			document.id('kauthorname').set('value',kuser).set('disabled', 'disabled');
		}
	}

	function kunenaCheckPollallowed(catid) {
		if ( pollcategoriesid[catid] !== undefined ) {
			document.id('kbbcode-poll-button').setStyle('display');
		} else {
			document.id('kbbcode-poll-button').setStyle('display','none');
		}
	}

	function kunenaCheckAnonymousAllowed(catid) {
		if(document.id('kanynomous-check') !== null && document.id('kanonymous') !== null) {
			if ( arrayanynomousbox[catid] !== undefined ) {
				document.id('kanynomous-check').setStyle('display');
				document.id('kanonymous').set('checked','checked');
			} else {
				document.id('kanynomous-check').setStyle('display','none');
				kbutton.removeProperty('checked');
			}
		}
				kunenaSelectUsername(kbutton,kuser);
			}
	//	for hide or show polls if category is allowed
	if(document.id('postcatid') !== null) {
		document.id('postcatid').addEvent('change', function(e) {
			kunenaCheckPollallowed(this.value);
		});
	}

	if(document.id('kauthorname') !== undefined) {
		var kuser = document.id('kauthorname').get('value');
		var kbutton = document.id('kanonymous');
				kunenaSelectUsername(kbutton, kuser);
		kbutton.addEvent('click', function(e) {
			kunenaSelectUsername(this, kuser);
		});
			}
	//	to select if anynomous option is allowed on new topic tab
	if(document.id('postcatid') !== null) {
		document.id('postcatid').addEvent('change', function(e) {
			var postcatid = document.id('postcatid').value;
			kunenaCheckAnonymousAllowed(postcatid);
		});
	}

	if(document.id('postcatid') !== null) {
		kunenaCheckPollallowed(document.id('postcatid').getSelected().get("value"));
		kunenaCheckAnonymousAllowed(document.id('postcatid').getSelected().get("value"));
	}
});


// ]]>
jQuery(document).ready(function(){
	jQuery('.hasTooltip').tooltip({"html": true,"container": "body"});
});
jQuery(document).ready(function()
			{
				jQuery('.hasPopover').popover({"html": true,"placement": "top","trigger": "hover focus","container": "body"});
			});
jQuery(function() {
                                        jQuery("img").lazyload();
                                });
                                
		jQuery.noConflict();

		jQuery(document).ready(function($){
			jQuery('#roof .column').equalHeight('.block');jQuery('#header .column').equalHeight('.block');jQuery('#top .column').equalHeight('.block');jQuery('#utility .column').equalHeight('.block');jQuery('#feature .column').equalHeight('.block');jQuery('#main-top .column').equalHeight('.block');jQuery('#content-top .column').equalHeight('.block');jQuery('#content-bottom .column').equalHeight('.block');jQuery('#main-bottom .column').equalHeight('.block');jQuery('#bottom .column').equalHeight('.block');jQuery('#footer .column').equalHeight('.block');jQuery('#mainbody, #sidebar-a, #sidebar-b').equalHeight();
			jQuery('img').lazyload({effect: "fadeIn",threshold : 100});

		});
  