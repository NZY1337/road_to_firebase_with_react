import React from "react";

// quill
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ImageResize } from "quill-image-resize-module";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

// others...
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";
import Grid from "@material-ui/core/Grid";

// Editor Preview
import EditorPreview from "./editorPreview";

Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageHandler", imageHandler);

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.id;

    this.editorRef = React.createRef();

    this.state = {
      quillEditor: null,
      content: {
        editorContent: null,
        category: "blog",
        description: "",
        cover: "",
        title: "",
      },
      minify: true,
      user: null,
    };
  }

  //! to STORAGE
  handeUploadCoverImage = async (file) => {
    try {
      const imgRef = this.props.firebase.storage.ref(
        `/${this.state.content.category}/${this.state.user}/images/cover/${file.name}`
      );
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      const content = { ...this.state.content };
      content.cover = downloadUrl;

      this.setState({ content });
    } catch (err) {
      console.log(err);
    }
  };

  //! to STORAGE
  handleUploadContentEditorImage = async (file) => {
    try {
      const imgRef = this.props.firebase.storage.ref(
        `/${this.state.content.category}/${this.state.user}/images/content/${file.name}`
      );
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      return downloadUrl;
    } catch (err) {
      console.log(err);
    }
  };

  //! to DB
  handleAddPost = () => {
    if (this.props.location.state) {
      this.props.firebase.db
        .ref(`/${this.state.content.category}/${this.state.user}/${this.postId}/`)
        .set(this.state.content, (err) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({ content: this.state.quillEditor.editor.setText("") });
          }
        });
    } else {
      this.props.firebase.db
        .ref(`/${this.state.content.category}/${this.state.user}/`)
        .push(this.state.content, (err) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({ content: this.state.quillEditor.editor.setText("") });
          }
        });
    }
  };

  onHandlePostPreview = (e) => {
    const content = { ...this.state.content };

    if (e.currentTarget.type === "file") {
      content.cover = e.currentTarget.files[0];
      this.handeUploadCoverImage(e.currentTarget.files[0]);
    } else {
      content[e.target.name] = e.target.value;
      //   console.log(e.target.name, e.currentTarget.name);
    }

    this.setState({
      content: content,
    });
  };

  createInput = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    return input;
  };

  quillImageCallback = async () => {
    const input = this.createInput();
    input.click();

    input.onchange = async (e) => {
      const file = e.target.files[0] || null;

      if (file) {
        const range = this.state.quillEditor.editor.getSelection(true);

        this.setState({
          editor: this.state.quillEditor.editor.insertEmbed(
            range.index,
            "image",
            "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          ),
          editor: this.state.quillEditor.editor.setSelection(range.index + 1),
        });

        const imgUrl = await this.handleUploadContentEditorImage(file);

        this.setState({
          editor: this.state.quillEditor.editor.deleteText(range.index, 1),
          editor: this.state.quillEditor.editor.insertEmbed(range.index, "image", imgUrl),
        });
      }
    };
  };

  handleChange = (html) => {
    const { ops } = this.state.quillEditor.editor.getContents();

    const content = { ...this.state.content };
    content.editorContent = html;
    this.setState({ content });
  };

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  componentDidMount() {
    if (this.props.location.state) {
      const { data } = this.props.location.state;

      const content = {
        title: data.title,
        editorContent: data.editorContent,
        category: data.category,
        description: data.description,
        cover: data.cover,
      };

      this.setState({ content });
    }

    this.setState({
      quillEditor: this.editorRef.current,
    });

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
      }
    });
  }

  render() {
    const { content } = this.state;

    //!{TODO} - import QUill_js const from another file and bind this to the actual context
    const Quill_JS = {
      modules: {
        toolbar: {
          container: [
            [{ header: 1 }, { header: 2 }, { font: [] }],
            [{ header: [] }],
            [{ size: [] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
            [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
          ],
          handlers: {
            image: this.quillImageCallback,
          },
        },

        imageResize: { displaySize: true },
        clipboard: {
          matchVisual: false,
        },
      },
    };

    return (
      <Container maxWidth="lg">
        <h1>Quill_JS Editor</h1>

        <EditorPreview onHandlePostPreview={this.onHandlePostPreview} value={this.state.content} />

        {this.state.content.cover && <p>{this.state.content.cover.name}</p>}

        <Grid container direction="row" justify="space-between" alignItems="start">
          <Grid item md={5}>
            <h3>Content</h3>
            <ReactQuill
              onChange={this.handleChange}
              value={content.editorContent}
              ref={this.editorRef}
              modules={Quill_JS.modules}

              //   theme="snow" //bubble
            />
          </Grid>

          <Grid item md={6}>
            <h3>Content Preview</h3>
            <ReactQuill
              //   style={{ border: "2px solid black", minHeight: "300px" }}
              value={content.editorContent}
              readOnly
            />{" "}
          </Grid>
        </Grid>

        <Button variant="contained" color="secondary" style={{ marginTop: "12.5px" }} onClick={this.handleAddPost}>
          Publish Post
        </Button>
      </Container>
    );
  }
}

export default withFirebase(Editor);

// currentTarget vs target

// https://www.youtube.com/watch?v=GvyHQi69gqM
// https://github.com/mui-org/material-ui/issues/5085
// https://www.carlrippon.com/event-target-v-current-target/
