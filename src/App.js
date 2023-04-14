import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getPhotos = async () => {
      const res = await fetch(
        `http://localhost:3004/photos?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getPhotos();
  }, [limit]);

  const fetchPhotos = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3004/photos?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const photosFromServer = await fetchPhotos(currentPage);
    setItems(photosFromServer);
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map((item) => {
          return (
            <div key={item.id} className="col">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title text-center h2">{item.id} </h4>
                  <h4 className="card-title text-center h2">{item.title} </h4>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.url}
                  </h6>
                  <p className="card-text">{item.thumbnailUrl}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
