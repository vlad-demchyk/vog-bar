import "./sectionTwo.css";
import database from "../database";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function BannerDeal() {
  const bannerText = "Breakfast Sets to Start Your Day Right";

  const menuItems = [
    {
      imgUrl: process.env.PUBLIC_URL + "/images/menudeal1.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
    {
      imgUrl: process.env.PUBLIC_URL + "/images/menudeal2.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
    {
      imgUrl: process.env.PUBLIC_URL + "/images/menudeal3.png",
      title: "Classic Italian Breakfast Set",
      par1: "Cappuccino Delizioso A creamy cappuccino topped with rich foam.",
      par2: "Avocado Toast Smashed avocado on toasted sourdough, drizzled with olive oil and sprinkled with sea salt.",
    },
  ];

  return (
    <>
      <div
        className="banner-box flex-column center gap-tall"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/coffee_background.png)`,
        }}
      >
        <h2>{bannerText.toLocaleUpperCase()}</h2>
        <div className="deal-menu">
          {menuItems.map((menuItem, index) => {
            // console.log("hello in", index);
            return (
              <div
                key={index}
                className={`deal-item item_#${
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
  const menuCategory = useRef(null);
  const menuContent = useRef(null);
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
    if (!isLoading && data && data.Coffee && typeof data == "object") {
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
        <div className="switch-category-slider flex-row">
          <button
            area-label="scroll to left category"
            onClick={() => scrollMenu("left", menuCategory)}
          ></button>

          <nav
            ref={menuCategory}
            onMouseEnter={() => scrollMause(menuCategory)}
            className="switch-category flex-row"
          >
            {Object.entries(data).map(([key, value]) => {
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCategoryData(value);
                  }}
                >
                  {key}
                </button>
              );
            })}
          </nav>
          <button
            area-label="scroll to right category"
            onClick={() => scrollMenu("right", menuCategory)}
          ></button>
        </div>
        <div className="content-wrapper-slider">
          {/* <button area-label="scroll to left menu book" onClick={() => scrollMenu("left", menuContent)}></button> */}
          <div
            ref={menuContent}
            // onMouseEnter={() => scrollMause(menuContent)}
            className={`content-wrapper`}
          >
            {!categoryData ? (
              <div> Choose data</div>
            ) : (
              // checkObj(categoryData)
              renderMenu(categoryData)
            )}
          </div>
          {/* <button area-label="scroll to right menu book" onClick={() => scrollMenu("right", menuContent)}></button> */}
        </div>
      </div>
    );
}

function checkObj(data) {
  return Object.entries(data || {}).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div className="subcategory flex-column gap-small" key={key}>
          <h2>{key}</h2>
          {checkObj(value)}
        </div>
      );
    } else if (typeof value === "string") {
      return (
        <div key={key} className="items-product flex-row">
          <p>{key}</p>
          <p>{key == "volume" || key == "type" ? value : "€" + Number(value).toFixed(2)}</p>
        </div>
      );
    }
    return null;
  })
}

function renderMenu(data) {
  const menu = Object.entries(data || {}).map(([key, value])  => {return[key, value]});
  console.log(menu)
  if(menu.length === 0) {
    return <div>Choose category</div>
  }
  return (
    <div className="subContainer">
      {menu.map((item, index) => {
        return (
          <div key={index} className="menu-item flex-row gap-small">
            <p>{item[0]}</p>
            {typeof item[1] == "string" ? <p>{item[1]}</p> : null}
         
           {console.log(item[1])}
          </div>
        )})}
    </div>
  )
}

function scrollMenu(direction, ref) {
  const menu = ref.current;

  if (direction === "right") {
    menu.scrollTo({
      left: menu.scrollLeft + 300, // Прокрутка вліво на 300px
      behavior: "smooth",
    });
  } else if (direction === "left") {
    menu.scrollTo({
      left: menu.scrollLeft - 300, // Прокрутка вправо на 300px
      behavior: "smooth",
    });
  }
}

function scrollMause(ref) {
  const content = ref.current;
  content.addEventListener("wheel", (event) => {
    event.preventDefault();
    const scrollStep = 300;
    if (event.deltaY < 0) {
      content.scrollLeft -= scrollStep;
    } else {
      content.scrollLeft += scrollStep;
    }
  });
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
