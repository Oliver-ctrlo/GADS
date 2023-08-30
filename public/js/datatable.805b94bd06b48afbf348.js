"use strict";(self.webpackChunklinkspace=self.webpackChunklinkspace||[]).push([[249],{39992:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});n(66992),n(41539),n(78783),n(33948),n(41637),n(74916),n(64765),n(60285),n(39714),n(15306),n(27852),n(47042),n(69826),n(23157),n(69600),n(91058),n(92222),n(73210),n(54747),n(68309),n(4723),n(30489),n(81299),n(12419),n(96649),n(96078),n(82526),n(41817),n(9653),n(32165);var a=n(53865),r=(n(30991),n(31443),n(783),n(29358),n(29312),n(42438)),o=n(21526),i=(n(28226),n(33099)),c=n(19755),l=n(48764).lW;function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(r=a.key,o=void 0,o=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!==s(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(r,"string"),"symbol"===s(o)?o:String(o)),a)}var r,o}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=h(e);if(t){var r=h(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,n)}}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}const p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(v,e);var t,n,h,p=f(v);function v(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,v),(t=p.call(this,e)).el=c(t.element),t.hasCheckboxes=t.el.hasClass("table-selectable"),t.hasClearState=t.el.hasClass("table-clear-state"),t.searchParams=new URLSearchParams(window.location.search),t.base_url=t.el.data("href")?t.el.data("href"):void 0,t.initTable(),t}return t=v,(n=[{key:"initTable",value:function(){if(this.hasClearState){this.clearTableStateForPage();var e=new URL(window.location.href);e.searchParams.delete("table_clear_state");var t=e.toString();window.location.replace(t.endsWith("?")?t.slice(0,-1):t)}else{var n=this.getConf();this.el.DataTable(n),this.hasCheckboxes&&this.addSelectAllCheckbox(),this.el.hasClass("table-account-requests")&&(this.modal=c.find("#userModal"),this.initClickableTable()),c(this.el).on("childRow.dt",(function(e,t,n){var a=c(n.child()),i=a.find(".record-popup");(0,r.D)(a),i.each((function(e,t){new o.Z(t)}))}))}}},{key:"clearTableStateForPage",value:function(){for(var e=0;e<localStorage.length;e++){var t=localStorage.key(e);if(t.startsWith("DataTables")){var n=t.split("/");!n||n.length<=1||-1!==window.location.href.indexOf("/"+n.slice(1).join("/"))&&localStorage.removeItem(t)}}}},{key:"initClickableTable",value:function(){var e=this,t=this.el.find("tbody td .link");t.on("click",(function(t){e.handleClick(t)})),t.on("focus",(function(t){e.toggleFocus(t,!0)})),t.on("blur",(function(t){e.toggleFocus(t,!1)}))}},{key:"toggleFocus",value:function(e,t){var n=c(e.target).closest("tr");t?n.addClass("tr--focus"):n.removeClass("tr--focus")}},{key:"handleClick",value:function(e){var t=c(e.target).closest("tr");e.preventDefault(),this.fillModalData(t),c(this.modal).modal("show")}},{key:"fillModalData",value:function(e){var t=c(this.modal).find("input"),n=c(this.modal).find(".btn-js-reject-request"),a=parseInt(c(e).find("td[data-id]").data("id"),10);a&&(c(this.modal).data("config").id=a),n&&a&&!isNaN(a)&&n.val(a),t.each((function(t,n){var a=c(n).attr("name"),r=c(e).find("td[data-".concat(a,"]")).data(a);r&&(c(n).val(r),c(n).data("original-value",r),c(n).trigger("change"))}))}},{key:"getCheckboxElement",value:function(e,t){return"<div class='checkbox'>"+"<input id='dt_checkbox_".concat(e,"' type='checkbox' />")+"<label for='dt_checkbox_".concat(e,"'><span>").concat(t,"</span></label>")+"</div>"}},{key:"addSelectAllCheckbox",value:function(){var e=this,t=this.el.find("thead th.check"),n=this.el.find("tbody .check .checkbox input");t.length&&t.html(this.getCheckboxElement("all","Select all")),this.checkSelectAll(n,t.find("input")),n.on("click",(function(a){e.checkSelectAll(n,t.find("input"))})),t.find("input").on("click",(function(t){var a=c(t.target);c(a).is(":checked")?e.checkAllCheckboxes(n,!0):e.checkAllCheckboxes(n,!1)}))}},{key:"checkAllCheckboxes",value:function(e,t){t?e.prop("checked",!0):e.prop("checked",!1)}},{key:"checkSelectAll",value:function(e,t){var n=!0;e.each((function(e,a){if(!a.checked)return t.prop("checked",!1),void(n=!1)})),n&&t.prop("checked",!0)}},{key:"addSortButton",value:function(e,t){var n=c(t.header()),a=c('\n      <button class="data-table__sort" type="button">\n        <span>'.concat(n.html(),'</span>\n        <span class="btn btn-sort">\n          <span>Sort</span>\n        </span>\n      </button>'));n.off().find(".data-table__header-wrapper").html(a),e.order.listener(a,t.index())}},{key:"toggleFilter",value:function(e){var t=c(e.header());""!==e.search()?(t.find(".data-table__header-wrapper").addClass("filter"),t.find(".data-table__clear").show()):(t.find(".data-table__header-wrapper").removeClass("filter"),t.find(".data-table__clear").hide())}},{key:"addSearchDropdown",value:function(e,t,n){var a=c(e.header()),r=a.text().trim(),o=e.search(),i=this,l=c("<div class='data-table__search'>\n        <button\n          class='btn btn-search dropdown-toggle'\n          id='search-toggle-".concat(n,"'\n          type='button'\n          data-toggle='dropdown'\n          aria-expanded='false'\n          data-boundary='viewport'\n          data-reference='parent'\n          data-target=\"[data-ddl='ddl_").concat(n,"']\"\n          data-focus=\"[data-ddl='ddl_").concat(n,"']\"\n        >\n          <span>Search in ").concat(r,"</span>\n        </button>\n        <div class='dropdown-menu p-2' aria-labelledby='search-toggle-").concat(n,"'>\n          <label>\n            <div class='input'>\n              <input class='form-control form-control-sm' type='text' placeholder='Search' value='").concat(o,"'/>\n            </div>\n          </label>\n          <button type='button' class='btn btn-link btn-small data-table__clear hidden'>\n            <span>Clear filter</span>\n          </button>\n        </div>\n      </div>"));a.find(".data-table__header-wrapper").prepend(l),this.toggleFilter(e),c("input",a).on("change",(function(){e.search()!==this.value&&e.search(this.value).draw(),i.toggleFilter(e),i.searchParams.has(t)?i.searchParams.set(t,this.value):i.searchParams.append(t,this.value);var n="".concat(window.location.href.split("?")[0],"?").concat(i.searchParams.toString());window.history.replaceState(null,"",n)})),c(".data-table__clear",a).on("click",(function(){if(c(this).closest(".dropdown-menu").find("input").val(""),e.search("").draw(),i.toggleFilter(e),i.searchParams.has(t)){i.searchParams.delete(t);var n="".concat(window.location.href.split("?")[0]);void 0!==i.searchParams.entries().next().value&&(n+="?".concat(i.searchParams.toString())),window.history.replaceState(null,"",n)}}))}},{key:"encodeHTMLEntities",value:function(e){return c("<textarea/>").text(e).html()}},{key:"decodeHTMLEntities",value:function(e){return c("<textarea/>").html(e).text()}},{key:"renderMoreLess",value:function(e,t){return e.toString().length>50?'<div class="more-less" data-column="'.concat(t,'">\n          ').concat(e,"\n        </div>"):e}},{key:"renderDefault",value:function(e){var t=this,n="";return e.values&&e.values.length?(e.values.forEach((function(a,r){n+=t.encodeHTMLEntities(a),n+=e.values.length>r+1?", ":""})),this.renderMoreLess(n,e.name)):n}},{key:"renderId",value:function(e){var t="";return e.parent_id&&(t='<span title="Child record with parent record '.concat(e.parent_id,'">').concat(e.parent_id," &#8594;</span> ")),t+'<a href="'.concat(this.base_url,"/").concat(e.values[0],'">').concat(e.values[0],"</a>")}},{key:"renderPerson",value:function(e){var t=this,n="";return e.values.length?(e.values[0],e.values.forEach((function(e,a){if(e.details.length){var r="<div>";e.details.forEach((function(e){var n=t.encodeHTMLEntities(e.value);"email"===e.type?r+='<p>E-mail: <a href="mailto:'.concat(n,'">').concat(n,"</a></p>"):r+="<p>".concat(t.encodeHTMLEntities(e.definition),": ").concat(n,"</p>")})),r+="</div>",n+='<button class="btn btn-small btn-inverted btn-info trigger" aria-expanded="false" type="button">\n            '.concat(t.encodeHTMLEntities(e.text),'\n            <span class="invisible">contact details</span>\n          </button>\n          <div class="person contact-details expandable popover card card--secundary">\n            ').concat(r,"\n          </div>")}})),n):n}},{key:"renderFile",value:function(e){var t=this,n="";return e.values.length?(e.values.forEach((function(e){n+='<a href="/file/'.concat(e.id,'">'),e.mimetype.match("^image/")?n+='<img class="autosize" src="/file/'.concat(e.id,'"></img>'):n+="".concat(t.encodeHTMLEntities(e.name),"<br>"),n+="</a>"})),n):n}},{key:"renderRag",value:function(e){var t="";return t=e.values.length&&{a_grey:"undefined",b_red:"danger",b_attention:"attention",c_amber:"warning",c_yellow:"advisory",d_green:"success",d_blue:"complete",e_purple:"unexpected"}[e.values[0]]||"blank",'<span class="rag rag--'.concat(t,'" title="').concat(t,'" aria-labelledby="rag_').concat(t,'_meaning"><span>✗</span></span>')}},{key:"renderCurCommon",value:function(e){var t="";return 0===e.values.length?t:(t=this.renderCurCommonTable(e),this.renderMoreLess(t,e.name))}},{key:"renderCurCommonTable",value:function(e){var t=this,n="";return 0===e.values.length||0===e.values[0].fields.length||(n+='<table class="table-curcommon">',e.values.forEach((function(e){n+='<tr role="button" tabindex="0" class="link record-popup" data-record-id="'.concat(e.record_id,'"'),e.version_id&&(n+='data-version-id="'.concat(e.version_id,'"')),n+=">",e.status&&(n+="<td><em>".concat(e.status,":</em></td>")),e.fields.forEach((function(e){n+='<td class="'.concat(e.type,'">').concat(t.renderDataType(e),"</td>")})),n+="</tr>"})),n+="</table>",e.limit_rows&&e.values.length>=e.limit_rows&&(n+="<p><em>(showing maximum ".concat(e.limit_rows,' rows.\n          <a href="/').concat(e.parent_layout_identifier,"/data?curval_record_id=").concat(e.curval_record_id,"&curval_layout_id=").concat(e.column_id,'">view all</a>)</em>\n        </p>'))),n}},{key:"renderDataType",value:function(e){switch(e.type){case"id":return this.renderId(e);case"person":case"createdby":return this.renderPerson(e);case"curval":case"autocur":case"filval":return this.renderCurCommon(e);case"file":return this.renderFile(e);case"rag":return this.renderRag(e);default:return this.renderDefault(e)}}},{key:"renderData",value:function(e,t,n){var a=t[n?n.settings.oAjaxData.columns[n.col].name:""];return"object"!==s(a)?"":this.renderDataType(a)}},{key:"getConf",value:function(){var e=this,t=this.el.data("config"),n={};return"string"==typeof t?n=JSON.parse(l.from(t,"base64")):"object"===s(t)&&(n=t),n.serverSide&&n.columns.forEach((function(t){t.render=function(t,n,a,r){return e.renderData(n,a,r)}})),n.initComplete=function(t,a){var r=e.el,o=r.DataTable(),i=e;e.json=a||void 0,o.columns().every((function(e){var a=this,l=c(a.header()),s=l.html();if(l.html("<div class='data-table__header-wrapper position-relative ".concat(a.search()?"filter":"","' data-ddl='ddl_").concat(e,"'>").concat(s,"</div>")),l.hasClass("sorting")&&i.addSortButton(o,a,s),n.serverSide&&r.hasClass("table-search")){var u=t.oAjaxData.columns[e].name;i.searchParams.has(u)&&a.search(i.searchParams.get(u)).draw(),i.addSearchDropdown(a,u,e)}}))},n.drawCallback=function(t){i.W.reinitialize(),e.bindClickHandlersAfterDraw(n)},n}},{key:"bindClickHandlersAfterDraw",value:function(e){var t=this,n=this.el,o=n.DataTable().rows({page:"current"}).data();if(o&&this.base_url&&c(n).find("> tbody > tr").each((function(e,n){var a=o[e]?o[e]:void 0;if(a){var r=a._id?"".concat(t.base_url,"/").concat(a._id):"?".concat(a._count.url);c(n).find('td:not(".dtr-control")').on("click",(function(e){e.target.closest(".record-popup")||(window.location=r)}))}})),e.serverSide){var i=c(n).find(":not(.more-less) > .trigger[aria-expanded]");i.off("click",r.T),i.on("click",r.T),(0,a.ez)(this.element)}}}])&&u(t.prototype,n),h&&u(t,h),Object.defineProperty(t,"prototype",{writable:!1}),v}(a.wA)},92677:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});n(69826),n(41539),n(92222),n(30489),n(81299),n(12419),n(96649),n(96078),n(82526),n(41817),n(9653),n(32165),n(66992),n(78783),n(33948);var a=n(53865),r=(n(11370),n(19755));function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(r=a.key,i=void 0,i=function(e,t){if("object"!==o(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!==o(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(r,"string"),"symbol"===o(i)?i:String(i)),a)}var r,i}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=s(e);if(t){var r=s(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return function(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,n)}}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}var u="btn-icon-close",d="btn-icon-close--hidden",f="sortable__handle",h="sortable__handle--hidden",p="sortable__row";const v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}(s,e);var t,n,a,o=l(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=o.call(this,e)).el=r(t.element),t.sortableList=t.el.find(".sortable__list"),t.addBtn=t.el.find(".btn-default"),t.delBtn=t.el.find(".".concat(u)),t.dragHandle=t.el.find(".".concat(f)),t.initSortable(),t}return t=s,(n=[{key:"initSortable",value:function(){var e=this;1===this.el.find(".".concat(p)).length&&this.hideButtons(),this.sortableList.sortable({handle:".".concat(f)}),this.addBtn.on("click",(function(t){e.handleClickAdd(t)})),this.delBtn.on("click",(function(t){e.handleClickDelete(t)}))}},{key:"handleClickAdd",value:function(e){this.el.find(".".concat(u)).removeClass(d),this.el.find(".".concat(f)).removeClass(h);var t=this.el.find(".".concat(p)).last(),n=t.clone(!0),a=n.find(".form-control"),r=n.find('input[name="enumval_id"]'),o=a.attr("name");this.countInputIdentifier=this.uniqueID(),a.attr("name",o),a.attr("id","".concat(o,"_").concat(this.countInputIdentifier)),a.val(""),a.removeAttr("value"),r.val(""),r.removeAttr("value"),t.after(n),this.sortableList.sortable("refresh")}},{key:"handleClickDelete",value:function(e){r(e.currentTarget).parent().remove(),1===this.el.find(".".concat(p)).length&&this.hideButtons()}},{key:"uniqueID",value:function(){return Math.floor(Math.random()*Date.now())}},{key:"hideButtons",value:function(){this.el.find(".".concat(u)).addClass(d),this.el.find(".".concat(f)).addClass(h)}}])&&i(t.prototype,n),a&&i(t,a),Object.defineProperty(t,"prototype",{writable:!1}),s}(a.wA)}}]);