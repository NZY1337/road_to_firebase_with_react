import React from "react";

// uuid generates uniq keys for firebase-storage to get a ref for the uploaded files
import { v4 as uuidv4 } from "uuid";

// quill
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { ImageResize } from "quill-image-resize-module";
import Paper from "@material-ui/core/Paper";

// others...
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";
import Grid from "@material-ui/core/Grid";

// Editor Preview
import EditorPreview from "./editorPreview";

import editorModules from "./quillModules";

Quill.register("modules/imageResize", ImageResize);

// GSAP
// https://codepen.io/GreenSock/pen/obdMzZ
// https://codepen.io/GreenSock/pen/lEiAv
// https://codepen.io/GreenSock/pen/EqCtL
// https://greensock.com/react/

// currentTarget vs target
// https://www.youtube.com/watch?v=M23X3zzIawA
// https://www.youtube.com/watch?v=GvyHQi69gqM
// https://github.com/mui-org/material-ui/issues/5085
// https://codesandbox.io/s/react-quilljsbasic-wm0uk?file=/src/App.js
// https://www.carlrippon.com/event-target-v-current-target/

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.id;
    console.log(this.postId);
    this.postType = this.props.match.params.type;
    this.uniqueIdStorage = uuidv4().slice(0, 6);
    this.editorRef = React.createRef();

    this.state = {
      quillEditor: null,
      content: {
        editorContent: null,
        category: "blog",
        description: "",
        cover: "",
        title: "",
        uniqueIdStorage: "",
      },
      user: null,
    };
  }

  //! to STORAGE
  handeUploadCoverImage = async (file) => {
    const { uniqueIdStorage, category } = this.state.content;
    const { user } = this.state;
    const { storage } = this.props.firebase;

    // this.uniqueIdStorage - first time submitting the post
    // uniqueIdStorage - when the post is edited - from state

    const decideWhereToPlaceFile = this.postId ? uniqueIdStorage : this.uniqueIdStorage;
    console.log(decideWhereToPlaceFile);
    const imgRef = this.postId
      ? storage.ref(`${category}/${user}/${decideWhereToPlaceFile}/images/cover/cover.jpg`)
      : storage.ref(`${category}/${user}/${decideWhereToPlaceFile}/images`).child("cover/cover.jpg");

    try {
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      const content = { ...this.state.content };
      content.cover = downloadUrl;
      content.uniqueIdStorage = content.uniqueIdStorage ? content.uniqueIdStorage : this.uniqueIdStorage;

      this.setState({ content });
    } catch (err) {
      console.log(err);
    }
  };

  //! to STORAGE
  handleUploadContentEditorImage = async (file) => {
    const { uniqueIdStorage } = this.state.content;
    try {
      const imgRef = this.props.firebase.storage
        .ref(`/${this.state.content.category}/${this.state.user}/${uniqueIdStorage}/images`)
        .child(`content/${file.name}`);
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      return downloadUrl;
    } catch (err) {
      console.log(err);
    }
  };

  handleAddPost = async () => {
    //! unmounting firebase events when component mountsoff
    // https://stackoverflow.com/questions/44784275/how-to-add-update-and-list-data-into-firebase-using-js
    // https://www.ryanjyost.com/react-routing/

    // const eventref = this.props.firebase.db.ref(`${this.state.content.category}`).child(`${this.state.user}`);
    // const snapshot = await eventref.once("value");
    // const value = snapshot.val() ? Object.keys(snapshot.val()).length + 1 : 1;
    //   .child(`${value}`);

    const postRef = this.props.firebase.db.ref(`${this.state.content.category}`).child(`${this.state.user}`);

    if (this.postId) {
      postRef.child(`${this.postId}`).update(this.state.content);
    } else {
      postRef.push(this.state.content);
    }
  };

  fetchPost = (user) => {
    const postRef = this.props.firebase.db.ref(`${this.postType}/${user}/${this.postId}`);

    postRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        let content = { ...snapshot.val() };
        content.editorContent = content.editorContent ? content.editorContent : "";

        this.setState({
          content: content,
        });
      }
    });
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
    const content = { ...this.state.content };
    content.editorContent = html;
    this.setState({ content });
  };

  componentDidMount() {
    this.setState({
      quillEditor: this.editorRef.current,
    });

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        if (this.postId) this.fetchPost(user.uid);

        this.setState({
          user: user.uid,
        });
      }
    });
  }

  render() {
    const { content } = this.state;
    const Quill_JS = editorModules.bind(this)();

    return (
      <Container maxWidth="lg">
        <h1>Editor</h1>

        <EditorPreview onHandlePostPreview={this.onHandlePostPreview} value={this.state.content} />

        {this.state.content.cover && <p>{this.state.content.cover.name}</p>}

        <Grid container direction="row" justify="space-between" alignItems="start">
          <Grid xs={12} item>
            <Paper elevation={3}>
              <ReactQuill
                onChange={this.handleChange}
                value={content.editorContent}
                ref={this.editorRef}
                modules={Quill_JS.modules}
                style={{ padding: ".5rem", height: "100vh" }}
                theme="bubble" //bubble
                readOnly={false}
                placeholder="Compose your story..."
              />
            </Paper>
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
