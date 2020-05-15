function createDataBase(data: any) {
  const { tableName, id, addData, version } = data;

  // dataBase = {
  let databaseName = "quick";
  // }

  const request = window.indexedDB.open(databaseName, version);

  request.onerror = function (event) {
    console.log("数据库打开报错");
  };

  let db;
  request.onsuccess = function (event) {
    db = request.result;
    console.log("数据库打开成功");
    add(db);
    // 操作完关闭数据库
    db.close();
    // search(db);
  };

  request.onupgradeneeded = function (event: any) {
    // 首次创建表
    db = event.target.result;
    console.log("数据库升级成功");
    var objectStore;
    if (!db.objectStoreNames.contains(tableName)) {
      objectStore = db.createObjectStore(tableName, {
        keyPath: id,
      });
    }
    // objectStore.createIndex('name', 'name', {
    //     unique: false
    // });
    // objectStore.createIndex('email', 'email', {
    //     unique: true
    // });
  };

  function add(db: any) {
    // 添加数据
    // var request = db
    //   .transaction([tableName], "readwrite")
    //   .objectStore(tableName)
    //   .add(addData);
    // 批量存储
    var request = addData.map((item: any, index: number) => {
      return db
        .transaction([tableName], "readwrite")
        .objectStore(tableName)
        .add(item);
    });

    request.onsuccess = function (event: any) {
      console.log("数据写入成功");
    };

    request.onerror = function (event: any) {
      console.log("数据写入失败");
    };
  }

  function search(db: any) {
    var transaction = db.transaction([tableName]);
    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(1);

    request.onerror = function (event: any) {
      console.log("事务失败");
    };

    request.onsuccess = function (event: any) {
      if (request.result) {
        console.log("Name: " + request.result.name);
      } else {
        console.log("未获得数据记录");
      }
    };
  }
}

function searchDataBase(data: any, setData: any) {
  const {
    tableName,
    id, // 查询主键参数
  } = data;

  // dataBase = {
  let databaseName = "quick";
  // let version = 1;
  // }

  const request = window.indexedDB.open(databaseName);

  request.onerror = function (event) {
    console.log("数据库打开报错");
  };

  let db;

  request.onsuccess = function (event) {
    db = request.result;
    console.log("数据库打开成功");
    // add(db);
    search(db);
    // 操作完关闭数据库
    db.close();
  };

  request.onupgradeneeded = function (event: any) {
    // 首次创建表
    db = event.target.result;
    console.log("数据库升级成功");
    var objectStore;
    if (!db.objectStoreNames.contains(tableName)) {
      // objectStore = db.createObjectStore(tableName, {
      //   keyPath: id,
      // });
      console.log("暂无此表");
    }
  };

  async function search(db: any) {
    let arr: any = [];
    tableName.map( async (item: any, index: number) => {
      var transaction = db.transaction([item]);
      var objectStore = transaction.objectStore(item);
      var request = objectStore.get(id);

      request.onerror = function (event: any) {
        console.log("事务失败");
      };

      request.onsuccess = await function (event: any) {
        if (request.result) {
          arr.push(request.result)
          setData(arr);
        } else {
          setData(arr);
          console.log("未获得数据记录");
        }
      };
    });
    // var transaction = db.transaction([tableName]);
    // var objectStore = transaction.objectStore(tableName);
    // var request = objectStore.get(id);

    // request.onerror = function (event: any) {
    //   console.log("事务失败");
    // };

    // request.onsuccess = function (event: any) {
    //   if (request.result) {
    //     console.log("Name: " + request.result.name);
    //     setData(request.result);
    //   } else {
    //     console.log("未获得数据记录");
    //   }
    // };
  }
}

export const createTable = (data: any) => {
  createDataBase(data);
};

export const searchTable = (data: any, setDataSource: (data: any) => void) => {
  // const data = {
  //     tableName: 'table1', // 表名
  //     id: 1, // 主键
  // }

  // 在这里得到数据
  // setDataSource([]);
  // let arr: any = [];
  // function setData(value: any) {
  //   arr.push(value);
  //   let newArr = arr;
  //   setDataSource(newArr);
  // }
  // console.log(arr);
  searchDataBase(data, setDataSource);
};
