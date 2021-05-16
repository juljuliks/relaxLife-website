"use strict";

var admin = function admin() {
  var allData = [];
  var selectList = document.querySelector('#typeItem');
  fetch('../../crm-backend/db.json', {
    method: 'GET'
  }).then(function (response) {
    if (response.status !== 200) {
      throw new Error('status network not 200');
    }

    return response.json();
  }).then(function (data) {
    start(data);
  })["catch"](function (error) {
    console.error(error);
  });

  var start = function start(arr) {
    document.querySelectorAll('.table__row').forEach(function (el) {
      return el.remove();
    });
    arr.forEach(function (el) {
      return allData.push(el);
    });
    renderAll();
    createList();
    renderList();
    selectList.addEventListener('change', renderData);
  };

  var renderAll = function renderAll() {
    document.querySelectorAll('.table__row').forEach(function (el) {
      return el.remove();
    });
    var currentSelector = document.querySelector('#tbody');

    for (var key in allData) {
      createTable(allData[key]['id'], allData[key]['name'], allData[key]['cost'], allData[key]['type'], currentSelector);
    }
  };

  var createList = function createList() {
    var result = [];
    allData.forEach(function (el) {
      result.push(el['type']);
    });
    var filteredArr = new Set(result);
    return filteredArr;
  };

  var renderList = function renderList() {
    selectList.innerHTML = '';
    var emptyOption = document.createElement('option');
    selectList.appendChild(emptyOption);
    emptyOption.text = "\u0412\u0441\u0435";
    var arr = createList();
    arr.forEach(function (item) {
      var listItem = document.createElement('option');
      listItem.text = item;
      selectList.appendChild(listItem);
    });
  };

  var renderData = function renderData(e) {
    var currentSelector = document.querySelector('#tbody');
    currentSelector.innerHTML = '';

    for (var key in allData) {
      if (allData[key]['type'] === e.target.value) {
        createTable(allData[key]['id'], allData[key]['name'], allData[key]['cost'], allData[key]['type'], currentSelector);
      }
    }

    if (e.target.value === 'Все') {
      renderAll();
    } // console.log(allData);
    // console.log(e.target.value);
    // console.log('efweqg');

  };

  var createTable = function createTable(id, name, price, type, selector) {
    var unitsM = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'm';
    var unitsPow = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '2';
    var block = document.createElement('tr');
    block.innerHTML = "<tr class=\"table__row\">\n                        <td class=\"table__id table__cell\">".concat(id, "</td>\n                      <td class=\"table-type table__cell\">").concat(name, "</td>\n                      <td class=\"table-name table__cell\">").concat(type, "</td>\n                      <td class=\"table-units table__cell\">").concat(unitsM).concat(unitsPow, "</td>\n                      <td class=\"table-cost table__cell\">").concat(price, "</td>\n                      <td>\n                        <div class=\"table__actions table__cell\">\n                          <button class=\"button action-change\"><span class=\"svg_ui\"><svg class=\"action-icon_change\"><use xlink:href=\"./img/sprite.svg#change\"></use></svg></span><span>\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</span>\n                          </button>\n                          <button class=\"button action-remove\"><span class=\"svg_ui\"><svg class=\"action-icon_remove\"><use xlink:href=\"./img/sprite.svg#remove\"></use></svg></span><span>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span>\n                          </button>\n                        </div>\n                      </td>\n                    </tr>\n                    ");
    selector.appendChild(block);
  };
};

admin(); // export default admin;