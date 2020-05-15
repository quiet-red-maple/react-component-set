import React, { useState, useEffect } from "react";
import TableInput from "../../containers/TableInput/index";
import { Button, message, Table, Input } from "antd";
import { createTable, searchTable } from "./dbConfig";
import { connect } from 'react-redux';
import { setData } from '../../redux/actions/indexDB'

const mapStateToProps = (indexDB: any) => (indexDB)

const mapDispatchToProps = (dispatch: any) => ({
  setData: (value: any) => dispatch(setData(value))
})

const { Search } = Input;

interface Props {
  setData: (data: any) => any;
  indexDB: any;
}

const columns2 = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (record: any) => {
      return record === "1" ? "中国" : "美国";
    },
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const IndexDB = (props: Props) => {
  // 当需要在父组件中使用数据时useState的dataList可以从父组件中传入

  const [dataList, setDataList] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [version, setVersion] = useState<number>(1);
  const [tableName, setTableName] = useState<string>("table1");

  useEffect(() => {
    // 刚开始修改tableName、和version 为下一步需要使用的
    let oldTableName = localStorage.getItem('tableName');
    let tableArray = oldTableName ? oldTableName.split(',') : [];
    let version = tableArray.length + 1;
    setVersion(version)
    setTableName('table' + version)
  }, [])

  const option = [
    {
      id: "1",
      name: "中国",
    },
    {
      id: "2",
      name: "美国",
    },
  ];

  const columns = [
    // {
    //   title: "key",
    //   dataIndex: "key",
    //   align: "center",
    //   editable: true,
    //   type: "input",
    // },
    {
      title: "姓名",
      dataIndex: "name",
      width: "30%",
      align: "center",
      editable: true,
      type: "select",
      option: option,
      render: (record: any) => {
        const maps = option.filter((item, index) => {
          return item.id === record;
        });
        if (maps.length === 0) {
          return "请选择";
        } else {
          return maps[0].name;
        }
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      align: "center",
      editable: true,
      type: "input",
    },
    {
      title: "地址",
      dataIndex: "address",
      align: "center",
      editable: true,
      type: "input",
    },
  ];

  const data = [
    {
      key: "0",
      // name: ,
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      // name: ,
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ];

  useEffect(() => {
    setDataList(data);
    // eslint-disable-next-line
  }, []);

  const setStorage = (tableName: string) => {
    // 用来保存所有表名
    let oldTableName = localStorage.getItem('tableName');
    let newTableName = oldTableName ? `${oldTableName},${tableName}` : tableName;
    localStorage.setItem('tableName', newTableName)
    // 保存后修改下一次表名
    const version = Number(tableName.replace("table", "")) + 1;
    setVersion(version)
    setTableName('table' + version)
  }

  const getData = () => {
    for (let i = 0; i < dataList.length; i++) {
      if (!dataList[i].name || !dataList[i].age || !dataList[i].address) {
        message.error("请检查数据是否填写完整");
        return;
      }
    }
    const data = {
      tableName: tableName, // 表名
      id: "age", // 主键
      version: version,
      addData: dataList, // 添加的数据
    };
    createTable(data);
    setStorage(tableName);
  };

  const search = () => {
    // 查询indexDB所有表数据
    let oldTableName = localStorage.getItem('tableName');
    let tableArray = oldTableName ? oldTableName.split(',') : [];

    const data = {
      tableName: tableArray,
      id: searchValue
    }

    const setData = (value: any) => {
      // setDataSource(value)
      props.setData(value)
    }
    searchTable(data, setData)
  }

  useEffect(() => {
    if (!searchValue) {
      return 
    }
    search()
  }, [searchValue])

  const datas = props.indexDB.data.map((item: any, index2: number) => ({
    ...item,
    key: index2 + 1
  }))

  return (
    <div>
      <TableInput columns={columns} data={data} setDataList={setDataList} />
      <Button onClick={getData}>保存表格数据到IndexDB</Button>
      <h2 style={{ marginTop: 20 }}>IndexDB所有表已存储数据查询</h2>

      <Search
        placeholder="请输入查询主键"
        onSearch={(value: any) => setSearchValue(`${value}`)}
        enterButton
        style={{ marginBottom: 20 }}
      />
      <Table dataSource={datas} columns={columns2} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexDB);
