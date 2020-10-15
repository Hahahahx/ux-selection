import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import styles from './index.module.css';
import { SelectionContext } from "./Selection";
/**
 * @File: SelectItem
 * @Author: Ux
 * @Date: 2020/8/6
 * @Description:
 */

/**
    style?: CSSProperties,
    disabled?: boolean,
    selected?: () => void,
    unSelected?:()=>void,
    children: any,
    setChild?: (ref: any) => ReturnType<typeof ref>
 * 放到再下一级组件（Item）中来处理对象的一些事件。以便于我们能在这里向外暴露一些属性。
 * 更重要的是我们需要他的ref来添加到context中便于选框在发生变换的时候处理这些事件。
 * 可选对象是可以被禁用的，当其被禁用后context中将无法获取该对象，
 * 组件销毁也会导致context中的对象被销毁，这么做是为了避免一旦有大量数据context所占用的内存消耗。
 */

/**
 * 
 * @param style 样式
 * @param disabled 禁用被选中
 * @param selected 被选中时触发的事件
 * @param unSelected 选中的被移出时触发的事件
 * @param setChild (ref:any)=>  ReturnType<typeof ref> 与选框进行比较的对象
 */
var SelectItem = function SelectItem(_ref) {
  var children = _ref.children,
      unSelected = _ref.unSelected,
      setChild = _ref.setChild,
      selected = _ref.selected,
      disabled = _ref.disabled;
  var context = useContext(SelectionContext);

  var _this = Symbol("SelectItem");

  var ref = useRef();
  useEffect(function () {
    if (disabled) {
      context.delete(_this);
    } else {
      context.set(_this, ref.current);
    }

    return function () {
      context.delete(_this);
    };
  }, [disabled, _this, context]);
  return /*#__PURE__*/React.createElement(Item, {
    ref: ref,
    setChild: setChild,
    selected: selected,
    unSelected: unSelected
  }, children);
};

export default SelectItem;
var Item = /*#__PURE__*/forwardRef(function (props, ref) {
  var _this;

  useImperativeHandle(ref, function () {
    return {
      // 优化加载（基于antd中，被选中的对象会添加该class，所以我们会过滤掉那些已经被选中的对象）
      // 也用于帮助我们来判断哪些可选对象从选框中被移出了，从而触发脱离事件。
      select: false,
      // 被渲染出的对象
      element: {
        offsetWidth: _this.offsetWidth,
        offsetHeight: _this.offsetHeight,
        offsetTop: _this.offsetTop,
        offsetLeft: _this.offsetLeft
      },
      // 进入选框中，触发事件
      beSelected: function beSelected() {
        props.selected && props.selected(); // console.log('被选中了');
      },
      // 从选框中脱离，触发事件
      beUnSelected: function beUnSelected() {
        props.unSelected && props.unSelected(); // console.log('落选了');
      }
    };
  }); // 默认取被SelectItem的第一级子元素作为可选对象，即判断该对象的offset与选框的碰撞，
  // 由于在react-window里的每个元素是相对于react-window组件List或Grid的，这就导致了有时候我们不能正确的取到我们所需要的
  // 可选对象，所以向外暴露了该值，以便于更灵活的应对一些场景，取该方法的返回值为可选对象。

  var setRef = function setRef(ref) {
    return props.setChild ? props.setChild(ref) : ref;
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: function (_ref2) {
      function ref(_x) {
        return _ref2.apply(this, arguments);
      }

      ref.toString = function () {
        return _ref2.toString();
      };

      return ref;
    }(function (ref) {
      return _this = setRef(ref);
    }),
    className: styles.selectionItem
  }, React.Children.only(props.children));
});