const Spinner = () => {
  return (
   <div style={{ height: "80vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
     <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
   </div>
  );
};

export default Spinner;
