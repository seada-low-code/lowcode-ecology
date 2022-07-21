export const useDecoratorProps = (props) => {
  let decoratorProps: any = {};

  if (props['x-decorator-props']) {
    decoratorProps = props['x-decorator-props'];
  }

  return decoratorProps;
};
