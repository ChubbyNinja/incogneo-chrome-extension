// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.extension.isAllowedIncognitoAccess(function(isAllowedAccess) {
    if (isAllowedAccess) return; // Great, we've got access

    // alert for a quick demonstration, please create your own user-friendly UI
    alert('Please allow incognito mode in the following screen.');

    chrome.tabs.create({
      url: 'chrome://extensions/?id=' + chrome.runtime.id
    });
  });
});
chrome.windows.onCreated.addListener( function(window) {
  if( window.incognito ) {
    chrome.tabs.create({url: chrome.extension.getURL("incogneo.html")});
  }
});
chrome.tabs.onCreated.addListener(function(tab){
  if( tab.incognito && tab.url == 'chrome://newtab/' ) {
    chrome.tabs.update({url: chrome.extension.getURL("incogneo.html")});
  }
});
