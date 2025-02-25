import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteUserAPI } from "../../services/userService";

interface UserDeleteProps {
  id: string;
  fetchUsers: () => Promise<void>;
}

const Userdelete: React.FC<UserDeleteProps> = ({ id, fetchUsers }) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      await deleteUserAPI(id);
      fetchUsers();
    }, "User");
  };
  return (
    <>
      <CButton color="danger" onClick={handleDelete} className="deleteButton">
        <FontAwesomeIcon icon={faTrash} />
      </CButton>
    </>
  );
};

export default Userdelete;
