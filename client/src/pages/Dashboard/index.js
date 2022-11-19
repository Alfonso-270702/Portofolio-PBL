import React, { useEffect, useState } from "react";
import { NavbarTop, Table, FormModal } from "../../component";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { laporanListAsync, laporanDeleteAsync } from "../../redux/laporanSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const laporan = useSelector((state) => state.laporan);

  const [show, setShow] = useState(false);
  const [source, setSource] = useState("");
  const [edit, setEdit] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (source) => {
    setSource(source);
    setShow(true);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    dispatch(laporanListAsync()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin untuk menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(laporanDeleteAsync({ id })).then(() => {
          Swal.fire({
            icon: "success",
            title: "Selamat",
            text: "Selamat data berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
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
            <Button
              variant="primary"
              onClick={() => handleShow("add")}
              size="lg"
            >
              Tambah
            </Button>
          </div>
          <Table
            datas={laporan}
            columns={columns}
            loading={loading}
            handleShow={handleShow}
            handleDelete={handleDelete}
            setEdit={setEdit}
          />
        </div>
      </div>
      <FormModal
        show={show}
        handleClose={handleClose}
        source={source}
        edit={edit}
      />
    </>
  );
}
