import React, { useState, useEffect, useCallback } from "react";
import { getGist, updateAGist } from "api/gist.service";
import FileInput from "components/common/FileInput/FileInput";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import { UpdateGistForm } from "./UpdateGist.styles";
import {
  AddFileButton,
  CreateOrUpdateGistButton,
  TextField,
} from "shared-styles/InputFields.styles";

const UpdateGist = ({ router: { params, navigate } }) => {
  // Data Variables
  // States
  const [gist_description, setGist_description] = useState("");
  const [file_counter, setFile_counter] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [input_files, setInput_files] = useState([]);
  const [username, setUsername] = useState("");
  // useEffects
  useEffect(() => {
    if (params?.gist_id) {
      getGist(params?.gist_id).then((response) => {
        const {
          files,
          description,
          owner: { login },
        } = response;
        const data_input_files = [];
        let file_id = 0;
        for (const [filename, file] of Object.entries(files)) {
          ++file_id;
          data_input_files.push({
            file_id,
            filename,
            file_content: file.content,
          });
        }
        setUsername(login);
        setGist_description(description);
        setFile_counter(Object.keys(files).length);
        setInput_files(data_input_files);
      });
    }
  }, []);
  // Functions
  const handleSubmitClick = (e) => {
    setSubmit(true);
  };
  const handleSubmit = (e) => {
    let files = {};

    input_files.forEach((fileItem) => {
      const { filename, file_content: content } = fileItem;
      files = { ...files, [filename]: { content } };
    });
    const data_obj = {
      description: gist_description,
      files,
      gist_id: params.gist_id,
    };
    console.log("Dat Object", data_obj);
    updateAGist(data_obj).then((response) => console.log(response));
    navigate(`/profile/${username}`);
    e.preventDefault();
  };

  const handleDescChange = (e) => {
    setGist_description(e.target.value);
  };

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

  const removeFile = useCallback(
    (file_id) => {
      if (file_counter > 1) {
        setInput_files((input_files) => {
          const updated_input_files = input_files.map((file) => {
            if (file.file_id === file_id) {
              return { ...file, removed: true, file_content: "" };
            }
            return file;
          });
          return updated_input_files;
        });
      }
    },
    [file_counter, input_files]
  );

  const renderFileInputFields = (input_files) => {
    return input_files
      .filter((file) => !file?.removed)
      .map(({ file_id, filename, file_content }, i) => (
        <FileInput
          key={file_id}
          file_id={file_id}
          getAllFiles={getAllFiles}
          removeFile={removeFile}
          submit={submit}
          filename={filename}
          file_content={file_content}
        />
      ));
  };
  // Rendering
  return (
    <UpdateGistForm onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="description"
        id="description"
        placeholder="Description"
        value={gist_description}
        onChange={handleDescChange}
        autoComplete="off"
      />
      {renderFileInputFields(input_files)}
      <AddFileButton htmlType="button" onClick={handleAddFileInput}>
        Add File
      </AddFileButton>
      <CreateOrUpdateGistButton
        htmlType="submit"
        block
        onClick={handleSubmitClick}
      >
        Update Gist
      </CreateOrUpdateGistButton>
    </UpdateGistForm>
  );
};

export default withRouter(withAuth(UpdateGist));
