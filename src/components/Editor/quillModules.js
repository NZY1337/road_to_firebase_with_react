function editorModules() {
  return {
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
}

export default editorModules;
