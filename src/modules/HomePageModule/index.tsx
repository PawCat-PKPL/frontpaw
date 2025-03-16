import ConverterForm from "./sections/ConverterForm";

export const HomePageModule = () => {
  return (
    <div
      id="hero-section"
      className="flex flex-col items-center justify-center min-h-screen px-5 py-20 lg:px-28"
    >
      <main className="py-10">
        <section>
          <p>HALO YUK REGISTER PAWCAT</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Eaque magni blanditiis velit quidem, eius corporis ipsum
            ullam laboriosam hic? Aspernatur nisi culpa harum quidem
            consequuntur quae. Animi hic cumque illo?
          </p>
        </section>

        <section id="converter-section">
          <ConverterForm />
        </section>
      </main>
    </div>
  );
};
