import React, { useState, useEffect } from 'react';
import { Form, Upload, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  // 添加可以上传的文件格式
  const isJpgOrPng =
    file.type === 'image/jpeg'
    || file.type === 'image/png'
    || file.type === 'image/bmp'
    || file.type === 'image/gif'
    || file.type === 'image/webp';

  if (!isJpgOrPng) {
    message.error('只能上传图片格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片最大为2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface Props extends FormComponentProps {
  uploadConfig: {
    label: string;
    name: string;
    rules: Array<any>;
    initialValue?: any;
  }
  form: any;
}

const Uploads = (props: Props) => {
  const { getFieldDecorator } = props.form;

  const {
    label,
    name,
    rules,
    initialValue
  } = props.uploadConfig;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 首次设置默认值
    const Imgurl = initialValue.url
    setImageUrl(Imgurl)
    // 禁用useEffect的警告
    // eslint-disable-next-line
  }, [])

  const normFile = (e: any) => {
    console.log(e)
    if (!e.file.response) {
      return
    }
    // 在这里整合成后端所需参数格式 e.file.response即为上传文件后台返回的值
    const data = {
      fileName: e.file.name,
      filePath: e.file.response,
    }
    return data
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      setImageUrl('')
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false)
      });
    }
  };

  return (
    <div>
    <Form.Item label={label}>
      {getFieldDecorator(`${name}`, {
        initialValue: initialValue,
        rules: rules,
        valuePropName: 'file',
        getValueFromEvent: normFile,
      })(
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      )}
    </Form.Item>
    </div>
  )
}

export default Uploads