type Props = {
  title: string | undefined;
  text: string | undefined;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

const Banner: React.FC<Props> = ({ title, text, children }) => {
  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg justify-center">
      <div className="max-w-full flex justify-center">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          {text?.split('\n').map((line, ind) => (
            <p key={`l${ind}`} className="text-gray-700 text-base">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="max-w-full flex justify-center">
        <>
          {children}
        </>
      </div>
    </div>
  );
};

export default Banner;
