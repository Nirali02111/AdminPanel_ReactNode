import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { confirmDelete } from "../../helpers/confirmDelete";
import { deleteEmailTemplateAPI } from "../../services/emailTemplateService";

interface EmailTemplateDeleteProps {
  id: number;
  fetchEmailTemplates: () => Promise<void>;
}

const EmailTemplatedelete: React.FC<EmailTemplateDeleteProps> = ({
  id,
  fetchEmailTemplates,
}) => {
  const handleDelete = async () => {
    await confirmDelete(async () => {
      await deleteEmailTemplateAPI(id);
      fetchEmailTemplates();
    }, "Email Template");
  };

  return (
    <CButton color="danger" onClick={handleDelete} className="deleteButton">
      <FontAwesomeIcon icon={faTrash} />
    </CButton>
  );
};

export default EmailTemplatedelete;
