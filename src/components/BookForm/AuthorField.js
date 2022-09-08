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
    <div className="author__container">
      <TextField
        onChange={authorChangeValue}
        variant="filled"
        label="Author"
        placeholder="Author"
        value={text}
        InputProps={{ disableUnderline: true }}
      />
      {showRemove && (
        <RiDeleteBack2Fill
          onClick={removeAuthorField}
          className="author__removeicon"
        />
      )}
    </div>
  );
}

export default AuthorField;
