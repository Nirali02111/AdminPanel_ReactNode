import React from "react";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteRoleAPI } from "../../services/roleService";

interface RoleDeleteProps {
  id: number;
  fetchRoles: () => Promise<void>;
}

const Roledelete: React.FC<RoleDeleteProps> = ({ id, fetchRoles }) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      const response = await deleteRoleAPI(id);
      fetchRoles();
    }, "Role");
  };

  return (
    <CButton color="danger" onClick={handleDelete} className="deleteButton">
      <FontAwesomeIcon icon={faTrash} />
    </CButton>
  );
};

export default Roledelete;
