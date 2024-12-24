import "./sectionTwo.css";
import database from "../database";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function BannerDeal() {
  const bannerText = "Breakfast Sets to Start Your Day Right";

  const menuItems = [
    {
      imgUrl: "/images/menudeal1.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
    {
      imgUrl: "/images/menudeal2.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
    {
      imgUrl: "/images/menudeal3.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
  ];

  return (
    <>
      <div
        className="banner-box flex-column center gap-tall"
        style={{ backgroundImage: "url(/images/coffee_background.png)" }}
      >
        <h2>{bannerText.toLocaleUpperCase()}</h2>
        <div className="flex-row deal-menu">
          {menuItems.map((menuItem, index) => {
            // console.log("hello in", index);
            return (
              <div
                key={index}
                className={`menu-item item_#${
                  index + 1
                } flex-column center gap-small`}
              >
                <img src={menuItem.imgUrl} alt="#" />
                <div
                  className={`description_menu css_index${index} flex-column gap-small`}
                >
                  <h2>{menuItem.title.toLocaleUpperCase()}</h2>
                  <p>{menuItem.par1.toLocaleUpperCase()}</p>
                  <p>{menuItem.par2.toLocaleUpperCase()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function DynamicMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  // const [dataArray, setDataArray] = useState([]);


//отримати меню
  useEffect(() => { 
    getDoc(doc(database, "bar-info", "menu"))
      .then((result) => {
        const data = result.data();
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
   /* if (!isLoading && data) {
      const entries = Object.entries(data);
      if (entries.length > 0) {
       entries.forEach(([key,value])=> {
        key == 'Coffee'? setCategoryData(value): setCategoryData(null)
       })
      }
    }*/
      if (!isLoading && data && data.Coffee && typeof data == 'object') {
        setCategoryData(data.Coffee); // Автоматично обирає категорію "Coffee"
      }
    }, [isLoading, data]);

  if (isLoading) {
    return (
      <div>
        <h2 className="title-menu">Loading...</h2>
      </div>
    );
  }

  if (hasError) {
    return <div> Error</div>;
  }

  if (!isLoading && data)
    return (
      <div className="menu-wrapper flex-column">
        <h2 className="title-menu text-center">
          EXPERIENCE THE FULL RANGE OF OUR FLAVORS
        </h2>
        <nav className="switch-category flex-row">
          { Object.entries(data).map(([key, value]) => {
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCategoryData(value);
                                    checkObj(value)

                  }}
                >
                  {key}
                </button>
              )
            })
          }
        </nav>
        <div className={`content-menu flex-row`}>
          {
            !categoryData ? (<div> Choose data</div>) :
    (
            Object.entries(categoryData || {}).map(([key, value]) => {
              if (typeof value === "string") {
                // checkObj(categoryData)
                return (
                  <div key={key} className="flex-row gap-small">
                    <p>{key}</p>
                    <p>€{Number(value).toFixed(2)}</p>
                  </div>
                );
              } else {
                // checkObj(categoryData)
                return (
                  <div className="subcategory flex-column gap-small">
                    <h2>{key}</h2>
                    {Object.entries(value ||{}).map(([key, value]) => {
    
                      return (
                        <div className="flex-row gap-small">
                          <p>{key}:</p>
                          <p>{value}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            })
            )
          }
        </div>
      </div>
    );
  }

function checkObj(data){
 Object.entries(data).map(([key, value])=>{
    console.log(key, 'is the key') 
    console.log(value, 'is the value')
    if (typeof value === 'object'){
      checkObj(value)
      console.log(value, ' is deep')
    }
    else console.log(value, 'is shallow')

  })
}

function SectionTwo() {
  return (
    <section>
      <BannerDeal></BannerDeal>
      <DynamicMenu></DynamicMenu>
    </section>
  );
}

export default SectionTwo;


