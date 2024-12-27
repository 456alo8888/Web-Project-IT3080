import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCode generator
import Modal from "react-modal"; // Example using react-modal

// Set Modal default styles
Modal.setAppElement("#root");

const QRCodeModal = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  console.log(data);
  

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        className="bg-blue-500  hover:opacity-90 transition-all font-medium text-white text-sm px-4 py-2 rounded-full"
        onClick={openModal}
      >
        QR Code
      </button>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="flex items-center justify-center inset-0 fixed bg-gray-800 bg-opacity-80"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      >
        <div className="bg-white rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-lg font-bold mb-4">Your QR Code</h2>

          {/* QR Code Canvas */}
          <QRCodeCanvas
            value={data} // Pass the data to encode in the QR code
            size={400} // QR code size
            level={"H"} // Error correction level
            bgColor={"#ffffff"} // Background color
            fgColor={"#000000"} // Foreground color
          />

          {/* Close Button */}
          <button
            className="mt-4  bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeModal;
