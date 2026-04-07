import type { JSX } from "react";

const Switch = (props: any) => {
  const { test, children } = props;

  return children.find((item: JSX.Element) => {
    return item.props.value === test;
  });
};

export default Switch;
