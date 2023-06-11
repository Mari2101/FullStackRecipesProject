import { useState } from "react";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import c from "./modalForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItem, List } from "../../features/shoppingList/shoppingListSlice";

const ModalForm = () => {
  const [show, setShow] = useState(false);
  const lists: any = useSelector((state: any) => state.lists);
  const dispatch = useDispatch();

  const handleAddList = () => {
    dispatch(addItem({ id: Date.now(), title: "New Item", description: "" }));
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sweetalertFunc = () => {
    Swal.fire({
      title: "Your Shopping List was saved.",
      icon: "success",
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(300, "Must be less that 300 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning" id={c.addList} onClick={handleShow}>
          Add New Note
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id={c.modalHeader} closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>

        <Modal.Body id={c.modalBody}>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column gap-2">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <p>{formik.errors.title}</p>
              ) : null}

              <label htmlFor="description"></label>
              <textarea
                name="description"
                id="description"
                cols={30}
                placeholder="Description"
                rows={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p>{formik.errors.description}</p>
              ) : null}
              <button
                className="btn btn-success"
                id={c.modalbtn}
                type="submit"
                onClick={() => {
                  handleClose();
                  sweetalertFunc();
                  handleAddList();
                }}
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer id={c.modalFooter}>
          <button
            className="btn btn-danger"
            id={c.modalbtn}
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
