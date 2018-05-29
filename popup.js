var STORE_KEY = 'jsoneditor-text';
var editor = null;

function loadEditor() {
  var container = document.getElementById('jsoneditor');
  var options = { mode: 'code', onChange: onChange };
  editor = new JSONEditor(container, options);
  editor.setText(localStorage.getItem(STORE_KEY) || JSON.stringify({}));

  setExternalLink(container);
  setEditorSize(container);
}

function onChange() {
  localStorage.setItem(STORE_KEY, editor.getText());
}

function openWindow() {
  chrome.tabs.create({
    url: chrome.extension.getURL('editor.html'),
  });
}

function setExternalLink(editor) {
  if (editor.classList.contains('open-external')) {
    var menu = document.getElementsByClassName('jsoneditor-menu')[0];
    var openBtn = document.createElement('div');

    openBtn.className = 'open-external-btn';
    openBtn.addEventListener('click', openWindow);

    menu.appendChild(openBtn);
  }
}

function setEditorSize(editor) {
  if (editor.classList.contains('fulleditor')) {
    editor.style = 'height: ' + window.innerHeight + 'px';
  }
}

document.addEventListener('DOMContentLoaded', loadEditor, false);
