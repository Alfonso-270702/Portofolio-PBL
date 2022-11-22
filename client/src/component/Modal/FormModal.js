import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import {
  laporanAddAsync,
  laporanEditAsync,
  laporanListAsync,
} from "../../redux/laporanSlice";
import { useDispatch } from "react-redux";

export default function FormModal({ show, handleClose, source, edit = "" }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (source === "edit") {
      reset();
      const fields = [
        "title",
        "nama_kelompok",
        "nama_manpro",
        "nama_ketua",
        "laporan",
      ];
      fields.forEach((field) => setValue(field, edit[field]));
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("nama_kelompok", data.nama_kelompok);
    formData.append("nama_manpro", data.nama_manpro);
    formData.append("nama_ketua", data.nama_ketua);
    formData.append("laporan", data.laporan[0]);
    if (source === "add") {
      dispatch(laporanAddAsync(formData)).then(() => {
        dispatch(laporanListAsync()).then(() => {
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Selamat",
            text: "Selamat data berhasil ditambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        });
      });
    } else if (source === "edit") {
      const id = edit.id;
      dispatch(laporanEditAsync({ formData, id })).then(() => {
        dispatch(laporanListAsync()).then(() => {
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Selamat",
            text: "Selamat data berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        });
      });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {source === "add" ? "Add Form" : "Edit Form"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                {...register("title", {
                  required: "Title tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Title"
              />
              {errors.title && (
                <Form.Text className="text-danger">
                  {errors.title.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kelompok</Form.Label>
              <Form.Control
                {...register("nama_kelompok", {
                  required: "Nama Kelompok tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Kelompok"
              />
              {errors.nama_kelompok && (
                <Form.Text className="text-danger">
                  {errors.nama_kelompok.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Ketua</Form.Label>
              <Form.Control
                {...register("nama_ketua", {
                  required: "Nama Ketua tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Ketua"
              />
              {errors.nama_ketua && (
                <Form.Text className="text-danger">
                  {errors.nama_ketua.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Manpro</Form.Label>
              <Form.Control
                {...register("nama_manpro", {
                  required: "Nama manpro tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Manpro"
              />
              {errors.nama_manpro && (
                <Form.Text className="text-danger">
                  {errors.nama_manpro.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Laporan</Form.Label>
              <Form.Control
                {...register("laporan", {
                  required: "Laporan tidak boleh kosong",
                })}
                type="file"
                placeholder="Masukkan Laporan"
              />
              {errors.laporan && (
                <Form.Text className="text-danger">
                  {errors.laporan.message}
                </Form.Text>
              )}
            </Form.Group>
            <div className="my-4">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button variant="primary" className="ms-3" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
