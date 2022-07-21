import { useInDesignMode } from './useInDesignMode';

export const useHasPlaceholder = (props) => {
  const inDesignMode = useInDesignMode(props);

  // 是否存在占位元素
  const hasPlaceholder =
    inDesignMode && props.children?.[0]?.props?.className === 'lc-container-placeholder';

  return hasPlaceholder;
};
