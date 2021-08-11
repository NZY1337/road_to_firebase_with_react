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
import HeaderContainer from "../Blog/HeaderContainer";

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

const url =
  "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.id;

    this.postType = this.props.match.params.type;
    this.uniqueIdStorage = uuidv4().slice(0, 6);
    this.editorRef = React.createRef();

    this.state = {
      imgUploaded: false,
      quillEditor: null,
      content: {
        editorContent: "",
        category: "blog",
        description: "",
        cover: "",
        title: "",
        uniqueIdStorage: "",
        createdAt: new Date().toISOString().split("T")[0],
      },
      user: null,
    };
  }

  //! to STORAGE
  handeUploadCoverImage = async (file) => {
    const { uniqueIdStorage, category } = this.state.content;
    const { storage } = this.props.firebase;

    // this.uniqueIdStorage - first time submitting the post
    // uniqueIdStorage - when the post is edited - from state

    const decideWhereToPlaceFile = this.postId ? uniqueIdStorage : this.uniqueIdStorage;

    const imgRef = this.postId
      ? storage.ref(`${category}/${decideWhereToPlaceFile}/images/cover/cover.jpg`)
      : storage.ref(`${category}/${decideWhereToPlaceFile}/images`).child("cover/cover.jpg");

    try {
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      const content = { ...this.state.content };
      content.cover = downloadUrl;
      content.uniqueIdStorage = content.uniqueIdStorage ? content.uniqueIdStorage : this.uniqueIdStorage;
      this.setState({ imgUploaded: true });
      this.setState({ content });
    } catch (err) {
      console.log(err);
    }
  };

  //! to STORAGE
  handleUploadContentEditorImage = async (file) => {
    /*  when uploading content images for editor we asume that we already have generated our Unique ID;
        because first we upload cover(immediately generates the UNIQUE_ID) then content
    */

    const { storage } = this.props.firebase;
    const { uniqueIdStorage, category } = this.state.content;

    const imgRef = this.postId
      ? storage.ref(`${category}/${uniqueIdStorage}/images/content/${file.name}`)
      : storage.ref(`${category}/${uniqueIdStorage}/images/content`).child(`${file.name}`);

    try {
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      return downloadUrl;
    } catch (err) {
      console.log(err);
    }
  };

  handleAddPost = async () => {
    //! unmounting firebase events when component mountsoff

    const postRef = this.props.firebase.db.ref(`${this.state.content.category}`);

    if (this.postId) {
      postRef.child(`${this.postId}`).update(this.state.content);
    } else {
      postRef.push(this.state.content);
    }

    this.props.history.push(`/${this.state.content.category}`);
  };

  fetchPost = () => {
    const postRef = this.props.firebase.db.ref(`${this.postType}/${this.postId}`);

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
        });

        this.setState({
          editor: this.state.quillEditor.editor.setSelection(range.index + 1),
        });

        const imgUrl = await this.handleUploadContentEditorImage(file);

        this.setState({
          editor: this.state.quillEditor.editor.deleteText(range.index, 1),
        });

        this.setState({
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

    if (this.postId) this.fetchPost();

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user.uid,
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.content.category);
    console.log(this.state.content.category);
  }

  render() {
    const { content, imgUploaded } = this.state;
    const { title, description, cover, editorContent } = this.state.content;
    const Quill_JS = editorModules.bind(this)();
    const disabled = title === "" || description === "" || cover === "" || editorContent === "";

    return (
      <>
        <HeaderContainer cover={url} title={title ? title : "Create your story"} />
        <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <h1>Editor</h1>

          <EditorPreview
            onHandlePostPreview={this.onHandlePostPreview}
            imgUploaded={imgUploaded}
            post={this.state.content}
            postId={this.postId}
          />

          {this.state.content.cover && <p>{this.state.content.cover.name}</p>}

          <Grid container direction="row" justify="space-between" alignItems="flex-start">
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

          <Button
            disabled={disabled}
            variant="contained"
            color="secondary"
            style={{ marginTop: "12.5px" }}
            onClick={this.handleAddPost}
          >
            Publish Post
          </Button>
        </Container>
      </>
    );
  }
}

export default withFirebase(Editor);
