import { Icon } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";

import { RiDeleteBack2Fill } from "react-icons/ri";

function AuthorField({
  text,
  showRemove,
  authorChangeValue,
  removeAuthorField,
}) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <TextField
        onChange={authorChangeValue}
        variant="filled"
        label="Author"
        placeholder="Author"
        value={text}
      />
      {showRemove && <RiDeleteBack2Fill onClick={removeAuthorField} />}
    </div>
  );
}

export default AuthorField;
