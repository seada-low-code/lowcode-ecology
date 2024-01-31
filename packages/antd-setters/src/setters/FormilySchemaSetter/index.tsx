import React, { useEffect, useRef } from 'react'
import { createForm, onFormValuesChange } from '@formily/core'
import { Form, FormProps } from '@formily/antd'
import { IFormilySchemaSetterProps } from './type'
import { SchemaField } from './SchemaField'
import { useLocales } from './locales'
import { isPlainObj } from '@formily/shared'
import { isEqual } from 'lodash'

const traverse = (obj, cb) => {
  if (isPlainObj(obj)) {
    Object.keys(obj).forEach((key) => {
      traverse(obj[key], cb)
      obj[key] = cb(key, obj[key], obj) || obj[key]
    })
  }
}

let shouldRenderVarFromDecorator = false

// 仅依赖formily相关，不要引入designable相关的东西
const FormilySchemaSetter: React.FC<IFormilySchemaSetterProps> & {
  toggleVarDecorator: (f: boolean) => void
} = (props) => {
  const { defaultValue, value, effects, propsSchema, onChange } = props

  const formRef = useRef<FormProps['form']>(
    createForm({
      values: value,
      effects(form) {
        useLocales()
        onFormValuesChange((f) => {
          onChange(f.values)
        })
        effects?.(form)
      }
    })
  )

  if (shouldRenderVarFromDecorator) {
    traverse(propsSchema, (key, value) => {
      if (key === 'x-decorator' && value === 'FormItem') {
        return 'VarFormItem'
      }
    })
  }

  useEffect(() => {
    if (!value && defaultValue) {
      const val =
        typeof defaultValue === 'function' ? defaultValue() : defaultValue
      formRef.current?.setValues(val)
    }
  }, [defaultValue, value])

  return (
    formRef.current && (
      <Form
        form={formRef.current}
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
  )
}

FormilySchemaSetter.displayName = 'FormilySchemaSetter'

/**
 * @description 历史遗留问题，非必要不渲染
 * @deprecated
 */
FormilySchemaSetter.toggleVarDecorator = (toggle: boolean) => {
  shouldRenderVarFromDecorator = toggle
}

export default FormilySchemaSetter
