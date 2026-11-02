const Filter = ({ filterName, handleFilter }) => {
  return (
    <p>
      filter shown with <input value={filterName} onChange={handleFilter} />
    </p>
  );
};

export default Filter;
