import "./App.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

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
      // console.log(Math.ceil(total/12));
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
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const photosFormServer = await fetchPhotos(currentPage);
    setItems(photosFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (
    <div className="container">
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
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
        containerClassName={"pagination justify-content-center"}
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
