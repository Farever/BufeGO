const Section = ({ title, children }) => (
    <section className="mb-5">
      <h3 className="border-bottom pb-2 mb-4 fw-semibold">{title}</h3>
      {children}
    </section>
  );

export default Section;