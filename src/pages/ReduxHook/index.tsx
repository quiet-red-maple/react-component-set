import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getData
} from '../../redux/actions/user';

interface Props {
  getData: (data: any) => any;
}

const ReduxHook = (props: Props) => {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const { data } = user;
  const [page, setPage] = useState(1)

  useEffect(() => {
    const data = {
      page: page
    }
    dispatch(getData(data))
  }, [page, dispatch])


  const getDatas = () => {
    setPage(page + 1)
  }

  const nameList = data.map((item: any, index: number) => {
    return <p key={index}>{item.femalename}</p>
  })

  return (
    <div>
      <p>使用基于Hooks 的 Redux</p>
      <Button onClick={getDatas}>获取名字</Button>
      <div style={{paddingTop: 20}}>
        {nameList}
      </div>
      <div>第{page}页</div>
    </div>
  )
}

export default ReduxHook;