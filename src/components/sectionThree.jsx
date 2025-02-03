import { useRef, useEffect, useState, useContext } from "react";
import { NavigationContext } from "../tools/SetContext";
import "./sectionThree.css";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function Events() {
  return <></>;
}

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactsRef = useRef(null);
  const {setScrollRefs} = useContext(NavigationContext);
  useEffect(() => {
    setScrollRefs((prev) => ({
      ...prev,
      contactsRef,
    }));
  }, [setScrollRefs, contactsRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can add form submission logic here
  };

  return (
    <div ref={contactsRef} className="contact_wrapper">
      <h3 className="form_main_text">VISIT VOG BAR IN THE CENTRE OF TRIESTE</h3>
      <div className="contact_info">
        <p>VIA DELLE SETTEFONTANE 2, Trieste</p>
        <a href="tel:+393917025904"> 39-170-259-04</a>
        <p>
          Order Online: Available now on Just Eat for quick and convenient
          delivery.
        </p>
      </div>
      <form id="form_getInfo" onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="name"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {/* <label htmlFor="message">Message:</label> */}
          <textarea
            id="message"
            name="message"
            placeholder="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function Location() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const mapboxToken =
    "pk.eyJ1Ijoid2htYWNoaW5lIiwiYSI6ImNtNXY0cndjbzAzZTUya3IweG54N3pjNDMifQ.RbVpWvX8xWiIHz0NA8UNQQ";

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;

    // });
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [13.78273, 45.644624], // Координати бару
      zoom: 14,
    });

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false,
      focusAfterOpen: false,
    }).setLngLat([13.78273, 45.644624]).setHTML(`
      <h3>Vog Bar | Coffee & drinks</h3>
      <p><strong>Via:</strong> <span id="address-link" style="color:blue; cursor:pointer;">delle Settefontane 2, Trieste</span></p>
        <p><strong>Numero:</strong> <a href="tel:+393917025904"> 39-170-259-04 </a></p> 
        <p><strong>Chi siamo:</strong> VOG Bar – dove l'autentico caffè Illy incontra l'ospitalità calorosa.</p>
        `);

    const marker = new mapboxgl.Marker()
      .setLngLat([13.78273, 45.644624])
      .addTo(mapRef.current);

    // Додавання обробника події для мітки
    marker.getElement().addEventListener("click", () => {
      popup.setLngLat([13.78273, 45.644624]).addTo(mapRef.current);
    });

    // Додати обробник натискання на адресу
    document.addEventListener("click", (e) => {
      if (e.target.id === "address-link") {
        const url = `https://www.google.com/maps/dir/?api=1&destination=45.644624,13.782730`;
        window.open(url, "_blank"); // Відкрити Google Maps у новій вкладці
      }
    });

    // Відкрити popup за замовчуванням
    popup.addTo(mapRef.current);
    
    return () => {
      mapRef.current.remove();
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default function SectionThree() {
  return (
    <section className="sec_three">
      <Events></Events>
      <Form></Form>
      <Location></Location>
    </section>
  );
}
