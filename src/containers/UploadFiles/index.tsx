import React from 'react';
import { Upload, Icon, message, Form } from 'antd';

const { Dragger } = Upload;

interface Props {
  form: any;
  uploadConfig: {
    label: string;
    name: string;
    rules: Array<any>;
    initialValue?: any;
  }
}

const beforeUpload = (file: any) => {
  // 文件上传类型限制
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
  const isZipOrRar = file.type === 'application/zip' || file.type === 'application/x-rar';
  if (isZipOrRar) {
    message.error('不可以上传zip或者rar格式的压缩包!');
  }
  return !isZipOrRar
}

const UploadFiles = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const { label, name, rules, initialValue } = props.uploadConfig;

  const defaultValue = (value: any) => {
    // 整合默认已上传文件格式
    if (!value) {
      return value;
    }
    return value.map((item: any, index: number) => ({
      ...item,
      uid: item.id,
      name: item.fileName,
      url: item.fileUrl
    }));
  };

  const until = {
    name: 'file',
    multiple: true,
    defaultFileList: initialValue,
    // defaultFileList: defaultValue(initialValue),
    beforeUpload: beforeUpload,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: (info: any) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // 点击文件列表创建a标签进行预览
    onPreview: (e: any) => {
      // 已上传文件直接为返回值没有response时直接返回，之后上传的文件返回值在response中
      const url = e.response ? e.response.url : e.url;
      const name = e.response ? e.response.name : e.name;
      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = url;
      aLink.download = name;
      aLink.target = '_blank';
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    }
  }

  const normFile = (e: any) => {
    // 这里对返回值进行加工，修改成所需要的json格式
    const newFileList = e.fileList.map((item: any, index: number) => {
      return item.response ? item.response : item
    })
    return newFileList
  }

  return (
    <Form.Item label={label}>
      {getFieldDecorator(`${name}`, {
        initialValue: initialValue,
        // initialValue: defaultValue(initialValue),
        rules: rules,
        valuePropName: 'file',
        getValueFromEvent: normFile,
      })(
        <Dragger {...until}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">请选择所要上传文件</p>
          <p className="ant-upload-hint">
            支持单次或批量上传。严禁上传公司资料或其他机密文件
          </p>
        </Dragger>
      )}
    </Form.Item>
  )
}

export default UploadFiles