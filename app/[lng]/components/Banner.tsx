type Props = { title: string; text: string };

const Banner: React.FC<Props> = ({ title, text }) => {
  return (
    <div>
      <div className="max-w-full rounded overflow-hidden shadow-lg flex justify-center">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
