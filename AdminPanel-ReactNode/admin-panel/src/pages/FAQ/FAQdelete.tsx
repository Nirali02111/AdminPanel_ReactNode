import { CButton } from "@coreui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";

import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteFaqAPI } from "../../services/faqService";

interface FaqDeleteProps {
  id: string;
  fetchFaq: () => Promise<void>;
}
const FAQdelete: React.FC<FaqDeleteProps> = ({ id, fetchFaq }) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      await deleteFaqAPI(id);

      fetchFaq();
    });
  };
  return (
    <CButton color="danger" onClick={handleDelete} className="deleteButton">
      <FontAwesomeIcon icon={faTrash} />
    </CButton>
  );
};

export default FAQdelete;
