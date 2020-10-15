import { FC } from "react";

/**
 * @param disabledSelection 禁用选框工具
 * @param offset 选框的偏移值
 * @param scrollOffset 滚动条的偏移值
 * @param onBegin 选框开始绘制
 * @param onEnd 选框结束绘制
 */
interface SelectionProps {
    disabledSelection?: boolean;
    offset?: { x: number; y: number };
    scrollOffset?: number;
    onBegin?: ({ x, y }: { x: number; y: number }) => any;
    onEnd?: ({ x, y }: { x: number; y: number }) => any;
}
/**
 * @param disabled 禁用选项
 * @param selected 被选中事件
 * @param unSelected 被移除事件
 * @param setChild 设置比较对象
 */
interface SelectItemProps {
    disabled?: boolean;
    selected?: () => void;
    unSelected?: () => void;
    children: any;
    setChild?: (ref: any) => ReturnType<typeof ref>;
}

declare var Selection: FC<SelectionProps>;
declare var SelectItem: FC<SelectItemProps>;

declare module "ux-selection" {
    export { Selection, SelectItem };
}
