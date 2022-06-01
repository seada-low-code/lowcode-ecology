import React, { useMemo } from 'react'
import { createForm, onFormValuesChange } from '@formily/core'
import { Form } from '@formily/antd'
import { IFormilySchemaSetterProps } from './type'
import { SchemaField } from './SchemaField'
import { useLocales } from './locales'
import { isPlainObj } from '@formily/shared'

const traverse = (obj, cb) => {
  if (isPlainObj(obj)) {
    Object.keys(obj).forEach((key) => {
      traverse(obj[key], cb)
      obj[key] = cb(key, obj[key], obj) || obj[key]
    })
  }
}

// 仅依赖formily相关，不要引入designable相关的东西
const FormilySchemaSetter: React.FC<IFormilySchemaSetterProps> = (props) => {
  const { defaultValue, value, effects, propsSchema, onChange } = props

  if (!propsSchema) {
    return null
  }

  traverse(propsSchema, (key, value) => {
    if (key === 'x-decorator' && value === 'FormItem') {
      return 'VarFormItem'
    }
  })

  const form = useMemo(() => {
    return createForm({
      initialValues: defaultValue,
      values: value,
      effects(form) {
        useLocales()
        onFormValuesChange((form) => {
          onChange(form.values)
        })
        effects?.(form)
      }
    })
  }, [])

  const render = () => {
    return (
      <Form
        form={form}
        colon={false}
        labelWidth={120}
        labelAlign="left"
        wrapperAlign="right"
        feedbackLayout="none"
        tooltipLayout="text"
        className="dn-settings-form-wrapper"
      >
        <SchemaField schema={propsSchema} />
      </Form>
    )
  }

  return render()
}

export default FormilySchemaSetter
