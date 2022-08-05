import { createAGist } from "api/gist.service";
import FileInput from "components/FileInput/FileInput";
import Message from "components/Message/Message";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { useEffect, useState } from "react";
import { AddGistForm, Label } from "./AddGist.styles";

const AddGist = ({ router }) => {
  // Data Variables
  // States
  const [gist_description, setGist_description] = useState("");
  const [file_counter, setFile_counter] = useState(1);
  const [input_files, setInput_files] = useState([{ file_id: 1 }]);
  const [type_public, setType_public] = useState(true);
  const [submit, setSubmit] = useState(false);
  // Functions

  const handleSubmit = (e) => {
    let files = {};
    input_files.forEach((fileItem) => {
      const { filename, file_content: content } = fileItem;
      files = { ...files, [filename]: { content } };
    });
    const data_obj = {
      description: gist_description,
      files,
      public: type_public,
    };
    createAGist(data_obj).then((response) => console.log(response));
    e.preventDefault();
    router.navigate("/");
  };

  const submitClick = (e) => {
    setSubmit(true);
  };

  const handleDescChange = (e) => {
    setGist_description(e.target.value);
  };

  const handleCheck = (e) => {
    setType_public(e.target.checked);
  };

  const handleAddFileInput = (e) => {
    setInput_files([...input_files, { file_id: file_counter + 1 }]);
    setFile_counter(file_counter + 1);
  };

  const getAllFiles = (file_id, filename, file_content) => {
    setInput_files((input_files) => {
      const filtered_input_files = input_files.filter(
        (file) => file.file_id !== file_id
      );
      const new_file = {
        file_id,
        filename,
        file_content,
      };
      return [...filtered_input_files, new_file];
    });
  };

  const removeFile = (file_id) => {
    if (file_counter > 1) {
      setFile_counter(file_counter - 1);
      setInput_files(input_files.filter((file) => file.file_id !== file_id));
    }
  };

  const renderFileInputFields = (input_files) => {
    return input_files.map(({ file_id }, i) => (
      <FileInput
        key={file_id}
        file_id={file_id}
        getAllFiles={getAllFiles}
        removeFile={removeFile}
        submit={submit}
      />
    ));
  };
  return (
    <AddGistForm onSubmit={handleSubmit}>
      <input
        type="text"
        name="desc"
        id="desc"
        placeholder="Enter Gist Description..."
        value={gist_description}
        onChange={handleDescChange}
      />
      <div>
        <Label>Public Gist:</Label>
        <input
          type="checkbox"
          name="gist_type"
          id="gist_type"
          onChange={handleCheck}
          checked={type_public}
        />
      </div>
      {renderFileInputFields(input_files)}
      <button type="button" onClick={handleAddFileInput}>
        Add File
      </button>
      <input type="submit" value="Create Gist" onClick={submitClick} />
    </AddGistForm>
  );
};

export default withRouter(withAuth(AddGist));
