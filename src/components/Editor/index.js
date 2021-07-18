import React from "react";

// quill
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ImageResize } from "quill-image-resize-module";

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

    this.editorRef = React.createRef();

    this.state = {
      quillEditor: null,
      content: {
        editorContent: null,
        cover: null,
        fmm: true,
        title: "ce-este-designul",
      },
      minify: true,
      user: null,
    };
  }

  handeUploadCoverImage = async (file) => {
    try {
      const imgRef = this.props.firebase.storage.ref(
        `blog/${this.state.user}/design/${this.state.content.title}/images/cover/${file.name}`
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

  onHandlePostPreview = (e) => {
    const content = { ...this.state.content };

    if (e.currentTarget.type === "file") {
      content.cover = e.currentTarget.files[0];
      this.handeUploadCoverImage(e.currentTarget.files[0]);
    } else {
      content.title = e.currentTarget.value;
    }

    this.setState({
      content: content,
    });
  };

  handleUploadImage = async (file) => {
    try {
      const imgRef = this.props.firebase.storage.ref(
        `blog/${this.state.user}/design/${this.state.content.title}/images/content/${file.name}`
      );
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      return downloadUrl;
      //   console.log(downloadUrl);
    } catch (err) {
      console.log(err);
    }
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

        const imgUrl = await this.handleUploadImage(file);

        this.setState({
          editor: this.state.quillEditor.editor.deleteText(range.index, 1),
          editor: this.state.quillEditor.editor.insertEmbed(range.index, "image", imgUrl),
        });
      }
    };
  };

  handleAddPost = () => {
    this.props.firebase.db.ref(`posts/${this.state.user}/blog/`).push(this.state.content, (err) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ content: this.state.quillEditor.editor.setText("") });
      }
    });
  };

  handleChange = () => {
    const { ops } = this.state.quillEditor.editor.getContents();

    const content = { ...this.state.content };
    content.editorContent = ops;
    this.setState({ content });
  };

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  componentDidMount() {
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
    const { content, minify } = this.state;
    // console.log(content);

    console.log(new Date());

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
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      },
    };

    return (
      <>
        <h1>Quill_JS Editor</h1>

        <EditorPreview onHandlePostPreview={this.onHandlePostPreview} value={this.state.content.title} />
        {this.state.content.cover && <p>{this.state.content.cover.name}</p>}

        <Grid container direction="row" justify="space-between" alignItems="start">
          <Grid item md={5}>
            <h3>Content</h3>
            <ReactQuill onChange={this.handleChange} ref={this.editorRef} modules={Quill_JS.modules} />
          </Grid>

          <Grid item md={6}>
            {/* <h1>Editor contents in Delta JSON format</h1> */}
            {/* <button onClick={this.toggleMinify}>{minify ? "Beautify" : "Minify"}</button> */}
            {/* <pre>{JSON.stringify(content, null, minify ? 0 : 2)}</pre> */}
            {/* <h1>Read-only Quill Editor (Content generated from Delta JSON)</h1> */}
            <h3>Content Preview</h3>
            <ReactQuill
              style={{ border: "2px solid black", minHeight: "300px" }}
              value={content.editorContent}
              theme="bubble"
              readOnly
            />{" "}
          </Grid>
        </Grid>

        <Button variant="contained" color="secondary" style={{ marginTop: "12.5px" }} onClick={this.handleAddPost}>
          Publish Post
        </Button>
      </>
    );
  }
}

export default withFirebase(Editor);
