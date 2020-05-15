import React, { useState, useEffect } from 'react';
import { Upload, Icon, Modal, Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  uploadConfig: {
    label: string;
    name: string;
    rules: Array<any>;
    initialValue?: any;
  }
  form: any;
}

const UploadList = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const [fileList, setFileList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const {
    label,
    name,
    rules,
    initialValue
  } = props.uploadConfig;

  useEffect(() => {
    setFileList(initialValue)
    // eslint-disable-next-line
  }, [])

  const normFile = (e: any) => {
    console.log(e)
    // 这里对返回值进行加工，修改成所需要的json格式
    const newFileList = e.fileList.map((item: any, index: number) => {
      return item.response ? item.response : item
    })
    return newFileList
  }

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const handleCancel = () => setVisible(false);

  const handlePreview = (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = file.thumbUrl;
    }

    setImgUrl(file.url || file.preview);
    setVisible(true);

  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">{label}</div>
    </div>
  );

  return (
    <FormItem label={label} className={'legal_form'}>
      {getFieldDecorator(`${name}`, {
        initialValue,
        rules,
        valuePropName: 'file',
        getValueFromEvent: normFile,
      })(
        <Upload
          action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      )}
      <Modal visible={visible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={imgUrl} />
      </Modal>
    </FormItem>
  )
}

export default UploadList