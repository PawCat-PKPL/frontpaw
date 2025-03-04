import Image from "next/image";
import { CURRENCIES } from "./const";

interface CurrencySelectProps {
  selectedCurrency: string;
  handleCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  selectedCurrency,
  handleCurrency,
}) => {
  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="w-full">
      <Image
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt="Flag"
        width={52}
        height={32}
      />
      <select
        onChange={handleCurrency}
        className="w-full truncate focus:outline-none"
        value={selectedCurrency}
      >
        {CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            ({currency.code}) {currency.country}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CurrencySelect;
