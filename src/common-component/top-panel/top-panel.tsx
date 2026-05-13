import { useState } from "react";
import Modal from "../modal/modal";
import "./top-panel.scss";
import AddContacts from "../../page/chat-module/add-contacts/add-contacts";
import { headerConfig } from "./config/config";

type headerPanelProps = {
  pathName: string;
};

const TopPanel = ({ pathName }: headerPanelProps) => {
  const config = headerConfig[pathName];
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="top-header-panel">
      <div className="top-sections">
        <div className="icon-section">
          <img src="/assets/icons/Logo.svg"></img>
          <span className="bold-text-medium-xs">{config?.title}</span>
        </div>
        <div className="search-section">
          {config?.buttons?.includes("search") && (
            <img src="/assets/icons/search-icon.svg"></img>
          )}
          {config?.buttons?.includes("add") && (
            <img src="/assets/icons/add.svg" onClick={handleModal}></img>
          )}
        </div>
      </div>

      {openModal && (
        <Modal title={"Add Contacts"} onClose={handleClose}>
          <AddContacts onClose={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default TopPanel;
