export interface RootObject {
  feed: Feed;
}

interface Feed {
  author: Author;
  entry: Entry[];
  updated: Name;
  rights: Name;
  title: Name;
  icon: Name;
  link: Link2[];
  id: Name;
}

interface Link2 {
  attributes: Attributes8;
}

interface Attributes8 {
  rel: string;
  type?: string;
  href: string;
}

interface Entry {
  'im:name': Name;
  'im:image': Imimage[];
  summary: Name;
  'im:price': Imprice;
  'im:contentType': ImcontentType;
  rights?: Name;
  title: Name;
  link: Link;
  id: Id;
  'im:artist': Imartist;
  category: Category;
  'im:releaseDate': ImreleaseDate;
}

interface ImreleaseDate {
  label: string;
  attributes: Name;
}

interface Category {
  attributes: Attributes7;
}

interface Attributes7 {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

interface Imartist {
  label: string;
  attributes?: Attributes6;
}

interface Attributes6 {
  href: string;
}

interface Id {
  label: string;
  attributes: Attributes5;
}

interface Attributes5 {
  'im:id': string;
}

interface Link {
  attributes: Attributes4;
}

interface Attributes4 {
  rel: string;
  type: string;
  href: string;
}

interface ImcontentType {
  attributes: Attributes3;
}

interface Attributes3 {
  term: string;
  label: string;
}

interface Imprice {
  label: string;
  attributes: Attributes2;
}

interface Attributes2 {
  amount: string;
  currency: string;
}

interface Imimage {
  label: string;
  attributes: Attributes;
}

interface Attributes {
  height: string;
}

interface Author {
  name: Name;
  uri: Name;
}

interface Name {
  label: string;
}