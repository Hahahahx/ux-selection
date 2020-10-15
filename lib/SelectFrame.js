import "core-js/modules/es.array.for-each";
import "core-js/modules/web.dom-collections.for-each";
import React, { useContext, useEffect } from "react";
import styles from "./index.module.css";
import { SelectionContext } from "./Selection";
/**
 * @File: SelectFrame
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

var SelectFrame = function SelectFrame(_ref) {
  var positionLT = _ref.positionLT,
      size = _ref.size,
      style = _ref.style,
      show = _ref.show,
      scrollOffset = _ref.scrollOffset;
  // 获取所有被挂载到context中的可选对象。
  var items = useContext(SelectionContext);
  var Istyle = {
    left: positionLT.left + "px",
    top: positionLT.top + "px",
    width: size.width + "px",
    height: size.height + "px"
  };
  /**
   * 遍历全部可选对象，当可选对象与选框发生碰撞时，触发可选对象的事件，如beSelected()，即该对象被选中了
   * 同样unselected则是从选框中被排除了
   * 此处仍然有一些问题
   */
  //*****//Issue 当选框组件配合到react-window，虚拟滚动组件中时，我们根据渲染仍然能够得到部分可选对象，
  // 但它不是完整的（详细了解react-window渲染机制），且由于其滚动条的存在我们需要在此中再加入一个偏移值参与计算，
  // 即滚动条的滚动距离，我们可以直接在react-window的组件中取到该值，还是由于react-window的渲染机制，
  // 由于我们的选框是相对于可选区的，一旦加入了滚动条的设定后，一旦滚动条发生改变，一些我们期望被选中的可选对象
  // 就会被移出选框，且当视区向下滚动，视区上方的可选对象会被销毁，从而触发本不该被触发的unselected事件。

  var getSelectedItem = function getSelectedItem() {
    items.forEach(function (v) {
      var _v$element = v.element,
          offsetWidth = _v$element.offsetWidth,
          offsetHeight = _v$element.offsetHeight,
          offsetTop = _v$element.offsetTop,
          offsetLeft = _v$element.offsetLeft; // 每个可选对象的存在区

      scrollOffset = scrollOffset || 0;
      var l = offsetWidth + offsetLeft;
      var t = offsetHeight + offsetTop;

      if (l > positionLT.left && t > positionLT.top + scrollOffset && // 此处加入滚动条的偏移值
      offsetLeft < positionLT.left + size.width && offsetTop < positionLT.top + size.height + scrollOffset // 此处加入滚动条的偏移值
      ) {
          if (!v.select) {
            v.beSelected();
          }

          v.select = true;
        } else {
        if (v.select) {
          v.beUnSelected();
        }

        v.select = false;
      }
    });
  }; // 选框的大小发生改变时，进行判断哪些对象是和选框发生碰撞的


  useEffect(function () {
    if (size && size.width && size.height) getSelectedItem();
  }, [size]);
  return show ? /*#__PURE__*/React.createElement("div", {
    style: Istyle,
    className: styles.frame
  }) : /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/React.memo(SelectFrame, function (pre, next) {
  if (pre.size.height === next.size.height && pre.size.width === next.size.width) {
    return true;
  }

  return false;
});