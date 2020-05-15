import React, { useState, useEffect } from 'react';
import TableInput from '../../containers/TableInput/index';
import { Button, message } from 'antd';

interface Props {

}

const TableForm = (props: Props) => {
  // 当需要在父组件中使用数据时useState的dataList可以从父组件中传入

  const [dataList, setDataList] = useState<any>([]);

  const option = [
    {
      id: '1',
      name: '中国'
    },
    {
      id: '2',
      name: '美国'
    }
  ]

  const columns = [{
    title: 'name',
    dataIndex: 'name',
    width: '30%',
    align: 'center',
    editable: true,
    type: 'select',
    option: option,
    render: (record: any) => {
      const maps = option.filter((item, index) => {
        return item.id === record
      })
      if (maps.length === 0) {
        return '请选择'
      } else {
        return maps[0].name
      }
    }
  },
  {
    title: 'age',
    dataIndex: 'age',
    align: 'center',
    editable: true,
    type: 'input',
  },
  {
    title: 'address',
    dataIndex: 'address',
    align: 'center',
    editable: true,
    type: 'input',
  }]

  const data = [
    {
      key: '0',
      // name: ,
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      // name: ,
      age: '32',
      address: 'London, Park Lane no. 1',
    }]

    useEffect(() => {
      setDataList(data)
      // eslint-disable-next-line
    }, [])

    const getData = () => {
      for (let i = 0; i < dataList.length; i ++ ) {
        if (!dataList[i].name || !dataList[i].age || !dataList[i].address) {
          message.error('请检查数据是否填写完整')
          return
        }
      }
      console.log(dataList)
    }

  return (
    <div>
      <TableInput
        columns={columns}
        data={data}
        setDataList={setDataList}
      />
      <Button onClick={getData}>提交表格数据</Button>
    </div>
  )
}

export default TableForm