import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useMemo } from "react";
import { SelectionContext, store } from ".";
import { useDocumentEvent, useMousePosition } from "./hook/HookUtils";
import SelectFrame from "./SelectFrame";
import styles from "./index.module.css";
/**
 * @File: Selection
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

/**
 * @param disabledSelection 禁用选框工具
 * @param offset 选框的偏移值
 * @param scrollOffset 滚动条的偏移值
 * @param onBegin 选框开始绘制
 * @param onEnd 选框结束绘制
 */

/**
 * 可选区
 * @param disable 禁用
 * @param offset
 * 因为选框是相对于可选区的，而坐标位置却是相对于浏览器页面的，
 * 当可选区与浏览器坐标存在误差时需要一定的偏移值来确保选框的正确的绘制
 * @param scrollOffset 计算滚动条的偏移值
 */
var Selection = function Selection(_ref) {
  var children = _ref.children,
      disabledSelection = _ref.disabledSelection,
      offset = _ref.offset,
      scrollOffset = _ref.scrollOffset,
      onBegin = _ref.onBegin,
      onEnd = _ref.onEnd;

  // 获取鼠标位置（相对于浏览器页面）
  var _useMousePosition = useMousePosition(true, offset),
      x = _useMousePosition.x,
      y = _useMousePosition.y; // 起始坐标


  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      start = _useState2[0],
      setStart = _useState2[1]; // 选框的大小


  var _useState3 = useState({
    width: 0,
    height: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1]; // 选框的偏移值


  var _useState5 = useState({
    left: 0,
    top: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      positionLT = _useState6[0],
      setPositionLT = _useState6[1]; // 显示选框


  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      show = _useState8[0],
      setShow = _useState8[1]; // 确保选框正确的在可选区中被绘制


  var _useState9 = useState(true),
      _useState10 = _slicedToArray(_useState9, 2),
      lock = _useState10[0],
      setLock = _useState10[1]; // 渲染优化，但是没有什么用...


  var disabled = useMemo(function () {
    return disabledSelection;
  }, [disabledSelection]); // 可选区对象

  var Dref = useRef();

  var onMouseDown = function onMouseDown() {
    if (!disabled) {
      offset = offset || {
        x: 0,
        y: 0
      };
      /**
       * 限制SelectFrame（选框）只能局限在可选区内生成。
       * 为了正确的绘制选框区域我们加入了偏移值，所以，x与y的坐标也发生了改变
       * 可选区对象是相对于浏览器的 所以我们需要从新加入偏移值计算 来保持他们的平衡便于比较
       */

      if (x > Dref.current.offsetLeft - offset.x && y > Dref.current.offsetTop - offset.y && x < Dref.current.offsetLeft + Dref.current.offsetWidth - offset.x && y < Dref.current.offsetTop + Dref.current.offsetHeight - offset.y) {
        // 设置起始点
        setStart({
          x: x,
          y: y
        });
        setLock(false);
        onBegin && onBegin({
          x: x,
          y: y
        });
      }
    }
  };

  var onMouseMove = function onMouseMove() {
    if (!lock) {
      // 展示选框
      !show && setShow(true); // 选框的偏移值是取决于左上角的点，所以只有更小（更接近0，0）的坐标能取决其偏移值

      var left = Math.min(x, start.x);
      var top = Math.min(y, start.y);
      setPositionLT({
        left: left,
        top: top
      }); // 选框大小不管往哪个方向绘制选框，都能保证选框的正确绘制，
      // 由于长宽是相对于坐标的，一个四边形不被允许出现负值，所以对其取绝对值

      var width = Math.abs(start.x - x);
      var height = Math.abs(start.y - y);
      setSize({
        width: width,
        height: height
      });
    }
  };

  var onMouseUp = function onMouseUp() {
    // 结束选框的绘制
    setLock(true); // 隐藏选框

    setShow(false);
    setPositionLT({
      left: 0,
      top: 0
    });
    setSize({
      width: 0,
      height: 0
    });
    onEnd && onEnd({
      x: x,
      y: y
    });
  }; // 将事件绑定到Dom对象中


  useDocumentEvent("mousedown", onMouseDown);
  useDocumentEvent("mousemove", onMouseMove);
  useDocumentEvent("mouseup", onMouseUp); // 为了避免高频渲染，你应该在children组件中加入memo

  return dom("div", {
    ref: Dref,
    className: styles.selection
  }, dom(SelectionContext.Provider, {
    value: store
  }, children, dom(SelectFrame, {
    scrollOffset: scrollOffset,
    show: show,
    positionLT: positionLT,
    size: size
  })));
};

export default Selection;
