// import database from '../database';
// import { useEffect, useState } from 'react';
// import { collection, onSnapshot, doc } from 'firebase/firestore'


// // function RenderMenu() {

// //   const [DBArray, setDBArray] = useState([])

// //   const menu = DBArray.find((collection)=>collection.id === "menu")
// //   const offers = DBArray.find((collection)=>collection.id === "offers")
// //   const events = DBArray.find((collection)=>collection.id === "events")

// //   useEffect(() => {
// //     // Підписка на оновлення з Firestore
// //     const unsubscribe = onSnapshot(
// //       collection(database, "bar-info"),
// //       (snapshot) => setDBArray(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
// //     );
// //     // Повернення функції для скасування підписки при розмонтуванні компонента
// //     return () => unsubscribe();
// //   }, []);
  
// //   function renderKeysAndValues(obj) {
// //     return Object.entries(obj).map(([key, value]) => {
// //       if (typeof value === 'object' && !Array.isArray(value)) {
// //         // Якщо значення - це об'єкт, рекурсивно викликаємо renderKeysAndValues
// //         return (
// //             <div className={key + ' '} key={key}>
// //               {console.log(obj)}
// //             <strong>{key}:</strong>
// //             <div style={{ paddingLeft: "15px" }}>{renderKeysAndValues(value)}</div>
// //           </div>
// //         );
// //       } else {
// //         // Відображаємо прості значення
// //         return (
// //           <div key={key}>
// //             {key}: {value.toString()}
// //           </div>
// //         );
// //       }
// //     });
// //   }
// //   //////


// //   return (
// //     <section>
// //          {menu ? renderKeysAndValues(menu) : <p>No data available</p>}
// //     </section>
// //   );
// // }

// // export default RenderMenu;

// const renderContent = (data, parentId = '') => {
//     // Перевірка, чи це масив або об'єкт
//     if (Array.isArray(data)) {
//       return data.map((value, index) => (
//         <div key={`${parentId}-${index}`} id={`${parentId}-${index}`} className="array-item">
//           <p>{`Index ${index}:${value}`}</p>
//           {/* Якщо в середині масиву є об'єкти або інші масиви, викликаємо функцію рекурсивно */}
//           {typeof value === 'object' ? renderContent(value, `${parentId}-${index}`) : null}
//         </div>
//       ));
//     } else if (typeof data === 'object') {
//       return Object.keys(data).map((key) => (
//         <div key={`${parentId}-${key}`} id={`${parentId}-${key}`} className="object-item">
//             {   
//                 if(typeof (data[key]) != 'object'){
//                     return (
//                         <p>{`${key}: ${data[key]}`}</p>
//                     ) 
//                 }
//                 if(typeof (data[key]) != 'string'){
//                     return (
//                         <p>Price: {data[key]}</p>
//                     )
//                 }
//                 else return ''
//             }

//           {/* <p>{` ${key}${typeof (data[key]) != 'object'?`: ${data[key]}` : '' }`}</p> */}

//           {/* Якщо в середині об'єкту є об'єкти або масиви, викликаємо функцію рекурсивно */}
//           {typeof data[key] === 'object' ? renderContent(data[key], `${parentId}-${key}`) : null}
//         </div>
//       ));
//     }
//     return null;
//   };

// const Menu = ({ menuData }) => {
//     return (
//       <div id="menu-container" className="menu-container">
//         {renderContent(menuData, 'menu')}
//       </div>
//     );
//   };

// const MenuContainer = () => {
//   const [menuData, setMenuData] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(doc(collection(database, 'bar-info'), 'menu'), (doc) => {
//       setMenuData(doc.data());
//     });

//     return () => unsubscribe(); // Припиняє слухання при розмонтуванні компонента
//   }, []);

//   return menuData ? <Menu menuData={menuData} /> : <p>Loading...</p>;
// };

// export default MenuContainer;
