import { createAGist } from "api/gist.service";
import FileInput from "components/FileInput/FileInput";
import Message from "components/Message/Message";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { Component } from "react";
import { AddGistForm, Label } from "./AddGist.styles";
class AddGist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gist_descirption: "",
      file_counter: 1,
      submit: false,
      type_public: false,
      input_files: [{ file_id: 1 }],
      checked: true,
      public_gist: true,
    };
  }
  submitClick = (e) => {
    this.setState({ submit: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      gist_descirption: description,
      input_files,
      public_gist,
    } = this.state;
    const { router } = this.props;
    let files = {};
    console.log("Files On Submit", input_files);
    input_files.forEach((fileItem) => {
      const { filename, file_content: content } = fileItem;
      files = { ...files, [filename]: { content } };
    });
    const data_obj = { description, files, public: public_gist };
    createAGist(data_obj).then((response) => console.log(response));

    this.setState({
      gist_descirption: "",
      file_counter: 1,
      input_files: [{ file_id: 1 }],
      submit: false,
    });

    router.navigate("/");
  };

  handleDescChange = (e) => {
    this.setState({ gist_descirption: e.target.value });
  };

  handleCheck = (e) => {
    this.setState({ public_gist: e.target.checked });
  };

  handleAddFileInput = (e) => {
    this.setState(({ input_files, file_counter }, props) => {
      const new_file = { file_id: file_counter + 1 };
      return {
        file_counter: file_counter + 1,
        input_files: [...input_files, new_file],
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.submit) {
      console.log("Input Files After Submit", this.state.input_files);
    }
  }

  getAllFiles = (file_id, filename, file_content) => {
    console.log("File Data", file_id, filename, file_content);
    this.setState(({ input_files }, props) => {
      const new_file = {
        file_id,
        filename,
        file_content,
      };
      const filtered_input_files = input_files.filter(
        (file) => file.file_id !== file_id
      );
      return {
        input_files: [...filtered_input_files, new_file],
      };
    });
  };

  removeFile = (file_id) => {
    this.setState(
      ({ input_files, file_counter }, props) =>
        file_counter > 1 && {
          input_files: input_files.filter((file) => file.file_id !== file_id),
          file_counter: file_counter - 1,
        }
    );
  };

  handleGistType = (e) => {
    this.setState({ type_public: e.target.checked });
  };

  renderFileInputFields = (input_files) => {
    return input_files.map(({ file_id }, i) => (
      <FileInput
        key={file_id}
        file_id={file_id}
        getAllFiles={this.getAllFiles}
        removeFile={this.removeFile}
        submit={this.state.submit}
      />
    ));
  };

  render() {
    const { gist_descirption, file_counter, input_files, public_gist } =
      this.state;

    return (
      <AddGistForm onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter Gist Description..."
          value={gist_descirption}
          onChange={this.handleDescChange}
        />
        <div>
          <Label>Public Gist:</Label>
          <input
            type="checkbox"
            name="gist_type"
            id="gist_type"
            onChange={this.handleCheck}
            checked={public_gist}
          />
        </div>
        {this.renderFileInputFields(input_files)}
        <button type="button" onClick={this.handleAddFileInput}>
          Add File
        </button>
        <input type="submit" value="Create Gist" onClick={this.submitClick} />
      </AddGistForm>
    );
  }
}

export default withRouter(withAuth(AddGist));
