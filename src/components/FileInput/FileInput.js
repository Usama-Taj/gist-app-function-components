import React, { useState, useEffect } from "react";

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

  // useEffects
  useEffect(() => {
    if (submit) {
      console.log("Submitted Files INput");
      getAllFiles(file_id, filename, file_content);
    }
  }, [submit]);

  //Functions
  const handelFileNameChange = (e) => {
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
      <input
        type="text"
        name={`filename${file_id}`}
        id="file_name"
        placeholder="Enter file name..."
        onChange={handelFileNameChange}
        value={filename}
      />
      <textarea
        name={`file_content${file_id}`}
        id=""
        cols="30"
        rows="10"
        placeholder="Enter File Content..."
        onChange={handleFileContentChange}
        value={file_content}
      ></textarea>
      <button type="button" className="btn-danger" onClick={handleRemoveFile}>
        Remove
      </button>
      <hr style={{ width: "70%" }} />
    </>
  );
};

export default FileInput;

// class FileInput extends Component {
//   constructor(props) {
//     super(props);
//     const { filename, file_content } = props;
//     state = { filename: filename || "", file_content: file_content || "" };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { submit, getAllFiles, file_id } = this.props;
//     const { submit: prev_submit } = prevProps;
//     const { filename, file_content } = this.state;
//     if (submit !== prev_submit) {

//     }
//   }

//   render() {
//     const { file_id, removeFile } = this.props;
//     const { filename, file_content } = this.state;
//     return (
//       <>
//         <input
//           type="text"
//           name={`filename${file_id}`}
//           id="file_name"
//           placeholder="Enter file name..."
//           onChange={this.handelFileNameChange}
//           value={filename}
//         />
//         <textarea
//           name={`file_content${file_id}`}
//           id=""
//           cols="30"
//           rows="10"
//           placeholder="Enter File Content..."
//           onChange={this.handleFileContentChange}
//           value={file_content}
//         ></textarea>
//         <button
//           type="button"
//           className="btn-danger"
//           onClick={this.handleRemoveFile}
//         >
//           Remove
//         </button>
//         <hr style={{ width: "70%" }} />
//       </>
//     );
//   }
// }

// export default FileInput;
