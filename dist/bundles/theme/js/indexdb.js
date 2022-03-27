(function (window) {
    'use strict'
    if (!window.Utils) {
        window.Utils = {};
    }
    if (!window.Utils.IndexedDB) {
        window.Utils.IndexedDB = {};
    }

    Utils.IndexedDB.dbname = 'XeNgayTrungLienDB';
    Utils.IndexedDB.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    Utils.IndexedDB.request = Utils.IndexedDB.indexedDB.open(Utils.IndexedDB.dbname, 1);

    Utils.IndexedDB.request.onsuccess = function (event) {
    };

    Utils.IndexedDB.request.onerror = function (event) {
        console.log("Lỗi IndexedDB: " + event.target.errorCode);
    };
})(window);