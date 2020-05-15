import React, { useState } from 'react';
import Sortable from 'react-sortablejs';
import './style.css';

const SharedGroup = ({ items, setItems }: any) => {
  items = items.map((val: any, index: number) => (<li key={index} data-id={val}>{val}</li>));

  return (
    <Sortable
      // See all Sortable options at https://github.com/RubaXa/Sortable#options
      options={{
        group: 'shared'
      }}
      tag="ul"
      onChange={(order: any, sortable: any, evt: any) => {
        setItems(order);
      }}
    >
      {items}
    </Sortable>
  );
};

const DragSort = () => {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry'])
  const [items2, setItems2] = useState(['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry'])
  const item = items.map((val, index) => (<li key={index} data-id={val}>{val}</li>));

  console.log(items, items2)
  return (
    <div>
      <p>不受控制组件</p>
      <Sortable
        tag="ul" // Defaults to "div"
      >
        {item}
      </Sortable>
      <p>受控组件</p>
      <Sortable
        tag="ul" // Defaults to "div"
        onChange={(order: any, sortable: any, evt: any) => {
          setItems(order);
        }}
      >
        {item}
      </Sortable>
      <p>共享组件</p>
      <div className="share">
        <SharedGroup
          items={items}
          setItems={setItems}
        />
        <SharedGroup
          items={items2}
          setItems={setItems2}
        />
      </div>

    </div>
  )
}

export default DragSort