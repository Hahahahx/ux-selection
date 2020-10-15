import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Selection from "../src/Selection";
import SelectItem from "../src/SelectItem";
import styles from "./index.module.css";

const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.onresize = () => {
            setOffset({
                // @ts-ignore
                x: ref.current.offsetLeft,
                // @ts-ignore
                y: ref.current.offsetTop,
            });
        };

        setOffset({
            // @ts-ignore
            x: ref.current.offsetLeft,
            // @ts-ignore
            y: ref.current.offsetTop,
        });
    }, []);

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.selectionLayout} ref={ref}>
                    <Selection offset={offset}>
                        <Items />
                        <div className={styles.selectionLayoutText}>
                            触发有效区 offset （{offset.x},{offset.y}）
                        </div>
                    </Selection>
                </div>
            </div>
        </>
    );
};

const Items = React.memo(
    () => {
        const [selectSpan, setSelectSpan] = useState(false);
        const [selectDiv, setSelectDiv] = useState(false);
        return (
            <>
                <SelectItem
                    selected={() => {
                        setSelectSpan(true);
                    }}
                    unSelected={() => {
                        setSelectSpan(false);
                    }}
                >
                    <span
                        className={getClass([
                            styles.item,
                            selectSpan ? styles.selected : "",
                        ])}
                    >
                        {selectSpan ? "span(被选中)" : "span(未选中)"}
                    </span>
                </SelectItem>
                <SelectItem
                    selected={() => {
                        setSelectDiv(true);
                    }}
                    unSelected={() => {
                        setSelectDiv(false);
                    }}
                >
                    <div
                        className={getClass([
                            styles.item,
                            selectDiv ? styles.selected : "",
                        ])}
                    >
                        {selectDiv ? "div(被选中)" : "div(未选中)"}
                    </div>
                </SelectItem>
            </>
        );
    },
    () => true
);

const getClass = (params: string[]): string => {
    return params.join(" ");
};

ReactDOM.render(<App />, document.getElementById("root"));
