import { useContext, useEffect, useRef, useState } from "react";
import "./sectionOne.css";
import { scrollToElement } from "../tools/utils";
import { MenuContext, NavigationContext } from "../tools/SetContext";
const cup = `${process.env.PUBLIC_URL}/icons/cup_of_coffee.png`;

function parallaxEffectOnCup() {
  const mainTextCollection = document.querySelectorAll(".big-text-main");
  function activeScroll() {
    if (window.scrollY > 0) {
      mainTextCollection.forEach((mainText) => {
        mainText.style.transform = `translateY(${window.scrollY / 4}px)`;
      });
    }
  }

  window.addEventListener("scroll", activeScroll);

  return () => {
    window.removeEventListener("scroll", activeScroll);
  };
}

function HeadBanner() {
  const { scrollRefs } = useContext(NavigationContext)
  const { setMenuOpen } = useContext(MenuContext);
  const imgRef = useRef(null);
  const textForHead =
    "Vog Bar — where your coffee experience transcends the ordinary. Nestled in the heart of Trieste, we are not just a café; we are a gathering place where exceptional Illy coffee meets warm hospitality. Whether you're savoring a morning espresso or indulging in a late afternoon treat, we invite you to unwind and immerse yourself in the unique flavor of Trieste’s coffee culture.";

  useEffect(() => {
    const cleanUn = parallaxEffectOnCup(imgRef);
    return cleanUn;
  }, []);

  return (
    <section className="flex_head">
      <div className="first_part_head">
        <span className="big-text-main">CONNECTION AND COMMUNITY</span>
        <img
          ref={imgRef}
          className="cup_of_coffee"
          src={cup}
          alt="cup of coffee"
        />
        <span className="big-text-main shadow">CONNECTION AND COMMUNITY</span>
      </div>
      <div className="second_part_head">
        <p>{textForHead.toLocaleUpperCase()}</p>
        <a
          href="#menu"
          onClick={(e) => scrollToElement(scrollRefs.menuRef, setMenuOpen, e)}
        >
          •EXPLORE OUR MENU
        </a>
      </div>
    </section>
  );
}

function VenueDescription() {
  const {setScrollRefs} = useContext(NavigationContext)
  const refWords = useRef(null);
  const refSection = useRef(null);
  const [isVisible, setIsVisible] = useState(undefined);
  const aboutRef = refSection;

  useEffect(() => {
    setScrollRefs((prev) => ({
      ...prev,
      aboutRef,
    }));
  }, [setScrollRefs, aboutRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Якщо елемент з'явився у полі зору
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 } // Вважаємо блок видимим, якщо він на 50% в полі зору
    );
    observer.observe(refSection?.current);

    return () => observer.disconnect(); // Очистка спостерігача
  }, []);

  useEffect(() => {
    if (isVisible) {
      colorChange(refWords.current, isVisible);
    } else {
    }
  }, [isVisible]);

  const txt =
    "At Vog Bar, we cherish the art of coffee-making and the magic of connection. We proudly serve authentic Illy coffee, a cornerstone of Trieste’s rich coffee heritage. Each drink is meticulously crafted, delivering a smooth, balanced flavor that resonates with the soul. Here, it’s not just about coffee, it’s about creating a home away from home — a space where you can enjoy every sip and every moment.".toUpperCase();
  let phraseArray = txt.split(/(?<=[,.!?;—-]),?\s+/);
  // .split(/[.,!?;—-]/);
  return (
    <section id="about" ref={refSection} className="venue_desc">
      <p ref={refWords}>
        {phraseArray.map((phrase, index) => {
          return <span key={index}>{phrase + " "}</span>;
        })}
      </p>
      <span className="dot one"></span>
      <span className="dot two"></span>
      <span className="dot three"></span>
      <span className="dot four"></span>
    </section>
  );
}

function colorChange(ref) {
  const spans = Array.from(ref.querySelectorAll("span"));
  const keyWords =
    "Vog Bar magic connection Trieste rich coffee heritage balanced flavor resonates soul enjoy sip moment"
      .toUpperCase()
      .match(/\b\w+([-']\w+)?\b/g);

  // Фільтрація <span>, що містять хоча б одне ключове слово
  const filteredSpans = spans.filter((span) => {
    return keyWords.some((keyWord) => span.textContent.includes(keyWord));
  });
  function randomTime() {
    const randomTime = Math.random() * 4000 + 1000;
    return randomTime;
  }

  for (const value of filteredSpans) {
    if (!value.classList.contains("switch_color")) {
      const changeColorEffect = () => {
        value.classList.add("switch_color");
        setTimeout(() => {
          value.classList.remove("switch_color");
          if (!value.classList.contains("switch_color")) {
            setTimeout(changeColorEffect, randomTime());
          }
        }, 3000);
      };

      setTimeout(changeColorEffect, randomTime());
    }
  }
}

function SectionOne() {
  return (
    <section className="sec_one">
      <HeadBanner></HeadBanner>
      <VenueDescription></VenueDescription>
    </section>
  );
}

export default SectionOne;
