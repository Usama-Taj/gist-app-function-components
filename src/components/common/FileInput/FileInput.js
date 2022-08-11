import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import {
  FileContent,
  RemoveFileButton,
  TextField,
} from "shared-styles/InputFields.styles";
import { Divider } from "shared-styles/StyledComponents.styles";
import Button from "../Button/Button";

const FileInput = ({
  filename: filename_prop,
  file_content: file_content_prop,
  getAllFiles,
  file_id,
  submit,
  removeFile,
}) => {
  // States
  const [filename, setFilename] = useState(filename_prop || "");
  const [file_content, setFile_content] = useState(file_content_prop || "");

  // UseLayoutEffects
  useLayoutEffect(() => {
    if (submit) {
      getAllFiles(file_id, filename, file_content);
    }
  }, [submit]);

  //Functions
  const handleFileNameChange = (e) => {
    setFilename(e.target.value);
  };

  const handleFileContentChange = (e) => {
    setFile_content(e.target.value);
  };

  const handleRemoveFile = (e) => {
    removeFile(file_id);
  };

  //Rendering
  return (
    <>
      <TextField
        type="text"
        name={`filename${file_id}`}
        id="file_name"
        placeholder="Enter file name..."
        onChange={handleFileNameChange}
        value={filename}
        autoComplete="off"
      />
      <FileContent
        name={`file_content${file_id}`}
        id=""
        cols={30}
        rows={10}
        placeholder="Enter File Content..."
        onChange={handleFileContentChange}
        value={file_content}
        autoComplete="off"
      />
      <Button
        danger={true}
        type="primary"
        htmlType="button"
        onClick={handleRemoveFile}
      >
        Remove
      </Button>
      <Divider>File End</Divider>
    </>
  );
};

export default FileInput;

// class FileInput extends Component {
//   constructor(props) {
//     super(props);
//     const { filename, file_content } = this.props;
//     this.state = { filename: filename || "", file_content: file_content || "" };
//   }
//   handleFileNameChange = (e) => {
//     this.setState({ filename: e.target.value });
//   };

//   handleFileContentChange = (e) => {
//     this.setState({ file_content: e.target.value });
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { submit, getAllFiles, file_id } = this.props;
//     const { submit: prev_submit } = prevProps;
//     const { filename, file_content } = this.state;
//     if (submit !== prev_submit) {
//       getAllFiles(file_id, filename, file_content);
//       this.setState({ file_content: "", filename: "" });
//     }
//   }
//   handleRemoveFile = (e) => {
//     const { removeFile, file_id } = this.props;
//     removeFile(file_id);
//   };
//   render() {
//     const { file_id, removeFile } = this.props;
//     const { filename, file_content } = this.state;
//     return (
//       <>
//         <TextField
//           type="text"
//           name={`filename${file_id}`}
//           id="file_name"
//           placeholder="Enter file name..."
//           onChange={this.handleFileNameChange}
//           value={filename}
//         />
//         <FileContent
//           name={`file_content${file_id}`}
//           id=""
//           cols={30}
//           rows={10}
//           placeholder="Enter File Content..."
//           onChange={this.handleFileContentChange}
//           value={file_content}
//         />
//         <RemoveFileButton
//           htmlType="button"
//           type="danger"
//           className="btn-danger"
//           onClick={this.handleRemoveFile}
//         >
//           Remove
//         </RemoveFileButton>
//         <hr style={{ width: "70%" }} />
//       </>
//     );
//   }
// }

// export default FileInput;
