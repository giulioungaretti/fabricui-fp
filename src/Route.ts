// routes
interface Home {
  readonly _tag: "Home";
}

interface Counter {
  readonly _tag: "Counter";
}

interface NotFound {
  readonly _tag: "NotFound";
  requested: string;
}

export type Location = Home | NotFound | Counter;
export const home: Location = { _tag: "Home" };
export const counter: Location = { _tag: "Counter" };
export const notFound = (requested: string): Location => ({
  _tag: "NotFound",
  requested,
});
export const toString = (loc: Location) => {
  return loc._tag;
};
