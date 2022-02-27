type PaginationState = {
  total: number;
  limit: number;
  setPage: Function;
};

function Pagination({ total, limit, setPage }: PaginationState) {
  const pageNumbers: Array<number> = Array.from(
    { length: Math.ceil(total / limit) },
    (_, index) => ++index
  );

  const handlePage = (number: number) => {
    setPage(number);
  };

  return (
    <footer className="flex-center">
      {pageNumbers.map((number) => (
        <button
          className="pageNumber"
          key={number}
          onClick={() => handlePage(number)}
        >
          {number}
        </button>
      ))}
    </footer>
  );
}

export default Pagination;
