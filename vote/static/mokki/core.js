if("undefined"==typeof jQuery)throw new Error("Mokki Editor requires jQuery");
var Mokki       = Mokki || {};
var MokkiObject = new Object();
var MokkiImageList = new Array;
var MokkiSaveSelection, MokkiRestoreSelection, MokkiSavedSelection;;
Mokki = {
  editor: function(mokkiElement, mokkiAdditional) {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    MokkiObject.embedArea       = $(mokkiElement).find('#mokkiTextEmbed');
    MokkiObject.placeholder     = (undefined !== MokkiObject.embedArea.attr('placeholder')) ? '<span class="MokkiPlaceholder">'+MokkiObject.embedArea.attr('placeholder')+'</span>' : '';
    var defaultText = (MokkiObject.embedArea.text() !== '' ) ? MokkiObject.embedArea.text() : MokkiObject.placeholder ;
    MokkiObject.embedArea.before('<div id="mokkiTextPreview" contenteditable="true">'+defaultText+'</div>').hide();
    MokkiObject.previewArea     = $(mokkiElement+' #mokkiTextPreview');
    MokkiObject.previewArea.before('<div class="mokkiButtonBar" id="mokkiButtonBar"></div>');
    MokkiObject.buttonBar       = $(mokkiElement+' #mokkiButtonBar');
    Mokki.events.focused();
    var buttonList = (''
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="bold"><i class="fa fa-bold"></i></a>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="italic"><i class="fa fa-italic"></i></a>'
//      +'<a class="mokki-btn mokki-cmd" href="#" data-command="underline"><i class="fa fa-underline"></i></a>'
      +'<span class="sparator"></span>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h1"><i class="fa fa-header"></i></a>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="p"><i class="fa fa-paragraph"></i></a>'
//      +'<a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="pre"><i class="fa fa-file-code-o"></i></a>'
//      +'<a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="blockquote"><i class="fa fa-quote-left"></i></a>'
//      +'<span class="sparator"></span>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertorderedlist"><i class="fa fa-list-ol"></i></a>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertunorderedlist"><i class="fa fa-list-ul"></i></a>'
//      +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertLink"><i class="fa fa-link"></i></a>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertImage"><i class="fa fa-file-image-o"></i></a>'
      +'<span class="sparator"></span>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="undo"><i class="fa fa-rotate-left"></i></a>'
//      +'<a class="mokki-btn mokki-cmd" href="#" data-command="redo"><i class="fa fa-rotate-right"></i></a>'
//      +'<span class="sparator"></span>'
      +'<a class="mokki-btn mokki-cmd" href="#" data-command="viewsource"><i class="fa fa-code"></i></a>'
    );
    MokkiObject.previewArea.on('input',function() {
      if (MokkiObject.previewArea.html() !== MokkiObject.embedArea.html()) {
        MokkiObject.embedArea.html(MokkiObject.previewArea.html());
      };
    });
    MokkiObject.buttonBar.html(buttonList);
    MokkiObject.buttonBar.button = MokkiObject.buttonBar.find('.mokki-cmd');
    var embedHtml = $('#mokki-embed-input');
    embedHtml.on('mousedown', function(e){
      MokkiSavedSelection = MokkiSaveSelection( document.getElementById("mokkiTextPreview") );
    });
    MokkiObject.buttonBar.button.on('click', function (e) {
      var command = $(this).attr('data-command');
      console.log(command);
      var value   = $(this).attr('data-value');
      if (command !== "undefined" &&   command !== undefined ) {
        switch (command) {
          case 'insertLink':
            var URL = prompt("Enter a URL:", "http://");
            if ((URL !== null) && (URL !== "")) {
                Mokki.events.createStyle('CreateLink', URL);
            }
          break;

          case 'insertImage':
            var image = prompt("Enter a image location:", "http://");
            if ((image !== null) && (image !== "")) {
               Mokki.events.createStyle('InsertImage', image);
            }
            MokkiObject.media = $(mokkiElement+' .mokkiMedia');
            MokkiObject.media.area =  MokkiObject.media.find('.mokkiMediaArea');
            Mokki.events.openMedia();
          break;

          case 'insertEmbed':
            if ((embedHtml.val() !== null) && (embedHtml.val() !== "")) {
              Mokki.events.createStyle('InsertHtml', embedHtml.val());
              embedHtml.val('');
            }
          break;

          case 'viewsource':
              Mokki.events.cleanPlaceholder();
              $(this).attr('data-command', 'hidesource');
              $(this).addClass('mokki-btn-active')
              MokkiObject.embedArea.html(MokkiObject.previewArea.html()).show().height(MokkiObject.previewArea.height());
              MokkiObject.previewArea.hide();
          break;

          case 'hidesource':
              $(this).attr('data-command', 'viewsource');
              $(this).removeClass('mokki-btn-active');
              MokkiObject.previewArea.html(MokkiObject.embedArea.val())
              MokkiObject.embedArea.hide();
              if (MokkiObject.embedArea.val() == '') {
                  MokkiObject.previewArea.html(MokkiObject.placeholder);
              }
              MokkiObject.previewArea.show();
          break;

          default:
            Mokki.events.createStyle(command, value);
          break;
        }
      }
    });
    if (mokkiAdditional) {
      MokkiObject.config = mokkiAdditional;
      if (MokkiObject.config['colorGlobal']) {
        MokkiObject.buttonBar.find('.mokki-btn').css({'color' : MokkiObject.config['colorGlobal'], });
      }
    }
  }
}

