import { useRef, useEffect } from "react";
import "./sectionThree.css";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function Events() {
  return <></>;
}

function Form() {
  return (
    <div className="contact_wrapper">
      <h3>VISIT VOG BAR IN THE CENTRE OF TRIESTE</h3>
      <div className="contact_info">
        <p>VIA DELLE SETTEFONTANE 2, Trieste</p>
        <p>1-111-111-11-11</p>
        <p>
          Order Online: Available now on Just Eat for quick and convenient
          delivery.
        </p>
      </div>
      <form action=""></form>
    </div>
  );
}

const mapboxToken =
  "pk.eyJ1Ijoid2htYWNoaW5lIiwiYSI6ImNtNXY0cndjbzAzZTUya3IweG54N3pjNDMifQ.RbVpWvX8xWiIHz0NA8UNQQ";

function Location() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

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
    }).setLngLat([13.78273, 45.644624]).setHTML(`
      <h3>Vog Bar | Coffee & drinks</h3>
      <p><strong>Via:</strong> <span id="address-link" style="color:blue; cursor:pointer;">delle Settefontane 2, Trieste</span></p>
        <p><strong>Numero:</strong> +123 456 789</p>
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
