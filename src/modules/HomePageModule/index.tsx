import ConverterForm from "./sections/ConverterForm";

export const HomePageModule = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-20 lg:px-28">
      <main className="py-10">
        HALO
        {/* Currency Converter */}
        <section>
          <h2>Currency Converter</h2>
          <ConverterForm />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        INI FOOTER
      </footer>
    </div>
  );
};
