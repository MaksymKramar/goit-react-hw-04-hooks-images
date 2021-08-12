import { useState, useEffect } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import LoaderSpiner from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [searchName, setSearchName] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reqStatus, setReqStatus] = useState("idle");
  const [pageNumber, setPageNumber] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchName) {
      return;
    }

    setReqStatus("pending");

    api
      .fetchImages(searchName, pageNumber)
      .then((data) => data.hits)
      .then((pictures) => {
        if (pictures.length === 0) {
          setReqStatus("rejected");
          alert(`'${searchName}' not found!`);
        }
        setImages((prevImages) => [...prevImages, ...pictures]);
        setReqStatus("resolved");

        if (pageNumber > 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => setError(error), setReqStatus("rejected"));
  }, [searchName, pageNumber]);

  const resetState = () => {
    setSearchName("");
    setPageNumber(1);
    setImages([]);
    setSelectedImage(null);
    setReqStatus("idle");
    setModalIsOpen(false);
  };

  const handleFormSubmit = (searchName) => {
    resetState();
    setSearchName(searchName);
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setSelectedImage({ src, alt });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onLoadMore = () => {
    setPageNumber((prevState) => prevState + 1);
  };

  if (reqStatus === "idle") {
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit} />
      </div>
    );
  }

  if (reqStatus === "pending") {
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit} />
        <ImageGallery openModal={openModal} images={images} />
        <LoaderSpiner />
        {images.length > 0 && <Button onClick={onLoadMore} />}
      </div>
    );
  }

  if (reqStatus === "rejected") {
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit} />
        <h1>{error}</h1>
      </div>
    );
  }

  if (reqStatus === "resolved") {
    return (
      <div className="App">
        <Searchbar onSearch={handleFormSubmit}></Searchbar>
        <ImageGallery images={images} openModal={openModal}></ImageGallery>
        {images.length > 0 && <Button onClick={onLoadMore} />}
        {modalIsOpen && <Modal image={selectedImage} onClose={closeModal} />}
      </div>
    );
  }
}
