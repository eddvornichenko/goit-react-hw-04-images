import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPhotos } from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { AppWrapper } from './App.styled';
import { scrollToBottom } from 'utils/scroll';

export const App = ()=>{

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [forModalLink, setForModalLink] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const fetchPhotosImg = async () => {
      if (!searchQuery) return;

      setLoading(true);

      try {
        const { hits, totalHits } = await fetchPhotos(searchQuery, page);

        setCards(prevCards => [...prevCards, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));

        if (totalHits === 0) {
          toast.warning(
            'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
          );
        }
      } catch (error) {
        console.log(error);
        toast.error('Щось пішло не так.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotosImg();
  }, [searchQuery, page]);

  const addPage = () => {
    setPage(prevPage => prevPage + 1);
    scrollToBottom();
  };

  const handleFormSubmit = searchText => {
    setSearchQuery(searchText);
    setPage(1);
    setCards([]);
  };

  const handleShowModal = link => {
    setShowModal(true);
    setForModalLink(link);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />
      {cards.length !== 0 && (
        <ImageGallery imagesArray={cards} showModal={handleShowModal} />
      )}
      {loading && <Loader />}
      {loadMore && <Button handleClick={addPage}></Button>}
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <img src={forModalLink} alt="" />
        </Modal>
      )}
    </AppWrapper>
  );
}


