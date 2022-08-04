import { createAGist, getGist, updateAGist } from "api/gist.service";
import FileInput from "components/FileInput/FileInput";
import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { Component } from "react";
import { UpdateGistForm } from "./UpdateGist.styles";
class UpdateGist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gist_descirption: "",
      file_counter: 1,
      submit: false,
      input_files: [],
    };
  }
  componentDidMount() {
    const {
      router: { params },
    } = this.props;

    getGist(params?.gist_id).then((response) => {
      const { files, description } = response;
      const input_files = [];
      let file_id = 0;
      for (const [filename, file] of Object.entries(files)) {
        ++file_id;
        input_files.push({ file_id, filename, file_content: file.content });
      }
      this.setState({
        gist_descirption: description,
        file_counter: Object.keys(files).length,
        input_files,
      });
    });
  }
  handleSubmitClick = (e) => {
    this.setState({ submit: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { gist_descirption: description, input_files } = this.state;
    const {
      params: { gist_id },
      navigate,
    } = this.props.router;
    let files = {};

    input_files.forEach((fileItem) => {
      const { filename, file_content: content } = fileItem;
      files = { ...files, [filename]: { content } };
    });
    const data_obj = { description, files, gist_id };
    updateAGist(data_obj).then((response) => console.log(response));

    this.setState({
      gist_descirption: "",
      file_counter: 1,
      input_files: [{ file_id: 1 }],
      submit: false,
    });
    navigate("/");
  };

  handleDescChange = (e) => {
    this.setState({ gist_descirption: e.target.value });
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

  getAllFiles = (file_id, filename, file_content) => {
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
          input_files: input_files.map((file) => {
            if (file.file_id === file_id) {
              return { ...file, removed: true, file_content: "" };
            }
            return file;
          }),
          file_counter: file_counter - 1,
        }
    );
  };

  renderFileInputFields = (input_files) => {
    return input_files
      .filter((file) => !file?.removed)
      .map(({ file_id, filename, file_content }, i) => (
        <FileInput
          key={file_id}
          file_id={file_id}
          getAllFiles={this.getAllFiles}
          removeFile={this.removeFile}
          submit={this.state.submit}
          filename={filename}
          file_content={file_content}
        />
      ));
  };

  render() {
    const { gist_descirption, file_counter, input_files } = this.state;

    return (
      <UpdateGistForm onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter Gist Description..."
          value={gist_descirption}
          onChange={this.handleDescChange}
        />
        {this.renderFileInputFields(input_files)}
        <button type="button" onClick={this.handleAddFileInput}>
          Add File
        </button>
        <input
          type="submit"
          value="Update Gist"
          onClick={this.handleSubmitClick}
        />
      </UpdateGistForm>
    );
  }
}

export default withRouter(withAuth(UpdateGist));
