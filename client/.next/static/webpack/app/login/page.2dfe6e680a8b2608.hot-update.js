"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./src/app/context/AuthContext.js":
/*!****************************************!*\
  !*** ./src/app/context/AuthContext.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// app/context/AuthContext.js\n/* __next_internal_client_entry_do_not_use__ useAuth,AuthProvider auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useAuth = ()=>{\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s1();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const token = Cookies.get(\"access_token\");\n        if (token) {\n            // Fetch user data using the token\n            fetchUserData(token);\n        }\n    }, []);\n    const fetchUserData = async (token)=>{\n        try {\n            const response = await fetch(\"/api/v1/me\", {\n                headers: {\n                    Authorization: \"Bearer \".concat(token)\n                }\n            });\n            if (response.ok) {\n                const userData = await response.json();\n                setUser(userData);\n            } else {\n                // Handle error case\n                console.error(\"Failed to fetch user data\");\n                setUser(null);\n            }\n        } catch (error) {\n            console.error(\"Error fetching user data:\", error);\n            setUser(null);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            login,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/sungjin/Development/code/phase-5/capstone/client/src/app/context/AuthContext.js\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, undefined);\n};\n_s1(AuthProvider, \"5s2qRsV95gTJBmaaTh11GoxYeGE=\");\n_c = AuthProvider;\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29udGV4dC9BdXRoQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDZCQUE2Qjs7O0FBRzBDO0FBRXZFLE1BQU1JLDRCQUFjSixvREFBYUE7QUFFMUIsTUFBTUssVUFBVTs7SUFBTUosT0FBQUEsaURBQVVBLENBQUNHO0FBQVcsRUFBRTtHQUF4Q0M7QUFFTixNQUFNQyxlQUFlO1FBQUMsRUFBRUMsUUFBUSxFQUFFOztJQUN2QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBLENBQUM7SUFFakNDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTU8sUUFBUUMsUUFBUUMsR0FBRyxDQUFDO1FBQzFCLElBQUlGLE9BQU87WUFDVCxrQ0FBa0M7WUFDbENHLGNBQWNIO1FBQ2hCO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTUcsZ0JBQWdCLE9BQU9IO1FBQzNCLElBQUk7WUFDRixNQUFNSSxXQUFXLE1BQU1DLE1BQU0sY0FBYztnQkFDekNDLFNBQVM7b0JBQ1BDLGVBQWUsVUFBZ0IsT0FBTlA7Z0JBQzNCO1lBQ0Y7WUFFQSxJQUFJSSxTQUFTSSxFQUFFLEVBQUU7Z0JBQ2YsTUFBTUMsV0FBVyxNQUFNTCxTQUFTTSxJQUFJO2dCQUNwQ1gsUUFBUVU7WUFDVixPQUFPO2dCQUNMLG9CQUFvQjtnQkFDcEJFLFFBQVFDLEtBQUssQ0FBQztnQkFDZGIsUUFBUTtZQUNWO1FBQ0YsRUFBRSxPQUFPYSxPQUFPO1lBQ2RELFFBQVFDLEtBQUssQ0FBQyw2QkFBNkJBO1lBQzNDYixRQUFRO1FBQ1Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDTCxZQUFZbUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVoQjtZQUFNaUI7WUFBT0M7UUFBTztrQkFDaERuQjs7Ozs7O0FBR1AsRUFBRTtJQXRDV0Q7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb250ZXh0L0F1dGhDb250ZXh0LmpzPzE5NDQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL2NvbnRleHQvQXV0aENvbnRleHQuanNcbid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdG9rZW4gPSBDb29raWVzLmdldCgnYWNjZXNzX3Rva2VuJyk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICAvLyBGZXRjaCB1c2VyIGRhdGEgdXNpbmcgdGhlIHRva2VuXG4gICAgICBmZXRjaFVzZXJEYXRhKHRva2VuKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBmZXRjaFVzZXJEYXRhID0gYXN5bmMgKHRva2VuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvdjEvbWUnLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHNldFVzZXIodXNlckRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGFuZGxlIGVycm9yIGNhc2VcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXIgZGF0YScpO1xuICAgICAgICBzZXRVc2VyKG51bGwpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6JywgZXJyb3IpO1xuICAgICAgc2V0VXNlcihudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgbG9naW4sIGxvZ291dCB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTsiXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkF1dGhDb250ZXh0IiwidXNlQXV0aCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJ0b2tlbiIsIkNvb2tpZXMiLCJnZXQiLCJmZXRjaFVzZXJEYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwib2siLCJ1c2VyRGF0YSIsImpzb24iLCJjb25zb2xlIiwiZXJyb3IiLCJQcm92aWRlciIsInZhbHVlIiwibG9naW4iLCJsb2dvdXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/context/AuthContext.js\n"));

/***/ })

});