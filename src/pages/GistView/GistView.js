import React, { Component } from "react";
import { connect } from "react-redux";
import GistContent from "components/GistContent/GistContent";
import GistHeader from "components/GistHeader/GistHeader";
import { Gist } from "./GistView.styles";
import { getTimeCreated } from "utilities/utilityFunctions";
import { withRouter } from "hoc/withRouter";
import { getGist, getGistFile } from "api/gist.service";
import withErrorBoundaries from "hoc/withErrorBoundaries";

class GistView extends Component {
  constructor(props) {
    super(props);
    this.state = { gist: "", fileContents: [] };
    this.mockGist = {
      owner: "",
      files: null,
      created_at: "",
      description: "",
      avatar: "",
      username: "",
    };
  }
  componentDidMount() {
    const {
      router: {
        params: { gist_id },
      },
    } = this.props;
    getGist(gist_id).then((res) => this.setState({ gist: res }));
  }

  renderGistFilesContents = (files) => {
    if (files) {
      return Object.keys(files).map((file, i) => {
        return (
          <GistContent
            key={i}
            fileContent={files[file].content.split("\n")}
            filename={Object.keys(files)[i]}
          />
        );
      });
    }
  };

  render() {
    const { owner, files, created_at, forks, description, id } = this.state
      ?.gist
      ? this.state.gist
      : this.mockGist;
    return (
      <Gist>
        {this.state.gist && (
          <>
            <GistHeader
              gist_id={id}
              avatar={owner?.avatar_url}
              username={owner?.login}
              filename={Object.keys(files)[0]}
              created={getTimeCreated(created_at)}
              forks={forks?.length || 0}
            />
            {this.renderGistFilesContents(files)}
          </>
        )}
      </Gist>
    );
  }
}

export default withRouter(withErrorBoundaries(GistView));
