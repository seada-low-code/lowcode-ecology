import { createSchemaComponent } from '../../shared';
import React, { createElement, Component, createRef } from 'react';
import Editor from '@monaco-editor/react';

export interface IMonacoInputProps {
  height?: string;
  defaultLanguage?: string;
  defaultValue?: string;
  value?: string;
  readOnly?: boolean;
  theme: 'vs-dark' | 'light';
  onChange: (value: any) => void;
}

class MonacoInput extends Component<IMonacoInputProps, any> {
  editorRef: any;

  constructor(props) {
    super(props);
    this.editorRef = createRef();
  }

  getValue() {
    return this.editorRef.current.getValue();
  }

  getEditorInstance() {
    return this.editorRef.current;
  }

  onEditorMount(editor) {
    this.editorRef.current = editor;
  }

  onEditorChange(value) {
    this.props?.onChange?.(value);
  }

  render() {
    const { defaultLanguage, height, theme = 'light', readOnly = false } = this.props;

    const value = this.props.value || this.props.defaultValue;

    return (
      <Editor
        options={{
          readOnly,
        }}
        theme={theme}
        defaultLanguage={defaultLanguage || 'javascript'}
        height={height}
        value={value}
        onChange={this.onEditorChange.bind(this)}
        onMount={this.onEditorMount.bind(this)}
      />
    );
  }
}

export default createSchemaComponent({
  componentName: 'MonacoInput',
  component: MonacoInput as any,
});
