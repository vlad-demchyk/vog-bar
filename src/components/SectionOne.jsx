import { useEffect, useRef, useState } from "react";
import "./sectionOne.css";
import Header from "./header";
const cup = "/icons/cup_of_coffee.png";

function parallaxEffectOnCup(ref, defStyle) {
  if (!ref) return;
  const obj = ref.current;
  const defaultTop = parseFloat(defStyle.marginTop);
  const defaultWidth = parseFloat(defStyle.width);

  function activeScroll() {
    if (window.scrollY > 0 && defStyle.marginTop.includes("%")) {
      obj.style.marginTop = `${defaultTop - window.scrollY / 20}%`;
    }
    if (window.scrollY > 0 && defStyle.marginTop.includes("px")) {
      obj.style.marginTop = `${defaultTop - window.scrollY / 3}px`;
    }
  }

  window.addEventListener("scroll", activeScroll);

  return () => {
    window.removeEventListener("scroll", activeScroll);
  };
}

function HeadBanner({ scrollRefs }) {
  const imgRef = useRef(null);
  const textForHead =
    "Vog Bar — where your coffee experience transcends the ordinary. Nestled in the heart of Trieste, we are not just a café; we are a gathering place where exceptional Illy coffee meets warm hospitality. Whether you're savoring a morning espresso or indulging in a late afternoon treat, we invite you to unwind and immerse yourself in the unique flavor of Trieste’s coffee culture.";

  useEffect(() => {
    const defTop = window.getComputedStyle(imgRef.current);
    const cleanUn = parallaxEffectOnCup(imgRef, defTop);
    return cleanUn;
  }, []);

  return (
    <section className="flex_head">
      <Header scrollRefs={scrollRefs} />
      <div className="first_part_head">
        <span className="big-text-main">CONNECTION AND COMMUNITY</span>
        <img
          ref={imgRef}
          className="cup_of_coffee"
          src={cup}
          alt="cup of coffee"
        />
        <div className="overflow-wrap">
          <span className="big-text-main shadow">CONNECTION AND COMMUNITY</span>
        </div>
      </div>
      <div className="second_part_head">
        <p>{textForHead.toLocaleUpperCase()}</p>
        <a onClick={(event) => {}} href="#">
          •EXPLORE OUR MENU
        </a>
      </div>
    </section>
  );
}

function VenueDescription() {
  const refWords = useRef(null);
  const refSection = useRef(null);
  const [isVisible, setIsVisible] = useState(undefined);
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
    <section ref={refSection} className="venue_desc">
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
