import type { Lifecycle, ReqRefDefaults } from "@hapi/hapi";

export type ReqHandler = Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>;

export type Payload = {
  title: string;
  tags: string[];
  body: string;
};

export type Note = Payload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
