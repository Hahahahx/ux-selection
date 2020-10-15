import { CSSProperties, FC } from "react";

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
interface SelectionProps {
    disabledSelection?: boolean;
    offset?: { x: number; y: number };
    scrollOffset?: number;
    onBegin?: ({ x, y }: { x: number; y: number }) => any;
    onEnd?: ({ x, y }: { x: number; y: number }) => any;
}

declare var Selection: FC<SelectionProps>


interface SelectFrameProps {
    positionLT: { left: number; top: number };
    size: { width: number; height: number };
    show: boolean;
    style?: CSSProperties;
    scrollOffset?: number;
}
declare var SelectFrame: FC<SelectFrameProps>



interface SelectItemProps {
    disabled?: boolean;
    selected?: () => void;
    unSelected?: () => void;
    children: any;
    setChild?: (ref: any) => ReturnType<typeof ref>;
}

declare var SelectItem: FC<SelectItemProps>


declare module "ux-selection" {
    export { Selection, SelectFrame, SelectItem };
}
