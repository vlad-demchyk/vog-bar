import "./sectionTwo.css";
import { database } from "../tools/database";
import { useContext, useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { NavigationContext } from "../tools/SetContext";

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
        aria-label="Daily Specials"
        className="banner-box flex-column center gap-tall"
        // style={{
        //   backgroundImage: `url(${process.env.PUBLIC_URL}/images/coffee_background.png)`,
        // }}
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
  const {setScrollRefs} = useContext(NavigationContext)
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const menuCategory = useRef(null);
  const menuRef = useRef(null);

  
  useEffect(() => {
    setScrollRefs((prev) => ({
      ...prev,
      menuRef,
    }));
  }, [setScrollRefs]);

  // отримати меню
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

  // useEffect(() => {
  //   // Підписка на зміни в документі
  //   const unsubscribe = onSnapshot(
  //     doc(database, "bar-info", "menu"),
  //     (snapshot) => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.data();
  //         setData(data); // Оновлюємо стан при кожній зміні даних
  //         setIsLoading(false);
  //       } else {
  //         console.log("No such document!");
  //         setIsError(true);
  //       }
  //     },
  //     (error) => {
  //       console.error("Error fetching snapshot: ", error);
  //       setIsError(true);
  //     }
  //   );

  //   // Відписка при демонтуванні компонента
  //   return () => unsubscribe();
  // }, []);

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
      <div id="menu" ref={menuRef} className="menu-wrapper flex-column">
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
          <div className={`content-wrapper`}>
            {categoryData ? checkObj(categoryData) : <div>Choose data</div>}
          </div>
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
          <p>
            {key === "volume" || key === "type"
              ? value
              : "€" + Number(value).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  });
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
    <section className="sec_two">
      <BannerDeal></BannerDeal>
      <DynamicMenu></DynamicMenu>
    </section>
  );
}

export default SectionTwo;
