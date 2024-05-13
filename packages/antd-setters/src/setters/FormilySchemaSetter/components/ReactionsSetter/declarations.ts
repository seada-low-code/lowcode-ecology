import { IReactionsSetterProps } from '.'
import { MonacoInput } from '../MonacoInput'

export interface IDependency {
  name: string
  path: string
}

const loadDependencies = async (
  deps: IDependency[],
  {
    libraryDomain = '//cdn.jsdelivr.net/npm'
  }: Pick<IReactionsSetterProps['initProps'], 'libraryDomain'>
) => {
  return Promise.all(
    deps.map(async ({ name, path }) => ({
      name,
      path,
      library: await fetch(`${libraryDomain}/${name}/${path}`).then((res) =>
        res.text()
      )
    }))
  )
}

export const initDeclaration = async (
  prop?: IReactionsSetterProps['initProps']
) => {
  return MonacoInput.loader.init().then(async (monaco) => {
    const deps = await loadDependencies(
      [{ name: '@formily/core', path: 'dist/formily.core.all.d.ts' }],
      {
        libraryDomain: prop?.libraryDomain
      }
    )
    deps?.forEach(({ name, library }) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare module '${name}'{ ${library} }`,
        `file:///node_modules/${name}/index.d.ts`
      )
    })
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
    import { Form, Field } from '@formily/core'
    declare global {
      /*
       * page component instance
       **/
      declare var $this: any
      /*
       * Form Model
       **/
      declare var $form: Form
      /*
       * Form Values
       **/
      declare var $values: any
      /*
       * Field Model
       **/
      declare var $self: Field
      /*
       * create an persistent observable state object
       **/
      declare var $observable: <T>(target: T, deps?: any[]) => T
      /*
       * create a persistent data
       **/
      declare var $memo: <T>(callback: () => T, deps?: any[]) => T
      /*
       * handle side-effect logic
       **/
      declare var $effect: (callback: () => void | (() => void), deps?: any[]) => void
      /*
       * set initial component props to current field
       **/
      declare var $props: (props: any) => void
    }
    `,
      `file:///node_modules/formily_global.d.ts`
    )
  })
}
