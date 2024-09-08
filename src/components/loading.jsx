import AppLogo from "./logo";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <AppLogo
        width={120}
        height={120}
        className="duration-[0.9s] animate-pulse ease-in-out"
      />
    </div>
  );
};

export default Loading;
