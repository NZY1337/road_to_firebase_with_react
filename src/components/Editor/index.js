import React, { useContext } from "react";

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
import { SnackBarContext } from "../../utils/SnackBarContext";

// Editor Preview
import EditorPreview from "./editorPreview";
import editorModules from "./quillModules";
Quill.register("modules/imageResize", ImageResize);

const url =
  "https://images.pexels.com/photos/323645/pexels-photo-323645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

class Editor extends React.Component {
  static contextType = SnackBarContext;
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.id;

    this.postType = this.props.match.params.type;
    this.uniqueStorageId = uuidv4().slice(0, 6);
    this.editorRef = React.createRef();

    this.state = {
      imgUploaded: false,
      quillEditor: null,
      content: {
        editorContent: "",
        postType: "blog",
        category: "design de produs",
        description: "",
        cover: "",
        title: "",
        video: "",
        uniqueStorageId: "",
        postViews: 0,
        createdAt: new Date().toISOString().split("T")[0],
      },
      user: null,
    };
  }

  //! to STORAGE
  handleUploadCoverImage = async (file) => {
    const content = { ...this.state.content };
    content.cover = file;
    this.setState({ content });
  };

  handleAddCoverToFB = async (file) => {
    const { uniqueStorageId, postType } = this.state.content;
    const { storage } = this.props.firebase;
    const { handleOpen } = this.context;

    // this.uniqueStorageId - first time submitting the post cover
    // uniqueStorageId - when the post is edited - from state

    const decideCoverLocation = this.postId ? uniqueStorageId : this.uniqueStorageId;

    const imgRef = this.postId
      ? storage.ref(`${postType}/${decideCoverLocation}/images/cover/${file.name}`)
      : storage.ref(`${postType}/${decideCoverLocation}/images`).child(`cover/${file.name}`);

    try {
      this.setState({ imgUploaded: true });
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      const content = { ...this.state.content };
      content.cover = downloadUrl;
      handleOpen("success", "Article's Post Cover uploaded successfully!");
      content.uniqueStorageId = content.uniqueStorageId ? content.uniqueStorageId : this.uniqueStorageId;
      this.setState({ imgUploaded: false, content: content });
    } catch ({ message }) {
      handleOpen("error", message);
    }
  };

  handleAddPost = async () => {
    //! unmounting firebase events when component mountsoff

    if (typeof this.state.content.cover === "object") {
      // because file accepts a blog image, not the url from DB (url === 'string')
      await this.handleAddCoverToFB(this.state.content.cover);
    }

    const { handleOpen } = this.context;
    const postRef = this.props.firebase.db.ref(`${this.state.content.postType}`);

    if (this.postId) {
      postRef
        .child(`${this.postId}`)
        .update(this.state.content)
        .then(() => {
          handleOpen("success", "Post updated successfully!");
          this.props.history.push(`/${this.state.content.postType}`);
        })
        .catch(({ message }) => {
          handleOpen("error", message);
        });
    } else {
      postRef
        .push(this.state.content)
        .then(() => {
          handleOpen("success", "Post created successfully!");
          this.props.history.push(`/${this.state.content.postType}`);
        })
        .catch(({ message }) => {
          handleOpen("error", message);
        });
    }
  };

  //! to STORAGE
  handleUploadContentEditorImage = async (file) => {
    /*  
        when uploading content images for editor we asume that we already have generated our Unique ID;
        because first we upload cover(immediately generates the UNIQUE_ID) then content
    */
    const { handleOpen } = this.context;
    const { storage } = this.props.firebase;
    const { uniqueStorageId, postType } = this.state.content;
    const decideCoverLocation = this.postId ? uniqueStorageId : this.uniqueStorageId;

    const imgRef = this.postId
      ? storage.ref(`${postType}/${decideCoverLocation}/images/content/${file.name}`)
      : storage.ref(`${postType}/${decideCoverLocation}/images/content`).child(`${file.name}`);

    try {
      const imgState = await imgRef.put(file);
      const downloadUrl = await imgState.ref.getDownloadURL();
      handleOpen("success", "Article's Image uploaded successfully!");

      return downloadUrl;
    } catch ({ message }) {
      handleOpen("error", message);
    }
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
      this.handleUploadCoverImage(e.currentTarget.files[0]);
    } else if (e.currentTarget.type === "video") {
      content.video = e.currentTarget.files[0];
    } else {
      content[e.target.name] = e.target.value;
    }

    this.setState({
      content,
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

  render() {
    const {
      content,
      imgUploaded,
      content: {
        cover: { name: imgCoverName },
      },
    } = this.state;
    const { title, description, cover, editorContent } = this.state.content;
    const Quill_JS = editorModules.bind(this)();
    const disabled = title === "" || description === "" || cover === "" || editorContent === "";

    return (
      <>
        <HeaderContainer cover={url} height="50vh" title={title ? title : "Create your story"} />
        <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <EditorPreview
            onHandlePostPreview={this.onHandlePostPreview}
            imgUploaded={imgUploaded}
            imgCoverName={imgCoverName}
            post={this.state.content}
            postId={this.postId}
          />

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
