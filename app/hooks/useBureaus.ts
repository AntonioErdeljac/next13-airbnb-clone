import { bureaus } from '../libs/bureaus';

const formattedBureaus = bureaus.map((bureau) => ({
  value: bureau.name,
  label: bureau.name,
  latlng: bureau.latlng,
  region: bureau.region,
}));

const useBureaus = () => {
  const getAll = () => formattedBureaus;

  const getByValue = (value: string) => {
    return formattedBureaus.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useBureaus;
