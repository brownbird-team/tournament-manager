import widgets from '#config/plugins.client.ts';
import type { WidgetRenderSpec } from './types';

type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

type a = Prettify<WidgetRenderSpec<typeof widgets>>;

const b = {} as a;

type z = Prettify<typeof widgets>