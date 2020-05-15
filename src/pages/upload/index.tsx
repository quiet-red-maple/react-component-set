import React from 'react';
import { Form, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import UploadPic from '../../containers/UploadPic';
import UploadFiles from '../../containers/UploadFiles';
import UploadList from '../../containers/UploadPicList';

interface Props extends FormComponentProps {

}

const Upload = (props: Props) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const uploadConfig = {
    initialValue:
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    label: '图片',
    name: 'pic1',
    rules: [
      { required: true, message: '请上传图片!' }
    ]
  }

  const uploadFileConfig = {
    initialValue: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ],
    label: '文件',
    name: 'file1',
    rules: [
      { required: true, message: '请上传文件!' }
    ]
  }

  const uploadPicListConfig = {
    initialValue: [
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ],
    label: '图片列表',
    name: 'pic2',
    rules: [
      { required: true, message: '请上传图片列表!' }
    ]
  }

  return (
    <div>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>

        <UploadPic form={props.form} uploadConfig={uploadConfig} />

        <UploadFiles form={props.form} uploadConfig={uploadFileConfig} />

        <UploadList form={props.form} uploadConfig={uploadPicListConfig} />

        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default Form.create()(Upload)
