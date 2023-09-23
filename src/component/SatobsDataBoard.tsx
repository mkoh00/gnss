import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface DataType {
  key: string;
  mount_point: string;
  time_stamp: string;
  sat_type: string;
  sat_id: string;
  sig_idx: number;
  code: string;
  snr: number;
}

interface Props {
  data: DataType[];
  itemsPerPage: number;
}

const SatobsDataBoard: React.FC<Props> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    setEndPage((prev) => prev - 10);
    setCurrentPage((prev) => prev - 10);
  };

  const handleNextClick = () => {
    if (endPage >= totalPages) return;
    setStartPage((prev) => prev + 10);
    setEndPage((prev) => prev + 10);
    setCurrentPage((prev) => prev + 10);
  };

  const slicedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-5">
      <h1>SNR Data Table</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Mount Point</th>
            <th>Timestamp</th>
            <th>Satellite Type</th>
            <th>Satellite ID</th>
            <th>Signal Index</th>
            <th>Code</th>
            <th>SNR</th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{item.mount_point}</td>
              <td>{item.time_stamp}</td>
              <td>{item.sat_type}</td>
              <td>{item.sat_id}</td>
              <td>{item.sig_idx}</td>
              <td>{item.code}</td>
              <td>{item.snr}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li
              className={`page-item ${startPage === 1 ? "disabled" : ""}`}
              onClick={startPage === 1 ? undefined : handlePrevClick}
            >
              <button className="page-link">&lt; Prev</button>
            </li>
            {[...Array(10)].map((_, idx) => {
              const pageNumber = startPage + idx;
              if (pageNumber > totalPages) return null;
              return (
                <li
                  key={idx}
                  className={`page-item ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  <button className="page-link">{pageNumber}</button>
                </li>
              );
            })}
            <li
              className={`page-item ${endPage >= totalPages ? "disabled" : ""}`}
              onClick={endPage >= totalPages ? undefined : handleNextClick}
            >
              <button className="page-link">Next &gt;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SatobsDataBoard;