Mokki.events = {
  focused: function () {
    MokkiObject.previewArea.on('focus', function() {
      if ($(this).html() == MokkiObject.placeholder) $(this).html('');
    }).focusout(function() {
      if (!$(this).html().length) $(this).html(MokkiObject.placeholder);
    });
  },
  createStyle: function(command, commandValue) {
    if (MokkiSavedSelection) {
      MokkiRestoreSelection(document.getElementById("mokkiTextPreview"), MokkiSavedSelection);
    }
    Mokki.events.cleanPlaceholder();
    MokkiObject.previewArea.focus();
    // if ('InsertImage' == command) {
    //   document.execCommand(enableObjectResizing, false, commandValue);
    // };
    document.execCommand(command, false, commandValue);
  },
  cleanPlaceholder : function () {
    if ( MokkiObject.previewArea.html() == MokkiObject.placeholder)  return MokkiObject.previewArea.html('');
  },
  insertImageToEditor : function () {
    if (MokkiImageList.length > 0 ) {
      for (var i = 0; i < MokkiImageList.length; i++) {
        console.log('ke : '+i);
        Mokki.events.createStyle('InsertImage', MokkiImageList[i]);
      }
    } else{
      alert('Please select an image');
    }
  }
}

if (window.getSelection && document.createRange) {
  MokkiSaveSelection = function(containerEl) {
    var range = window.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length
    }
  };

  MokkiRestoreSelection = function(containerEl, savedSel) {
    var charIndex = 0, range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl], node, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
        var nextCharIndex = charIndex + node.length;
        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
} else if (document.selection && document.body.createTextRange) {
  MokkiSaveSelection = function(containerEl) {
    var selectedTextRange = document.selection.createRange();
    var preSelectionTextRange = document.body.createTextRange();
    preSelectionTextRange.moveToElementText(containerEl);
    preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
    var start = preSelectionTextRange.text.length;

    return {
      start: start,
      end: start + selectedTextRange.text.length
    }
  };

  MokkiRestoreSelection = function(containerEl, savedSel) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(containerEl);
    textRange.collapse(true);
    textRange.moveEnd("character", savedSel.end);
    textRange.moveStart("character", savedSel.start);
    textRange.select();
  };
}
