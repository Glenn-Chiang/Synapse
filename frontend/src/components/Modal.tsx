const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-20 fixed top-0 left-0 w-screen h-screen bg-slate-950 bg-opacity-80 justify-center items-center flex">
      <div className="bg-slate-900 bg-opacity-100 p-4 rounded-md flex flex-col gap-4 w-11/12 sm:w-2/3">
        {children}
      </div>
    </div>
  );
};

export {Modal}