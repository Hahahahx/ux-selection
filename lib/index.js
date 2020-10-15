import "core-js/modules/es.array.iterator";
import "core-js/modules/es.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import React from 'react';
/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

/**
 * 所有被页面渲染出的可选对象都会被挂载到该context中。
 */

export var SelectionContext = /*#__PURE__*/React.createContext(new Map());
/**
 * 数据结构为map，symbol指向每个可选对象。
 */

export var store = new Map();
