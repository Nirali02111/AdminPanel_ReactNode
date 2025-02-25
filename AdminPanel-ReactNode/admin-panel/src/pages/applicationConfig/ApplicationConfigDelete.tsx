import React from "react";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteApplicationConfigurationAPI } from "../../services/applicationConfigurationService";

interface ApplicationConfigDeleteProps {
  id: number;
  fetchApplicationConfigs: () => Promise<void>;
}

const ApplicationConfigDelete: React.FC<ApplicationConfigDeleteProps> = ({
  id,
  fetchApplicationConfigs,
}) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      await deleteApplicationConfigurationAPI(id);
      fetchApplicationConfigs(); // Assuming fetchApplicationConfigs fetches all configs after deletion
    });
  };

  return (
    <CButton color="danger" onClick={handleDelete} className="deleteButton">
      <FontAwesomeIcon icon={faTrash} />
    </CButton>
  );
};

export default ApplicationConfigDelete;
