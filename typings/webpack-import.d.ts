// tell Typescript that "import 'styles.css'"" is ok
// and contains strings
declare module "*.css" {
  const names: { [name: string]: string };
  export default names;
}

// tell Typescript that "import 'x.png"" is ok
declare module "*.png" {
  const value: string;
  export default value;
}

// tell Typescript that "import 'x.jpg"" is ok
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.md" {
  const value: string;
  export default value;
}
