import React from 'react';

// This will be replaced with React.ForwardedRef when react-output-target is upgraded to React v17
export type StencilReactForwardedRef<T> = ((instance: T | null) => void) | React.MutableRefObject<T | null> | null;

export const setRef = (ref: StencilReactForwardedRef<any> | React.Ref<any> | undefined, value: any) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    // Cast as a MutableRef so we can assign current
    (ref as React.MutableRefObject<any>).current = value;
  }
};

export * from './attachProps';
export * from './case';
