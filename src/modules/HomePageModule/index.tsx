import ConverterForm from "./sections/ConverterForm";
import Home from "./sections/Home";
import Image from "next/image";

export const HomePageModule = () => {
  return (
    <main
      id="hero-section"
      className="flex flex-col max-lg:items-center justify-center min-h-screen w-full lg:px-28"
    >
      <section className="relative flex items-center h-screen">
        <div className="absolute top-0 -left-5 lg:-left-28 max-lg:w-full w-3/4 h-screen -z-50">
          <Image
            src="/Divide.svg"
            alt="divider"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <Home />

        <div className="max-lg:hidden absolute -right-28 -translate-y-10 -z-30">
          <Image
            src="/Hero.png"
            alt="hero"
            width={800}
            height={1000}
            objectFit="contain"
          />
        </div>
      </section>

      <section
        id="converter-section"
        className="relative flex items-center"
      >
        <div className="max-lg:hidden absolute -right-28 w-3/4 h-screen -z-50 ">
          <Image
            src="/Divide.svg"
            alt="divider"
            layout="fill"
            objectFit="cover"
            className="transform scale-x-[-1]"
          />
        </div>

        <div className="max-lg:hidden absolute -right-28 -z-30">
          <Image
            src="/BolaDunia.png"
            alt="boladunia"
            width={800}
            height={400}
            objectFit="contain"
          />
        </div>

        <ConverterForm />
      </section>
    </main>
  );
};
