import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon_capstone');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists capstone (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from capstone', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction( tx => {
    menuItems.forEach(item => {
      tx.executeSql(
        `insert into capstone (id, name, price, description, image, category) values(?, ?, ?, ?, ?, ?)`, 
        [item.id, item.name, item.price, item.description, item.image, item.category]
      )
    });
  }
  )
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`select * from capstone where category=${activeCategories}'`, [], (_, { rows }) => {
        resolve(rows._array);
      })
      }
    )
    //resolve();
  });
}
