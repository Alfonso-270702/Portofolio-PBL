import React from "react";
import "./style.css";

export default function Table({
  columns,
  datas,
  loading,
  handleShow,
  handleDelete,
  setEdit,
}) {
  const download = (data) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}${data.laporan}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          const fileName = data.laporan.split("\\")[1];
          link.href = url;
          link.setAttribute("download", fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                    <td data-label="Title">{data.title}</td>
                    <td data-label="Nama_Kelompok">{data.nama_kelompok}</td>
                    <td data-label="Nama_Ketua">{data.nama_ketua}</td>
                    <td data-label="Nama_Manpro">{data.nama_manpro}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary me-3 edit-button"
                        onClick={() => {
                          download(data);
                        }}
                      >
                        Download Laporan
                      </button>
                    </td>
                    <td data-label="Action">
                      <button
                        type="button"
                        className="btn btn-primary me-3 edit-button"
                        onClick={() => {
                          handleShow("edit");
                          setEdit(data.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(data.id)}
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
