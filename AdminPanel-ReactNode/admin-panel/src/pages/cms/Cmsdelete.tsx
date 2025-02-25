import React from "react";
import axios from "axios";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteCMSAPI } from "../../services/cmsService";

interface CMSDeleteProps {
  id: string;
  fetchItems: () => Promise<void>;
}

const Cmsdelete: React.FC<CMSDeleteProps> = ({ id, fetchItems }) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      await deleteCMSAPI(id);
      // await axios.delete(`${apiBaseUrl}/cmsmanagements/${id}`, {
      //     headers: {
      //         Authorization: `Bearer ${token1}`,
      //     },
      // });

      fetchItems();
    }, "CMS");
  };

  return (
    <CButton color="danger" onClick={handleDelete} className="deleteButton">
      <FontAwesomeIcon icon={faTrash} />
    </CButton>
  );
};

export default Cmsdelete;
