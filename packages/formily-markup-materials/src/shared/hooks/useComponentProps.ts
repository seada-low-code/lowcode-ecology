export const useComponentProps = (props) => {
  let componentProps: any = {};

  if (props['x-component-props']) {
    componentProps = props['x-component-props'];
  }

  if (props.style) {
    componentProps.style = props.style;
  }
  return componentProps;
};
