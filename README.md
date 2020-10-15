# ux-selection

选框工具

React, hook, 函数组件

```typescript
<Selection>
    <SelectItem
        selected={() => {
            console.log("被选中了");
        }}
        unSelected={() => {
            console.log("从选框中被移出了");
        }}
    >
        <div>选项1</div>
    </SelectItem>

    <div>
        <SelectItem
            selected={() => {
                console.log("被选中了");
            }}
            unSelected={() => {
                console.log("从选框中被移出了");
            }}
        >
            <div>选项2</div>
        </SelectItem>
    </div>
</Selection>
```

```
    /**
    * Selection 参数
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
    * SelectItem 参数
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

```

> 更多用法： https://github.com/Hahahahx/ux-selection/blob/master/example/app.tsx

> 使用效果：https://hahahahx.github.io/ux-selection/
