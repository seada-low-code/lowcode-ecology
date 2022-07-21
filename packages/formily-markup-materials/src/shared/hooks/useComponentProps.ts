export const useComponentProps = (props) => {
  let componentProps: any = {};

  if (props.componentProps) {
    componentProps = props.componentProps['x-component-props'];
  }

  if (props.style) {
    componentProps.style = props.style;
  }
  return componentProps;
};
