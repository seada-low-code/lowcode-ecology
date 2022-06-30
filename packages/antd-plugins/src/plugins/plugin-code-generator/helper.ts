import { Code, IFile } from './types'

export function fixPreviewCode(code: Code) {
  if (!code) {
    console.warn('code cannot be empty')
    return
  }
  const fixedModules: Code['modules'] = Object.entries(code.modules || {})
    .filter((item) => {
      // 去掉隐藏文件、html以及 md 等无用文件
      const path = item[0]
      return (
        !path.startsWith('/.') &&
        !path.endsWith('.html') &&
        !path.endsWith('.md')
      )
    })
    .map((item) => {
      // 将 jsx 改为 js
      const [path, module] = item
      return [path.replace(/\.jsx$/, '.js'), module]
    })
    .reduce((prev, cur) => {
      const [path, module] = cur as [string, IFile]
      return {
        ...prev,
        [path]: {
          ...module,
          fpath: path,
          code: (module.code as string)
            // 所有的 import xxx from '@/yyy' 转换为 import xxx from '/src/yyy'
            .replace(
              /import\s+([^\s]+)\s+from\s+['"]@\/([^'"]+)['"]/g,
              function (_, name, path) {
                return 'import ' + name + " from '/src/" + path + "'"
              }
            )
            // 所有的 import styles from 'xxx.scss' 转换为 import styles from '/src/xxx.css'
            .replace(
              /import\s+([^\s]+)\s+from\s+['"]([^'"]+)\.scss['"]/g,
              function (_, name, path) {
                return 'import ' + name + " from '" + path + ".css'"
              }
            )
        }
      }
    }, {})
  const fixedCode: Code = {
    ...code,
    modules: fixedModules
  }
  return fixedCode
}

export async function createCodeSandbox(parameters) {
  const res = await fetch(
    'https://codesandbox.io/api/v1/sandboxes/define?json=1',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(parameters)
    }
  )
  return res.json()
}
