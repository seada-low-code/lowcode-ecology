export const useDecoratorProps = (props) => {
  let decoratorProps: any = {};

  if (props.decoratorProps) {
    decoratorProps = props.decoratorProps['x-decorator-props'];
  }

  return decoratorProps;
};
