import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import './style.css';

const { Option } = Select;

const EditableContext = React.createContext({});

const EditableRow = ({ form, index, ...props }: any) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

interface Props {
  record: any,
  handleSave: (row: any) => any,
  dataIndex: any,
  title: string,
  editable: any,
  type: any,
  index: any,
  option?: any;
}

interface Props2 {
  columns: any;
  data: any;
  setDataList: (data: any) => void;
}

class EditableCell extends React.Component<Props> {
  state = {
    editing: false,
  };

  input: any;

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e: any, form: any) => {
    const { record, handleSave } = this.props;
    form.validateFields((error: any, values: any) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };


  renderCell = (form: any) => {
    // this.form = form;
    const { children, dataIndex, record, title, type, option } = this.props;
    const { editing } = this.state;

    if (editing) {
      switch (type) {
        case 'select':
          return (
            <Form.Item style={{ margin: 0 }}>
              {form.getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ],
                initialValue: record[dataIndex],
              })( <Select 
                  ref={node => (this.input = node)} 
                  style={{width: '100%'}} 
                  // onPressEnter={(e: any) => this.save(e, form)} 
                  onBlur={(e: any) => this.save(e, form)}
                  >
                  {
                    option.map((item: any, index: any) => {
                      return <Option value={item.id} key={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                )}
            </Form.Item>
          )
  
        default:
          return (
            <Form.Item style={{ margin: 0 }}>
              {form.getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ],
                initialValue: record[dataIndex],
              })(<Input ref={node => (this.input = node)} onPressEnter={(e) => this.save(e, form)} onBlur={(e) => this.save(e, form)} />)}
            </Form.Item>
          )
      }
    } else {
      return (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={this.toggleEdit}
          >
            {children}
          </div>
        )
    }
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

class EditableTable extends React.Component<Props2> {

  columns: any;

  state: any;

  constructor(props: any) {
    super(props);

    this.state = {
      dataSource: this.props.data,
      count: this.props.data.length,
    };

    this.columns = [
      ...this.props.columns,
      {
        title: 'operation',
        dataIndex: '',
        align: 'center',
        render: (text: any, record: any) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title={`确认删除 ${record.name}?`}
              onConfirm={() => this.handleDelete(record.key)}
              cancelText='取消'
              okText='删除'
            >
              <a href="123">删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
  };

  handleDelete = (key: any) => {
    const dataSource = [...this.state.dataSource];
    const newData = dataSource.filter(item => item.key !== key);
    this.setState({ dataSource: newData });
    // 更新父组件值
    this.props.setDataList(newData)
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: `${count}`,
      name: ``,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    // 更新父组件值
    this.props.setDataList([...dataSource, newData])
  };

  handleSave = (row: any) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    // 更新父组件值
    this.props.setDataList(newData)
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          type: col.type,
          option: col.option,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

const TableInput = EditableTable

export default TableInput