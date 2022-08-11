import { FileTextOutlined } from "@ant-design/icons";
import { Input, Switch } from "antd";
import { createAGist } from "api/gist.service";
import Button from "components/common/Button/Button";
import FileInput from "components/common/FileInput/FileInput";
import Message from "components/Message/Message";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { useCallback, useEffect, useState } from "react";
import {
  AddFileButton,
  CreateOrUpdateGistButton,
  TextField,
  GistTypeSwitch,
} from "shared-styles/InputFields.styles";
import { AddGistForm } from "./AddGist.styles";

const AddGist = ({ router }) => {
  // Data Variables
  // States
  const [gist_description, setGist_description] = useState("");
  const [file_counter, setFile_counter] = useState(1);
  const [input_files, setInput_files] = useState([{ file_id: 1 }]);
  const [type_public, setType_public] = useState(true);
  const [submit, setSubmit] = useState(false);
  // Functions

  const handleSubmit = useCallback(
    (e) => {
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
      console.log("Data to Submit", data_obj);
      createAGist(data_obj).then((response) => console.log(response));
      router.navigate(`/profile/${process.env.USERNAME}`);
      e.preventDefault();
    },
    [gist_description, input_files, file_counter, type_public]
  );

  const submitClick = useCallback(
    (e) => {
      setSubmit(true);
    },
    [submit]
  );

  const handleDescChange = useCallback(
    (e) => {
      setGist_description(e.target.value);
    },
    [gist_description]
  );

  const handleCheck = useCallback(
    (checked) => {
      setType_public(checked);
    },
    [type_public]
  );

  const handleAddFileInput = useCallback(
    (e) => {
      setInput_files((input_files) => [
        ...input_files,
        { file_id: file_counter + 1 },
      ]);
      setFile_counter(file_counter + 1);
    },
    [input_files, file_counter]
  );

  const getAllFiles = useCallback(
    (file_id, filename, file_content) => {
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
    },
    [input_files]
  );
  const removeFile = useCallback(
    (file_id) => {
      if (file_counter > 1) {
        setInput_files(input_files.filter((file) => file.file_id !== file_id));
      }
    },
    [file_counter, input_files]
  );

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
      <TextField
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={gist_description}
        onChange={handleDescChange}
        autoComplete="off"
      />
      <GistTypeSwitch
        checkedChildren="Public"
        unCheckedChildren="Private"
        defaultChecked
        onChange={handleCheck}
        checked={type_public}
      />
      {renderFileInputFields(input_files)}
      <Button type="primary" htmlType="button" onClick={handleAddFileInput}>
        Add File
      </Button>
      <Button htmlType="submit" type="primary" block onClick={submitClick}>
        Create Gist
      </Button>
    </AddGistForm>
  );
};

export default withRouter(withAuth(AddGist));
