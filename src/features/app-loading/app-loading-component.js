const AppLoading = () => (
  <div className="items-center flex flex-col flex-1 justify-center bg-red-500 h-full">
    <div
      className="h-10 w-10 border-solid border-2 animate-spin"
      style={{ borderRadius: '50%', borderTopColor: 'red' }}
    ></div>
    <p className="mt-2 text-white">Loading</p>
  </div>
);

export { AppLoading };
