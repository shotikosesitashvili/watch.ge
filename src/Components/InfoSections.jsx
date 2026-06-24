import React from "react";

function InfoBlock(props) {
  return (
    <div className={`info-block ${props.isReverse ? "reverse" : ""}`}>
      <div className="info-text-side">
        <h3 className="info-heading">{props.title}</h3>
        <p className="info-paragraph">{props.description}</p>
      </div>

      <div className="info-image-side">
        <img src={props.imgSrc} alt={props.altText} />
      </div>
    </div>
  );
}

function InfoSections() {
  const infoData = [
    {
      id: 1,
      title: "About Us",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imgSrc:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
      altText: "Luxury Watches",
      isReverse: false,
    },
    {
      id: 2,
      title: "Our Story",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
      imgSrc:
        "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?auto=format&fit=crop&w=800&q=80",
      altText: "Watch craftsmanship",
      isReverse: true,
    },
    {
      id: 3,
      title: "Explore Our Collection",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
      imgSrc:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      altText: "Watch collection",
      isReverse: false,
    },
  ];

  return (
    <section className="info-blocks-section">
      <div className="info-container">
        {infoData.map((block) => (
          <InfoBlock
            key={block.id}
            title={block.title}
            description={block.description}
            imgSrc={block.imgSrc}
            altText={block.altText}
            isReverse={block.isReverse}
          />
        ))}
      </div>
    </section>
  );
}

export default InfoSections;