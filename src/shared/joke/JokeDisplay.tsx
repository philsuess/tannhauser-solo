import * as React from "react";
import { Tooltip, Spin } from "antd";
import chuck from "./chuck-norris.jpg";
import styles from "./styles.css";

interface Props {
  joke: string;
  loadingJoke: boolean;
}

export default ({ joke, loadingJoke }: Props) => (
  <React.Fragment>
    <Tooltip title="the real chuck norris">
      <img src={chuck} width="150px" />
    </Tooltip>
    <div className={styles.joke}>
      {loadingJoke ? <Spin /> : <span>{joke}</span>}
    </div>
  </React.Fragment>
);
