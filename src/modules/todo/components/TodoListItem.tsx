import * as React from "react";
import { Button, List, Tooltip } from "antd";
import { TodoItem } from "../model";
import styles from "./styles.css";
import { ButtonProps } from "antd/lib/button";

interface Props {
  item: TodoItem;
  toggle: () => void;
  remove: () => void;
}

export default ({ item, toggle, remove }: Props) => (
  <List.Item>
    <span
      className={`${styles.todoListText} ${item.done ? styles.toggled : ""}`}
    >
      {item.text}
    </span>
    <TippedButton
      icon={item.done ? "close" : "check"}
      tip={item.done ? "mark undone" : "mark done"}
      onClick={toggle}
    />
    <TippedButton
      tip="remove item"
      icon="delete"
      onClick={remove}
      type="danger"
    />
  </List.Item>
);

type TippedButtonProps = ButtonProps & {
  icon: string;
  tip: string;
  onClick: () => void;
};

// tslint:disable-next-line:function-name
function TippedButton({ tip, ...other }: TippedButtonProps) {
  return (
    <Tooltip title={tip}>
      <Button shape="circle" size="small" {...other} />
    </Tooltip>
  );
}
