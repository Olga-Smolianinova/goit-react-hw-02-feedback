import React, { useEffect } from 'react';

import { createPortal } from 'react-dom'; //для создания портала, куда будем рендерить разметку компонента Modal

import './Modal.css';

// для портала. ccылка к корневому элементу в index.html куда будем рендерить разметку компонента Modal.
const modalRoot = document.querySelector('#modal-root');

// с React Hooks
export default function Modal({ onClose, children }) {
  useEffect(() => {
    // можно перенести эту функцию внутрь useEffect и в массив зависимостей передать [onClose]. В этом случае если onClose не мемоизирован, то при каждом новом prop - useEffect  каждый раз будет перегоняться, но разницы никакой, т.к. будет очищаться, потому что у нас прописан return.
    //Вариант 2.  Можно вынести из useEffect и прокинуть в useCallback.
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        // console.log('ESC');

        //  прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // аналог componentWillUnmount()
    return () => {
      //  снимаем слушателя события с window при закрытии Модального окна по нажатию на ESC
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // закрытие Модального окна по нажатию на backdrop. Чтобы модалка закрылась currentTarget и target должны быть ===
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Modal__backdrop" onClick={handleBackdropClick}>
      <div className="Modal__content">{children}</div>
    </div>,
    modalRoot,
  );
}

// без React Hooks
// class Modal extends Component {
//   componentDidMount() {
//     // console.log('Modal componentDidMount');

//     //при 1 стадии монтирования вешаем слушателя события на window  для закрытия Модального окна по нажатию на ESC сперва
//     window.addEventListener('keydown', this.handleKeyDown, { once: true }); //нововведение - 3 аргументом передать объект настроек {once: true} - которые обозначает, что после выполнения window.addEventListener, он сам его разрегестрирует и закомментировать componentWillUnmount() для размонтирования. Но это будет работать только в Google Chrome!!!! Удобно использовать если нужно использовать только один раз, закрыть модальное окно в этом случае не получится
//   }

//   // на стадии размонтирования и зачистки кода после использования.
//   // componentWillUnmount() {
//   //   // снимаем слушателя события с window при закрытии Модального окна по нажатию на ESC
//   //   window.removeEventListener('keydown', this.handleKeyDown);
//   // }

//   // закрытие Модального окна по нажатию на ESC
//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       // console.log('ESC');

//       // в props прокидываем toggleModal для возможности закрыть модалку по нажатию на "Escape"
//       this.props.onClose();
//     }
//   };

//   // закрытие Модального окна по нажатию на backdrop. Чтобы модалка закрылась currentTarget и target должны быть ===
//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     // возвращаем результат вызова import { createPortal } from 'react-dom'куда будем рендерить разметку компонента Modal и 1) первым параметром передаем разметку мадального окна; 2) ссылка на корневой элемент в index.html
//     return createPortal(
//       <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
//         <div className="Modal__content">{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// export default Modal;
