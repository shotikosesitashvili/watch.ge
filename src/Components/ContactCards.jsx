import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

function ContactCards() {
  const cards = [
    {
      icon: faComments,

      title: "Chat to sales",
      desc: "Speak to our friendly team.",
      action: "contact@gmail.ge",
    },
    {
      icon: faCircleQuestion,

      title: "Chat to support",
      desc: "We're here to help.",
      action: "Start live chat",
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit us",

      desc: "Visit our office HQ.",
      action: "View on maps",
    },
    {
      icon: faPhoneAlt,
      title: "Call us",


      desc: "Mon-Fri from 9am to 6pm.",
      action: "+995 599 99 99",
    },
  ];

  return (
    <section id="contact-cards" className="contact-cards-section">
      <div className="cards-container">
        {cards.map((card, i) => (

          <div key={i} className="contact-card">

            <div className="card-icon">
              <FontAwesomeIcon icon={card.icon} />
            </div>

            <h3>{card.title}</h3>
            <p>{card.desc}</p>

            <span className="card-action">{card.action}</span>
          </div>
        ))}
      </div>
    </section>

  );
}

export default ContactCards;