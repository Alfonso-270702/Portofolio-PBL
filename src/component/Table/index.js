import React from "react";
import "./style.css";

export default function Table({
  columns,
  datas,
  loading,
  handleShow,
  handleDelete,
}) {
  return (
    <table className="responsive-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {datas.length > 0 ? (
              <>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <td data-label="Name">{data.name}</td>
                    <td data-label="Username">{data.username}</td>
                    <td data-label="Email">
                      <a href={`mailto:${data.email}`}>{data.email}</a>
                    </td>
                    <td data-label="Phone">
                      <a href={`tel:${data.phone}`}>{data.phone}</a>
                    </td>
                    <td></td>
                    <td data-label="Action">
                      <button
                        type="button"
                        className="btn btn-primary me-3 edit-button"
                        onClick={handleShow}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="4">Tidak ada data</td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
}
