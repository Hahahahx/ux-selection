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


>更多用法： https://github.com/Hahahahx/ux-selection/blob/master/example/app.tsx

>使用效果：https://hahahahx.github.io/ux-selection/
