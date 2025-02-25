import { cilMinus, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CFormCheck } from "@coreui/react";
import { Fragment, useState } from "react";

const PermissionTree = ({ treeData, handleChange, handleToggleAll }: any) => {
  return (
    <ul>
      {treeData.map((node: any, index: number) => (
        <TreeNode
          node={node}
          key={index}
          handleChange={handleChange}
          index={index}
          handleToggleAll={handleToggleAll}
        />
      ))}
    </ul>
  );
};

export default PermissionTree;
const TreeNode = ({ node, handleChange, handleToggleAll, index }: any) => {
  const { children, moduleName } = node;

  const [showChildren, setShowChildren] = useState(index === 0 ? true : false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  const checkedLength = children.filter((item: any) => item.checked).length;
  return (
    <>
      <div style={{ marginBottom: "10px", cursor: "pointer", fontWeight: 500 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {showChildren ? (
            <CIcon icon={cilMinus} size="lg" onClick={handleClick} />
          ) : (
            <CIcon icon={cilPlus} size="lg" onClick={handleClick} />
          )}

          <CFormCheck
            id="flexCheckIndeterminate"
            label={moduleName}
            indeterminate={
              checkedLength > 0 && children.length !== checkedLength
            }
            checked={children.length === checkedLength}
            onChange={() =>
              handleToggleAll(index, Boolean(children.length === checkedLength))
            }
          />
        </div>
      </div>
      <ul
        style={{
          paddingLeft: "10px",
          marginLeft: "44px",
          borderLeft: "1px solid black",
        }}
      >
        {showChildren &&
          children.map((ele: any, i: number) => (
            <Fragment key={i}>
              <CFormCheck
                id={`${moduleName}_${ele.name}`}
                label={ele.name}
                checked={ele.checked}
                name={`${moduleName}_${ele.name}`}
                onChange={handleChange}
                //inline
              />
            </Fragment>
          ))}
      </ul>
    </>
  );
};
