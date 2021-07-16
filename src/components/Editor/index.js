import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ImageResize } from "quill-image-resize-module";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";

// function imageHandler() {
//   //   const range = this.quill.getSelection();
//   //   const value = prompt("Insert image URL");
//   //   if (value) {
//   //     this.quill.insertEmbed(range.index, "image", value, Quill.sources.USER);
//   //   }

//   console.log("fmm");
// }

Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageHandler", imageHandler);

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
    this.state = {
      quillEditor: null,
      content: null,
      minify: true,
      user: null,
    };
  }

  handleUploadImage = async (file) => {
    try {
      const imgRef = this.props.firebase.storage.ref(`blog/images/${this.state.user}/img`);
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
        });

        this.setState({
          editor: this.state.quillEditor.editor.insertEmbed(range.index, "image", imgUrl),
        });
      }
    };
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

  onAddPost = () => {
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
    console.log(ops);
    this.setState({ content: ops });
  };

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  render() {
    const { content, minify } = this.state;
    // console.log(content);

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
      <Container maxWidth="lg">
        <h1>Quill_JS Editor</h1>
        <ReactQuill onChange={this.handleChange} ref={this.editorRef} modules={Quill_JS.modules} />
        {/* <hr />
        <h1>Editor contents in Delta JSON format</h1>
        <button onClick={this.toggleMinify}>{minify ? "Beautify" : "Minify"}</button>
        <pre>{JSON.stringify(content, null, minify ? 0 : 2)}</pre>
        <hr />
        <h1>Read-only Quill Editor (Content generated from Delta JSON)</h1>
        <div style={{ border: "1px solid #ccc" }}>
          <ReactQuill value={content} theme="bubble" readOnly />{" "}
        </div> */}
        <Button variant="contained" color="secondary" style={{ marginTop: "12.5px" }} onClick={this.onAddPost}>
          Publish Post
        </Button>
      </Container>
    );
  }
}

export default withFirebase(Editor);
