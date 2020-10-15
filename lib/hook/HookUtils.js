import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * @File: HookUtils
 * @Author: Ux
 * @Date: 2020/8/5
 * @Description: hook工具事件提供
 *
 * 注意：
 * 保证只在组件最顶层中使用hook，不要再循环，条件，嵌套函数中调用hook。
 * 你需要：
 *  在react函数组件中使用。
 */
import { useEffect, useState } from 'react';
export function useMousePosition() {
  var listen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };

  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      pos = _useState2[0],
      setPos = _useState2[1];

  useEffect(function () {
    if (listen) {
      var handle = function handle(ev) {
        setPos({
          x: ev.clientX - offset.x,
          y: ev.clientY - offset.y
        });
      };

      window.addEventListener('mousemove', handle);
      return function () {
        window.removeEventListener('mousemove', handle);
      };
    }
  }, [listen, offset]);
  return pos;
}
export function useDocumentEvent(eventName, handler) {
  useEffect(function () {
    var listener = function listener(event) {
      handler(event);
    };

    document.addEventListener(eventName, listener);
    return function () {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName, handler]);
}
