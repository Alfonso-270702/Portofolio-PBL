import React, { useEffect, useState } from "react";
import { NavbarTop, Table, FormModal } from "../../component";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        title: "Title",
      },
      {
        title: "Nama Kelompok",
      },
      {
        title: "Nama Ketua",
      },
      {
        title: "Nama Manpro",
      },
      {
        title: "Laporan",
      },
      {
        title: "Action",
      },
    ],
    []
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [datas, setDatas] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setDatas(json);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: "Apakah anda yakin untuk menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Selamat",
          text: "Selamat data berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <NavbarTop />
      <div className="container-fluid p-0 mt-5">
        <div className="mx-5">
          <div className="d-flex justify-content-between mb-4">
            <h2>Laporan PBL</h2>
            <Button variant="primary" onClick={handleShow} size="lg">
              Tambah
            </Button>
          </div>
          <Table
            datas={datas}
            columns={columns}
            loading={loading}
            handleShow={handleShow}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <FormModal show={show} handleClose={handleClose} />
    </>
  );
}
