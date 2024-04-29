"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/logout/page",{

/***/ "(app-pages-browser)/./src/app/context/AuthContext.js":
/*!****************************************!*\
  !*** ./src/app/context/AuthContext.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ \"(app-pages-browser)/./node_modules/js-cookie/dist/js.cookie.mjs\");\n// app/context/AuthContext.js\n/* __next_internal_client_entry_do_not_use__ useAuth,AuthProvider auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst useAuth = ()=>{\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s1();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const token = js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"access_token\");\n        if (token) {\n            // Fetch user data using the token\n            fetchUserData(token);\n        }\n    }, []);\n    const fetchUserData = async (token)=>{\n        try {\n            const response = await fetch(\"/api/v1/me\", {\n                headers: {\n                    Authorization: \"Bearer \".concat(token)\n                }\n            });\n            if (response.ok) {\n                const userData = await response.json();\n                setUser(userData);\n            } else {\n                // Handle error case\n                console.error(\"Failed to fetch user data\");\n                setUser(null);\n            }\n        } catch (error) {\n            console.error(\"Error fetching user data:\", error);\n            setUser(null);\n        }\n    };\n    const login = (userData, token)=>{\n        setUser(userData);\n        js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set(\"access_token\", token, {\n            expires: 7\n        }); // Set the token cookie with a 7-day expiration\n    };\n    const logout = async ()=>{\n        try {\n            await fetch(\"api/v1/logout\", {\n                method: \"DELETE\",\n                credentials: \"include\"\n            });\n            js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"default\"].remove(\"access_token\");\n            setUser(null);\n        } catch (error) {\n            console.error(\"Logout error:\", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            login,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/sungjin/Development/code/phase-5/capstone/client/src/app/context/AuthContext.js\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s1(AuthProvider, \"5s2qRsV95gTJBmaaTh11GoxYeGE=\");\n_c = AuthProvider;\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29udGV4dC9BdXRoQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2QkFBNkI7OztBQUcwQztBQUN2QztBQUVoQyxNQUFNSyw0QkFBY0wsb0RBQWFBO0FBRTFCLE1BQU1NLFVBQVU7O0lBQU1MLE9BQUFBLGlEQUFVQSxDQUFDSTtBQUFXLEVBQUU7R0FBeENDO0FBRU4sTUFBTUMsZUFBZTtRQUFDLEVBQUVDLFFBQVEsRUFBRTs7SUFDdkMsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdSLCtDQUFRQSxDQUFDO0lBRWpDQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1RLFFBQVFQLGlEQUFPQSxDQUFDUSxHQUFHLENBQUM7UUFDMUIsSUFBSUQsT0FBTztZQUNULGtDQUFrQztZQUNsQ0UsY0FBY0Y7UUFDaEI7SUFDRixHQUFHLEVBQUU7SUFFTCxNQUFNRSxnQkFBZ0IsT0FBT0Y7UUFDM0IsSUFBSTtZQUNGLE1BQU1HLFdBQVcsTUFBTUMsTUFBTSxjQUFjO2dCQUN6Q0MsU0FBUztvQkFDUEMsZUFBZSxVQUFnQixPQUFOTjtnQkFDM0I7WUFDRjtZQUVBLElBQUlHLFNBQVNJLEVBQUUsRUFBRTtnQkFDZixNQUFNQyxXQUFXLE1BQU1MLFNBQVNNLElBQUk7Z0JBQ3BDVixRQUFRUztZQUNWLE9BQU87Z0JBQ0wsb0JBQW9CO2dCQUNwQkUsUUFBUUMsS0FBSyxDQUFDO2dCQUNkWixRQUFRO1lBQ1Y7UUFDRixFQUFFLE9BQU9ZLE9BQU87WUFDZEQsUUFBUUMsS0FBSyxDQUFDLDZCQUE2QkE7WUFDM0NaLFFBQVE7UUFDVjtJQUNGO0lBRUEsTUFBTWEsUUFBUSxDQUFDSixVQUFVUjtRQUN2QkQsUUFBUVM7UUFDUmYsaURBQU9BLENBQUNvQixHQUFHLENBQUMsZ0JBQWdCYixPQUFPO1lBQUVjLFNBQVM7UUFBRSxJQUFJLCtDQUErQztJQUNyRztJQUVBLE1BQU1DLFNBQVM7UUFDYixJQUFJO1lBQ0YsTUFBTVgsTUFBTSxpQkFBaUI7Z0JBQzNCWSxRQUFRO2dCQUNSQyxhQUFhO1lBQ2Y7WUFDQXhCLGlEQUFPQSxDQUFDeUIsTUFBTSxDQUFDO1lBQ2ZuQixRQUFRO1FBQ1YsRUFBRSxPQUFPWSxPQUFPO1lBQ2RELFFBQVFDLEtBQUssQ0FBQyxpQkFBaUJBO1FBQ2pDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2pCLFlBQVl5QixRQUFRO1FBQUNDLE9BQU87WUFBRXRCO1lBQU1jO1lBQU9HO1FBQU87a0JBQ2hEbEI7Ozs7OztBQUdQLEVBQUU7SUF4RFdEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvY29udGV4dC9BdXRoQ29udGV4dC5qcz8xOTQ0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9jb250ZXh0L0F1dGhDb250ZXh0LmpzXG4ndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IENvb2tpZXMuZ2V0KCdhY2Nlc3NfdG9rZW4nKTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIC8vIEZldGNoIHVzZXIgZGF0YSB1c2luZyB0aGUgdG9rZW5cbiAgICAgIGZldGNoVXNlckRhdGEodG9rZW4pO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGZldGNoVXNlckRhdGEgPSBhc3luYyAodG9rZW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS92MS9tZScsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0VXNlcih1c2VyRGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgZXJyb3IgY2FzZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggdXNlciBkYXRhJyk7XG4gICAgICAgIHNldFVzZXIobnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXIgZGF0YTonLCBlcnJvcik7XG4gICAgICBzZXRVc2VyKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBsb2dpbiA9ICh1c2VyRGF0YSwgdG9rZW4pID0+IHtcbiAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICBDb29raWVzLnNldCgnYWNjZXNzX3Rva2VuJywgdG9rZW4sIHsgZXhwaXJlczogNyB9KTsgLy8gU2V0IHRoZSB0b2tlbiBjb29raWUgd2l0aCBhIDctZGF5IGV4cGlyYXRpb25cbiAgfTtcblxuICBjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoKCdhcGkvdjEvbG9nb3V0Jywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgfSk7XG4gICAgICBDb29raWVzLnJlbW92ZSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgICBzZXRVc2VyKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dvdXQgZXJyb3I6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBsb2dpbiwgbG9nb3V0IH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59OyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQ29va2llcyIsIkF1dGhDb250ZXh0IiwidXNlQXV0aCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJ0b2tlbiIsImdldCIsImZldGNoVXNlckRhdGEiLCJyZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJvayIsInVzZXJEYXRhIiwianNvbiIsImNvbnNvbGUiLCJlcnJvciIsImxvZ2luIiwic2V0IiwiZXhwaXJlcyIsImxvZ291dCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwicmVtb3ZlIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/context/AuthContext.js\n"));

/***/ })

});