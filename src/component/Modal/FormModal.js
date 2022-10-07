import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

export default function FormModal({ show, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Form</Modal.Title>
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
                {...register("kelompok", {
                  required: "Nama Kelompok tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Kelompok"
              />
              {errors.kelompok && (
                <Form.Text className="text-danger">
                  {errors.kelompok.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Ketua</Form.Label>
              <Form.Control
                {...register("ketua", {
                  required: "Nama Ketua tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Ketua"
              />
              {errors.ketua && (
                <Form.Text className="text-danger">
                  {errors.ketua.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Manpro</Form.Label>
              <Form.Control
                {...register("manpro", {
                  required: "Nama manpro tidak boleh kosong",
                })}
                type="text"
                placeholder="Masukkan Nama Manpro"
              />
              {errors.manpro && (
                <Form.Text className="text-danger">
                  {errors.manpro.message}
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
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !dirtyFields.title ||
                  !dirtyFields.kelompok ||
                  !dirtyFields.ketua ||
                  !dirtyFields.manpro ||
                  !dirtyFields.laporan
                }
              >
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
