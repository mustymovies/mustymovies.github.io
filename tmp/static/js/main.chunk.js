(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _elastic_search_ui_app_search_connector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @elastic/search-ui-app-search-connector */ "./node_modules/@elastic/search-ui-app-search-connector/es/index.js");
/* harmony import */ var _elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/react-search-ui */ "./node_modules/@elastic/react-search-ui/es/index.js");
/* harmony import */ var _elastic_react_search_ui_views__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elastic/react-search-ui-views */ "./node_modules/@elastic/react-search-ui-views/es/index.js");
/* harmony import */ var _elastic_react_search_ui_views_lib_styles_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @elastic/react-search-ui-views/lib/styles/styles.css */ "./node_modules/@elastic/react-search-ui-views/lib/styles/styles.css");
/* harmony import */ var _elastic_react_search_ui_views_lib_styles_styles_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_elastic_react_search_ui_views_lib_styles_styles_css__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/mnt/sda3/root/Im\xE1genes/folder/src/App.js";






const SORT_OPTIONS = [{
  name: "Relevance",
  value: "",
  direction: ""
}, {
  name: "Title",
  value: "title",
  direction: "asc"
}];
const connector = new _elastic_search_ui_app_search_connector__WEBPACK_IMPORTED_MODULE_2__["default"]({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  hostIdentifier: "host-2376rb",
  endpointBase: ""
});
const config = {
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      nps_link: {
        raw: {}
      },
      description: {
        snippet: {
          size: 100,
          fallback: true
        }
      }
    },
    disjunctiveFacets: ["acres", "states", "date_established", "location"],
    facets: {
      world_heritage_site: {
        type: "value"
      },
      states: {
        type: "value",
        size: 30
      },
      acres: {
        type: "range",
        ranges: [{
          from: -1,
          name: "Any"
        }, {
          from: 0,
          to: 1000,
          name: "Small"
        }, {
          from: 1001,
          to: 100000,
          name: "Medium"
        }, {
          from: 100001,
          name: "Large"
        }]
      },
      location: {
        // San Francisco. In the future, make this the user's current position
        center: "37.7749, -122.4194",
        type: "range",
        unit: "mi",
        ranges: [{
          from: 0,
          to: 100,
          name: "Nearby"
        }, {
          from: 100,
          to: 500,
          name: "A longer drive"
        }, {
          from: 500,
          name: "Perhaps fly?"
        }]
      },
      date_established: {
        type: "range",
        ranges: [{
          from: moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(50, "years").toISOString(),
          name: "Within the last 50 years"
        }, {
          from: moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(100, "years").toISOString(),
          to: moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(50, "years").toISOString(),
          name: "50 - 100 years ago"
        }, {
          to: moment__WEBPACK_IMPORTED_MODULE_1___default()().subtract(100, "years").toISOString(),
          name: "More than 100 years ago"
        }]
      },
      visitors: {
        type: "range",
        ranges: [{
          from: 0,
          to: 10000,
          name: "0 - 10000"
        }, {
          from: 10001,
          to: 100000,
          name: "10001 - 100000"
        }, {
          from: 100001,
          to: 500000,
          name: "100001 - 500000"
        }, {
          from: 500001,
          to: 1000000,
          name: "500001 - 1000000"
        }, {
          from: 1000001,
          to: 5000000,
          name: "1000001 - 5000000"
        }, {
          from: 5000001,
          to: 10000000,
          name: "5000001 - 10000000"
        }, {
          from: 10000001,
          name: "10000001+"
        }]
      }
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        title: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        nps_link: {
          raw: {}
        }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["title", "description"]
        }
      },
      size: 4
    }
  },
  apiConnector: connector
};
function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["SearchProvider"], {
    config: config,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["WithSearch"], {
    mapContextToProps: ({
      wasSearched
    }) => ({
      wasSearched
    }),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 7
    }
  }, ({
    wasSearched
  }) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "App",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 164,
        columnNumber: 13
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["ErrorBoundary"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 165,
        columnNumber: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui_views__WEBPACK_IMPORTED_MODULE_4__["Layout"], {
      header: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["SearchBox"], {
        autocompleteMinimumCharacters: 3 //searchAsYouType={true}
        ,
        autocompleteResults: {
          linkTarget: "_blank",
          sectionTitle: "Results",
          titleField: "title",
          urlField: "nps_link",
          shouldTrackClickThrough: true,
          clickThroughTags: ["test"]
        },
        autocompleteSuggestions: true,
        debounceLength: 0,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168,
          columnNumber: 21
        }
      }),
      sideContent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184,
          columnNumber: 21
        }
      }, wasSearched && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Sorting"], {
        label: "Sort by",
        sortOptions: SORT_OPTIONS,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186,
          columnNumber: 25
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "states",
        label: "States",
        filterType: "any",
        isFilterable: true,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188,
          columnNumber: 23
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "world_heritage_site",
        label: "World Heritage Site?",
        view: _elastic_react_search_ui_views__WEBPACK_IMPORTED_MODULE_4__["BooleanFacet"],
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 23
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "visitors",
        label: "Visitors",
        view: _elastic_react_search_ui_views__WEBPACK_IMPORTED_MODULE_4__["SingleLinksFacet"],
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199,
          columnNumber: 23
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "date_established",
        label: "Date Established",
        filterType: "any",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204,
          columnNumber: 23
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "location",
        label: "Distance",
        filterType: "any",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209,
          columnNumber: 23
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Facet"], {
        field: "acres",
        label: "Acres",
        view: _elastic_react_search_ui_views__WEBPACK_IMPORTED_MODULE_4__["SingleSelectFacet"],
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 214,
          columnNumber: 23
        }
      })),
      bodyContent: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Results"], {
        titleField: "title",
        urlField: "nps_link",
        shouldTrackClickThrough: true,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 21
        }
      }),
      bodyHeader: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 229,
          columnNumber: 21
        }
      }, wasSearched && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["PagingInfo"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230,
          columnNumber: 39
        }
      }), wasSearched && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["ResultsPerPage"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231,
          columnNumber: 39
        }
      })),
      bodyFooter: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_react_search_ui__WEBPACK_IMPORTED_MODULE_3__["Paging"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234,
          columnNumber: 31
        }
      }),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 166,
        columnNumber: 17
      }
    })));
  }));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
var _jsxFileName = "/mnt/sda3/root/Im\xE1genes/folder/src/index.js";



const rootElement = document.getElementById("root");
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 17
  }
}), rootElement);

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /mnt/sda3/root/Imágenes/folder/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /mnt/sda3/root/Imágenes/folder/src/index.js */"./src/index.js");


/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.chunk.js.map