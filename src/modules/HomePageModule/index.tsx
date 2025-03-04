import ConverterForm from "./sections/ConverterForm";

export const HomePageModule = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        HALO
        {/* Currency Converter */}
        <section>
          <h2 className="converter-title">Currency Converter</h2>
          <ConverterForm />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        INI FOOTER
      </footer>
    </div>
  );
};
